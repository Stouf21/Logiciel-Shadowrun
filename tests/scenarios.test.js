import test from 'node:test';
import assert from 'node:assert/strict';
import {mergeWorld,upsertWorldRecord,worldSearch} from '../world.js';
import {validateCampaign} from '../campaign.js';
import {makeWorldRecord} from '../world-schema.js';
import {scenarioMembers,attachScenarioRecord,detachScenarioRecord,moveScenarioEvent,deleteScenario} from '../scenarios.js';
const fresh=()=>validateCampaign(mergeWorld({entries:[],tokens:[]}));
const restore=state=>mergeWorld(validateCampaign(JSON.parse(JSON.stringify(state))));
const eventIds=state=>scenarioMembers(state.world,'scenario-anilla','event',{includeSecrets:true}).map(r=>r.id);

test('Supprimer un scénario initial reste effectif après fusion et export/import, sans supprimer ses fiches',()=>{
 const source=fresh(),before=structuredClone(source),expected=source.world.records.filter(r=>r.id!=='scenario-anilla');
 const removed=deleteScenario(source,'scenario-anilla'),restored=restore(removed);
 assert.deepEqual(source,before);
 assert.deepEqual(restored.world.records,expected);
 assert.ok(restored.world.relations.every(r=>r.from!=='scenario-anilla'&&r.to!=='scenario-anilla'));
 assert.deepEqual(restored.entries,source.entries);assert.deepEqual(restored.tokens,source.tokens);
 assert.ok(restored.world.records.some(r=>r.id==='event-mort-anilla'));
 assert.equal(worldSearch(restored.world,'',{filters:{scenario:'scenario-anilla'}}).length,0);
 assert.deepEqual(restore(restored),restored);
});

test('Un lien initial retiré ne revient pas ; son personnage se rattache ensuite une seule fois',()=>{
 const source=fresh(),without=restore(detachScenarioRecord(source,'scenario-anilla','char-david'));
 assert.ok(!scenarioMembers(without.world,'scenario-anilla','character').some(r=>r.id==='char-david'));
 assert.ok(without.world.records.some(r=>r.id==='char-david'));
 assert.ok(without.world.relations.some(r=>r.to==='char-david'&&r.from==='event-soiree-anilla'));
 const added=attachScenarioRecord(without,'scenario-anilla','char-david');
 assert.deepEqual(attachScenarioRecord(added,'scenario-anilla','char-david'),added);
 assert.equal(scenarioMembers(restore(added).world,'scenario-anilla','character').filter(r=>r.id==='char-david').length,1);
 assert.ok(scenarioMembers(source.world,'scenario-anilla','character').some(r=>r.id==='char-david'));
});

test('La frise conserve l’ordre local, les dates relatives et les autres scénarios',()=>{
 const source=fresh(),original=eventIds(source),other=scenarioMembers(source.world,'scenario-karl','event');
 const moved=moveScenarioEvent(source,'scenario-anilla',original[1],-1);
 assert.deepEqual(eventIds(restore(moved)),[original[1],original[0],...original.slice(2)]);
 assert.deepEqual(scenarioMembers(moved.world,'scenario-karl','event'),other);
 assert.equal(moved.world.records.find(r=>r.id===original[0]).fields.date,'Un an avant l’affaire Anilla');
 const removed=restore(detachScenarioRecord(moved,'scenario-anilla',original[0]));
 assert.ok(!eventIds(removed).includes(original[0]));
 assert.ok(removed.world.records.some(r=>r.id===original[0]));
 const added=restore(attachScenarioRecord(removed,'scenario-anilla',original[0]));
 assert.equal(eventIds(added).at(-1),original[0]);
});

test('Les liens secrets, y compris entre fiches publiques, restent masqués et les flèches respectent ce filtre',()=>{
 let state=fresh();state=upsertWorldRecord(state,makeWorldRecord('event','event-secret','Événement confidentiel',{isSecret:true}));
 state=attachScenarioRecord(state,'scenario-anilla','event-secret');
 assert.ok(!scenarioMembers(state.world,'scenario-anilla','event').some(r=>r.id==='event-secret'));
 assert.equal(state.world.relations.find(r=>r.to==='event-secret').visibility,'secret');
 const ids=eventIds(state);const last=ids.at(-2);
 assert.deepEqual(moveScenarioEvent(state,'scenario-anilla',last,1),state,'Un événement secret ne doit pas devenir un voisin visible');
 state=moveScenarioEvent(state,'scenario-anilla','event-secret',-1,{includeSecrets:true});
 assert.equal(eventIds(state).at(-2),'event-secret');
 state.world.relations.find(r=>r.from==='scenario-anilla'&&r.to===ids[0]).visibility='secret';
 assert.ok(!scenarioMembers(state.world,'scenario-anilla','event').some(r=>r.id===ids[0]));
});

test('Les scénarios préexistants avec un autre ID restent reconnus après renommage et suppression',()=>{
 let state=fresh();state.world.records=state.world.records.filter(r=>r.kind!=='scenario');state.world.relations=[];
 const custom=makeWorldRecord('scenario','scenario-existant','L’affaire Anilla');
 state=upsertWorldRecord(state,custom);state=mergeWorld(state);
 state=upsertWorldRecord(state,{...state.world.records.find(r=>r.id===custom.id),name:'Mon enquête renommée'});
 state=restore(state);assert.ok(!state.world.records.some(r=>r.id==='scenario-anilla'));
 const deleted=restore(deleteScenario(state,custom.id));
 assert.ok(!deleted.world.records.some(r=>[custom.id,'scenario-anilla'].includes(r.id)));
 const duplicate=upsertWorldRecord(fresh(),makeWorldRecord('scenario','scenario-copie','L’affaire Anilla'));
 assert.ok(deleteScenario(duplicate,'scenario-copie').world.records.some(r=>r.id==='scenario-anilla'));
});

test('Les ordres et suppressions incohérents sont refusés à l’import, sans toucher aux données source',()=>{
 const state=fresh();assert.throws(()=>attachScenarioRecord(state,'scenario-anilla','zone-centre'));
 assert.throws(()=>deleteScenario(state,'char-david'));
 assert.throws(()=>moveScenarioEvent(state,'scenario-anilla','event-refuge-kassy',1));
 for(const invalid of [{deletedRecordIds:['scenario-anilla']},{deletedRelationIds:[state.world.relations[0].id]},{deletedRecordIds:['INVALID ID']},{deletedRecordIds:['gone','gone']}])assert.throws(()=>validateCampaign({...state,world:{...state.world,...invalid}}));
 for(const timelineOrder of [['event-inconnu'],['char-david'],['event-refuge-kassy'],['event-mort-anilla','event-mort-anilla']])assert.throws(()=>validateCampaign({...state,world:{...state.world,records:state.world.records.map(r=>r.id==='scenario-anilla'?{...r,timelineOrder}:r)}}));
});
