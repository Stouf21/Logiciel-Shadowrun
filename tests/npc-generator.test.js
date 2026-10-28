import {scenarioNpc,scenarioNpcs,scenarioNpcEditorState,saveScenarioNpcEdits} from '../scenario-npcs.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {npcTemplates} from '../npc-templates.js';
import {npcTypes,buildNpcProfile,generateNpcBatch,attachNpcBatch} from '../npc-generator.js';
import {npcMetatypes,defaultNpcPreferences,metatypeDistribution,drawMetatype,validateNpcPreferences} from '../npc-preferences.js';
import {validateProfile,skillReserve} from '../sheet.js';
import {validateCampaign} from '../campaign.js';
import {mergeWorld} from '../world.js';
import {createScenario,addChapter,scenarioChapters} from '../scenario-chapters.js';
import {updateCharacterInline} from '../inline-model.js';
const fresh=()=>validateCampaign(mergeWorld({entries:[],tokens:[]}));
function random(seed){return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
test('Les 25 profils des pages 244–255 proposent 26 types ; chaque variante des cinq métatypes produit une fiche valide',()=>{
 assert.equal(npcTemplates.length,25);assert.equal(npcTypes.length,26);assert.deepEqual([...new Set(npcTemplates.map(t=>t.page))],Array.from({length:12},(_,i)=>244+i));
 for(const t of npcTypes)for(const m of npcMetatypes)for(let seed=1;seed<=12;seed++){
  const p=buildNpcProfile(t.id,m,{rng:random(seed)});assert.doesNotThrow(()=>validateProfile(p));assert.ok(p.skillRows.length>=4);assert.ok(p.skillRows.every(s=>Number.isInteger(s.mean)&&Number.isFinite(skillReserve(s,p))));assert.ok(p.assetRows.every(a=>a.target==='character'&&!/véhicule|drone/i.test(a.category)));assert.equal(p.essence,undefined);assert.equal(p.nuyens,undefined);
 }
});
test('Les variantes d’attributs, les indices imprimés et les spécialisations sans bonus respectent le livre',()=>{
 const human=buildNpcProfile('ganger','Humain',{rng:()=>.01}),troll=buildNpcProfile('ganger','Troll',{rng:()=>.01}),dwarf=buildNpcProfile('ganger','Nain',{rng:()=>.01}),elf=buildNpcProfile('ganger','Elfe',{rng:()=>.01});
 assert.equal(human.force,3);assert.equal(troll.force,5);assert.equal(dwarf.volonte,3);assert.equal(elf.charisme,3);
 const blade=human.skillRows.find(s=>s.specialization==='Lames');assert.equal(blade.rating,6);assert.equal(skillReserve(blade,human),8);assert.equal(blade.mean,4);
 const defense=human.skillRows.find(s=>s.specialization==='Défense à distance');assert.equal(defense.specialized,false);assert.equal(skillReserve(defense,human),5);
 const ork=buildNpcProfile('ganger-eveille','Ork',{rng:()=>.01});assert.equal(ork.skillRows.find(s=>s.name==='Athlétisme'&&!s.specialization).mean,3);
 const commando=buildNpcProfile('commando','Humain'),fusils=commando.skillRows.find(s=>s.specialization==='Fusils');assert.equal(fusils.rating,9);assert.equal(fusils.rr,3);assert.equal(skillReserve(fusils,commando),13);assert.doesNotThrow(()=>validateProfile(commando));assert.throws(()=>validateProfile({skillRows:[fusils]}));
});
test('Les atouts optionnels mettent à jour leurs branches de compétence, armes et protections sans double bonus',()=>{
 const arm=buildNpcProfile('ganger','Ork',{rng:()=>.45}),muscle=buildNpcProfile('ganger','Ork',{rng:()=>.01}),dermal=buildNpcProfile('ganger','Ork',{rng:()=>.99});
 assert.equal(arm.assetRows[0].name,'Bras cybernétique');assert.equal(arm.skillRows.find(s=>s.name==='Combat rapproché'&&!s.specialization).rr,1);assert.equal(arm.skillRows.find(s=>s.specialization==='Lames').mean,5);
 assert.equal(muscle.weaponRows.find(s=>s.name==='Mains nues').type,'VD 5');assert.deepEqual(dermal.woundRows[1],{label:'Armure principale',light:'6',serious:'9',incap:'12',rr:'0',status:''});
 const cyber=buildNpcProfile('decker-securite','Humain',{rng:()=>.99});assert.ok(cyber.assetRows.some(a=>a.name==='Cyberjack'));assert.ok(!cyber.assetRows.some(a=>a.name==='Datajack'));assert.equal(cyber.deck.attack,'4');
 const optional=buildNpcProfile('employe','Elfe',{rng:()=>.3});assert.equal(optional.skillRows.filter(s=>s.name==='Influence'&&!s.specialization).length,1);assert.ok(optional.skillRows.find(s=>s.specialization==='Négociation'));
 const cadre=buildNpcProfile('cadre','Humain',{rng:()=>.3});assert.ok(cadre.skillRows.some(s=>s.name==='Influence'&&s.specialization==='Bluff'));assert.ok(cadre.skillRows.some(s=>s.name==='Influence'&&s.specialization==='Négociation'));assert.ok(cadre.assetRows.some(a=>a.name==='Base de données commerciale'));assert.match(muscle.weaponRows[0].notes,/OK/);
});
test('Les riggers sélectionnent leurs véritables flottes et les premiers rôles convertissent l’initiative en Anarchy',()=>{
 const gang=buildNpcProfile('rigger-gang','Humain',{rng:()=>.01});assert.equal(gang.vehicleRows.length,2);assert.deepEqual(gang.vehicleRows[0],{name:'GM-Nissan Doberman',type:'Drone',auto:'6',structure:'2',handling:'7',speed:'3',armor:'2',light:'4',serious:'6',incap:'8',notes:gang.vehicleRows[0].notes,source:'Shadowrun: Anarchy V2, p. 246'});
 const go=buildNpcProfile('go-ganger','Humain',{rng:()=>.01});assert.equal(go.vehicleRows.length,1);assert.ok(!go.weaponRows.some(w=>w.name==='Mitraillette'));
 const elite=buildNpcProfile('rigger-elite','Humain',{rng:()=>.01});assert.equal(elite.vehicleRows.length,5);
 const first=buildNpcProfile('commando','Humain',{rank:'premier'});assert.equal(first.anarchy,6);assert.equal(buildNpcProfile('commando','Ork',{rank:'premier'}).anarchy,5);assert.equal(buildNpcProfile('commando','Humain').anarchy,'');
});
test('Les tirages combinent population locale et profession, restent configurables et ne prétendent pas être des statistiques officielles',()=>{
 const p=structuredClone(defaultNpcPreferences);assert.match(p.provenance,/Estimation/);p.populations.Dijon=[0,0,0,100,0];assert.equal(drawMetatype(p,'Dijon','corporation',()=>.99),'Ork');
 p.populations.Dijon=[50,50,0,0,0];p.occupations.magie=[1,3,1,1,1];const d=metatypeDistribution(p,'Dijon','magie');assert.equal(d[0].weight,.25);assert.equal(d[1].weight,.75);assert.equal(drawMetatype(p,'Dijon','magie',()=>.24),'Humain');assert.equal(drawMetatype(p,'Dijon','magie',()=>.26),'Elfe');
 const broken=structuredClone(p);broken.populations.France=[10,0,0,0,0];assert.throws(()=>validateNpcPreferences(broken));assert.throws(()=>validateCampaign({...fresh(),npcPreferences:broken}));
 const rng=random(42),counts={};for(let i=0;i<10000;i++){const name=drawMetatype(p,'Dijon','magie',rng);counts[name]=(counts[name]??0)+1;}assert.ok(Math.abs(counts.Humain/10000-.25)<.025);
});
test('Un groupe est ajouté en une sauvegarde avec noms uniques, fiches liées et véhicules ; export/import et modifications conservent les profils',()=>{
 let {state,id}=createScenario(fresh(),'Run');const added=addChapter(state,id);state=added.state;const before=structuredClone(state),batch=generateNpcBatch(state,{typeId:'rigger-gang',count:3,isSecret:true},()=>.01);assert.deepEqual(state,before);assert.equal(new Set(batch.map(b=>b.record.name)).size,3);
 state=attachNpcBatch(state,id,added.id,batch);const chapter=scenarioChapters(state,id)[0];assert.equal(chapter.characterIds.length,3);assert.equal(chapter.vehicles.length,6);assert.ok(batch.every(b=>b.record.isSecret));assert.throws(()=>attachNpcBatch(state,id,added.id,batch));
 const first=batch[0],edited=updateCharacterInline(scenarioNpcEditorState(state,id,first.record.id),{entryId:first.entry.id,worldId:first.record.id},'profile.force',6).state;state=saveScenarioNpcEdits(state,id,first.record.id,edited);assert.equal(scenarioNpc(state,id,first.record.id).entry.profile.npc.templateId,'rigger-gang');assert.equal(state.entries.length,before.entries.length);assert.equal(state.world.records.filter(r=>r.kind==='character').length,before.world.records.filter(r=>r.kind==='character').length);assert.equal(scenarioNpcs(state,id).length,3);
 const restored=mergeWorld(validateCampaign(JSON.parse(JSON.stringify(state))));assert.deepEqual(restored.entries,state.entries);assert.deepEqual(scenarioChapters(restored,id),scenarioChapters(state,id));assert.throws(()=>generateNpcBatch(state,{typeId:'ganger',count:0}));assert.throws(()=>attachNpcBatch(before,id,'absent',batch));assert.deepEqual(before,added.state);
});
