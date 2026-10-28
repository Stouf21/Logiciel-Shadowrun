import test from 'node:test';import assert from 'node:assert/strict';
import {makeWorldRecord} from '../world-schema.js';
import {mergeWorld} from '../world.js';import {createScenario,addChapter,attachChapterCharacter} from '../scenario-chapters.js';import {generateNpcBatch,attachNpcBatch} from '../npc-generator.js';
import {chapterTestParticipants,testSkillChoices,defaultTestSkill,resolveChapterTest,injuryFromThresholds,chapterTestVehicles} from '../chapter-tests.js';
function setup(typeId='rigger-gang'){const s=createScenario(mergeWorld({entries:[],tokens:[]}), 'Tests'),c=addChapter(s.state,s.id),batch=generateNpcBatch(c.state,{scenarioId:s.id,typeId,count:2,isSecret:true},()=>.1),state=attachNpcBatch(c.state,s.id,c.id,batch);return {state,id:s.id,cid:c.id,batch};}
const side=(id,extra={})=>({characterId:id,skillId:'manual',mode:'roll',count:6,risk:0,rr:0,condition:'normal',...extra});
const config=(s,type='simple',extra={})=>({type,a:side(s.batch[0].record.id),b:side(s.batch[1].record.id,{mode:'mean',mean:2}),target:3,intent:'both',tie:'pending',metric:'speed',...extra});
const resolve=(s,c,options={})=>resolveChapterTest(s.state,s.id,s.cid,c,options);
test('Les participants proviennent uniquement du chapitre ; profils secondaires, spécialisations et fiches absentes sont distingués',()=>{
 const s=setup(),people=chapterTestParticipants(s.state,s.id,s.cid);assert.equal(people.length,2);assert.ok(testSkillChoices(people[0]).some(s=>s.id==='manual'));assert.equal(defaultTestSkill(people[0],'ranged','b').specialization,'Défense à distance');
 const record=s.state.world.records.find(r=>r.kind==='character');s.state=attachChapterCharacter(s.state,s.id,s.cid,record.id);const unknown=chapterTestParticipants(s.state,s.id,s.cid).find(p=>p.id===record.id);assert.ok(testSkillChoices(unknown).every(s=>s.count===null));
 assert.throws(()=>resolve(s,config(s,'simple',{a:side('intrus')})));assert.equal(testSkillChoices({profile:{skillRows:[{name:'Athlétisme',specialization:'',specialized:false,rating:3,attribute:'agilite',rr:0}]}})[0].count,null);const other=addChapter(s.state,s.id,s.cid);assert.throws(()=>resolveChapterTest(other.state,s.id,other.id,config(s)));
});
test('Le seuil simple est atteint à égalité, les risques valent double, RR protège et une réserve nulle ne crée aucun dé',()=>{
 const s=setup(),before=structuredClone(s.state),c=config(s,'simple',{a:side(s.batch[0].record.id,{count:3,risk:1}),target:4});const r=resolve(s,c,{random:()=>.99});assert.equal(r.a.hits,4);assert.equal(r.status,'success');assert.equal(r.net,0);
 const empty=resolve(s,config(s,'simple',{a:side(s.batch[0].record.id,{count:0}),target:0}));assert.equal(empty.status,'success');assert.equal(empty.a.normalDice.length,0);
 const protectedRoll=resolve(s,config(s,'simple',{a:side(s.batch[0].record.id,{count:3,risk:3,rr:3})}),{random:()=>0});assert.equal(protectedRoll.a.complication,'Aucune complication');assert.deepEqual(s.state,before);
});
test('Les égalités générales restent à arbitrer, alors qu’un tir touche et une défense seule est touchée en mêlée',()=>{
 const s=setup(),a=side(s.batch[0].record.id,{mode:'mean',mean:3}),b=side(s.batch[1].record.id,{mode:'mean',mean:3});
 assert.equal(resolve(s,config(s,'opposed',{a,b})).status,'tie');assert.equal(resolve(s,config(s,'opposed',{a,b,tie:'initiator'})).winner,a.characterId);
 const ranged=resolve(s,config(s,'ranged',{a,b,damageA:{base:5,thresholds:{light:3,serious:6,incap:9}}}));assert.equal(ranged.winner,a.characterId);assert.equal(ranged.damage.value,5);assert.equal(ranged.damage.injury,'Légère');
 assert.equal(resolve(s,config(s,'melee',{a,b})).status,'tie');assert.equal(resolve(s,config(s,'melee',{a,b,intent:'defend'})).winner,a.characterId);
});
test('La riposte de mêlée utilise l’arme du vainqueur ; les seuils de blessure sont dépassés strictement',()=>{
 const s=setup(),r=resolve(s,config(s,'melee',{a:side(s.batch[0].record.id,{mode:'mean',mean:2}),b:side(s.batch[1].record.id,{mode:'mean',mean:5}),damageB:{base:4,thresholds:{light:4,serious:7,incap:10}}}));assert.equal(r.damage.attacker,s.batch[1].record.id);assert.equal(r.damage.value,7);assert.equal(r.damage.injury,'Légère');
 const limits={light:4,serious:7,incap:10};assert.equal(injuryFromThresholds(4,limits),'Aucune blessure');assert.equal(injuryFromThresholds(7,limits),'Légère');assert.equal(injuryFromThresholds(10,limits),'Grave');assert.equal(injuryFromThresholds(11,limits),'Incapacitante');assert.equal(injuryFromThresholds(9,{light:4}),null);assert.throws(()=>injuryFromThresholds(4,{light:7,serious:4,incap:10}));
});
test('La défense active donne un avantage et inverse correctement cet effet lorsque le défenseur emploie sa moyenne',()=>{
 const s=setup(),c=config(s,'melee',{intent:'active',a:side(s.batch[0].record.id,{condition:'advantage'}),b:side(s.batch[1].record.id,{mode:'mean',mean:2})});const r=resolve(s,c,{random:()=>.55});assert.equal(r.a.options.condition,'normal');assert.ok(r.notes.some(n=>n.includes('inversée')));
 const rolled=resolve(s,config(s,'melee',{intent:'active',b:side(s.batch[1].record.id)}),{random:()=>.55});assert.equal(rolled.b.options.condition,'advantage');
});
test('Une poursuite compare le terrain choisi, tandis que l’Autopilote remplace uniquement la réserve du pilote',()=>{
 const s=setup(),vehicles=chapterTestVehicles(s.state,s.id,s.cid);const rec=s.state.world.records.find(r=>r.id===s.id);rec.chapters[0].vehicles[0].speed='8';rec.chapters[0].vehicles[2].speed='4';
 const a=side(s.batch[0].record.id,{vehicleId:vehicles[0].id,control:'manual'}),b=side(s.batch[1].record.id,{mode:'mean',mean:2,vehicleId:vehicles[2].id,control:'manual'}),r=resolve(s,config(s,'pursuit',{a,b}),{random:()=>.55});assert.equal(r.a.options.condition,'advantage');
 const autopilot=resolve(s,config(s,'piloting',{a:{...a,control:'autonomous',count:99},target:2}),{random:()=>.99});assert.equal(autopilot.a.options.count,6);assert.match(autopilot.a.skill,/^Autopilote/);assert.equal(autopilot.status,'success');assert.throws(()=>resolve(s,config(s,'piloting',{a:{...a,vehicleId:'intrus',control:'autonomous'}})));
});
test('Un désastre provoque un échec par défaut ; une relance conserve sa complication et ne relance pas l’autre côté',()=>{
 const s=setup(),primary=s.state.world.records.find(r=>r.id===s.id).localNpcs[0].entry;primary.profile.npc.rank='premier';primary.profile.anarchy=4;primary.category='PNJ principal';const c=config(s,'opposed',{a:side(s.batch[0].record.id,{count:3,risk:3}),b:side(s.batch[1].record.id)});const first=resolve(s,c,{random:()=>0});assert.equal(first.status,'disaster');assert.equal(first.winner,s.batch[1].record.id);
 let draws=0;const again=resolve(s,c,{previous:first,reroll:'a',random:()=>{draws++;return .99;}});assert.equal(draws,3);assert.equal(again.a.hits,6);assert.equal(again.a.complication,'Désastre');assert.deepEqual(again.b,first.b);assert.equal(again.status,'disaster');assert.equal(again.a.rerolls,1);
 const means=resolve(s,config(s,'opposed'));assert.throws(()=>resolve(s,config(s,'opposed'),{previous:means,reroll:'b'}));assert.equal(first.b.canReroll,false);assert.throws(()=>resolve(s,c,{previous:first,reroll:'b'}));primary.profile.anarchy=0;assert.throws(()=>resolve(s,c,{previous:first,reroll:'a'}));
});
test('Les configurations invalides sont refusées avant résolution : risques excessifs, opposition à soi-même, véhicule privé ou chapitre absent',()=>{
 const s=setup();assert.throws(()=>resolve(s,config(s,'simple',{a:side(s.batch[0].record.id,{risk:7})})));assert.throws(()=>resolve(s,config(s,'opposed',{b:side(s.batch[0].record.id)})));assert.throws(()=>resolve(s,config(s,'inconnu')));assert.throws(()=>resolveChapterTest(s.state,s.id,'intrus',config(s)));
 let draws=0;assert.throws(()=>resolve(s,config(s,'ranged',{damageA:{base:5,thresholds:{light:8,serious:4,incap:10}}}),{random:()=>{draws++;return .99;}}));assert.equal(draws,0);assert.throws(()=>resolve(s,config(s,'opposed',{b:side(s.batch[1].record.id,{count:2,risk:3})}),{random:()=>{draws++;return .99;}}));assert.equal(draws,0);
});

