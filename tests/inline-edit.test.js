import {buildNpcProfile} from '../npc-generator.js';
import {skillReserve,skillReserves} from '../sheet.js';
import test from 'node:test';import assert from 'node:assert/strict';
import {mergeWorld} from '../world.js';import {unclassifiedCharacter,metatypeOptions} from '../character-options.js';import {validateCampaign} from '../campaign.js';
import {updateCharacterInline,changeCharacterRows,updateWorldInline,characterInlineSpec} from '../inline-model.js';
import {updateBuildingInline} from '../building-inline.js';import {saveBuildingPlan} from '../buildings.js';
const fresh=()=>validateCampaign(mergeWorld({entries:[{id:'lim-old',name:'Lim',category:'PJ',description:'Histoire',notes:'Ancien secret',profile:{force:3,charisme:3,skills:'Ancienne compétence libre',assets:'Anciennes notes',skillRows:[{catalogId:'skill-11',name:'Influence',rating:4,attribute:'charisme',rr:1,specialization:'Négociation',specialized:true}],assetRows:[{catalogId:'asset-16',name:'Mon Predator',category:'Arme',notes:'Modification personnelle',source:'Livre',level:4,essence:0}]}}],tokens:[{id:'lim-old',x:12,y:15}],customSkills:[],customAssets:[]}));
const target={entryId:'lim-old',worldId:'char-lim'};const character=s=>s.entries.find(e=>e.id==='lim-old');

