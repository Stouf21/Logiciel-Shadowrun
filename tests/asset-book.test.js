import test from 'node:test';
import assert from 'node:assert/strict';
import {baseAssets,assetReferenceText,assetReferenceForRow,getCharacterCatalogs} from '../catalog.js';
import {characterSheet} from '../character-sheet.js';
const byId=id=>baseAssets.find(a=>a.id==='asset-'+id);

test('Les 205 références ont des caractéristiques spécifiques et des prix ou conditions de coût explicites',()=>{
 assert.equal(baseAssets.length,205);
 assert.ok(baseAssets.every(a=>a.description&&a.price&&a.source));
 assert.ok(baseAssets.every(a=>!a.description.includes('Valeurs de référence à adapter')));
 assert.equal(new Set(baseAssets.map(a=>a.description)).size>180,true);
 assert.equal(byId(60).essence,1,'La perte d’Essence imprimée est −1, pas −1,15');
 assert.equal(byId(140).levelLabel,'3+');assert.equal(byId(140).price,'15 000+ ¥');
});

test('Les armes, drogues et implants conservent les contraintes chiffrées des exemples du livre',()=>{
 assert.match(byId(12).description,/Minimum 6 dés de risque/);assert.match(byId(18).description,/VD 5 \(gel\) \/ 6 \(explosives\)/);
 assert.equal(byId(21).price,'32 500 ¥');assert.match(byId(21).description,/lance-grenades/i);
 assert.match(byId(35).description,/Descente : une blessure grave/);assert.match(byId(38).description,/niveau 10, 52 500 ¥/);
 assert.equal(byId(66).price,'20 000 ¥');assert.equal(byId(76).essence,.5);assert.match(byId(80).description,/choisie lors de l’achat/);
 assert.match(byId(107).conditions,/niveau \+3/);assert.match(byId(107).description,/Choisir 2 domaines sur 3/);
});

test('Cyberdecks, engins, programmes et atouts sans niveau sont distingués sans inventer leurs valeurs',()=>{
 assert.match(byId(162).description,/Firewall 5 ; Attaque 5/);assert.match(byId(162).description,/RR 2/);
 assert.match(byId(177).description,/Blindage 5/);assert.match(byId(205).description,/Structure 1 ; Maniabilité 9 ; Vitesse 4/);
 for(const id of [154,155,156]){assert.equal(byId(id).levelLabel,'+1');assert.equal(byId(id).category,'Programme de cyberdeck');assert.doesNotMatch(byId(id).description,/PNJ corrompu/);}
 for(const id of [148,149,150,151,152,153]){assert.equal(byId(id).level,'');assert.match(byId(id).description,/PNJ toxiques/);}
 const character=getCharacterCatalogs({}).assets;assert.ok(!character.some(a=>a.id==='asset-205'));assert.ok(character.some(a=>a.id==='asset-163'));
});

test('Les fiches anciennes sans notes affichent la référence vérifiée sans modifier les notes personnelles',()=>{
 const asset=byId(16),row={catalogId:asset.id,name:asset.name,category:asset.category,level:asset.level,essence:0,source:asset.source,notes:''};
 const entry={id:'runner',name:'Runner',category:'PJ',description:'',notes:'',profile:{assetRows:[row]}};
 const before=structuredClone(entry);assert.match(characterSheet(entry),/VD 5/);assert.match(characterSheet(entry),/12 500 ¥/);assert.deepEqual(entry,before);
 assert.equal(assetReferenceForRow(row),asset);assert.match(assetReferenceText(asset),/smartgun/);
 row.notes='Mes améliorations conservées';assert.match(characterSheet(entry),/Mes améliorations conservées/);assert.equal(row.notes,'Mes améliorations conservées');
 assert.equal(assetReferenceForRow({...row,catalogId:'custom-inconnu'}),undefined);
});
