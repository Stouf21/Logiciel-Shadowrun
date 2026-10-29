import {migrateScenarioNpcs} from './scenario-npcs.js?v=0.29.0';
import {characterCategories,unclassifiedCharacter} from './character-options.js?v=0.29.0';
import {chapterSearchText,chapterHasCharacter} from './chapter-schema.js?v=0.29.0';
import {seedRecords,seedRelations,seedSettings} from './world-data.js?v=0.29.0';
import {makeWorldRecord,worldFields,UNKNOWN,validateWorld} from './world-schema.js?v=0.29.0';
import {getCorporations} from './corporations.js?v=0.29.0';
import {buildingSearchText} from './building-schema.js?v=0.29.0';
export const normalize=value=>String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr').trim().replace(/[’‘]/g,"'");
export const isCorporationRecord=r=>r.kind==='corporation'||r.kind==='faction'&&(!!r.corporationId||/\b(corporation|corporatiste|filiale corporatiste)\b/.test(normalize(r.fields?.type)));
const cloneRecord=r=>({...r,aliases:[...r.aliases],fields:{...r.fields},kind:isCorporationRecord(r)?'corporation':r.kind});
const known=v=>['string','number'].includes(typeof v)&&String(v).trim()!==''&&!['a definir','informations a completer','a developper'].includes(normalize(v));
function stableId(prefix,key){let a=2166136261,b=2246822507;for(const c of String(key)){a=Math.imul(a^c.charCodeAt(0),16777619);b=Math.imul(b^c.charCodeAt(0),3266489909);}return prefix+(a>>>0).toString(16).padStart(8,'0')+(b>>>0).toString(16).padStart(8,'0');}
const aliasList=r=>Array.isArray(r.aliases)?r.aliases.filter(x=>typeof x==='string'):typeof r.aliases==='string'?r.aliases.split(','):[];
function aliasesMatch(a,b){return [a.name,...aliasList(a)].some(x=>[b.name,...aliasList(b)].some(y=>normalize(x)===normalize(y)));}
function fillMissing(existing,seed){return {...seed,...existing,aliases:[...new Set([...(existing.aliases??[]),...(seed.aliases??[]),...(existing.id!==seed.id?[seed.name]:[])])],fields:{...seed.fields,...existing.fields}};}
export function mergeWorld(state){
 const original=state.world;
 const deletedRecords=new Set(original?.deletedRecordIds??[]),deletedRelations=new Set(original?.deletedRelationIds??[]);
 const records=(original?.records??[]).map(cloneRecord),remap=new Map();
 for(const seed of seedRecords){if(deletedRecords.has(seed.id))continue;const match=records.find(r=>r.id===seed.id)||records.find(r=>r.kind===seed.kind&&aliasesMatch(r,seed));if(match){remap.set(seed.id,match.id);Object.assign(match,fillMissing(match,seed));}else{records.push(cloneRecord(seed));remap.set(seed.id,seed.id);}}
 const gameEntries=state.entries.filter(e=>characterCategories.includes(e.category));
 const bound=new Set();
 for(const r of records)if(r.building)r.building={...r.building,ownerId:remap.get(r.building.ownerId)??r.building.ownerId};
 for(const r of records.filter(r=>r.kind==='character')){
  const entry=gameEntries.find(e=>e.id===r.gameEntryId)||gameEntries.find(e=>!bound.has(e.id)&&aliasesMatch(r,e));
  if(!entry){r.gameEntryId=null;continue;}bound.add(entry.id);r.gameEntryId=entry.id;
  const candidates={metatype:entry.profile?.metatype??entry.metatype,age:entry.age,gender:entry.gender,role:entry.role,physical:entry.description,skills:entry.profile?.skills,implants:entry.profile?.assets};
  for(const [k,v] of Object.entries(candidates))if(!known(r.fields[k])&&known(v))r.fields[k]=String(v);
  if(!known(r.publicInfo)&&known(entry.description))r.publicInfo=entry.description;
  if(!known(r.gmNotes)&&known(entry.notes))r.gmNotes=entry.notes;
 }
 for(const entry of gameEntries.filter(e=>!bound.has(e.id))){const r=makeWorldRecord('character',stableId('char-existing-',entry.id),entry.name,{gameEntryId:entry.id,publicInfo:entry.description||UNKNOWN,gmNotes:entry.notes||UNKNOWN,source:'Fiche de jeu préexistante conservée'},{metatype:entry.profile?.metatype||UNKNOWN,age:String(entry.age??UNKNOWN),gender:known(entry.gender)?String(entry.gender):UNKNOWN,role:known(entry.role)?String(entry.role):UNKNOWN});records.push(r);}
 const corporations=getCorporations(state),corpBound=new Set();
 for(const r of records.filter(r=>r.kind==='corporation')){
  const corp=corporations.find(c=>c.id===r.corporationId)||corporations.find(c=>!corpBound.has(c.id)&&aliasesMatch(r,{...c,aliases:c.aliases.split(',').map(x=>x.trim())}));
  if(!corp){r.corporationId=null;continue;}r.corporationId=corp.id;corpBound.add(corp.id);
  if(!known(r.gmNotes)&&known(corp.notes))r.gmNotes=corp.notes;
  if(!known(r.secrets)&&known(corp.secrets))r.secrets=corp.secrets;
  if(!known(r.fields.objectives)&&known(corp.objectives))r.fields.objectives=corp.objectives;
 }
 for(const c of corporations.filter(c=>!corpBound.has(c.id)))records.push(makeWorldRecord('corporation',stableId('faction-corporation-',c.id),c.name,{corporationId:c.id,aliases:c.aliases.split(',').map(x=>x.trim()).filter(Boolean),publicInfo:c.summary||UNKNOWN,secrets:c.secrets||UNKNOWN,gmNotes:c.notes||UNKNOWN,source:c.source},{officialName:c.name,type:'Corporation '+c.tier,legal:c.sectors||UNKNOWN,objectives:c.objectives||UNKNOWN,headquarters:c.hq||UNKNOWN,leaders:c.leader||UNKNOWN,contacts:c.contacts||UNKNOWN}));
 for(const r of records.filter(r=>['zone','place'].includes(r.kind)))if(known(r.fields.faction)&&records.some(c=>c.kind==='corporation'&&[c.name,...c.aliases].some(name=>normalize(name)===normalize(r.fields.faction)))){if(!known(r.fields.corporation))r.fields.corporation=r.fields.faction;r.fields.faction=UNKNOWN;}
 const relations=(original?.relations??[]).map(r=>({...r}));
 const recordIds=new Set(records.map(r=>r.id));
 for(const seed of seedRelations){const from=remap.get(seed.from)??seed.from,to=remap.get(seed.to)??seed.to;if(!deletedRelations.has(seed.id)&&recordIds.has(from)&&recordIds.has(to)&&!relations.some(r=>r.id===seed.id))relations.push({...seed,from,to});}
 const world={...original,version:1,settings:{...seedSettings,...original?.settings},records,relations};const next=migrateScenarioNpcs({...state,world});validateWorld(next.world);return next;
}
export function recordSecretText(r){const secretFields=worldFields[r.kind].filter(([, ,scope])=>scope==='secret').map(([key])=>r.fields[key]??'');return [r.secrets,r.gmNotes,r.consequences,r.history,...secretFields,buildingSearchText(r,true),chapterSearchText(r,true)].join(' ');}
export function recordPublicText(r){const publicFields=worldFields[r.kind].filter(([, ,scope])=>scope!=='secret').map(([key])=>r.fields[key]??'');return [r.name,...r.aliases,r.publicInfo,r.knownInfo,r.rumors,r.revealedInfo,r.state,r.discovery,...publicFields,buildingSearchText(r),chapterSearchText(r)].join(' ');}
export function relationIsSecret(world,relation){return relation.visibility==='secret'||world.records.some(r=>(r.id===relation.from||r.id===relation.to)&&r.isSecret);}
export function relatedRecords(world,id,includeSecrets=false){return world.relations.filter(r=>(r.from===id||r.to===id)&&(includeSecrets||!relationIsSecret(world,r))).map(relation=>({relation,other:world.records.find(r=>r.id===(relation.from===id?relation.to:relation.from))}));}
export function worldSearch(world,query='',{includeSecrets=false,kind='',filters={}}={}){
 const q=normalize(query);
 return world.records.filter(r=>!kind||r.kind===kind).filter(r=>{
  if(filters.metatype&&r.fields.metatype!==filters.metatype)return false;
  if(filters.life&&r.fields.life!==filters.life)return false;
  if(filters.discovery&&r.discovery!==filters.discovery)return false;
  if(filters.security&&r.fields.security!==filters.security)return false;
  if(filters.authority&&r.fields.authority!==filters.authority)return false;
  for(const [key,expectedKind] of [['faction','faction'],['corporation','corporation'],['zone','zone'],['scenario','scenario']])if(filters[key]){
   if(!world.records.some(x=>x.id===filters[key]&&x.kind===expectedKind))return false;
   const direct=matchesFacet(world,r,key,filters[key],includeSecrets);
   if(!direct&&r.id!==filters[key])return false;
  }
  return true;
 }).flatMap(r=>{
  const visible=!r.isSecret&&normalize(recordPublicText(r)).includes(q);
  const secret=normalize(recordSecretText(r)).includes(q)||r.isSecret&&normalize(recordPublicText(r)).includes(q);
  if(!q&&r.isSecret&&!includeSecrets)return [];
  if(q&&!visible&&!secret)return [];
  return [{record:r,protected:!includeSecrets&&(r.isSecret||!visible&&secret),secretMatch:!visible&&secret}];
 });
}
export function worldDiagnostics(state){
 const w=state.world;if(!w)return [];
 const result=[];const ids=new Set(w.records.map(r=>r.id));
 for(const rel of w.relations)if(!ids.has(rel.from)||!ids.has(rel.to))result.push('Relation invalide : '+rel.id);
 const names=new Map();for(const e of state.entries.filter(e=>characterCategories.includes(e.category))){const k=normalize(e.name);if(names.has(k))result.push('Plusieurs fiches de jeu portent le nom '+e.name+' ; elles sont conservées séparément.');else names.set(k,true);}
 return result;
}
export function upsertWorldRecord(state,record){const records=state.world.records.some(r=>r.id===record.id)?state.world.records.map(r=>r.id===record.id?record:r):[...state.world.records,record];const next={...state,world:{...state.world,records}};validateWorld(next.world);return next;}

