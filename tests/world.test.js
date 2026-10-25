import test from 'node:test';
import assert from 'node:assert/strict';
import {mergeWorld,worldSearch,relatedRecords,worldDiagnostics,upsertWorldRecord} from '../world.js';
import {validateWorld,makeWorldRecord} from '../world-schema.js';
import {seedRecords,seedRelations} from '../world-data.js';
import {validateCampaign} from '../campaign.js';
import {dijonPlaces} from '../dijon-places.js';

const empty=()=>({entries:[],tokens:[]});
const fresh=()=>mergeWorld(empty());
const byId=(state,id)=>state.world.records.find(r=>r.id===id);

test('Dijon 2082 charge des identifiants stables, des relations valides et les seuls faits fournis',()=>{
 const state=fresh();
 assert.doesNotThrow(()=>validateCampaign(state));
 assert.equal(state.world.settings.year,2082);
 assert.equal(state.world.settings.system,'Shadowrun: Anarchy V2');
 assert.equal(seedRecords.filter(r=>r.kind==='character').length,16);
 assert.equal(seedRecords.filter(r=>r.kind==='zone').length,19);
 assert.equal(state.world.relations.length,130);
 assert.deepEqual(worldDiagnostics(state),[]);
 assert.equal(byId(state,'char-noah').fields.metatype,'À définir');
 assert.equal(byId(state,'char-voisin-americain').name,'Voisin américain de David');
 assert.equal(byId(state,'faction-corporation-osvald').fields.officialName,'À définir');
 assert.equal(byId(state,'faction-corporation-valmy').fields.officialName,'À définir');
 assert.equal(state.entries.length,0,'Les dossiers narratifs ne génèrent aucune statistique');
 assert.ok(state.world.records.every(r=>r.coordinates===null));
});

test('La fusion conserve intégralement Lim, BOYCOW, Noah, les listes et les pions préexistants',()=>{
 const legacy={...empty(),entries:[
  {id:'lim-original',name:'lim',category:'PJ',description:'Portrait original de Lim',notes:'Secret original',profile:{metatype:'Humain',force:4,skills:'Compétence libre',assets:'Atout personnel'}},
  {id:'boycow-original',name:'BOYCOW',category:'PJ',description:'Son histoire',notes:'Note privée',profile:{metatype:'Troll',charisme:3}},
  {id:'noah-original',name:'Noah',category:'PJ',description:'Informations déjà connues',notes:'Autres notes',profile:{metatype:'Ork',logique:5}},
  {id:'other-original',name:'Autre runner',category:'PNJ secondaire',description:'Autre fiche',notes:''}
 ],tokens:[{id:'lim-original',x:13,y:27}],customSkills:[],customAssets:[],extraMetadata:{preserved:true}};
 const before=structuredClone(legacy);
 const result=mergeWorld(legacy);
 assert.deepEqual(legacy,before,'La source ne doit pas être mutée');
 for(const key of ['entries','tokens','customSkills','customAssets','extraMetadata'])assert.deepEqual(result[key],before[key]);
 for(const [id,entryId] of [['char-lim','lim-original'],['char-boycow','boycow-original'],['char-noah','noah-original']])assert.equal(byId(result,id).gameEntryId,entryId);
 assert.equal(byId(result,'char-noah').fields.metatype,'Ork');
 assert.equal(result.world.records.filter(r=>r.kind==='character'&&r.name.toLowerCase()==='lim').length,1);
 assert.equal(result.world.records.filter(r=>r.gameEntryId==='other-original').length,1);
});

test('Les fusions répétées et export/import conservent les modifications et les corporations',()=>{
 let state=fresh();
 const original=byId(state,'char-karl-darmin');
 state=upsertWorldRecord(state,{...original,name:'Karl personnalisé',publicInfo:'Informations mises à jour',gmNotes:'Mes notes',discovery:'Partiellement découvert',fields:{...original.fields,age:'43 ans'}});
 state.world.relations[0]={...state.world.relations[0],evolution:'Découvert pendant la séance 2'};
 const before=structuredClone(state);
 const twice=mergeWorld(mergeWorld(state));
 assert.deepEqual(twice,before);
 const restored=mergeWorld(validateCampaign(JSON.parse(JSON.stringify(twice))));
 assert.deepEqual(restored.world,before.world);
 assert.deepEqual(restored.entries,before.entries);
 assert.equal(byId(restored,'faction-french-touch').corporationId,'corp-french-touch');
 assert.equal(byId(restored,'faction-renraku-dijon').corporationId,'corp-renraku');
 assert.equal(restored.world.records.filter(r=>r.kind==='faction').length,24);
});

test('Un dossier préexistant nommé comme une graine garde son ID et reçoit des relations correctement remappées',()=>{
 const old=makeWorldRecord('character','my-anilla','Anilla Yusupova',{publicInfo:'Texte personnel'});
 const initial=fresh();
 initial.world.records=[old];initial.world.relations=[];
 const result=mergeWorld(initial);
 assert.equal(result.world.records.filter(r=>r.name==='Anilla Yusupova').length,1);
 assert.equal(byId(result,'my-anilla').publicInfo,'Texte personnel');
 assert.ok(result.world.relations.some(r=>r.from==='my-anilla'&&r.to==='char-osvald-yusulov'));
 assert.ok(!result.world.relations.some(r=>r.from==='char-anilla-yusupova'||r.to==='char-anilla-yusupova'));
 assert.deepEqual(mergeWorld(result),result);
});

