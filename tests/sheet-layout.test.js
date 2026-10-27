import test from 'node:test';import assert from 'node:assert/strict';
import {sheetSize,sheetSlots,skillLine,weaponLine,assetLine,vehicleTop} from '../sheet-layout.js';
import {characterSheet} from '../character-sheet.js';import {mergeWorld} from '../world.js';import {updateCharacterInline} from '../inline-model.js';

test('Les emplacements des deux faces restent dans les proportions du document, sans superposer les dernières rubriques',()=>{
 for(const [kind,line] of [['skills',skillLine],['weapons',weaponLine],['assets',assetLine]]){
  const rows=Array.from({length:sheetSlots[kind]},(_,i)=>line(i));for(const r of rows){assert.ok(r.x>=0&&r.y>=0);assert.ok(r.x+r.width<=sheetSize.width);assert.ok(r.y+r.height<=sheetSize.height);}
  for(let i=1;i<rows.length;i++)assert.ok(rows[i-1].y+rows[i-1].height<=rows[i].y);
 }
 assert.ok(skillLine(sheetSlots.skills-1).y+skillLine(18).height<476);assert.ok(weaponLine(7).y+weaponLine(7).height<680);assert.ok(assetLine(34).y+assetLine(34).height<653);assert.ok(vehicleTop(2)+166<sheetSize.height);
});
test('Le rendu conserve les données et les zéros, utilise les deux fonds originaux et garde les anciennes notes et effets',()=>{
 const e={id:'r',name:'Runner',category:'PJ',description:'Description',notes:'Secret privé',profile:{force:0,anarchy:0,skills:'Compétences historiques',quotes:'Réplique historique',assetRows:[{catalogId:'asset-16',name:'Arme',category:'Arme',level:4,essence:0,source:'Livre',notes:''}]}},before=structuredClone(e),html=characterSheet(e);
 assert.match(html,/anarchy-v2-recto\.webp/);assert.match(html,/anarchy-v2-verso\.webp/);assert.equal((html.match(/data-sheet-face=/g)||[]).length,2);assert.match(html,/data-inline-key="profile.force"[^>]*>0<\/button>/);assert.match(html,/Compétences historiques/);assert.match(html,/Réplique historique/);assert.match(html,/VD 5/);assert.match(html,/Secret privé/);assert.match(html,/secret-content" hidden/);assert.deepEqual(e,before);
});
test('La huitième arme et une protection encore vide se remplissent sans effacer les lignes ou les notes existantes',()=>{
 const initial=mergeWorld({entries:[{id:'r',name:'Lim',category:'PJ',description:'',notes:'Privé',profile:{weaponRows:[{name:'Katana',type:'Lame'}],woundRows:[{label:'Sans armure',light:'3',serious:'6',incap:'9',rr:'',status:'Stable'}]}}],tokens:[],customSkills:[],customAssets:[]});
 const target={entryId:'r',worldId:'char-lim'};let next=updateCharacterInline(initial,target,'profile.weaponRows.7.name','Sort de soin').state;assert.equal(next.entries[0].profile.weaponRows.length,8);assert.equal(next.entries[0].profile.weaponRows[0].name,'Katana');assert.equal(next.entries[0].profile.weaponRows[7].name,'Sort de soin');
 next=updateCharacterInline(next,target,'profile.woundRows.3.serious','7').state;assert.equal(next.entries[0].profile.woundRows[0].status,'Stable');assert.equal(next.entries[0].profile.woundRows[3].serious,'7');assert.equal(next.entries[0].notes,'Privé');assert.equal(initial.entries[0].profile.weaponRows.length,1);
});
test('Les lignes au-delà du papier restent consultables et modifiables en compléments imprimables',()=>{
 const asset=i=>({catalogId:'custom-'+i,name:'Atout '+i,category:'Personnalisé',level:1,essence:0,source:'Table',notes:'Effet '+i});const e={id:'r',name:'Runner',category:'PJ',description:'',notes:'',profile:{assetRows:Array.from({length:36},(_,i)=>asset(i))}};
 const html=characterSheet(e);assert.match(html,/Atout 35/);assert.match(html,/Effet 35/);assert.match(html,/data-inline-key="profile.assetRows.35.name"/);assert.match(html,/sheet-print-appendix/);assert.equal(e.profile.assetRows.length,36);
});
test('Le verso affiche uniquement les atouts de personnage et conserve les anciennes associations d’engins dans les compléments',()=>{
 const e={id:'r',name:'Runner',category:'PJ',description:'',notes:'',profile:{assetRows:[{catalogId:'asset-205',name:'Drone historique',category:'Drone',target:'drone',level:1,essence:0,source:'Table',notes:'Matériel conservé'},{catalogId:'asset-16',name:'Arme du personnage',category:'Arme',level:4,essence:0,source:'Table',notes:''}]}};
 const html=characterSheet(e),verso=html.split('data-sheet-face="verso"')[1].split('</article>')[0];assert.match(verso,/Arme du personnage/);assert.doesNotMatch(verso,/Drone historique/);assert.match(html,/Drone historique/);assert.match(html,/Matériel conservé/);assert.match(html,/Ancienne association de véhicule \/ drone/);assert.match(verso,/profile.assetRows.1.name/);
});
