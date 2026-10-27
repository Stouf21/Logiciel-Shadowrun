import {spellMatches} from './spells.js?v=0.18.0';
import {getCatalogs} from './catalog.js?v=0.18.0';
import {getCorporations} from './corporations.js?v=0.18.0';
import {groups} from './campaign.js?v=0.18.0';
import {normalize,worldSearch} from './world.js?v=0.18.0';
import {profileSearchText} from './sheet.js?v=0.18.0';
import {describeSkill} from './skill-details.js?v=0.18.0';
import {rules,ruleMatches} from './rules-data.js?v=0.18.0';
import {references} from './references.js?v=0.18.0';
export const searchTabs=[['all','Tout'],['skills','Compétences'],['assets','Atouts'],['spells','Sorts'],['weapons','Armes'],['vehicles','Véhicules'],['drones','Drones'],['spirits','Esprits'],['drugs','Drogues'],['armor','Armures'],['equipment','Équipement'],['cyberware','Cyberware'],['bioware','Bioware'],['programs','Programmes'],['decks','Cyberdecks'],['focus','Focus'],['adept','Pouvoirs d’adepte'],['contacts','Contacts'],['traits','Traits'],['world','Dossiers de campagne'],['rules','Règles'],['sources','Sources']];
export function resourceTabs(item){
 const category=normalize(item.category),name=normalize(item.name),tags=[];
 for(const [id,pattern] of [['spells',/\bsorts?\b/],['weapons',/\barmes?\b/],['vehicles',/\bvehicules?\b/],['drones',/\bdrones?\b/],['spirits',/\besprits?\b/],['drugs',/\bdrogues?\b/],['armor',/\barmures?\b/],['equipment',/\b(equipements?|accessoires?|objets?)\b/],['cyberware',/\bcyberware\b/],['bioware',/\bbioware\b/],['programs',/\bprogrammes?\b/],['decks',/^cyberdecks?$/],['focus',/\bfocus\b/],['adept',/\badepte\b/],['contacts',/\bcontacts?\b/],['traits',/\btraits?\b/]])if(pattern.test(category))tags.push(id);
 if(category==='modele a personnaliser'){if(name.startsWith('drone '))tags.push('drones');if(name.startsWith('vehicule '))tags.push('vehicles');}
 return tags;
}
const matches=(values,q)=>normalize(values.filter(v=>v!==undefined&&v!==null).join(' ')).includes(q);
export function globalSearch(state,query='',{includeSecrets=false,tab='all'}={}){
 const q=normalize(query),rows=[],catalogs=getCatalogs(state),worldHits=worldSearch(state.world,query,{includeSecrets});
 for(const hit of worldHits)rows.push({key:'world:'+hit.record.id,type:'world',item:hit.record,hit,protected:hit.protected,tabs:['world']});
 const represented=new Set(worldHits.map(hit=>hit.record.gameEntryId).filter(Boolean));
 for(const item of state.entries){
  const character=groups.characters.includes(item.category),record=character?state.world.records.find(r=>r.kind==='character'&&r.gameEntryId===item.id):null;
  if(character&&represented.has(item.id))continue;
  const publicMatch=matches([item.name,item.category,item.description,profileSearchText(item.profile)],q),secretMatch=q&&matches([item.notes],q);
  if(!publicMatch&&!secretMatch||record?.isSecret&&!q&&!includeSecrets)continue;
  const protectedHit=!includeSecrets&&(record?.isSecret||!publicMatch&&secretMatch);
  rows.push({key:'entry:'+item.id,type:'entry',item,record,protected:!!protectedHit,tabs:character?[]:groups.rules.includes(item.category)?['rules']:resourceTabs(item)});
 }
 for(const kind of ['skills','assets'])for(const item of catalogs[kind]){
  const detail=kind==='skills'?describeSkill(item):null;
  if(!matches([item.name,item.category,item.description,item.conditions,item.price,item.source,detail?.summary,...(detail?.specializations??[]).map(s=>s.name+' '+s.description)],q))continue;
  rows.push({key:kind+':'+item.id,type:kind,item,detail,protected:false,tabs:kind==='skills'?['skills']:['assets',...resourceTabs(item)]});
 }
 for(const item of catalogs.spells.filter(s=>s.origin==='book-v2'))if(spellMatches(item,query))rows.push({key:'spell:'+item.id,type:'spell',item,protected:false,tabs:['spells']});
 for(const item of getCorporations(state)){
  const publicMatch=matches([item.name,item.aliases,item.tier,item.sectors,item.hq,item.leader,item.summary,item.source,item.relationship,item.contacts],q),secretMatch=q&&matches([item.objectives,item.secrets,item.notes],q);
  if(publicMatch||secretMatch)rows.push({key:'corporation:'+item.id,type:'corporation',item,protected:!includeSecrets&&!publicMatch,tabs:[]});
 }
 for(const item of rules)if(!q||ruleMatches(item,query))rows.push({key:'rule:'+item.id,type:'rule',item,protected:false,tabs:['rules']});
 for(const [index,item] of references.entries())if(matches([item.title,item.source,item.status,item.text],q))rows.push({key:'source:'+index,type:'source',item,protected:false,tabs:['sources']});
 const counts=Object.fromEntries(searchTabs.map(([id])=>[id,id==='all'?rows.length:rows.filter(r=>r.tabs.includes(id)).length]));
 return {rows:rows.filter(r=>tab==='all'||r.tabs.includes(tab)),counts};
}
