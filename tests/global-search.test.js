import test from 'node:test';import assert from 'node:assert/strict';
import {mergeWorld} from '../world.js';import {globalSearch,resourceTabs} from '../global-search.js';import {validateCampaign} from '../campaign.js';
const entry=(id,category,name,description='',notes='')=>({id,category,name,description,notes});
const fresh=()=>validateCampaign(mergeWorld({entries:[entry('spell-test','Sort','Flamme personnelle','Sort de feu'),entry('drone-test','Drone','Drone de test'),entry('spirit-test','Esprit','Esprit des brumes'),entry('drug-test','Drogue','Dose personnelle'),entry('weapon-test','Arme','Arme personnelle','Long fusil','SecretArmeTest')],tokens:[],customSkills:[{id:'custom-skill-test',name:'Pilotage spécial',category:'Personnalisé',attribute:'logique',description:'',source:'Table',specializations:['Aéroglisseur']}],customAssets:[{id:'custom-asset-test',name:'Atout personnel',category:'Cyberware',description:'Interface de test',source:'Table',essence:1,level:2}]}));
test('Les onglets regroupent les références du livre et les créations personnelles selon leur catégorie',()=>{
 const state=fresh();for(const [tab,id] of [['spells','spell-test'],['drones','drone-test'],['spirits','spirit-test'],['drugs','drug-test'],['weapons','weapon-test']])assert.ok(globalSearch(state,'',{tab}).rows.some(r=>r.item.id===id));
 for(const tab of ['skills','assets','weapons','vehicles','drones','spirits','drugs','armor','equipment','cyberware','bioware','programs','decks','focus','adept','contacts','traits','world','rules','sources'])assert.ok(globalSearch(state,'',{tab}).rows.length,tab);
 assert.ok(globalSearch(state,'',{tab:'assets'}).rows.some(r=>r.item.id==='custom-asset-test'));assert.ok(globalSearch(state,'',{tab:'cyberware'}).rows.some(r=>r.item.id==='custom-asset-test'));
 assert.equal(globalSearch(state,'',{tab:'skills'}).rows.length,15);assert.equal(globalSearch(state,'',{tab:'assets'}).rows.length,206);
});
test('Le classement utilise la famille et les modèles explicites sans confondre les effets d’un atout avec un véhicule',()=>{
 assert.deepEqual(resourceTabs({category:'Cyberware',name:'Interface',description:'Drone et véhicule'}),['cyberware']);assert.deepEqual(resourceTabs({category:'Drone',name:'Drone'}),['drones']);assert.deepEqual(resourceTabs({category:'Modèle à personnaliser',name:'Véhicule à personnaliser'}),['vehicles']);assert.deepEqual(resourceTabs({category:'Programme de cyberdeck',name:'Programme'}),['programs']);
});
test('La recherche ignore accents et casse, trouve les spécialisations et conserve la requête dans tous les onglets',()=>{
 const state=fresh(),before=structuredClone(state);const result=globalSearch(state,'aeroglisseur',{tab:'skills'});assert.ok(result.rows.some(r=>r.item.id==='custom-skill-test'));assert.ok(globalSearch(state,'CYBERWARE',{tab:'cyberware'}).rows.length);assert.equal(globalSearch(state,'Flamme personnelle',{tab:'weapons'}).rows.length,0);assert.equal(globalSearch(state,'Flamme personnelle',{tab:'spells'}).rows.length,1);assert.deepEqual(state,before);
});
test('Les correspondances MJ restent protégées et les fiches de jeu liées ne sont pas dupliquées',()=>{
 const state=fresh(),secret=globalSearch(state,'SecretArmeTest',{tab:'weapons'}).rows;assert.equal(secret.length,1);assert.equal(secret[0].protected,true);assert.equal(globalSearch(state,'SecretArmeTest',{tab:'weapons',includeSecrets:true}).rows[0].protected,false);
 const withCharacter=mergeWorld({...state,entries:[...state.entries,entry('lim-old','PJ','Lim','Runner personnel','SecretLimTest')]});assert.equal(globalSearch(withCharacter,'Lim',{tab:'world'}).rows.filter(r=>r.item.id==='char-lim'||r.item.id==='lim-old').length,1);
 assert.ok(globalSearch(state,'',{tab:'world'}).rows.every(r=>!r.item.isSecret));assert.ok(globalSearch(state,'biopuce').rows.some(r=>r.protected));
});
