import {escape} from './ui.js?v=0.29.0';
import {resourceIllustrations} from './resource-art-data.js?v=0.29.0';
import {bookArtworkById,bookArtworkPath,bookArtworkSource,findBookArtwork} from './book-art.js?v=0.29.0';

export const maxResourceImageLength=300000;
const normalize=value=>String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const physical=new Set(['equipement','objet','accessoire','arme','armure','drogue','cyberware','bioware','drone','cyberdeck','vehicule','focus','programme','programme de cyberdeck']);
const byId=new Map(resourceIllustrations.map(x=>[x.id,x]));
const byName=new Map(resourceIllustrations.map(x=>[normalize(x.category)+'|'+normalize(x.name),x]));

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
export function validateResourceArtRefs(refs){
 if(refs===undefined)return;
 if(!refs||typeof refs!=='object'||Array.isArray(refs)||Object.keys(refs).length>500)throw Error('Choix d’illustrations du livre invalides.');
 for(const [key,value] of Object.entries(refs)){
  const match=/^(asset|entry):(.{1,500})$/.exec(key);let valid=false;
  try{valid=!!match&&resourceImageKey(match[1],decodeURIComponent(match[2]))===key;}catch{}
  if(!valid||typeof value!=='string'||!bookArtworkById(value))throw Error('Illustration du livre inconnue ou référence invalide.');
 }
}
export function resourceArtCaption(art){return art?.bookImage?'Illustration du livre · p. '+(art.pages??[art.page]).join('–'):'Illustration dédiée';}
export function resourceArtwork(item,images={},scope='asset',bookRefs={}){
 const key=resourceImageKey(scope,item.id),custom=Object.hasOwn(images,key)&&isResourceImage(images[key])?images[key]:null,original=defaultResourceArt(item,scope,bookRefs?.[key]);
 const category=normalize(item.category)==='modele a personnaliser'?normalize(item.name).replace(/ a personnaliser$/,''):normalize(item.category);
 const eligible=physical.has(category)||original||(scope==='asset'&&item.id.startsWith('custom-'));
 if(!custom&&!eligible)return '';
 const art=custom?{image:custom}:original;
 const label=art?'Agrandir l’illustration de '+item.name:'Ajouter une illustration à '+item.name;
 return `<div class="resource-art" data-resource-art="${escape(key)}"><button type="button" class="${art?'resource-art-open':'resource-art-add'}" data-art-open="${escape(key)}" aria-label="${escape(label)}">${art?resourceArtPreview(art,item.name):'+ Ajouter une illustration'}</button>${art?`<p class="resource-art-caption">${custom?'Image personnelle':escape(resourceArtCaption(art))}</p>`:''}</div>`;
}
export function resourceArtPreview(art,name){
 if(art.bookImage)return `<span class="resource-art-book-stage" data-book-art-reference="${escape(art.id)}"><img class="resource-art-book" src="${bookArtworkPath(art)}" alt="${escape(art.name+' · illustration du livre, page '+art.page)}" loading="lazy" decoding="async"></span>`;
 if(art.image)return `<img class="resource-art-image" src="${escape(art.image)}" alt="${escape(name)}" loading="lazy" decoding="async">`;
 const [x,y,w,h]=art.crop,size=Math.max(w,h);
 return `<span class="resource-art-sprite" data-art-reference="${escape(art.id)}" style="--art-frame-width:${w/size*100}%;--art-frame-height:${h/size*100}%;--art-size-x:${100/w}%;--art-size-y:${100/h}%;--art-x:${-x/w*100}%;--art-y:${-y/h*100}%"><span class="resource-art-crop"><img class="resource-art-atlas" src="./assets/items/${escape(art.board)}.png?v=0.29.0" alt="${escape('Illustration originale de '+art.name)}" loading="lazy" decoding="async"></span></span>`;
}
export function defaultResourceArt(item,scope='asset',bookSelection){
 const book=bookArtworkById(bookSelection)??findBookArtwork(item,scope);if(book)return book;
 const reference=scope==='asset'?byId.get(item.id):byName.get(normalize(item.category)+'|'+normalize(item.name));
 return reference&&normalize(reference.name)===normalize(item.name)&&normalize(reference.category)===normalize(item.category)?reference:null;
}
