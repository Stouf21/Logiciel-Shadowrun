import test from 'node:test';
import assert from 'node:assert/strict';
import {mergeWorld,worldSearch,upsertWorldRecord} from '../world.js';
import {makeWorldRecord} from '../world-schema.js';
import {validateCampaign} from '../campaign.js';
import {createScenario,scenarioChapters,addChapter,editChapter,placeChapter,attachChapterCharacter,detachChapterCharacter,addChapterVehicle,editChapterVehicle,removeChapter} from '../scenario-chapters.js';
import {scenarioMembers,deleteScenario} from '../scenarios.js';
const fresh=()=>validateCampaign(mergeWorld({entries:[],tokens:[]}));
const restore=state=>mergeWorld(validateCampaign(JSON.parse(JSON.stringify(state))));
test('Créer avec un titre produit une frise vide ; insérer et glisser des chapitres conserve leurs contenus',()=>{
 const initial=fresh(),before=structuredClone(initial),created=createScenario(initial,'  La nuit des Ducs  ');let state=created.state;
 assert.deepEqual(initial,before);assert.equal(state.world.records.find(r=>r.id===created.id).name,'La nuit des Ducs');assert.deepEqual(scenarioChapters(state,created.id),[]);
 const a=addChapter(state,created.id);state=a.state;const b=addChapter(state,created.id,a.id,'Le rendez-vous');state=b.state;const c=addChapter(state,created.id,a.id,'Les quais');state=c.state;
 state=editChapter(state,created.id,c.id,'notes','Une trace dans le canal.');state=placeChapter(state,created.id,c.id,a.id,'before');
 assert.deepEqual(scenarioChapters(state,created.id).map(c=>c.id),[c.id,a.id,b.id]);assert.equal(scenarioChapters(restore(state),created.id)[0].notes,'Une trace dans le canal.');
 assert.throws(()=>createScenario(state,' '));assert.throws(()=>addChapter(state,created.id,'absent'));
});
test('Les anciens événements deviennent des chapitres à la lecture ; leur ordre, leurs dossiers et leurs relations restent conservés',()=>{
 const state=fresh(),before=structuredClone(state),events=scenarioMembers(state.world,'scenario-anilla','event',{includeSecrets:true}),chapters=scenarioChapters(state,'scenario-anilla',{includeSecrets:true});
 assert.deepEqual(chapters.map(c=>c.legacyEventId),events.map(e=>e.id));assert.deepEqual(state,before);
 const added=addChapter(state,'scenario-anilla',chapters[0]?.id??null),restored=restore(added.state);
 assert.equal(scenarioChapters(restored,'scenario-anilla',{includeSecrets:true}).length,events.length+1);assert.deepEqual(restored.world.relations,state.world.relations);
 for(const e of events)assert.deepEqual(restored.world.records.find(r=>r.id===e.id),e);
});
test('Les ajouts et retraits de personnages et véhicules concernent leur chapitre ; les fiches et les autres chapitres sont préservés',()=>{
 let {state,id}=createScenario(fresh(),'Run');const a=addChapter(state,id);state=a.state;const b=addChapter(state,id,a.id);state=b.state;
 const person=state.world.records.find(r=>r.kind==='character'&&!r.isSecret);state=attachChapterCharacter(state,id,a.id,person.id);state=attachChapterCharacter(state,id,a.id,person.id);assert.equal(scenarioChapters(state,id)[0].characterIds.length,1);
 assert.ok(worldSearch(state.world,'',{kind:'character',filters:{scenario:id}}).some(h=>h.record.id===person.id));
 state=addChapterVehicle(state,id,a.id,{name:'Fourgon',auto:'6',structure:'8',armor:'4'});const v=scenarioChapters(state,id)[0].vehicles[0];state=editChapterVehicle(state,id,a.id,v.id,'notes','Porte latérale bloquée.');
 state=detachChapterCharacter(state,id,a.id,person.id);assert.ok(state.world.records.some(r=>r.id===person.id));assert.equal(scenarioChapters(state,id)[1].vehicles.length,0);
 const kept=restore(state);assert.equal(scenarioChapters(kept,id)[0].vehicles[0].notes,'Porte latérale bloquée.');
 state=removeChapter(kept,id,a.id);assert.ok(state.world.records.some(r=>r.id===person.id));state=deleteScenario(state,id);assert.ok(state.world.records.some(r=>r.id===person.id));
});
test('Les chapitres et véhicules MJ restent hors du texte public et les nœuds secrets gardent leur place pendant le glisser',()=>{
 let {state,id}=createScenario(fresh(),'Run');const a=addChapter(state,id,null,'Ouverture');state=a.state;const s=addChapter(state,id,a.id,'Révélation Nocturne');state=editChapter(s.state,id,s.id,'isSecret',true);const b=addChapter(state,id,s.id,'Sortie');state=b.state;
 state=addChapterVehicle(state,id,a.id,{name:'Spectre Invisible',notes:'Moteur classifié',isSecret:true});
 assert.deepEqual(scenarioChapters(state,id).map(c=>c.id),[a.id,b.id]);assert.equal(worldSearch(state.world,'Nocturne')[0].protected,true);assert.equal(worldSearch(state.world,'Spectre Invisible')[0].protected,true);
 state=placeChapter(state,id,b.id,a.id,'before');assert.deepEqual(scenarioChapters(state,id,{includeSecrets:true}).map(c=>c.id),[b.id,s.id,a.id]);
 assert.throws(()=>placeChapter(state,id,s.id,a.id));const invalid=structuredClone(state);invalid.world.records.find(r=>r.id===id).chapters[0].characterIds=['inexistant'];assert.throws(()=>validateCampaign(invalid));
});
