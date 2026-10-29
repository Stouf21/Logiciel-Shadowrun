import test from 'node:test';import assert from 'node:assert/strict';
import {getCatalogs} from '../catalog.js';import {equipmentChoices,equipmentRow} from '../character-equipment.js';
import {setCharacterEquipment,changeCharacterRows,deleteCharacterElement,updateCharacterInline,characterForInline} from '../inline-model.js';
import {characterSheet} from '../character-sheet.js';import {validateCampaign} from '../campaign.js';import {mergeWorld} from '../world.js';
const catalog=getCatalogs({}),asset=id=>catalog.assets.find(a=>a.id===id),fresh=(profile={})=>mergeWorld({entries:[{id:'r',name:'Runner',category:'PJ',description:'',notes:'Notes privées',profile}],tokens:[]}),target={entryId:'r'};
test('Chaque liste contient le matériel correspondant et les créations personnelles, sans mélanger programmes et cyberdecks',()=>{
 const custom={id:'custom-drone',category:'Personnel',target:'drone',name:'Mon drone',description:'Autopilote 9',source:'Table',level:1,essence:0};
 const all={...catalog,equipment:[{id:'mon-van',category:'Véhicule',name:'Mon van',description:'Structure 8 ; Blindage 2.'}],assets:[...catalog.assets,custom]},decks=equipmentChoices(all,'decks').flatMap(g=>g.items),vehicles=equipmentChoices(all,'vehicles').flatMap(g=>g.items);
 assert.equal(decks.length,7);assert.ok(decks.some(a=>a.id==='asset-196'));assert.ok(!decks.some(a=>a.category==='Programme de cyberdeck'));assert.ok(vehicles.includes(custom));assert.ok(vehicles.some(a=>a.id==='entry:mon-van'));assert.ok(vehicles.some(a=>a.id==='asset-205'));assert.ok(!vehicles.some(a=>a.category==='Arme'));
 assert.equal(equipmentChoices(all,'weapons').find(g=>g.label==='Sorts').items.length,catalog.spells.length);
});
test('Cyberdeck : valeurs du catalogue, seuils Firewall / +3 / +6 et suivi du DIEU initialisé à zéro',()=>{
 const row=equipmentRow(asset('asset-160'),'decks');assert.equal(row.name,'Renraku Kitsune');assert.equal(row.attack,'4');assert.equal(row.firewall,'4');assert.equal(row.light,'4');assert.equal(row.serious,'7');assert.equal(row.incap,'10');assert.equal(row.minRisk,'0');assert.equal(row.penalty,'0');assert.match(row.notes,/Filtre de biofeedback/);assert.match(row.notes,/Source : Anarchy/);
});
test('Véhicules et drones : zéros, châssis, seuils avec blindage et vitesses de vol conservés ; aucune valeur inventée',()=>{
 const van=equipmentRow(asset('asset-171'),'vehicles');assert.deepEqual([van.auto,van.structure,van.handling,van.speed,van.armor,van.light,van.serious,van.incap],['6','8','1','3','0','8','16','24']);
 const drone=equipmentRow(asset('asset-186'),'vehicles');assert.equal(drone.type,'Drone');assert.deepEqual([drone.light,drone.serious,drone.incap],['4','6','8']);assert.match(drone.notes,/tourelle/);
 assert.equal(equipmentRow(asset('asset-178'),'vehicles').speed,'0 (volant 1)');const unknown=equipmentRow({name:'Personnel',description:'Mes notes',category:'Drone'},'vehicles');assert.equal(unknown.structure,'');assert.equal(unknown.light,'');
});
test('Enregistrer un modèle remplit exactement le bon emplacement sans écraser les autres lignes et conserve export/import',()=>{
 const source=fresh({vehicleRows:[equipmentRow(asset('asset-169'),'vehicles')]}),before=structuredClone(source),row=equipmentRow(asset('asset-186'),'vehicles');
 let state=setCharacterEquipment(source,target,{kind:'vehicles',index:2,row}).state;assert.equal(state.entries[0].profile.vehicleRows[0].name,'Berline');assert.deepEqual(state.entries[0].profile.vehicleRows[2],row);assert.equal(state.entries[0].profile.vehicleRows[1].name,'');
 state=setCharacterEquipment(state,target,{kind:'decks',row:equipmentRow(asset('asset-162'),'decks')}).state;state=setCharacterEquipment(state,target,{kind:'weapons',index:7,row:equipmentRow(catalog.spells[0],'weapons')}).state;
 state=validateCampaign(JSON.parse(JSON.stringify(state)));assert.equal(state.entries[0].profile.weaponRows[7].spellId,catalog.spells[0].id);assert.equal(state.entries[0].profile.deck.firewall,'5');assert.equal(state.entries[0].notes,'Notes privées');assert.deepEqual(source,before);
 assert.throws(()=>setCharacterEquipment(state,target,{kind:'vehicles',index:-1,row}));assert.throws(()=>setCharacterEquipment(state,target,{kind:'vehicles',index:300,row}));assert.throws(()=>setCharacterEquipment(state,target,{kind:'decks',row:{name:'Incomplet'}}));
});
test('Les emplacements vides se remplissent avant les compléments et un personnage non lié conserve son statut libre',()=>{
 let state=setCharacterEquipment(fresh(),target,{kind:'vehicles',row:equipmentRow(asset('asset-169'),'vehicles')}).state;assert.equal(state.entries[0].profile.vehicleRows.length,3);assert.equal(state.entries[0].profile.vehicleRows[0].name,'Berline');
 const created=setCharacterEquipment(state,{worldId:'char-boycow'},{kind:'decks',row:equipmentRow(asset('asset-157'),'decks')});const e=characterForInline(created.state,{worldId:'char-boycow'}).entry;assert.equal(e.profile.deck.attack,'1');assert.match(e.category,/À définir/);
});
test('Lignes vides : ajouts disponibles après les données existantes et choix de matériel sur les titres du verso',()=>{
 const empty=characterSheet(fresh().entries[0]);assert.equal((empty.match(/class="official-add-field" data-sheet-add="skills"/g)||[]).length,19);assert.equal((empty.match(/class="official-add-field" data-sheet-add="assets"/g)||[]).length,35);assert.match(empty,/data-sheet-add="weapons" data-sheet-index="7"/);assert.match(empty,/data-sheet-equipment="decks"/);assert.match(empty,/data-sheet-equipment="vehicles" data-sheet-index="2"/);
 const entry=fresh({skillRows:[{catalogId:'skill-1',name:'Athlétisme',rating:2,attribute:'agilite',specialization:'',specialized:false,rr:0}]}).entries[0],html=characterSheet(entry);assert.equal((html.match(/class="official-add-field" data-sheet-add="skills"/g)||[]).length,18);
});
test('Suppression et coût zéro restituent seulement l’Essence payée, y compris après rechargement ou saturation',()=>{
 let s=fresh({essence:6});s=changeCharacterRows(s,target,{kind:'assets',itemId:'asset-54'}).state;s=updateCharacterInline(s,target,'profile.assetRows.0.essence',0).state;assert.equal(s.entries[0].profile.essence,6);s=deleteCharacterElement(s,target,'profile.assetRows.0.name').state;assert.equal(s.entries[0].profile.essence,6);
 s=changeCharacterRows(fresh({essence:.5}),target,{kind:'assets',itemId:'asset-54'}).state;assert.equal(s.entries[0].profile.essence,0);s=validateCampaign(JSON.parse(JSON.stringify(s)));s=deleteCharacterElement(s,target,'profile.assetRows.0.name').state;assert.equal(s.entries[0].profile.essence,.5);
 const legacy=fresh({essence:'',assetRows:[{catalogId:'asset-54',name:'Implant',category:'Cyberware',level:1,essence:1,source:'Table',notes:''}]});assert.equal(deleteCharacterElement(legacy,target,'profile.assetRows.0.name').state.entries[0].profile.essence,6);
});
