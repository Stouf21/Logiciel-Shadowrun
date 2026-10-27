import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {bookArtworks,bookArtCredit} from '../book-art-data.js';
import {bookArtworkById,bookArtworkMatches,findBookArtwork} from '../book-art.js';
import {baseAssets} from '../catalog-data.js';
import {defaultResourceArt,resourceArtwork,validateResourceArtRefs} from '../resource-art.js';
import {validateCampaign} from '../campaign.js';
import {mergeWorld} from '../world.js';
import {globalSearch} from '../global-search.js';

test('Les 76 visuels du livre ont un fichier PNG intègre, transparent, documenté et sans métadonnée personnelle',()=>{
 assert.equal(bookArtworks.length,76);assert.equal(new Set(bookArtworks.map(x=>x.id)).size,76);assert.equal(new Set(bookArtworks.map(x=>x.bookImage)).size,76);
 const files=readdirSync(new URL('../assets/book/',import.meta.url));assert.equal(files.length,76);
 for(const art of bookArtworks){
  assert.match(art.bookImage,/^book-[a-z0-9-]+\.png$/);assert.ok(art.page>0&&art.pdfPage>0);assert.ok(art.xrefs.length>0&&art.legend!==undefined);
  const buffer=readFileSync(new URL('../assets/book/'+art.bookImage,import.meta.url));assert.equal(buffer.subarray(1,4).toString(),'PNG');assert.equal(buffer.readUInt32BE(16),art.width);assert.equal(buffer.readUInt32BE(20),art.height);assert.equal(buffer[25],6,'Transparence RGBA : '+art.id);
  assert.equal(createHash('sha256').update(buffer).digest('hex'),art.sha256);
  let offset=8;while(offset<buffer.length){const size=buffer.readUInt32BE(offset),type=buffer.subarray(offset+4,offset+8).toString();assert.ok(!['tEXt','iTXt','zTXt'].includes(type),'Aucune donnée du filigrane client dans '+art.id);offset+=size+12;}
 }
 assert.doesNotMatch(JSON.stringify(bookArtworks),/@|sediment:|\/workspace\/attachments/);assert.match(bookArtCredit,/Benjamin Giletti/);
});

test('Les fragments des doubles pages sont réunis et les deux aéronefs de la planche des drones restent distincts',()=>{
 for(const id of ['book-shiawase-puzzler','book-predator-vi-or','book-pistolet-typique-1','book-ares-alpha-mk-ii','book-barrett-model-122','book-barrett-model-122-variante']){
  const art=bookArtworkById(id);assert.equal(art.join,'horizontal');assert.equal(art.xrefs.length,2);assert.equal(art.pages.length,2);
 }
 const optic=bookArtworkById('book-optic-x2'),pursuit=bookArtworkById('book-pursuit-v');assert.deepEqual(optic.xrefs,pursuit.xrefs);assert.ok(optic.sourceCrop[3]<=pursuit.sourceCrop[1]);assert.notEqual(optic.sha256,pursuit.sha256);assert.equal(optic.assetIds[0],'asset-205');assert.equal(pursuit.assetIds[0],'asset-185');
});

test('Les correspondances vérifiées donnent priorité aux illustrations du livre, sans inventer de modèle sur les planches générales',()=>{
 const matched=new Set(bookArtworks.flatMap(x=>x.assetIds));assert.equal(matched.size,24);
 for(const [id,artId] of [['asset-13','book-yamaha-pulsar'],['asset-16','book-predator-iv'],['asset-17','book-predator-v'],['asset-18','book-predator-vi'],['asset-22','book-barrett-model-122'],['asset-24','book-combinaison-cameleon'],['asset-175','book-moto-monoroue'],['asset-185','book-pursuit-v'],['asset-205','book-optic-x2']])assert.equal(defaultResourceArt(baseAssets.find(x=>x.id===id)).id,artId);
 for(const name of ['Commlink implanté','Fairlight Excalibur','Focus d’arme (épée)','Focus d’arme (couteau)','Jazz','Bras cybernétique synthétique avec pistolet lourd','Artemis Industries Nightwing']){const item=baseAssets.find(x=>x.name===name);assert.ok(item,name);assert.equal(findBookArtwork(item),null,name);assert.ok(defaultResourceArt(item).board);}
 assert.equal(findBookArtwork({id:'custom-citymaster',category:'Véhicule',name:'Ares Citymaster'}).id,'book-ares-citymaster');
 assert.equal(findBookArtwork({id:'custom-barrett',category:'Arme',name:'Barrett Model 122'}).id,'book-barrett-model-122');
 assert.equal(findBookArtwork({id:'other',category:'Cyberware',name:'Interface mentionnant les drones'}),null);
});

