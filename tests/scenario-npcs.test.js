import test from 'node:test';import assert from 'node:assert/strict';
import {mergeWorld,worldSearch} from '../world.js';import {validateCampaign} from '../campaign.js';
import {generateNpcBatch,attachNpcBatch} from '../npc-generator.js';
import {createScenario,addChapter,scenarioChapters,chapterCharacters,detachChapterCharacter,attachChapterCharacter,removeChapter} from '../scenario-chapters.js';
import {scenarioNpc,scenarioNpcs,scenarioNpcEditorState,saveScenarioNpcEdits} from '../scenario-npcs.js';
import {updateCharacterInline,changeCharacterRows} from '../inline-model.js';import {deleteScenario} from '../scenarios.js';
const fresh=()=>validateCampaign(mergeWorld({entries:[],tokens:[]}));
function setup(){const created=createScenario(fresh(),'Les PNJ de Dijon'),chapter=addChapter(created.state,created.id);return {state:chapter.state,id:created.id,chapterId:chapter.id};}
const restore=s=>mergeWorld(validateCampaign(JSON.parse(JSON.stringify(s))));
function legacy(){const s=setup(),batch=generateNpcBatch(s.state,{typeId:'rigger-gang',count:5,isSecret:true},()=>.1);const state={...s.state,entries:[...s.state.entries,...batch.map(n=>n.entry)],world:{...s.state.world,records:[...s.state.world.records.map(r=>r.id===s.id?{...r,chapters:r.chapters.map(c=>({...c,characterIds:batch.map(n=>n.record.id),secretCharacterIds:batch.map(n=>n.record.id),vehicles:[]}))}:r),...batch.map(n=>n.record)]}};return {...s,state,batch};}
test('Cinq PNJ générés sont immédiatement accessibles dans leur chapitre sans ajouter de personnage global, même réservés au MJ',()=>{
 const s=setup(),before=structuredClone(s.state),batch=generateNpcBatch(s.state,{typeId:'ganger',count:5,isSecret:true},()=>.1),next=attachNpcBatch(s.state,s.id,s.chapterId,batch);
 assert.deepEqual(s.state,before);assert.deepEqual(next.entries,before.entries);assert.equal(next.world.records.length,before.world.records.length);assert.equal(worldSearch(next.world,'',{kind:'character'}).length,16);
 const chapter=scenarioChapters(next,s.id)[0];assert.equal(chapterCharacters(next,chapter,{scenarioId:s.id}).length,5);assert.equal(scenarioNpcs(next,s.id).length,5);assert.equal(worldSearch(next.world,batch[0].record.name,{kind:'character',includeSecrets:true}).length,0);
 const other=createScenario(next,'Autre scénario'),second=addChapter(other.state,other.id);assert.throws(()=>attachChapterCharacter(second.state,other.id,second.id,batch[0].record.id));assert.equal(scenarioNpcs(second.state,other.id).length,0);
});
test('Une ancienne campagne avec 21 personnages dont 5 générés retrouve 16 personnages importants et ses 5 fiches dans le scénario sans changer leurs données',()=>{
 const old=legacy(),before=structuredClone(old.state);assert.equal(old.state.world.records.filter(r=>r.kind==='character').length,21);assert.equal(worldSearch(old.state.world,'',{kind:'character'}).length,16);
 const migrated=mergeWorld(old.state);assert.deepEqual(old.state,before);assert.equal(migrated.world.records.filter(r=>r.kind==='character').length,16);assert.equal(migrated.entries.length,0);
 assert.equal(scenarioNpcs(migrated,old.id).length,5);for(const pair of old.batch)assert.deepEqual(scenarioNpc(migrated,old.id,pair.record.id).entry,pair.entry);
 assert.equal(chapterCharacters(migrated,scenarioChapters(migrated,old.id)[0],{scenarioId:old.id}).length,5);assert.deepEqual(restore(migrated),migrated);
});
test('Les fiches locales restent modifiables et gardent leurs données après ajout de ligne, retrait du chapitre, rechargement et export/import',()=>{
 const s=setup(),batch=generateNpcBatch(s.state,{typeId:'commando',count:1}),npc=batch[0];let state=attachNpcBatch(s.state,s.id,s.chapterId,batch),projected=scenarioNpcEditorState(state,s.id,npc.record.id);
 let edited=updateCharacterInline(projected,{entryId:npc.entry.id,worldId:npc.record.id},'profile.force',7).state;state=saveScenarioNpcEdits(state,s.id,npc.record.id,edited);
 projected=scenarioNpcEditorState(state,s.id,npc.record.id);edited=changeCharacterRows(projected,{entryId:npc.entry.id,worldId:npc.record.id},{kind:'skills',itemId:'skill-1'}).state;state=saveScenarioNpcEdits(state,s.id,npc.record.id,edited);
 assert.equal(state.entries.length,0);assert.equal(scenarioNpc(state,s.id,npc.record.id).entry.profile.force,7);assert.equal(scenarioNpc(state,s.id,npc.record.id).entry.profile.skillRows.at(-1).catalogId,'skill-1');
 state=detachChapterCharacter(state,s.id,s.chapterId,npc.record.id);assert.equal(scenarioNpcs(state,s.id).length,1);state=removeChapter(state,s.id,s.chapterId);assert.equal(scenarioNpcs(restore(state),s.id).length,1);assert.equal(scenarioNpc(restore(state),s.id,npc.record.id).entry.profile.force,7);
 const deleted=deleteScenario(state,s.id);assert.equal(deleted.entries.length,0);assert.ok(!deleted.world.records.some(r=>r.id===s.id||r.id===npc.record.id));
});
test('Les imports refusent les références vers le PNJ d’un autre scénario, les profils incorrects et les identifiants locaux dupliqués',()=>{
 const s=setup(),batch=generateNpcBatch(s.state,{typeId:'ganger',count:1}),valid=attachNpcBatch(s.state,s.id,s.chapterId,batch);
 const duplicate=structuredClone(valid);duplicate.world.records.find(r=>r.id===s.id).localNpcs.push(batch[0]);assert.throws(()=>validateCampaign(duplicate));
 const broken=structuredClone(valid);broken.world.records.find(r=>r.id===s.id).localNpcs[0].entry.profile.force=-1;assert.throws(()=>validateCampaign(broken));
 const other=createScenario(valid,'Deux'),c=addChapter(other.state,other.id),invalid=structuredClone(c.state);invalid.world.records.find(r=>r.id===other.id).chapters[0].characterIds=[batch[0].record.id];assert.throws(()=>validateCampaign(invalid));
});
test('La migration préserve les personnages déjà utilisés ailleurs et isole les copies d’un ancien PNJ partagé entre scénarios',()=>{
 const old=legacy(),a=old.batch[0],second=createScenario(old.state,'Deuxième scénario'),chapter=addChapter(second.state,second.id);let state=attachChapterCharacter(chapter.state,second.id,chapter.id,a.record.id);
 const converted=restore(state),one=scenarioNpcs(converted,old.id).find(n=>n.entry.name===a.entry.name),two=scenarioNpcs(converted,second.id)[0];assert.notEqual(one.record.id,two.record.id);assert.notEqual(one.entry.id,two.entry.id);assert.deepEqual(two.entry.profile,one.entry.profile);
 state={...old.state,tokens:[{id:a.entry.id,x:25,y:40}]};const preserved=restore(state);assert.ok(preserved.entries.some(e=>e.id===a.entry.id));assert.ok(preserved.world.records.some(r=>r.id===a.record.id));assert.equal(scenarioNpcs(preserved,old.id).length,4);assert.deepEqual(preserved.tokens,state.tokens);
});
