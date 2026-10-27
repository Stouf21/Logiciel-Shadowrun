import test from 'node:test';
import assert from 'node:assert/strict';
import {baseAssets} from '../catalog-data.js';
import {resourceIllustrations} from '../resource-art-data.js';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {validateCampaign} from '../campaign.js';
import {mergeWorld} from '../world.js';
import {defaultResourceArt,resourceImageKey,resourceArtwork,validateResourceImages,isResourceImage,maxResourceImageLength} from '../resource-art.js';

const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jibkAAAAASUVORK5CYII=';
const item=(category,name,id='resource-test')=>({id,category,name});

test('Chaque référence de matériel a une illustration propre, identifiée par son nom et sa catégorie',()=>{
 const categories=new Set(['Équipement','Arme','Armure','Drogue','Cyberware','Bioware','Drone','Focus','Programme de cyberdeck','Cyberdeck','Véhicule']);
 const expected=baseAssets.filter(x=>categories.has(x.category));assert.equal(expected.length,144);assert.equal(resourceIllustrations.length,expected.length);
 const addresses=new Set(),ids=new Set();
 for(const resource of expected){
  const art=defaultResourceArt(resource);assert.ok(art,resource.name);assert.equal(art.name,resource.name);assert.equal(art.category,resource.category);
  const address=art.board+':'+art.index;assert.ok(!addresses.has(address),'Visuel déjà attribué : '+resource.name);addresses.add(address);ids.add(art.id);
  assert.ok(Number.isInteger(art.index)&&art.index>=0&&art.index<art.columns**2);assert.ok(art.depiction.length>40);
  assert.equal(art.crop.length,4);assert.ok(art.crop.every(Number.isFinite));const [x,y,w,h]=art.crop;assert.ok(x>=0&&y>=0&&w>.1&&h>.1&&x+w<=1&&y+h<=1);
  assert.match(resourceArtwork(resource),/Illustration dédiée/);assert.ok(resourceArtwork(resource).includes('data-art-reference="'+resource.id+'"'));
 }
 assert.equal(ids.size,144);assert.equal(addresses.size,144);
 for(const category of ['Trait','Contact','Esprit mentor','Sort','Pouvoir d’adepte'])assert.equal(resourceArtwork(item(category,'Drone imaginaire')),'');
});

test('Les cadres individuels restent séparés et excluent les détails des rangées voisines',()=>{
 for(const a of resourceIllustrations)for(const b of resourceIllustrations){
  if(a.board!==b.board||a.index%a.columns!==b.index%b.columns||a.index>=b.index)continue;
  assert.ok(a.crop[1]+a.crop[3]<b.crop[1],a.id+' chevauche '+b.id);
 }
 const revolver=resourceIllustrations.find(x=>x.id==='asset-19'),wing=resourceIllustrations.find(x=>x.id==='asset-204');
 assert.ok(revolver.crop[1]+revolver.crop[3]<.49,'Le silencieux de la rangée suivante reste hors du cadre du Ruger.');
 assert.ok(wing.crop[1]+wing.crop[3]<.25,'Le focus de la rangée suivante reste hors du cadre du Nightwing.');
});

test('Le cadrage distingue revolver, taser, BTL, interface neurale, monoroue et deltaplane',()=>{
 for(const [id,expression] of [['asset-19',/revolver.*BARILLET/i],['asset-13',/taser.*électrodes/i],['asset-28',/PUCE BTL/i],['asset-30',/PUCE BTL/i],['asset-42',/prise neurale/i],['asset-175',/MONOROUE/],['asset-177',/LIMOUSINE/],['asset-204',/deltaplane/i]])assert.match(resourceIllustrations.find(x=>x.id===id).depiction,expression);
 assert.notEqual(defaultResourceArt(baseAssets.find(x=>x.id==='asset-16')).index,defaultResourceArt(baseAssets.find(x=>x.id==='asset-17')).index);
 assert.notEqual(defaultResourceArt(baseAssets.find(x=>x.id==='asset-50')).index,defaultResourceArt(baseAssets.find(x=>x.id==='asset-51')).index);
});

