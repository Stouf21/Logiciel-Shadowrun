import test from 'node:test';import assert from 'node:assert/strict';
import {baseSpells} from '../spells-data.js';import {getSpellCatalog,spellRow,spellReferenceText} from '../spells.js';import {getCatalogs,getCharacterCatalogs} from '../catalog.js';
import {mergeWorld} from '../world.js';import {validateCampaign} from '../campaign.js';import {changeCharacterRows,updateCharacterInline} from '../inline-model.js';import {globalSearch} from '../global-search.js';
const byName=name=>baseSpells.find(s=>s.name===name);
const fresh=()=>validateCampaign(mergeWorld({entries:[{id:'lim-old',name:'Lim',category:'PJ',description:'Runner',notes:'Secret',profile:{force:3,assets:'Anciennes notes',weaponRows:[{name:'Katana personnel',type:'Lame',notes:'Notes anciennes',source:'Campagne'},{name:'',type:''}],assetRows:[]}}],tokens:[{id:'lim-old',x:20,y:30}],customSkills:[],customAssets:[]}));
test('Les 34 sorts des tableaux V2 sont classés avec des sources et des variantes de combat indépendantes',()=>{
 assert.equal(baseSpells.length,34);assert.equal(new Set(baseSpells.map(s=>s.id)).size,34);assert.equal(new Set(baseSpells.map(s=>s.name)).size,34);
 assert.deepEqual(Object.fromEntries(['Combat','Détection','Santé','Illusion','Manipulation'].map(f=>[f,baseSpells.filter(s=>s.family===f).length])),{Combat:7,'Détection':8,'Santé':2,Illusion:6,Manipulation:11});
 for(const s of baseSpells){assert.equal(s.category,'Sort');assert.equal(s.learningCost,5000);assert.equal(s.castingTest,'Sorcellerie + Volonté');assert.ok(['I','M'].includes(s.duration));assert.ok(s.page>=180&&s.page<=183);assert.match(s.source,/Anarchy V2/);assert.ok(s.description&&s.threshold&&s.range);assert.equal(s.level,undefined);assert.equal(s.essence,undefined);}
 for(const name of ['Éclair mana','Éclair étourdissant','Déflagration','Trait de feu','Lance de glace','Foudre','Flot acide'])assert.ok(byName(name));
});
test('Les attaques et leurs effets spéciaux gardent les formules V2 et le coût d’Anarchy',()=>{
 assert.match(byName('Éclair mana').damage,/VD = succès nets/);assert.match(byName('Éclair mana').description,/létaux/);assert.match(byName('Éclair étourdissant').description,/étourdissants/);
 assert.match(byName('Trait de feu').damage,/Volonté \+ succès nets/);assert.match(byName('Trait de feu').anarchy,/Enflamme/);assert.match(byName('Foudre').anarchy,/perdre une action/);assert.match(byName('Flot acide').anarchy,/Détruit l’armure/);
 assert.match(byName('Déflagration').conditions,/succès adverses/);assert.doesNotMatch(byName('Déflagration').conditions,/ajout.*réserve adverse/);assert.match(byName('Lance de glace').anarchy,/1 point d’Anarchy/);
});
test('Les sorts de détection, santé et illusion gardent leurs seuils, portées, paliers et exceptions',()=>{
 assert.equal(byName('Analyse de la magie').threshold,'4');assert.equal(byName('Emprunt de sens').threshold,'5');assert.match(byName('Emprunt de sens').range,/visible/);assert.equal(byName('Sonde mentale').range,'Contact');assert.match(byName('Détection de la vie').conditions,/2 m.*15 m.*60 m.*250 m/);
 const reflex=byName('Augmentation de réflexes');for(const n of ['3 succès','5 succès','7 succès','+2 points d’Anarchy'])assert.ok(reflex.description.includes(n));assert.match(reflex.conditions,/sans cumul/);
 assert.match(byName('Soins').threshold,/Légère 3.*grave 5.*incapacitante 6.*stabilisation 3/);assert.equal(byName('Soins').duration,'I');assert.equal(byName('Invisibilité').subtype,'Indirect');assert.match(byName('Confusion').conditions,/ne peut pas être percée/);
});
test('Les armures, barrières et manipulations conservent les ratios et limites du livre V2',()=>{
 assert.match(byName('Armure').description,/entière de 3 succès/);assert.match(byName('Armure astrale').description,/magiques.*entière de 3 succès/);assert.match(byName('Armure mystique').description,/entière de 4 succès/);
 assert.equal(byName('Barrière duale').threshold,'2');assert.match(byName('Barrière duale').conditions,/succès nets/);assert.match(byName('Barrière physique').conditions,/3 × 3 m/);assert.equal(byName('Doigts télékinétiques').threshold,'3');
 assert.match(byName('Façonnage').conditions,/naturel.*2.*simple.*4.*haute technologie.*6/);assert.match(byName('Lévitation').description,/moins d’un mètre.*vitesse de marche/);
});
test('La sélection remplit une ligne libre sans écraser les armes, atouts, notes et pions',()=>{
 const source=fresh(),before=structuredClone(source),target={entryId:'lim-old',worldId:'char-lim'};let result=changeCharacterRows(source,target,{kind:'spells',itemId:byName('Soins').id});let e=result.state.entries[0];assert.equal(e.profile.weaponRows.length,2);assert.deepEqual(e.profile.weaponRows[0],source.entries[0].profile.weaponRows[0]);assert.deepEqual(e.profile.assetRows,[]);assert.equal(e.profile.weaponRows[1].spellId,byName('Soins').id);assert.match(e.profile.weaponRows[1].notes,/incapacitante 6/);assert.deepEqual(result.state.tokens,source.tokens);assert.deepEqual(source,before);
 result=updateCharacterInline(result.state,target,'profile.weaponRows.1.notes','Mon adaptation');e=result.state.entries[0];assert.equal(e.profile.weaponRows[1].notes,'Mon adaptation');assert.equal(e.profile.weaponRows[1].spellId,byName('Soins').id);assert.deepEqual(validateCampaign(JSON.parse(JSON.stringify(result.state))),result.state);
 assert.throws(()=>changeCharacterRows(source,target,{kind:'spells',itemId:'asset-16'}));
});
test('Un sort peut être la première sélection d’un personnage non classé, sans statistiques ajoutées',()=>{
 const source=fresh(),result=changeCharacterRows(source,{worldId:'char-david'},{kind:'spells',itemId:byName('Lévitation').id});const e=result.state.entries.find(e=>e.id===result.entryId);assert.equal(e.category,'PJ / PNJ : À définir');assert.equal(e.profile.force,undefined);assert.equal(e.profile.weaponRows[0].name,'Lévitation');assert.equal(e.profile.assetRows,undefined);assert.equal(mergeWorld(result.state).world.records.find(r=>r.id==='char-david').gameEntryId,e.id);
});
test('La recherche et les sélections distinguent les sorts des 205 atouts et reprennent les créations personnelles sans notes MJ',()=>{
 const source=fresh();source.entries.push({id:'spell-personal',name:'Mon sort',category:'Sort',description:'Effet personnel',notes:'Secret à ne pas copier'});
 assert.equal(getCatalogs(source).spells.length,35);assert.equal(getCatalogs(source).assets.length,205);assert.ok(!getCharacterCatalogs(source).assets.some(x=>x.id.startsWith('spell-v2-')));assert.equal(globalSearch(source,'',{tab:'spells'}).rows.length,35);assert.equal(globalSearch(source,'',{tab:'assets'}).rows.length,205);
 assert.equal(globalSearch(source,'sorcellerie',{tab:'spells'}).rows.length,34);assert.equal(globalSearch(source,'levitation',{tab:'spells'}).rows[0].item.name,'Lévitation');assert.equal(globalSearch(source,'incapacitante 6',{tab:'spells'}).rows[0].item.name,'Soins');assert.equal(globalSearch(source,'Soins',{tab:'weapons'}).rows.length,0);
 const personal=getSpellCatalog(source).find(s=>s.entryId==='spell-personal');assert.equal(personal.description,'Effet personnel');assert.doesNotMatch(spellReferenceText(personal),/Secret à ne pas copier/);assert.equal(spellRow(personal).source,'Création personnelle');
});
