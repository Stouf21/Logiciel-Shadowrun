import {getSpellCatalog} from './spells.js?v=0.29.0';
import {baseSkills,baseAssets} from './catalog-data.js?v=0.29.0';
export {baseSkills,baseAssets};
export function getCatalogs(state){return {spells:getSpellCatalog(state),skills:[...baseSkills,...(state.customSkills??[])],assets:[...baseAssets,...(state.customAssets??[])],equipment:(state.entries??[]).filter(item=>['Arme','Véhicule','Drone','Cyberdeck'].includes(item.category))};}
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

const assetFamilies=[
 ['Trait','Traits'],['Équipement','Équipement et accessoires'],['Arme','Armes'],['Armure','Armures'],
 ['Cyberware','Cyberware'],['Bioware','Bioware'],['Cyberdeck','Cyberdecks'],['Programme de cyberdeck','Programmes de cyberdeck'],
 ['Pouvoir d’adepte','Pouvoirs d’adepte'],['Esprit mentor','Esprits mentors'],['Focus','Focus'],['Contact','Contacts'],['Drogue','Drogues'],
 ['Modèle à personnaliser','Modèles à personnaliser'],['Trait (PNJ corrompu)','Traits — PNJ corrompus'],['Pouvoir d’adepte (PNJ corrompu)','Pouvoirs d’adepte — PNJ corrompus'],['Personnalisé','Créations personnelles']
];
const choiceText=value=>String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').toLocaleLowerCase('fr').replace(/\s+/g,' ').trim();
const assetCollator=new Intl.Collator('fr',{sensitivity:'base',numeric:true});
function choiceFamily(item){const category=String(item.category??'').trim(),key=choiceText(category);return assetFamilies.find(([id,label])=>choiceText(id)===key||choiceText(label)===key)??(['personnel','personnels','personnalises','creation personnelle'].includes(key)?assetFamilies.at(-1):[category||'Personnalisé',category||'Créations personnelles']);}
export function groupCharacterAssets(items,{query='',family='',nameFor=item=>item.name}={}){
 const words=choiceText(query).split(' ').filter(Boolean),groups=new Map();
 for(const item of items){
  if(!isCharacterAsset(item))continue;const [id,label]=choiceFamily(item);if(family&&id!==family)continue;
  const text=choiceText([nameFor(item),item.name,item.category,label,item.id.startsWith('custom-')?'création personnelle':''].join(' '));if(!words.every(word=>text.includes(word)))continue;
  if(!groups.has(id))groups.set(id,{id,label,items:[]});groups.get(id).items.push(item);
 }
 const rank=id=>{const index=assetFamilies.findIndex(([key])=>key===id);return index<0?assetFamilies.length:index;};
 return [...groups.values()].sort((a,b)=>rank(a.id)-rank(b.id)||assetCollator.compare(a.label,b.label)).map(group=>({...group,items:group.items.sort((a,b)=>assetCollator.compare(nameFor(a),nameFor(b))||assetCollator.compare(a.id,b.id))}));
}