test('Une création inconnue ne reçoit plus un visuel générique ; une référence nommée précisément peut être retrouvée',()=>{
 for(const resource of [item('Arme','Mon pistolet'),item('Cyberware','Interface avec des drones et véhicules'),item('Véhicule','Bateau personnel'),item('Modèle à personnaliser','Drone à personnaliser')]){
  assert.equal(defaultResourceArt(resource),null);assert.match(resourceArtwork(resource),/Ajouter une illustration/);assert.doesNotMatch(resourceArtwork(resource),/resource-art-atlas/);
 }
 const book=baseAssets.find(x=>x.name==='Ares Predator IV'),personal={...book,id:'my-weapon'};
 assert.equal(defaultResourceArt(personal),null);assert.equal(defaultResourceArt(personal,'entry').id,book.id);
 assert.equal(defaultResourceArt({...personal,name:'Arme personnelle',id:book.id},'entry'),null);
 assert.equal(defaultResourceArt({...book,name:'Autre arme'}),null);
 assert.equal(defaultResourceArt({...personal,category:'Véhicule'},'entry'),null);
});

test('Les planches locales sont distinctes et carrées, avec des coordonnées valides pour chaque visuel',()=>{
 const boards=new Set(resourceIllustrations.map(x=>x.board));assert.equal(boards.size,10);const hashes=new Set();
 for(const board of boards){
  const file=readFileSync(new URL('../assets/items/'+board+'.png',import.meta.url));assert.equal(file.subarray(1,4).toString(),'PNG');
  const width=file.readUInt32BE(16),height=file.readUInt32BE(20);assert.equal(width,height);const entries=resourceIllustrations.filter(x=>x.board===board);assert.ok(width/entries[0].columns>=300);assert.ok(width>=1024);
  hashes.add(createHash('sha256').update(file).digest('hex'));assert.equal(entries.length,board==='equipment'?14:board==='knives'?2:16);
 }
 assert.equal(hashes.size,10);
});

test('Une image personnelle reste prioritaire et propre à sa ressource, sans modifier les atouts du livre',()=>{
 const resource={...baseAssets.find(x=>x.name==='Ares Predator IV')},before=structuredClone(resource),key=resourceImageKey('asset',resource.id),images={[key]:png};
 assert.match(resourceArtwork(resource),/Illustration dédiée/);
 assert.match(resourceArtwork(resource,images),/Image personnelle/);assert.ok(resourceArtwork(resource,images).includes(png));
 assert.doesNotMatch(resourceArtwork(resource,images,'entry'),/Image personnelle/);assert.deepEqual(resource,before);
 assert.match(resourceArtwork(item('Arme','Ares <exemple>'),{'asset:resource-test':png}),/Ares &lt;exemple&gt;/);
 assert.equal(resourceImageKey('entry','été < >'), 'entry:%C3%A9t%C3%A9%20%3C%20%3E');
});

test('Les sauvegardes anciennes sont inchangées, les images survivent à un export/import et à la fusion de campagne',()=>{
 const old={entries:[],tokens:[],customSkills:[],customAssets:[]};assert.deepEqual(validateCampaign(old),old);
 const saved={...old,resourceImages:{'asset:asset-1':png,'entry:custom-resource':png}};
 const before=structuredClone(saved),restored=validateCampaign(mergeWorld(JSON.parse(JSON.stringify(saved))));
 assert.deepEqual(restored.resourceImages,saved.resourceImages);assert.deepEqual(saved,before);
});

test('Les imports refusent les liens distants, SVG, types invalides et collections surdimensionnées',()=>{
 for(const bad of [null,[],true,{'__proto__:x':png},{'asset:%ZZ':png},{'asset:a b':png},{'asset:':png},{'asset:x':'javascript:alert(1)'},{'asset:x':'https://example.com/image.png'},{'asset:x':'data:image/svg+xml;base64,PHN2Zz4='},{'asset:x':'data:image/png;base64,<script>'},{'asset:x':null},{'asset:x':'data:image/png;base64,'+'A'.repeat(maxResourceImageLength)}])assert.throws(()=>validateResourceImages(bad));
 const tooMany=Object.fromEntries(Array.from({length:501},(_,i)=>['entry:'+i,png]));assert.throws(()=>validateResourceImages(tooMany));
 const tooLarge=Object.fromEntries(Array.from({length:30},(_,i)=>['entry:'+i,'data:image/png;base64,'+'A'.repeat(299000)]));assert.throws(()=>validateResourceImages(tooLarge),/8 Mo/);
 for(const mime of ['png','jpeg','webp'])assert.ok(isResourceImage('data:image/'+mime+';base64,YWJj'));
 assert.doesNotThrow(()=>validateResourceImages(undefined));assert.doesNotThrow(()=>validateResourceImages({}));
 assert.throws(()=>validateCampaign({entries:[],tokens:[],resourceImages:{'entry:x':'https://example.com/a.jpg'}}));
});