test('Une cellule de personnage se modifie sans écraser les anciennes notes, sélections ou pions',()=>{
 const source=fresh(),before=structuredClone(source),r=updateCharacterInline(source,target,'profile.force',5);assert.equal(character(r.state).profile.force,5);assert.deepEqual(source,before);
 for(const key of ['skills','assets','skillRows','assetRows'])assert.deepEqual(character(r.state).profile[key],character(source).profile[key]);assert.deepEqual(r.state.tokens,source.tokens);
 assert.deepEqual(validateCampaign(JSON.parse(JSON.stringify(r.state))),r.state);
});
test('Les tables vides reçoivent uniquement la cellule saisie et les textes vides nécessaires au format',()=>{
 let state=updateCharacterInline(fresh(),target,'profile.deck.attack','4').state;assert.equal(character(state).profile.deck.attack,'4');assert.equal(character(state).profile.deck.firewall,'');
 state=updateCharacterInline(state,target,'profile.vehicleRows.1.name','Van de Lim').state;assert.equal(character(state).profile.vehicleRows[1].name,'Van de Lim');assert.equal(character(state).profile.vehicleRows[1].armor,'');
 state=updateCharacterInline(state,target,'profile.woundRows.0.serious','7').state;assert.equal(character(state).profile.woundRows[0].serious,'7');assert.equal(character(state).profile.woundRows[0].label,'Sans armure');assert.equal(character(state).profile.woundRows[1].light,'');
});
test('Les choix de compétences et spécialisations gardent la validation V2 et les autres lignes',()=>{
 const source=fresh();let state=updateCharacterInline(source,target,'profile.skillRows.0.rating',5).state;state=updateCharacterInline(state,target,'profile.skillRows.0.attribute','logique').state;
 assert.equal(character(state).profile.skillRows[0].rating,5);assert.equal(character(state).profile.skillRows[0].attribute,'logique');assert.equal(character(state).profile.skillRows[0].specialization,'Négociation');
 for(const [path,value] of [['profile.skillRows.0.rating',9],['profile.skillRows.0.rr',4],['profile.force',-1],['category','Objet'],['profile.__proto__.polluted',true],['profile.skillRows.300.name','X']])assert.throws(()=>updateCharacterInline(source,target,path,value));
 assert.equal(characterInlineSpec(source,target,'profile.skillRows.0.rating','Indice').max,8);
});
test('Une fiche sans statut se modifie et reste non classée, avec une seule liaison conservée après fusion et import',()=>{
 const source=fresh(),virtual={entryId:'char-boycow',worldId:'char-boycow'};
 const created=updateCharacterInline(source,virtual,'profile.force',4);assert.equal(created.state.entries.length,source.entries.length+1);const e=created.state.entries.find(e=>e.id===created.entryId);assert.equal(e.category,unclassifiedCharacter);assert.deepEqual(e.profile,{force:4});
 const restored=validateCampaign(mergeWorld(JSON.parse(JSON.stringify(created.state))));assert.equal(restored.world.records.find(r=>r.id===virtual.worldId).gameEntryId,created.entryId);
 const twice=updateCharacterInline(restored,virtual,'profile.anarchy',3);assert.equal(twice.entryId,created.entryId);assert.equal(twice.state.entries.length,created.state.entries.length);assert.equal(e.profile.anarchy,undefined);
 const chosen=updateCharacterInline(twice.state,virtual,'category','PNJ principal');assert.equal(chosen.state.entries.find(e=>e.id===created.entryId).category,'PNJ principal');assert.equal(chosen.entryId,created.entryId);
 assert.equal(characterInlineSpec(source,virtual,'profile.force','Force').categoryRequired,undefined);
});
test('Les métatypes sont sélectionnables sans effacer les variantes déjà enregistrées',()=>{
 const spec=characterInlineSpec(fresh(),target,'profile.metatype','Métatype');assert.equal(spec.type,'select');assert.deepEqual(spec.options.map(([value])=>value),['','Humain','Elfe','Nain','Ork','Troll']);
 assert.ok(metatypeOptions('Elfe nocturne').some(([value])=>value==='Elfe nocturne'));assert.equal(metatypeOptions('À définir')[0][0],'À définir');
 const updated=updateCharacterInline(fresh(),target,'profile.metatype','Nain');assert.equal(character(updated.state).profile.metatype,'Nain');assert.deepEqual(character(updated.state).profile.skillRows,character(fresh()).profile.skillRows);
});
test('Un atout ou une compétence peut être ajouté en premier à un personnage sans statut',()=>{
 const source=fresh(),virtual={worldId:'char-boycow'};const result=changeCharacterRows(source,virtual,{kind:'skills',itemId:'skill-1'});const e=result.state.entries.find(e=>e.id===result.entryId);assert.equal(e.category,unclassifiedCharacter);assert.equal(e.profile.skillRows.length,1);assert.equal(e.profile.force,undefined);assert.equal(mergeWorld(result.state).world.records.find(r=>r.id===virtual.worldId).gameEntryId,result.entryId);
});
test('Ajouter ou retirer une ligne conserve les atouts personnels et refuse les références de drones sur le personnage',()=>{
 const source=fresh();let state=changeCharacterRows(source,target,{kind:'assets',itemId:'asset-17'}).state;assert.match(character(state).profile.assetRows[1].notes,/VD 5/);assert.equal(character(state).profile.assetRows[0].notes,'Modification personnelle');
 assert.throws(()=>changeCharacterRows(state,target,{kind:'assets',itemId:'asset-205'}));assert.throws(()=>updateCharacterInline(state,target,'profile.assetRows.0.catalogId','asset-205'));
 state=changeCharacterRows(state,target,{kind:'assets',index:1,remove:true}).state;assert.deepEqual(character(state).profile.assetRows,character(source).profile.assetRows);
 state=changeCharacterRows(state,target,{kind:'skills',itemId:'skill-9'}).state;assert.equal(character(state).profile.skillRows[1].rating,0);assert.equal(character(state).profile.skillRows[1].name,'Piratage');
});
test('Les dossiers, bâtiments et plans se modifient par champ en conservant leurs liens et données privées',()=>{
 let state=fresh(),before=structuredClone(state);state=updateWorldInline(state,'zone-centre','fields.security','Surveillé');assert.equal(state.world.records.find(r=>r.id==='zone-centre').fields.security,'Surveillé');assert.deepEqual(state.world.relations,before.world.relations);
 state=updateWorldInline(state,'char-lim','aliases','Runner, Le Lim');assert.deepEqual(state.world.records.find(r=>r.id==='char-lim').aliases,['Runner','Le Lim']);assert.throws(()=>updateWorldInline(state,'zone-centre','fields.invente','x'));
 state=saveBuildingPlan(state,'place-arcologie-fontaine',{id:'plan-inline',name:'Hall',level:'RDC',description:'Public',gmNotes:'Privé',isSecret:false,imageData:''});state=updateBuildingInline(state,'place-arcologie-fontaine','building.floors','29');state=updateBuildingInline(state,'place-arcologie-fontaine','plans.plan-inline.name','Accueil');const b=state.world.records.find(r=>r.id==='place-arcologie-fontaine').building;
 assert.equal(b.floors,'29');assert.equal(b.plans[0].name,'Accueil');assert.equal(b.plans[0].gmNotes,'Privé');assert.throws(()=>updateBuildingInline(state,'place-arcologie-fontaine','building.plans',[]));assert.deepEqual(before.entries,fresh().entries);
});

