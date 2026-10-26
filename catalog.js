import {baseSkills,baseAssets} from './catalog-data.js?v=0.13.0';
export {baseSkills,baseAssets};
export function getCatalogs(state){return {skills:[...baseSkills,...(state.customSkills??[])],assets:[...baseAssets,...(state.customAssets??[])]};}
export function assetReferenceText(asset){return [asset.description,asset.conditions,asset.price?'Prix : '+asset.price:''].filter(Boolean).join('\n');}
export function assetReferenceForRow(row){return baseAssets.find(a=>a.id===row.catalogId);}
export function validateCustomCatalog(items,kind){
 if(items===undefined)return;
 if(!Array.isArray(items)||items.length>2000)throw Error('Liste personnalisée invalide.');
 const ids=new Set((kind==='skills'?baseSkills:baseAssets).map(x=>x.id));
 for(const x of items){
  if(!x||typeof x.id!=='string'||!x.id.startsWith('custom-')||ids.has(x.id)||!['name','category','description','source'].every(k=>typeof x[k]==='string')||!x.name.trim())throw Error('Entrée personnalisée invalide.');
  ids.add(x.id);
  if(kind==='skills'&&!['force','agilite','volonte','logique','charisme'].includes(x.attribute))throw Error('Attribut de compétence invalide.');
  if(kind==='skills'&&x.specializations!==undefined&&(!Array.isArray(x.specializations)||x.specializations.length>200||x.specializations.some(s=>typeof s!=='string'||!s.trim()||s.length>120)||new Set(x.specializations).size!==x.specializations.length))throw Error('Spécialisations personnelles invalides (200 maximum, 120 caractères chacune).');
  if(x.target!==undefined&&!['character','vehicle','drone'].includes(x.target))throw Error('Application d’atout invalide.');
  if(kind==='assets')for(const k of ['level','essence'])if(x[k]!==''&&(typeof x[k]!=='number'||!Number.isFinite(x[k])||x[k]<0))throw Error('Valeur d’atout invalide.');
 }
}

export function isCharacterAsset(asset){
 const category=String(asset.category??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const name=String(asset.name??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 if(/\b(drones?|vehicules?)\b/.test(category))return false;
 if(/^(drone|vehicule) a personnaliser$/.test(name))return false;
 return asset.target===undefined||asset.target==='character';
}
export function getCharacterCatalogs(state){const all=getCatalogs(state);return {...all,assets:all.assets.filter(isCharacterAsset)};}