test('La recherche trouve les alias et accents, protège les correspondances MJ et les champs confidentiels',()=>{
 const {world}=fresh();
 assert.ok(worldSearch(world,'Lea').some(h=>h.record.id==='char-lea'&&!h.protected));
 assert.ok(worldSearch(world,"I Cani d'Acciaio").some(h=>h.record.id==='faction-i-cani-acciaio'));
 const hidden=worldSearch(world,'falsifié');
 assert.ok(hidden.some(h=>h.record.id==='char-osvald-yusulov'&&h.protected));
 assert.ok(worldSearch(world,'falsifié',{includeSecrets:true}).every(h=>!h.protected));
 const reliability=worldSearch(world,'Mensonger').find(h=>h.record.id==='clue-taxi-temoignage');
 assert.ok(reliability.protected,'La fiabilité du témoignage ne doit pas être publique');
 assert.ok(!worldSearch(world).some(h=>h.record.id==='secret-faux-enlevement'));
 assert.ok(worldSearch(world,'biopuce').find(h=>h.record.id==='clue-biopuce').protected);
});

test('Les filtres combinent découverte, métatype, statut, scénario, quartier et territoire d’une faction',()=>{
 let state=fresh();
 state=upsertWorldRecord(state,{...byId(state,'char-karl-darmin'),discovery:'Découvert',fields:{...byId(state,'char-karl-darmin').fields,life:'Disparu'}});
 assert.deepEqual(worldSearch(state.world,'',{kind:'character',filters:{metatype:'Elfe',life:'Disparu',discovery:'Découvert',scenario:'scenario-karl',zone:'zone-valmy'}}).map(h=>h.record.id),['char-karl-darmin']);
 const french=worldSearch(state.world,'',{kind:'place',filters:{faction:'faction-french-touch'}});
 assert.ok(french.some(h=>h.record.id==='place-restaurant-gastronomie'));
 assert.ok(!french.some(h=>h.record.id==='place-sous-sols-gastronomie'),'Le territoire clandestin reste caché');
 assert.ok(worldSearch(state.world,'',{kind:'place',includeSecrets:true,filters:{faction:'faction-french-touch'}}).some(h=>h.record.id==='place-sous-sols-gastronomie'));
 assert.ok(worldSearch(state.world,'',{filters:{authority:'Étatique'}}).some(h=>h.record.id==='zone-longvic'));
});

test('Les relations inverses sont consultables et leurs extrémités secrètes restent cachées',()=>{
 const {world}=fresh();
 assert.ok(relatedRecords(world,'char-osvald-yusulov').some(x=>x.other.id==='char-anilla-yusupova'));
 assert.ok(relatedRecords(world,'zone-valmy').some(x=>x.other.id==='char-karl-darmin'));
 assert.ok(!relatedRecords(world,'char-karl-darmin').some(x=>x.other.id==='faction-gang-karl'));
 assert.ok(relatedRecords(world,'char-karl-darmin',true).some(x=>x.other.id==='faction-gang-karl'));
 const secretEnd={...seedRelations[0],id:'rel-test-secret-end',from:'char-karl-darmin',to:'secret-faux-enlevement',visibility:'public'};
 assert.ok(!relatedRecords({...world,relations:[secretEnd]},'char-karl-darmin').length);
});

test('Les imports invalident les liens cassés, doublons, coordonnées et portraits incorrects',()=>{
 const initial=fresh();
 for(const mutate of [
  s=>s.world.relations[0].to='missing',
  s=>s.world.relations.push({...s.world.relations[0]}),
  s=>s.world.records.push({...s.world.records[0]}),
  s=>s.world.records[0].id='Identité accentuée',
  s=>s.world.records[0].coordinates={x:101,y:3},
  s=>s.world.records[0].portraitUrl='javascript:alert(1)',
  s=>s.world.settings.system='Shadowrun 6',
  s=>s.world.records[0].fields.metatype=4
 ]){const value=structuredClone(initial);mutate(value);assert.throws(()=>validateCampaign(value));}
 const broken=structuredClone(initial);broken.world.relations[0].to='missing';assert.match(worldDiagnostics(broken)[0],/Relation invalide/);
});

test('Les pions de dossiers sans fiche de jeu sont sauvegardables sans exclure les anciens pions',()=>{
 const state=fresh();state.tokens=[{id:'char-david',x:20,y:30}];
 assert.doesNotThrow(()=>validateCampaign(state));
 assert.throws(()=>validateCampaign({...state,tokens:[{id:'not-a-character',x:20,y:30}]}));
});

test('Les onze repères hérités gardent exactement leurs positions et chaque repère a un dossier',()=>{
 assert.deepEqual(dijonPlaces.map(({id,x,y})=>[id,x,y]),[
  ['gare',42,56],['darcy',47,54],['palais',55,58],['republique',61,49],['wilson',60,68],['gastronomie',40,69],['universite',84,68],['chu',81,57],['kir',10,57],['toison',63,10],['canal',35,75]
 ]);
 const {world}=fresh();
 for(const place of dijonPlaces)assert.equal(world.records.filter(r=>r.mapPlaceId===place.id).length,1);
 assert.equal(world.records.filter(r=>r.mapPlaceId).length,11);
});
