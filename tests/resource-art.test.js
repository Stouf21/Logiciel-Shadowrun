import test from 'node:test';
import assert from 'node:assert/strict';
import {baseAssets} from '../catalog-data.js';
import {validateCampaign} from '../campaign.js';
import {mergeWorld} from '../world.js';
import {resourceArtFamily,resourceImageKey,resourceArtwork,validateResourceImages,isResourceImage,maxResourceImageLength} from '../resource-art.js';

const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jibkAAAAASUVORK5CYII=';
const item=(category,name,id='resource-test')=>({id,category,name});

test('Les illustrations suivent la famille de la ressource et couvrent les armes, équipements et engins du livre',()=>{
 for(const [name,family] of [['Ares Predator VI',0],['Ingram Smartgun',1],['Ares Alpha Mk II',2],['Moto Horizon-Doble Revolution',6],['Mitsubishi Nightsky',4],['Artemis Industries Nightwing',7],['Steel Lynx',9],['Cyberspace Design Quadrotor',8],['Fairlight Excalibur',10],['Combinaison caméléon',11],['Cram',15]]){
  const resource=baseAssets.find(x=>x.name===name);assert.ok(resource,name);assert.equal(resourceArtFamily(resource),family,name);
 }
 assert.equal(resourceArtFamily(item('Cyberware','Interface avec des drones et véhicules')),12);
 assert.equal(resourceArtFamily(item('Véhicule','Bateau pneumatique semi-rigide')),null);
 assert.equal(resourceArtFamily(item('Modèle à personnaliser','Drone à personnaliser')),8);
 assert.equal(resourceArtFamily(item('Arme','Fouet monofilament')),null);
 assert.equal(resourceArtFamily(item('Objet','Commlink')),14);
 assert.equal(resourceArtFamily(item('Arme','Katana')),3);
 for(const category of ['Trait','Contact','Esprit mentor','Sort','Programme de cyberdeck','Pouvoir d’adepte'])assert.equal(resourceArtwork(item(category,'Drone imaginaire')),'');
});

test('Une image personnelle prime sur le visuel de famille, sans confondre les identifiants de deux catalogues',()=>{
 const resource=item('Arme','Ares <exemple>');const key=resourceImageKey('asset',resource.id),images={[key]:png};
 assert.match(resourceArtwork(resource),/Illustration d’ambiance/);
 assert.match(resourceArtwork(resource,images),/Image personnelle/);assert.ok(resourceArtwork(resource,images).includes(png));
 assert.doesNotMatch(resourceArtwork(resource,images,'entry'),/Image personnelle/);
 assert.match(resourceArtwork(resource,images),/Ares &lt;exemple&gt;/);
 assert.match(resourceArtwork(item('Véhicule','Bateau')),/Ajouter une illustration/);
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
