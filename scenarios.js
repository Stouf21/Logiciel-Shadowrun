import {validateWorld,UNKNOWN} from './world-schema.js?v=0.15.0';
import {seedRecords} from './world-data.js?v=0.15.0';
import {normalize,relationIsSecret} from './world.js?v=0.15.0';

const scenarioFor=(state,id)=>{const r=state.world.records.find(r=>r.id===id&&r.kind==='scenario');if(!r)throw Error('Scénario introuvable.');return r;};
const connects=(r,a,b)=>(r.from===a&&r.to===b)||(r.from===b&&r.to===a);
const withWorld=(state,changes)=>{const next={...state,world:{...state.world,...changes}};validateWorld(next.world);return next;};

export function scenarioMembers(world,id,kind,{includeSecrets=false}={}){
 const links=world.relations.filter(r=>(r.from===id||r.to===id)&&(includeSecrets||!relationIsSecret(world,r)));
 const ids=new Set(links.map(r=>r.from===id?r.to:r.from));
 const records=world.records.filter(r=>ids.has(r.id)&&r.kind===kind);
 if(kind!=='event')return records;
 const order=world.records.find(r=>r.id===id)?.timelineOrder??[];
 // Les relations existantes donnent le premier ordre local, sans inventer de dates.
 const ordered=[...new Set([...order,...links.map(r=>r.from===id?r.to:r.from)])];
 return records.sort((a,b)=>ordered.indexOf(a.id)-ordered.indexOf(b.id));
}

export function attachScenarioRecord(state,scenarioId,recordId){
 const scenario=scenarioFor(state,scenarioId),record=state.world.records.find(r=>r.id===recordId);
 if(!record||!['character','event'].includes(record.kind))throw Error('Choisissez un personnage ou un événement.');
 if(state.world.relations.some(r=>connects(r,scenarioId,recordId)))return state;
 const relation={id:'rel-'+crypto.randomUUID(),from:scenarioId,to:recordId,type:'Associé à',description:UNKNOWN,confidence:'Renseigné par le MJ',visibility:scenario.isSecret||record.isSecret?'secret':'public',evolution:UNKNOWN};
 const records=record.kind==='event'&&scenario.timelineOrder?state.world.records.map(r=>r.id===scenarioId?{...r,timelineOrder:[...r.timelineOrder,recordId]}:r):state.world.records;
 return withWorld(state,{records,relations:[...state.world.relations,relation]});
}

export function detachScenarioRecord(state,scenarioId,recordId){
 scenarioFor(state,scenarioId);
 const record=state.world.records.find(r=>r.id===recordId);
 if(!record||!['character','event'].includes(record.kind))throw Error('Choisissez un personnage ou un événement.');
 const removed=state.world.relations.filter(r=>connects(r,scenarioId,recordId));
 return withWorld(state,{
  relations:state.world.relations.filter(r=>!removed.includes(r)),
  deletedRelationIds:[...new Set([...(state.world.deletedRelationIds??[]),...removed.map(r=>r.id)])],
  records:state.world.records.map(r=>r.id===scenarioId&&r.timelineOrder?{...r,timelineOrder:r.timelineOrder.filter(id=>id!==recordId)}:r)
 });
}

export function moveScenarioEvent(state,scenarioId,eventId,direction,{includeSecrets=false}={}){
 scenarioFor(state,scenarioId);if(![-1,1].includes(direction))throw Error('Déplacement invalide.');
 const visible=scenarioMembers(state.world,scenarioId,'event',{includeSecrets}),index=visible.findIndex(r=>r.id===eventId);
 if(index<0)throw Error('Événement absent de cette frise.');
 const neighbor=visible[index+direction];if(!neighbor)return state;
 const order=scenarioMembers(state.world,scenarioId,'event',{includeSecrets:true}).map(r=>r.id),a=order.indexOf(eventId),b=order.indexOf(neighbor.id);
 [order[a],order[b]]=[order[b],order[a]];
 return withWorld(state,{records:state.world.records.map(r=>r.id===scenarioId?{...r,timelineOrder:order}:r)});
}

export function placeScenarioEvent(state,scenarioId,eventId,targetId,edge='before',{includeSecrets=false}={}){
 scenarioFor(state,scenarioId);if(!['before','after'].includes(edge))throw Error('Position de dépôt invalide.');
 const visible=scenarioMembers(state.world,scenarioId,'event',{includeSecrets}).map(r=>r.id);
 if(!visible.includes(eventId)||!visible.includes(targetId))throw Error('Choisissez deux événements visibles de cette frise.');
 if(eventId===targetId)return state;
 const reordered=visible.filter(id=>id!==eventId),index=reordered.indexOf(targetId)+(edge==='after'?1:0);
 reordered.splice(index,0,eventId);
 if(reordered.every((id,i)=>id===visible[i]))return state;
 const visibleIds=new Set(visible);let cursor=0;
 // Les événements masqués gardent leurs emplacements ; seul l’ordre visible change.
 const order=scenarioMembers(state.world,scenarioId,'event',{includeSecrets:true}).map(r=>visibleIds.has(r.id)?reordered[cursor++]:r.id);
 return withWorld(state,{records:state.world.records.map(r=>r.id===scenarioId?{...r,timelineOrder:order}:r)});
}

export function deleteScenario(state,id){
 const scenario=scenarioFor(state,id),names=[scenario.name,...scenario.aliases].map(normalize);
 const seedIds=seedRecords.filter(r=>r.kind==='scenario'&&(r.id===id||!state.world.records.some(x=>x.id===r.id))&&[r.name,...r.aliases].some(n=>names.includes(normalize(n)))).map(r=>r.id);
 const removed=state.world.relations.filter(r=>r.from===id||r.to===id);
 return withWorld(state,{
  records:state.world.records.filter(r=>r.id!==id),relations:state.world.relations.filter(r=>!removed.includes(r)),
  deletedRecordIds:[...new Set([...(state.world.deletedRecordIds??[]),id,...seedIds])],
  deletedRelationIds:[...new Set([...(state.world.deletedRelationIds??[]),...removed.map(r=>r.id)])]
 });
}
