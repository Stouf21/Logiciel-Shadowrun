import {baseSkills,baseAssets} from './catalog-data.js?v=0.5.0';
export {baseSkills,baseAssets};
export function getCatalogs(state){return {skills:[...baseSkills,...(state.customSkills??[])],assets:[...baseAssets,...(state.customAssets??[])]};}
export function validateCustomCatalog(items,kind){
 if(items===undefined)return;
 if(!Array.isArray(items)||items.length>2000)throw Error('Liste personnalisée invalide.');
 const ids=new Set((kind==='skills'?baseSkills:baseAssets).map(x=>x.id));
 for(const x of items){
  if(!x||typeof x.id!=='string'||!x.id.startsWith('custom-')||ids.has(x.id)||!['name','category','description','source'].every(k=>typeof x[k]==='string')||!x.name.trim())throw Error('Entrée personnalisée invalide.');
  ids.add(x.id);
  if(kind==='skills'&&!['force','agilite','volonte','logique','charisme'].includes(x.attribute))throw Error('Attribut de compétence invalide.');
  if(kind==='assets')for(const k of ['level','essence'])if(x[k]!==''&&(typeof x[k]!=='number'||!Number.isFinite(x[k])||x[k]<0))throw Error('Valeur d’atout invalide.');
 }
}
