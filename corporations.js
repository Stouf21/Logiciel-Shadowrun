import {baseCorporations} from './corporations-data.js?v=0.12.0';
export {baseCorporations};
export const corporationTiers=['AAA','AA','A','Non classée','Alliance'];
export const corporationRelations=['Neutre','Employeur','Alliée','Hostile','À surveiller'];
export function getCorporations(state){return (state.corporations??baseCorporations).map(x=>({...x}));}
const normalized=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr');
export function corporationMatches(corp,query){return normalized([corp.name,corp.aliases,corp.tier,corp.sectors,corp.hq,corp.leader,corp.summary,corp.relationship,corp.contacts,corp.objectives,corp.secrets,corp.notes,corp.source].join(' ')).includes(normalized(query.trim()));}
export function validateCorporations(items){
 if(items===undefined)return;
 if(!Array.isArray(items)||items.length>1000)throw Error('Liste de corporations invalide.');
 const ids=new Set();
 for(const item of items){
  if(!item||typeof item.id!=='string'||!item.id.trim()||ids.has(item.id))throw Error('Identifiant de corporation invalide ou dupliqué.');
  ids.add(item.id);
  for(const key of ['name','aliases','tier','sectors','hq','leader','summary','source','origin','relationship','contacts','objectives','secrets','notes'])if(typeof item[key]!=='string'||item[key].length>30000)throw Error('Champ de corporation invalide.');
  if(!item.name.trim()||!corporationTiers.includes(item.tier)||!corporationRelations.includes(item.relationship)||!['book','custom'].includes(item.origin))throw Error('Fiche de corporation invalide.');
 }
}