function matchesFacet(world,record,kind,id,includeSecrets){
 const links=world.relations.filter(r=>includeSecrets||!relationIsSecret(world,r));
 const adjacent=recordId=>links.filter(r=>r.from===recordId||r.to===recordId).map(r=>r.from===recordId?r.to:r.from);
 if(record.id===id||adjacent(record.id).includes(id))return true;
 if(kind==='corporation'&&record.building?.ownerId===id&&world.records.some(r=>r.id===id&&(includeSecrets||!r.isSecret)))return true;
 if(kind==='scenario')return chapterHasCharacter(world,id,record.id,includeSecrets);
 const locations=new Set(record.kind==='zone'||record.kind==='place'?[record.id]:[]);
 for(const otherId of adjacent(record.id)){const other=world.records.find(r=>r.id===otherId);if(other&&['place','zone'].includes(other.kind))locations.add(other.id);}
 for(let depth=0;depth<3;depth++)for(const relation of links.filter(r=>r.type==='Situé dans'))if(locations.has(relation.from))locations.add(relation.to);
 if(kind==='zone')return locations.has(id);
 return [...locations].some(location=>adjacent(location).includes(id));
}

// Reading an unconfigured character must not create a saved game profile.
export function characterEntryForRecord(state,record){
 const existing=state.entries.find(e=>e.id===record.gameEntryId);if(existing)return existing;
 const profile={};if(known(record.fields.metatype))profile.metatype=record.fields.metatype;
 return {id:record.id,name:record.name,category:unclassifiedCharacter,description:known(record.fields.role)?record.fields.role:'',notes:'',profile};
}
