import test from 'node:test';
import assert from 'node:assert/strict';
import {createMapPlace,positionMapPlace,removeMapPlacePosition} from '../map-places.js';
import {mergeWorld,worldSearch,relatedRecords} from '../world.js';
import {defaultMapState} from '../map-model.js';
import {validateCampaign} from '../campaign.js';
const fresh=()=>mergeWorld({entries:[],tokens:[],customSkills:[],customAssets:[]});
const data={mode:'streets',point:[47.322,5.0415],name:'Boutique des Ombres',type:'Boutique',zoneId:'zone-centre'};

test('La création ajoute ensemble un lieu, son repère géographique et son quartier sans modifier la campagne source',()=>{
 const source=fresh(),before=structuredClone(source),next=createMapPlace(source,data,'place-test-shop');
 assert.deepEqual(source,before);assert.doesNotThrow(()=>validateCampaign(next));
 const place=next.world.records.find(r=>r.id==='place-test-shop');assert.equal(place.kind,'place');assert.equal(place.fields.type,'Boutique');assert.equal(place.fields.authority,'À définir');assert.equal(place.coordinates,null);
 assert.deepEqual(next.mapState.dijon.positions.find(p=>p.id===place.id).point,data.point);
 assert.ok(relatedRecords(next.world,place.id).some(r=>r.other.id==='zone-centre'));
 assert.ok(worldSearch(next.world,'Boutique des Ombres',{filters:{zone:'zone-centre'}}).some(r=>r.record.id===place.id));
 assert.deepEqual(next.entries,source.entries);assert.deepEqual(next.tokens,source.tokens);
});

test('Un lieu de l’illustration conserve des coordonnées distinctes et reste identique après export/import',()=>{
 const source=fresh();source.mapState=defaultMapState();source.mapState.dijon.routes.streets.points=[[47.32,5.04],[47.33,5.05]];
 const next=createMapPlace(source,{...data,mode:'cyberpunk',point:[600,400],type:'Lieu important'},'place-test-landmark');
 const place=next.world.records.find(r=>r.id==='place-test-landmark');assert.deepEqual(place.coordinates,{x:25,y:50});assert.ok(!next.mapState.dijon.positions.some(p=>p.id===place.id));
 const restored=mergeWorld(validateCampaign(JSON.parse(JSON.stringify(next))));assert.deepEqual(restored,next);
 assert.deepEqual(restored.mapState.dijon.routes.streets,source.mapState.dijon.routes.streets);
});

test('Les lieux et rattachements secrets sont masqués sans exposer le nom d’un quartier confidentiel',()=>{
 const source=fresh();source.world.records.find(r=>r.id==='zone-centre').isSecret=true;
 const next=createMapPlace(source,{...data,isSecret:false},'place-test-public');
 assert.equal(next.world.records.find(r=>r.id==='place-test-public').fields.address,'À définir');
 assert.equal(relatedRecords(next.world,'place-test-public').length,0);assert.equal(relatedRecords(next.world,'place-test-public',true)[0].relation.visibility,'secret');
 const secret=createMapPlace(source,{...data,isSecret:true,gmNotes:'Secret de campagne'},'place-test-secret');
 assert.ok(!worldSearch(secret.world,'').some(h=>h.record.id==='place-test-secret'));
 assert.ok(worldSearch(secret.world,'Secret de campagne').find(h=>h.record.id==='place-test-secret').protected);
});

test('Un repère personnalisé se déplace et se retire sur une vue sans supprimer son dossier ni sa seconde position',()=>{
 const source=createMapPlace(fresh(),data,'place-test-shop');
 const both=positionMapPlace(source,'place-test-shop','cyberpunk',[600,400]);
 const moved=positionMapPlace(both,'place-test-shop','streets',[47.33,5.06]);
 assert.deepEqual(source.mapState.dijon.positions[0].point,data.point);
 const removed=removeMapPlacePosition(moved,'place-test-shop','streets');assert.equal(removed.mapState.dijon.positions.length,0);assert.deepEqual(removed.world.records.find(r=>r.id==='place-test-shop').coordinates,{x:25,y:50});
 const noArt=removeMapPlacePosition(moved,'place-test-shop','cyberpunk');assert.equal(noArt.world.records.find(r=>r.id==='place-test-shop').coordinates,null);assert.deepEqual(noArt.mapState.dijon.positions[0].point,[47.33,5.06]);assert.doesNotThrow(()=>validateCampaign(noArt));
});

test('Les créations invalides, liens inconnus et déplacements des repères historiques sont refusés',()=>{
 for(const invalid of [{name:'  '},{type:''},{point:[95,5]},{mode:'unknown'},{zoneId:'char-david'}])assert.throws(()=>createMapPlace(fresh(),{...data,...invalid},'place-test'));
 assert.throws(()=>createMapPlace(fresh(),data,'zone-centre'));
 for(const action of [()=>positionMapPlace(fresh(),'zone-gare','cyberpunk',[600,400]),()=>removeMapPlacePosition(fresh(),'zone-gare','cyberpunk'),()=>positionMapPlace(fresh(),'missing','streets',data.point)])assert.throws(action);
});
