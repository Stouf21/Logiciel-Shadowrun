import {validateWorld} from './world-schema.js?v=0.28.0';
export function scenarioNpcs(state,scenarioId){return state.world.records.find(r=>r.id===scenarioId&&r.kind==='scenario')?.localNpcs??[];}
export function scenarioNpc(state,scenarioId,npcId){const pair=scenarioNpcs(state,scenarioId).find(n=>n.record.id===npcId);if(!pair)throw Error('PNJ introuvable dans ce scénario.');return pair;}
export function scenarioCharacterRecord(state,scenarioId,id){return scenarioNpcs(state,scenarioId).find(n=>n.record.id===id)?.record??state.world.records.find(r=>r.id===id&&r.kind==='character');}
export function scenarioCharacterRecords(state,scenarioId){return [...state.world.records.filter(r=>r.kind==='character'),...scenarioNpcs(state,scenarioId).map(n=>n.record)];}
// Only the character editor sees this temporary projection. It is never saved as a campaign.
export function scenarioNpcEditorState(state,scenarioId,npcId){
 const pair=scenarioNpc(state,scenarioId,npcId);
 return {...state,entries:[...state.entries,pair.entry],world:{...state.world,records:[...state.world.records.map(r=>r.id===scenarioId?{...r,localNpcs:r.localNpcs.filter(n=>n.record.id!==npcId)}:r),pair.record]}};
}
export function saveScenarioNpcEdits(state,scenarioId,npcId,edited){
 const previous=scenarioNpc(state,scenarioId,npcId),entry=edited.entries.find(e=>e.id===previous.entry.id),record=edited.world.records.find(r=>r.id===npcId);
 if(!entry||!record||record.kind!=='character'||record.gameEntryId!==entry.id)throw Error('Fiche du PNJ de scénario invalide.');
 const pair={...previous,entry,record:{...record,name:entry.name,fields:{...record.fields,metatype:entry.profile?.metatype??record.fields.metatype}}};
 const next={...state,world:{...state.world,records:state.world.records.map(r=>r.id===scenarioId?{...r,localNpcs:r.localNpcs.map(n=>n.record.id===npcId?pair:n)}:r)}};validateWorld(next.world);return next;
}
export function deleteScenarioNpc(state,scenarioId,npcId){return deleteScenarioNpcs(state,scenarioId,[npcId]);}
export function deleteScenarioNpcs(state,scenarioId,npcIds){
 const scenario=state.world.records.find(r=>r.id===scenarioId&&r.kind==='scenario');if(!scenario)throw Error('Scénario introuvable.');
 const selected=npcIds??scenarioNpcs(state,scenarioId).map(n=>n.record.id);if(!Array.isArray(selected)||new Set(selected).size!==selected.length)throw Error('Sélection de PNJ invalide.');selected.forEach(id=>scenarioNpc(state,scenarioId,id));if(!selected.length)return state;
 const ids=new Set(selected),next={...state,world:{...state.world,records:state.world.records.map(r=>r.id!==scenarioId?r:{...r,localNpcs:r.localNpcs.filter(n=>!ids.has(n.record.id)),...(r.chapters?{chapters:r.chapters.map(c=>({...c,characterIds:c.characterIds.filter(id=>!ids.has(id)),secretCharacterIds:c.secretCharacterIds.filter(id=>!ids.has(id)),vehicles:c.vehicles.map(v=>{if(!ids.has(v.ownerId))return v;const {ownerId,...vehicle}=v;return vehicle;})}))}:{})})}};
 validateWorld(next.world);return next;
}
// V0.22–0.23 put generated NPCs in the shared directory. Move only identifiable
// generated pairs with a known scenario; preserve any character already used elsewhere.
export function migrateScenarioNpcs(state){
 if(!state.world)return state;
 const source=state.world,scenarios=source.records.filter(r=>r.kind==='scenario'),entries=new Map(state.entries.map(e=>[e.id,e]));
 const candidates=source.records.filter(r=>r.kind==='character'&&r.id.startsWith('npc-')&&entries.get(r.gameEntryId)?.id.startsWith('npc-sheet-')&&entries.get(r.gameEntryId)?.profile?.npc);
 if(!candidates.length)return state;
 let records=[...source.records],removedRecords=new Set(),removedEntries=new Set(),removedRelations=new Set();
 for(const record of candidates){
  const entry=entries.get(record.gameEntryId),links=source.relations.filter(l=>l.from===record.id||l.to===record.id);
  const owners=scenarios.filter(s=>s.chapters?.some(c=>c.characterIds.includes(record.id)||c.vehicles.some(v=>v.ownerId===record.id))||links.some(l=>l.from===s.id||l.to===s.id));
  if(!owners.length)continue;
  const ownerIds=new Set(owners.map(s=>s.id)),eventIds=new Set(owners.flatMap(s=>(s.chapters??[]).map(c=>c.legacyEventId).filter(Boolean)));
  const outsideLink=links.some(l=>{const id=l.from===record.id?l.to:l.from;return !ownerIds.has(id)&&!eventIds.has(id);});
  const onMap=[...(state.tokens??[]),...(state.mapState?.dijon.positions??[])].some(p=>p.id===record.id||p.id===entry.id);
  if(outsideLink||onMap)continue;
  owners.forEach((owner,index)=>{
   const id=index?'npc-local-'+owner.id+'-'+record.id:record.id,entryId=index?'npc-sheet-local-'+owner.id+'-'+entry.id:entry.id;
   const pair=structuredClone({record:{...record,id,name:entry.name,aliases:[...new Set([...record.aliases,...(record.name!==entry.name?[record.name]:[])])],gameEntryId:entryId,fields:{...record.fields,metatype:entry.profile?.metatype??record.fields.metatype}},entry:{...entry,id:entryId},legacyRelations:links});
   records=records.map(s=>s.id!==owner.id?s:{...s,localNpcs:[...(s.localNpcs??[]),pair],...(s.chapters?{chapters:s.chapters.map(c=>({...c,characterIds:c.characterIds.map(x=>x===record.id?id:x),secretCharacterIds:c.secretCharacterIds.map(x=>x===record.id?id:x),vehicles:c.vehicles.map(v=>v.ownerId===record.id?{...v,ownerId:id}:v)}))}:{})});
  });
  removedRecords.add(record.id);removedEntries.add(entry.id);links.forEach(l=>removedRelations.add(l.id));
 }
 if(!removedRecords.size)return state;
 return {...state,entries:state.entries.filter(e=>!removedEntries.has(e.id)),world:{...source,records:records.filter(r=>!removedRecords.has(r.id)),relations:source.relations.filter(l=>!removedRelations.has(l.id)),...(removedRelations.size?{deletedRelationIds:[...new Set([...(source.deletedRelationIds??[]),...removedRelations])]}:{})}};
}
