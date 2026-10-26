import test from 'node:test';
import assert from 'node:assert/strict';
import {mergeWorld,worldSearch} from '../world.js';
import {validateCampaign} from '../campaign.js';
import {getMapShapes,initializeMapShapes,saveMapShape,updateMapShape,removeMapShape} from '../map-shapes.js';
import {saveBuilding,saveBuildingPlan,removeBuildingPlan,buildingOwner} from '../buildings.js';
import {dijonPlaces} from '../dijon-places.js';
const fresh=()=>validateCampaign(mergeWorld({entries:[],tokens:[]}));
const byId=(state,id)=>state.world.records.find(r=>r.id===id);
const restore=state=>mergeWorld(validateCampaign(JSON.parse(JSON.stringify(state))));
const points=[[47.32,5.04],[47.321,5.04],[47.321,5.042],[47.32,5.042]];
const data={mode:'streets',kind:'building',points,color:'#b165e3',recordId:'place-arcologie-fontaine'};
const plan={id:'plan-test',name:'Accueil',level:'RDC',description:'Guichet public',gmNotes:'SecretLocalUnique',isSecret:false,imageData:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='};

test('Les propositions restent sur l’illustration et conservent tous les repères et les positions inconnues',()=>{
 const state=fresh(),before=structuredClone(state),art=getMapShapes(state,'cyberpunk');assert.equal(art.length,10);assert.deepEqual(getMapShapes(state,'streets'),[]);
 for(const shape of art){const value=saveMapShape(state,{...shape,mode:'cyberpunk'});assert.doesNotThrow(()=>validateCampaign(value.state));}
 assert.equal(byId(state,'place-arcologie-fontaine').building.floors,'25 à 30');assert.equal(byId(state,'place-arcologie-fontaine').coordinates,null);assert.equal(byId(state,'zone-toison').building.floors,'5 niveaux publics');
 assert.deepEqual(state,before);assert.equal(dijonPlaces.find(r=>r.id==='palais').x,55);assert.ok(state.world.records.every(r=>r.coordinates===null));
 const initialized=initializeMapShapes(state);assert.deepEqual(restore(initialized).mapState.dijon.shapes.cyberpunk,art);assert.equal(initializeMapShapes(initialized),initialized);
});

test('Dessiner l’arcologie associe une emprise réelle au dossier existant, sans modifier ses faits ni les autres vues',()=>{
 const source=fresh(),before=structuredClone(source),created=saveMapShape(source,data),next=created.state;
 assert.equal(next.world.records.length,source.world.records.length);assert.deepEqual(byId(next,data.recordId),byId(source,data.recordId));
 assert.equal(getMapShapes(next,'streets').length,1);assert.equal(getMapShapes(next,'cyberpunk').length,10);assert.deepEqual(source,before);
 const redrawn=saveMapShape(next,{...data,points:points.map(([lat,lng])=>[lat+.001,lng])});assert.equal(redrawn.shape.id,created.shape.id);assert.equal(getMapShapes(redrawn.state,'streets').length,1);
 assert.deepEqual(getMapShapes(restore(redrawn.state),'streets')[0].points,redrawn.shape.points);
});

test('Les nouveaux contours créent leur dossier et les retraits restent effectifs sans supprimer bâtiments et plans',()=>{
 const source=fresh(),newZone=saveMapShape(source,{...data,recordId:'',kind:'zone',name:'Secteur des runners',description:'Territoire de campagne'});
 assert.equal(byId(newZone.state,newZone.shape.recordId).kind,'zone');assert.equal(source.world.records.length+1,newZone.state.world.records.length);
 const building=saveMapShape(newZone.state,{...data,recordId:'',name:'Tour de campagne',type:'Tour corporatiste'});
 const withPlan=saveBuildingPlan(building.state,building.shape.recordId,plan),removed=removeMapShape(withPlan,'streets',building.shape.id);
 assert.deepEqual(byId(restore(removed),building.shape.recordId).building.plans,[plan]);assert.equal(getMapShapes(restore(removed),'streets').length,1);
 const seed=getMapShapes(removed,'cyberpunk')[0],noSeed=removeMapShape(removed,'cyberpunk',seed.id);assert.ok(!getMapShapes(restore(noSeed),'cyberpunk').some(s=>s.id===seed.id));assert.ok(byId(noSeed,seed.recordId));
});

test('Les sommets et couleurs sont modifiables sans mutation, et les contours croisés, dégénérés ou liés à un mauvais dossier sont refusés',()=>{
 const result=saveMapShape(fresh(),data),source=result.state,before=structuredClone(source),changed=updateMapShape(source,'streets',result.shape.id,{color:'#11aabb',points:points.map(([lat,lng])=>[lat+.002,lng])});
 assert.equal(getMapShapes(changed,'streets')[0].color,'#11aabb');assert.deepEqual(source,before);
 for(const invalid of [{points:points.slice(0,2)},{points:[points[0],points[2],points[1],points[3]]},{points:[points[0],points[0],points[1]]},{points:[[47,5],[48,6],[49,7]]},{points:[[96,5],points[1],points[2]]},{color:'red;script'},{recordId:'char-david'},{kind:'zone',recordId:'place-cybar'}])assert.throws(()=>saveMapShape(source,{...data,...invalid}));
 const broken=structuredClone(changed);broken.mapState.dijon.shapes.streets[0].recordId='missing';assert.throws(()=>validateCampaign(broken));
});

test('Les modifications d’un bâtiment conservent ses plans et synchronisent sa couleur sur ses emprises',()=>{
 let state=saveMapShape(fresh(),data).state;state=saveBuildingPlan(state,data.recordId,plan);const r=byId(state,data.recordId),before=structuredClone(state),corp=state.world.records.find(r=>r.corporationId==='corp-ares');
 const updated=saveBuilding(state,r.id,{building:{...r.building,color:'#123456',ownerId:corp.id},name:r.name,description:r.publicInfo,security:'Contrôle renforcé',gmNotes:'Note préservée',isSecret:false});
 assert.equal(getMapShapes(updated,'streets')[0].color,'#123456');assert.deepEqual(byId(updated,r.id).building.plans,[plan]);assert.equal(buildingOwner(updated.world,byId(updated,r.id).building),corp.name);assert.deepEqual(state,before);
 assert.ok(worldSearch(updated.world,'',{filters:{corporation:corp.id}}).some(h=>h.record.id===r.id));assert.deepEqual(restore(updated),updated);
});

test('Les plans et propriétaires secrets ne sont pas exposés dans la consultation et la recherche publiques',()=>{
 let state=fresh();state=saveBuildingPlan(state,data.recordId,plan);state=saveBuildingPlan(state,data.recordId,{...plan,id:'plan-secret',name:'PlanSecretUnique',isSecret:true});
 assert.ok(worldSearch(state.world,'Accueil').some(h=>!h.protected&&h.record.id===data.recordId));
 assert.ok(worldSearch(state.world,'PlanSecretUnique').find(h=>h.record.id===data.recordId).protected);assert.ok(worldSearch(state.world,'SecretLocalUnique').find(h=>h.record.id===data.recordId).protected);
 const owner=state.world.records.find(r=>r.corporationId==='corp-ares');owner.isSecret=true;const b={...byId(state,data.recordId).building,ownerId:owner.id};assert.equal(buildingOwner(state.world,b),'À définir');assert.equal(buildingOwner(state.world,b,{includeSecrets:true}),owner.name);
});

test('Les plans exportés gardent leur image locale et leurs notes, et leur suppression conserve tout le dossier',()=>{
 const source=saveBuildingPlan(fresh(),data.recordId,plan),before=structuredClone(source),restored=restore(source);assert.deepEqual(byId(restored,data.recordId).building.plans,[plan]);
 const removed=removeBuildingPlan(source,data.recordId,plan.id);assert.deepEqual(byId(removed,data.recordId).building.plans,[]);assert.deepEqual(source,before);assert.ok(byId(removed,data.recordId));
 for(const invalid of [{imageData:'data:image/svg+xml;base64,PHN2Zz4='},{imageData:'https://example.com/plan.png'},{imageData:'data:image/png;base64,'+'A'.repeat(720000)},{id:'invalid id'},{isSecret:'yes'},{name:' '}])assert.throws(()=>saveBuildingPlan(source,data.recordId,{...plan,...invalid}));
 const bad=structuredClone(source);byId(bad,data.recordId).building.ownerId='char-david';assert.throws(()=>validateCampaign(bad));
});
