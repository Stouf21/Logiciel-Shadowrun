import test from 'node:test';import assert from 'node:assert/strict';
import {mergeWorld} from '../world.js';import {validateCampaign} from '../campaign.js';
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
 for(const [path,value] of [['profile.skillRows.0.rating',9],['profile.skillRows.0.rr',4],['profile.skillRows.0.specialization',''],['profile.force',-1],['category','Objet'],['profile.__proto__.polluted',true],['profile.skillRows.300.name','X']])assert.throws(()=>updateCharacterInline(source,target,path,value));
 assert.equal(characterInlineSpec(source,target,'profile.skillRows.0.rating','Indice').max,8);
});
test('La première modification d’une fiche sans profil exige PJ ou PNJ et lie une seule fiche sans inventer les attributs',()=>{
 const source=fresh(),virtual={entryId:'char-boycow',worldId:'char-boycow'};assert.throws(()=>updateCharacterInline(source,virtual,'profile.force',4));
 const created=updateCharacterInline(source,virtual,'profile.force',4,'PNJ principal');assert.equal(created.state.entries.length,source.entries.length+1);const e=created.state.entries.find(e=>e.id===created.entryId);assert.equal(e.category,'PNJ principal');assert.deepEqual(e.profile,{force:4});
 const twice=updateCharacterInline(created.state,virtual,'profile.anarchy',3);assert.equal(twice.entryId,created.entryId);assert.equal(twice.state.entries.length,created.state.entries.length);assert.equal(e.profile.anarchy,undefined);
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