test('Saisir ou retirer une spécialisation active son bonus sans choix supplémentaire et conserve les autres données',()=>{
 const source=fresh(),target={entryId:source.entries[0].id};let state=updateCharacterInline(source,target,'profile.skillRows.0.specialization','').state;assert.equal(character(state).profile.skillRows[0].specialized,false);
 state=updateCharacterInline(state,target,'profile.skillRows.0.specialization','Bluff').state;assert.equal(character(state).profile.skillRows[0].specialized,true);assert.equal(character(state).profile.skillRows[0].specialization,'Bluff');
 state=updateCharacterInline(state,target,'profile.skillRows.0.rating',0).state;assert.equal(character(state).profile.skillRows[0].specialized,false);state=updateCharacterInline(state,target,'profile.skillRows.0.rating',2).state;assert.equal(character(state).profile.skillRows[0].specialized,true);
 assert.deepEqual(character(state).profile.assetRows,character(source).profile.assetRows);assert.equal(character(source).profile.skillRows[0].specialization,'Négociation');
});

function importantNpc(){const state=fresh(),entry=state.entries.find(e=>e.id==='lim-old');entry.category='PNJ principal';entry.profile=buildNpcProfile('ganger','Humain');const index=entry.profile.skillRows.findIndex(r=>r.includesSpecialization);return {state,target:{entryId:entry.id},index};}
test('Supprimer une spécialisation PNJ conserve son indice de base et ses autres données sans conserver le +2 imprimé',()=>{
 const {state,target,index}=importantNpc(),before=structuredClone(state),original=character(state).profile.skillRows[index],base=skillReserves(original,character(state).profile).base;
 const removed=changeCharacterRows(state,target,{kind:'specializations',index,remove:true}).state,p=character(removed).profile,row=p.skillRows[index];assert.equal(row.specialization,'');assert.equal(row.specialized,false);assert.equal(row.includesSpecialization,false);assert.equal(row.rating,original.rating-2);assert.equal(skillReserve(row,p),base);assert.equal(row.mean,original.mean);assert.equal(row.source,original.source);assert.deepEqual(p.assetRows,character(state).profile.assetRows);assert.deepEqual(state,before);
 const added=updateCharacterInline(removed,target,'profile.skillRows.'+index+'.specialization','Nouvelle spécialisation').state;assert.equal(skillReserve(character(added).profile.skillRows[index],character(added).profile),base+2);assert.equal(character(added).profile.skillRows[index].rating,row.rating);
 assert.throws(()=>changeCharacterRows(state,target,{kind:'specializations',index:300,remove:true}));
});
test('L’indice affiché et modifié est l’indice de base même quand le bonus du PNJ était déjà compris dans le livre',()=>{
 const {state,target,index}=importantNpc(),row=character(state).profile.skillRows[index];assert.equal(characterInlineSpec(state,target,'profile.skillRows.'+index+'.rating','Indice').value,row.rating-2);
 const changed=updateCharacterInline(state,target,'profile.skillRows.'+index+'.rating',5).state,p=character(changed).profile,next=p.skillRows[index];assert.equal(next.rating,5);assert.equal(next.includesSpecialization,false);assert.equal(skillReserves(next,p).base,5+p[next.attribute]);assert.equal(skillReserve(next,p),7+p[next.attribute]);
 const renamed=updateCharacterInline(state,target,'profile.skillRows.'+index+'.specialization','Autre spécialisation').state;assert.equal(skillReserve(character(renamed).profile.skillRows[index],character(renamed).profile),skillReserve(row,character(state).profile));
});
test('Supprimer une compétence enlève sa spécialisation et réindexe les autres lignes sans toucher au catalogue ni aux autres fiches',()=>{
 const source=fresh(),withRow=changeCharacterRows(source,target,{kind:'skills',itemId:'skill-9'}).state,before=structuredClone(withRow),next=changeCharacterRows(withRow,target,{kind:'skills',index:0,remove:true}).state;
 assert.equal(character(next).profile.skillRows.length,1);assert.deepEqual(character(next).profile.skillRows[0],character(withRow).profile.skillRows[1]);assert.deepEqual(character(next).profile.assetRows,character(withRow).profile.assetRows);assert.deepEqual(next.world,withRow.world);assert.deepEqual(next.tokens,withRow.tokens);assert.deepEqual(withRow,before);
 assert.throws(()=>changeCharacterRows(next,target,{kind:'skills',index:5,remove:true}));assert.deepEqual(next.customSkills,source.customSkills);
});