test('Les personnages et véhicules MJ ne sont proposés que lorsque leur visibilité a été explicitement activée',()=>{
 const s=setup(),hidden=makeWorldRecord('character','test-prive','Personnage privé',{isSecret:true});s.state={...s.state,world:{...s.state.world,records:[...s.state.world.records,hidden]}};s.state=attachChapterCharacter(s.state,s.id,s.cid,hidden.id);
 assert.ok(!chapterTestParticipants(s.state,s.id,s.cid).some(p=>p.id===hidden.id));assert.ok(chapterTestParticipants(s.state,s.id,s.cid,{includeSecrets:true}).some(p=>p.id===hidden.id));
 const v=s.state.world.records.find(r=>r.id===s.id).chapters[0].vehicles[0];v.ownerId=hidden.id;v.isSecret=true;
 assert.ok(!chapterTestVehicles(s.state,s.id,s.cid).some(x=>x.id===v.id));assert.ok(chapterTestVehicles(s.state,s.id,s.cid,{includeSecrets:true}).some(x=>x.id===v.id));
 const cfg=config(s,'piloting',{a:side(hidden.id,{control:'autonomous',vehicleId:v.id})});assert.throws(()=>resolve(s,cfg));assert.equal(resolve(s,cfg,{includeSecrets:true,random:()=>.99}).a.options.count,6);
});
