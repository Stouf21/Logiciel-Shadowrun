import test from 'node:test';import assert from 'node:assert/strict';
import {baseAssets,assetReferenceText} from '../catalog.js';import {mergeWorld} from '../world.js';import {validateCampaign} from '../campaign.js';
import {characterAssetSummary,assetRiskRules,deductEssence} from '../character-rules.js';import {characterAssetLines,wrapAssetEffects,assetRowStep} from '../character-layout.js';
import {changeCharacterRows,updateCharacterInline,deleteCharacterElement,characterForInline} from '../inline-model.js';
const asset=(id,extra={})=>{const a=baseAssets.find(a=>a.id===id);return {name:a.name,catalogId:id,category:a.category,level:a.level,essence:a.essence,notes:assetReferenceText(a),source:a.source,...extra};};
const fresh=(profile={essence:6})=>mergeWorld({entries:[{id:'runner',name:'Runner',category:'PJ',description:'',notes:'Secrets conservés',profile}],tokens:[]}),target={entryId:'runner'},profile=s=>s.entries[0].profile;
test('La fiche affiche uniquement les domaines retenus et les effets du mentor, sans choix, prix, proches ni prérequis',()=>{
 const row=asset('asset-108'),before=structuredClone(row),rules=assetRiskRules(row);row.rrChoices=rules.rules.slice(0,2).map(r=>r.key);const text=characterAssetSummary(row);assert.match(text,/Perception \(physique\)/);assert.match(text,/Survie \(orientation\)/);assert.match(text,/Comportement Loyal/);assert.doesNotMatch(text,/Choisir|Sorcellerie|Prix|Mentors proches|Personnage Éveillé/);assert.equal(row.notes,before.notes);assert.doesNotMatch(characterAssetSummary(before),/RR 1|Choisir/);
});
test('Les effets fixes et personnels restent lisibles ; prix et conditions d’acquisition restent dans les notes complètes',()=>{
 const row=asset('asset-54'),notes=row.notes;assert.match(characterAssetSummary(row),/RR 2/);assert.doesNotMatch(characterAssetSummary(row),/Prix/);assert.equal(row.notes,notes);assert.equal(characterAssetSummary({...row,notes:'Mon effet choisi\nArmure +2.'}),'Mon effet choisi\nArmure +2.');assert.equal(characterAssetSummary({...row,effectsHidden:true}),'');
});
test('Le nom et les lignes d’effets suivent exactement la grille de 17,008 points du modèle original',()=>{
 const row=asset('asset-108'),rules=assetRiskRules(row);row.rrChoices=rules.rules.slice(0,2).map(r=>r.key);const layout=characterAssetLines({assetRows:[row,asset('asset-54')]},{measure:value=>value.length*3});assert.equal(layout.lines[0].y,39.1);assert.ok(Math.abs(layout.lines[0].y+16.299-55.399)<.001);assert.equal(layout.lines[0].height/assetRowStep,1+layout.lines[0].effectLines.length);assert.equal(layout.lines[1].y,layout.lines[0].y+layout.lines[0].height);assert.ok(wrapAssetEffects('Mot '.repeat(300),text=>text.length*3).every(line=>line.length*3<=313));
});
test('Ajouter les implants déduit une seule fois leur coût de l’Essence actuelle et conserve la perte après suppression',()=>{
 const source=fresh(),before=structuredClone(source);let s=changeCharacterRows(source,target,{kind:'assets',itemId:'asset-54'}).state;assert.equal(profile(s).essence,5);s=changeCharacterRows(s,target,{kind:'assets',itemId:'asset-76'}).state;assert.equal(profile(s).essence,4.5);const restored=validateCampaign(JSON.parse(JSON.stringify(s)));assert.equal(profile(restored).essence,4.5);s=deleteCharacterElement(s,target,'profile.assetRows.0.name').state;assert.equal(profile(s).essence,4.5);assert.deepEqual(source,before);assert.equal(s.entries[0].notes,'Secrets conservés');
});
test('Une hausse de coût déduit seulement le supplément ; baisse, relecture et édition des notes ne restituent ni ne redéduisent les coûts',()=>{
 let s=fresh({essence:3.5,assetRows:[asset('asset-54')]});s=updateCharacterInline(s,target,'profile.assetRows.0.notes','RR 1 aux tests de Perception.').state;assert.equal(profile(s).essence,3.5);s=updateCharacterInline(s,target,'profile.assetRows.0.essence',1.5).state;assert.equal(profile(s).essence,3);s=updateCharacterInline(s,target,'profile.assetRows.0.essence',1).state;assert.equal(profile(s).essence,3);s=updateCharacterInline(s,target,'profile.assetRows.0.essence',1.5).state;assert.equal(profile(s).essence,3);assert.throws(()=>updateCharacterInline(s,target,'profile.assetRows.0.essence',-1));assert.equal(profile(s).essence,3);assert.equal(deductEssence(1,2),0);
});
test('Le premier implant utilise l’Essence de référence 6 sans imposer un statut ni toucher aux anciens totaux importés',()=>{
 let s=fresh({});s=changeCharacterRows(s,target,{kind:'assets',itemId:'asset-54'}).state;assert.equal(profile(s).essence,5);const old=fresh({essence:4,assetRows:[asset('asset-54')]});assert.equal(profile(validateCampaign(JSON.parse(JSON.stringify(old)))).essence,4);
 const virtual={worldId:'char-boycow'},created=changeCharacterRows(fresh({}),virtual,{kind:'assets',itemId:'asset-54'});const e=characterForInline(created.state,{worldId:virtual.worldId}).entry;assert.equal(e.profile.essence,5);assert.match(e.category,/À définir/);
});
