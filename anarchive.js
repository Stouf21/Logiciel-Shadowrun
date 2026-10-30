import {anarchiveEntries} from './anarchive-data.js?v=0.30.0';
export {anarchiveEntries};
export const anarchiveEdition='AnArchive · recueil 2021 · ancienne édition';
export const anarchiveCoverage={missing:'Référence supplémentaire',covered:'Déjà présent en V2',related:'Correspondance partielle'};
export const archiveText=value=>String(value??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr').replace(/œ/g,'oe').replace(/[’'−–-]/g,' ').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
const nameKey=value=>archiveText(value).replace(/\b(?:de|du|des|d|l|le|la|les)\b/g,'').replace(/\s/g,'');
const categoryKey=value=>archiveText(value).replace(/\besprits? mentors?\b/g,'esprit mentor').replace(/s$/,'');
function identityName(item){return categoryKey(item.category)==='esprit mentor'?nameKey(item.name.replace(/^esprits? mentors?\s*/i,'')):nameKey(item.name);}
const aliasIndex=new Map();
for(const row of anarchiveEntries)if(row.coverage==='covered')for(const id of row.referenceIds)aliasIndex.set(id,[...(aliasIndex.get(id)??[]),row.name,...row.aliases]);
export function anarchiveAliasesFor(id){return aliasIndex.get(id)??[];}
export function getAnarchiveCatalog(catalog={}){
 const current=[...(catalog.assets??[]),...(catalog.spells??[]),...(catalog.equipment??[])],byId=new Map(current.map(item=>[item.id,item])),personalByName=new Map();
 for(const item of current)if(item.id.startsWith('custom-')||!(item.id.startsWith('asset-')||item.id.startsWith('spell-v2-'))){const category=categoryKey(item.target==='drone'?'Drone':item.target==='vehicle'?'Véhicule':item.category),key=category+':'+identityName(item);personalByName.set(key,[...(personalByName.get(key)??[]),item]);}
 return anarchiveEntries.map(row=>{
  const personal=personalByName.get(categoryKey(row.category)+':'+identityName(row))??[];
  const references=[...new Set([...row.referenceIds.map(id=>byId.get(id)).filter(Boolean),...personal])];
  return {...row,coverage:personal.length?'covered':row.coverage,comparison:personal.length&&row.coverage!=='covered'?'Déjà enregistré dans votre catalogue personnel.':row.comparison,references};
 });
}
export function anarchiveSource(row){const pages=row.pages.join(', ');return 'AnArchive (2021), p. '+pages+' · ancienne édition';}
export function anarchiveMatches(row,query){const words=archiveText(query).split(' ').filter(Boolean),text=archiveText([row.name,row.category,row.family,row.section,row.summary,row.legacyNote,anarchiveSource(row),...row.aliases,...(row.references??[]).map(item=>item.name)].join(' '));return words.every(word=>text.includes(word));}
export function anarchiveStats(rows=anarchiveEntries){return Object.fromEntries(['missing','covered','related'].map(status=>[status,rows.filter(row=>row.coverage===status).length]));}
