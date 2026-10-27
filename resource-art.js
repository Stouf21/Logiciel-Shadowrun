import {escape} from './ui.js?v=0.19.0';

export const maxResourceImageLength=300000;
const normalize=value=>String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const families=['Arme à feu','Pistolet-mitrailleur','Fusil','Katana','Voiture','Véhicule utilitaire','Moto','Aéronef','Drone aérien','Drone terrestre','Cyberdeck','Armure','Implant cybernétique','Équipement','Commlink','Drogue'];
const physical=new Set(['equipement','objet','accessoire','arme','armure','drogue','cyberware','bioware','drone','cyberdeck','vehicule']);

export function resourceImageKey(scope,id){
 if(!['asset','entry'].includes(scope)||typeof id!=='string'||!id)throw Error('Référence d’illustration invalide.');
 return scope+':'+encodeURIComponent(id);
}
export function isResourceImage(value){return typeof value==='string'&&value.length<=maxResourceImageLength&&/^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value);}
export function validateResourceImages(images){
 if(images===undefined)return;
 if(!images||typeof images!=='object'||Array.isArray(images)||Object.keys(images).length>500)throw Error('Collection d’illustrations invalide.');
 let size=0;
 for(const [key,value] of Object.entries(images)){
  const match=/^(asset|entry):(.{1,500})$/.exec(key);
  let validKey=false;try{validKey=!!match&&resourceImageKey(match[1],decodeURIComponent(match[2]))===key;}catch{}
  if(!validKey||!isResourceImage(value))throw Error('Illustration invalide : utilisez une image PNG, JPEG ou WebP locale.');
  size+=value.length;
 }
 if(size>8000000)throw Error('La collection d’illustrations dépasse 8 Mo.');
}
export function resourceArtFamily(item){
 let category=normalize(item.category),name=normalize(item.name);
 if(category==='modele a personnaliser')category=normalize(item.name).replace(/ a personnaliser$/,'');
 if(category==='arme'){
  if(/fouet|arc\b|arbalete|couteau|grenade/.test(name))return null;
  if(/katana|sabre|epee/.test(name))return 3;
  if(/ingram|mitrailleur|\bsmg\b/.test(name))return 1;
  if(/fusil|alpha|barret|ranger arms/.test(name))return 2;
  return 0;
 }
 if(category==='vehicule'){
  if(/jet.ski|bateau|navire|sous.marin/.test(name))return null;
  if(/avion|helico|aeronef|vtol|nightwing/.test(name))return 7;
  if(/moto|chopper|harley|centaur/.test(name))return 6;
  if(/van|bus|remorque|suv|pick.up|camion/.test(name))return 5;
  return 4;
 }
 if(category==='drone')return /doberman|steel lynx|kanmushi|terrestre|chenille|medikit/.test(name)?9:8;
 if(category==='cyberdeck')return 10;
 if(category==='armure')return 11;
 if(category==='cyberware')return /commlink/.test(name)?14:12;
 if(category==='drogue')return 15;
 if(['objet','accessoire','equipement'].includes(category)){
  if(/programme|couteau/.test(name))return null;
  if(/commlink|communicateur/.test(name))return 14;
  if(/cyberdeck|console|dronemaster|overseer|poseidon|red dog/.test(name))return 10;
  return 13;
 }
 return null;
}
export function resourceArtwork(item,images={},scope='asset'){
 const key=resourceImageKey(scope,item.id),custom=Object.hasOwn(images,key)&&isResourceImage(images[key])?images[key]:null,index=resourceArtFamily(item);
 const category=normalize(item.category),eligible=physical.has(category)||index!==null||(scope==='asset'&&item.id.startsWith('custom-'));
 if(!custom&&!eligible)return '';
 const art=custom?{image:custom}:index===null?null:{index,label:families[index]};
 const label=art?'Agrandir l’illustration de '+item.name:'Ajouter une illustration à '+item.name;
 return `<div class="resource-art" data-resource-art="${escape(key)}"><button type="button" class="${art?'resource-art-open':'resource-art-add'}" data-art-open="${escape(key)}" aria-label="${escape(label)}">${art?resourceArtPreview(art,item.name):'+ Ajouter une illustration'}</button>${art?`<p class="resource-art-caption">${custom?'Image personnelle':'Illustration d’ambiance · '+escape(art.label)}</p>`:''}</div>`;
}
export function resourceArtPreview(art,name){
 if(art.image)return `<img class="resource-art-image" src="${escape(art.image)}" alt="${escape(name)}" loading="lazy" decoding="async">`;
 return `<span class="resource-art-sprite" role="img" aria-label="${escape(art.label+' · illustration d’ambiance')}" style="--art-x:${(art.index%4)*100/3}%;--art-y:${Math.floor(art.index/4)*100/3}%"></span>`;
}
export function defaultResourceArt(item){const index=resourceArtFamily(item);return index===null?null:{index,label:families[index]};}