test('Les images personnelles et les choix explicites restent prioritaires, puis reviennent à la source automatique',()=>{
 const item=baseAssets.find(x=>x.id==='asset-18'),key='asset:asset-18',refs={[key]:'book-predator-vi-or'},png='data:image/png;base64,YWJj';
 assert.match(resourceArtwork(item),/book-predator-vi\.png/);assert.match(resourceArtwork(item,{},'asset',refs),/book-predator-vi-or\.png/);
 assert.match(resourceArtwork(item,{[key]:png},'asset',refs),/Image personnelle/);assert.ok(!resourceArtwork(item,{[key]:png},'asset',refs).includes('book-predator-vi-or.png'));
 assert.match(resourceArtwork(item,{},'asset',{}),/Illustration du livre/);
});

test('Les choix de source survivent à un export/import et les imports invalides sont refusés sans changer les anciennes campagnes',()=>{
 const old={entries:[],tokens:[],customSkills:[],customAssets:[]};assert.deepEqual(validateCampaign(old),old);
 const saved={...old,resourceArtRefs:{'asset:asset-18':'book-predator-vi-or','entry:my-van':'book-gmc-bulldog'}};assert.deepEqual(validateCampaign(mergeWorld(JSON.parse(JSON.stringify(saved)))).resourceArtRefs,saved.resourceArtRefs);
 for(const refs of [null,[],{'asset:%ZZ':'book-rose'},{'entry:a b':'book-rose'},{'asset:x':'https://example.com/a.png'},{'asset:x':'unknown'},{'asset:x':null}])assert.throws(()=>validateResourceArtRefs(refs));
 assert.doesNotThrow(()=>validateResourceArtRefs(undefined));assert.doesNotThrow(()=>validateResourceArtRefs({}));
 const many=Object.fromEntries(Array.from({length:501},(_,i)=>['entry:'+i,'book-rose']));assert.throws(()=>validateResourceArtRefs(many));
 assert.throws(()=>validateCampaign({...old,resourceArtRefs:{'asset:x':'missing'}}));assert.deepEqual(old,{entries:[],tokens:[],customSkills:[],customAssets:[]});
});

test('La recherche des illustrations garde les sources, alias et catégories, sans les transformer en atouts ou dévoiler les notes du MJ',()=>{
 const state=mergeWorld({entries:[{id:'my-weapon',name:'Arme secrète',category:'Arme',description:'',notes:'SecretBookArtTest'}],tokens:[]});
 assert.ok(bookArtworkMatches(bookArtworkById('book-barrett-model-122'),'barret'));assert.ok(bookArtworkMatches(bookArtworkById('book-moto-monoroue'),'235'));
 assert.equal(globalSearch(state,'',{tab:'assets'}).rows.length,205);assert.equal(globalSearch(state,'',{tab:'sources'}).rows.filter(x=>x.type==='book-art').length,76);
 assert.equal(globalSearch(state,'Ares Predator IV').rows.filter(x=>x.type==='assets').length,1);assert.equal(globalSearch(state,'Ares Predator IV').rows.filter(x=>x.type==='book-art').length,0);
 assert.ok(globalSearch(state,'Barrett Model 122').rows.some(x=>x.type==='book-art'));assert.ok(globalSearch(state,'Électro-gants',{tab:'weapons'}).rows.some(x=>x.type==='book-art'));
 const secret=globalSearch(state,'SecretBookArtTest');assert.equal(secret.rows.length,1);assert.equal(secret.rows[0].protected,true);
 const all=globalSearch(state),sources=globalSearch(state,'',{tab:'sources'});assert.equal(all.counts.sources,sources.counts.sources);assert.equal(all.counts.all,all.rows.length);
});
