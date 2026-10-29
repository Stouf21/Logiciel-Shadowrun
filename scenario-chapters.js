import {scenarioCharacterRecord,scenarioNpcs} from './scenario-npcs.js?v=0.28.0';
import {makeWorldRecord,validateWorld,UNKNOWN} from './world-schema.js?v=0.28.0';
import {scenarioMembers} from './scenarios.js?v=0.28.0';
import {chapterVehicleFields} from './chapter-schema.js?v=0.28.0';

const scenario=(state,id)=>{const r=state.world.records.find(r=>r.id===id&&r.kind==='scenario');if(!r)throw Error('Scénario introuvable.');return r;};
const secretLink=(world,link)=>link.visibility==='secret'||world.records.some(r=>(r.id===link.from||r.id===link.to)&&r.isSecret);
const connects=(link,a,b)=>link.from===a&&link.to===b||link.from===b&&link.to===a;
export function scenarioChapters(state,id,{includeSecrets=false}={}){
 const s=scenario(state,id);
 if(s.isSecret&&!includeSecrets)return [];
 const all=s.chapters??scenarioMembers(state.world,id,'event',{includeSecrets:true}).map(e=>{
  const links=state.world.relations.filter(l=>l.from===e.id||l.to===e.id),members=state.world.records.filter(r=>r.kind==='character'&&links.some(l=>connects(l,e.id,r.id)));
  return {id:'chapter-'+e.id,title:e.name,notes:e.publicInfo===UNKNOWN?'':e.publicInfo,date:e.fields.date===UNKNOWN?'':e.fields.date,isSecret:e.isSecret||state.world.relations.some(l=>connects(l,id,e.id)&&secretLink(state.world,l)),characterIds:members.map(r=>r.id),secretCharacterIds:members.filter(r=>r.isSecret||links.some(l=>connects(l,e.id,r.id)&&secretLink(state.world,l))).map(r=>r.id),vehicles:[],legacyEventId:e.id};
 });
 return all.filter(c=>includeSecrets||!c.isSecret);
}
function replaceChapters(state,id,chapters){
 const next={...state,world:{...state.world,records:state.world.records.map(r=>r.id===id?{...r,chapters}:r)}};validateWorld(next.world);return next;
}
function updateChapter(state,id,chapterId,transform){
 const chapters=scenarioChapters(state,id,{includeSecrets:true});if(!chapters.some(c=>c.id===chapterId))throw Error('Chapitre introuvable.');
 return replaceChapters(state,id,chapters.map(c=>c.id===chapterId?transform(c):c));
}
export function createScenario(state,title){
 if(typeof title!=='string'||!title.trim()||title.trim().length>200)throw Error('Indiquez un titre de scénario (200 caractères maximum).');
 const record=makeWorldRecord('scenario','scenario-'+crypto.randomUUID(),title.trim(),{chapters:[],publicInfo:''},{workingTitle:title.trim(),status:'Préparation'});
 const next={...state,world:{...state.world,records:[...state.world.records,record]}};validateWorld(next.world);return {state:next,id:record.id};
}
export function addChapter(state,id,afterId=null,title){
 const chapters=scenarioChapters(state,id,{includeSecrets:true});
 if(afterId!==null&&!chapters.some(c=>c.id===afterId))throw Error('Position du nouveau chapitre introuvable.');
 const chapter={id:'chapter-'+crypto.randomUUID(),title:title?.trim()||'Chapitre '+(chapters.length+1),notes:'',date:'',isSecret:false,characterIds:[],secretCharacterIds:[],vehicles:[]};
 const index=afterId===null?0:chapters.findIndex(c=>c.id===afterId)+1;
 return {state:replaceChapters(state,id,[...chapters.slice(0,index),chapter,...chapters.slice(index)]),id:chapter.id};
}
export function editChapter(state,id,chapterId,key,value){
 if(!['title','notes','date','isSecret'].includes(key))throw Error('Champ de chapitre invalide.');
 return updateChapter(state,id,chapterId,c=>({...c,[key]:typeof value==='string'&&key==='title'?value.trim():value}));
}
export function removeChapter(state,id,chapterId){
 const chapters=scenarioChapters(state,id,{includeSecrets:true});if(!chapters.some(c=>c.id===chapterId))throw Error('Chapitre introuvable.');
 return replaceChapters(state,id,chapters.filter(c=>c.id!==chapterId));
}
export function attachChapterCharacter(state,id,chapterId,characterId){
 const record=scenarioCharacterRecord(state,id,characterId);if(!record)throw Error('Personnage introuvable.');
 return updateChapter(state,id,chapterId,c=>c.characterIds.includes(characterId)?c:{...c,characterIds:[...c.characterIds,characterId],secretCharacterIds:record.isSecret?[...c.secretCharacterIds,characterId]:c.secretCharacterIds});
}
export function detachChapterCharacter(state,id,chapterId,characterId){return updateChapter(state,id,chapterId,c=>({...c,characterIds:c.characterIds.filter(x=>x!==characterId),secretCharacterIds:c.secretCharacterIds.filter(x=>x!==characterId)}));}
export function chapterCharacters(state,chapter,{includeSecrets=false,scenarioId}={}){
 const locals=new Map(scenarioNpcs(state,scenarioId).map(n=>[n.record.id,n.record]));
 return chapter.characterIds.map(id=>locals.get(id)??state.world.records.find(r=>r.id===id)).filter(r=>r&&(locals.has(r.id)||includeSecrets||!r.isSecret&&!chapter.secretCharacterIds.includes(r.id)));
}
export function addChapterVehicle(state,id,chapterId,row){
 const vehicle={...row,...Object.fromEntries(chapterVehicleFields.map(k=>[k,String(row[k]??'')])),id:'chapter-vehicle-'+crypto.randomUUID(),isSecret:row.isSecret??false};
 return updateChapter(state,id,chapterId,c=>({...c,vehicles:[...c.vehicles,vehicle]}));
}
export function editChapterVehicle(state,id,chapterId,vehicleId,key,value){
 if(![...chapterVehicleFields,'isSecret'].includes(key))throw Error('Champ de véhicule invalide.');
 return updateChapter(state,id,chapterId,c=>{if(!c.vehicles.some(v=>v.id===vehicleId))throw Error('Véhicule introuvable.');return {...c,vehicles:c.vehicles.map(v=>v.id===vehicleId?{...v,[key]:value}:v)};});
}
export function removeChapterVehicle(state,id,chapterId,vehicleId){return updateChapter(state,id,chapterId,c=>({...c,vehicles:c.vehicles.filter(v=>v.id!==vehicleId)}));}
export function placeChapter(state,id,chapterId,targetId,edge='before',{includeSecrets=false}={}){
 if(!['before','after'].includes(edge))throw Error('Position de chapitre invalide.');
 const all=scenarioChapters(state,id,{includeSecrets:true}),visible=all.filter(c=>includeSecrets||!c.isSecret).map(c=>c.id);
 if(!visible.includes(chapterId)||!visible.includes(targetId))throw Error('Choisissez deux chapitres visibles.');
 if(chapterId===targetId)return state;
 const ids=visible.filter(x=>x!==chapterId),index=ids.indexOf(targetId)+(edge==='after'?1:0);ids.splice(index,0,chapterId);
 const map=new Map(all.map(c=>[c.id,c])),shown=new Set(visible);let cursor=0;
 return replaceChapters(state,id,all.map(c=>shown.has(c.id)?map.get(ids[cursor++]):c));
}
export function moveChapter(state,id,chapterId,direction,options={}){
 if(![-1,1].includes(direction))throw Error('Déplacement invalide.');
 const visible=scenarioChapters(state,id,options),index=visible.findIndex(c=>c.id===chapterId);if(index<0)throw Error('Chapitre introuvable.');
 const next=visible[index+direction];return next?placeChapter(state,id,chapterId,next.id,direction===-1?'before':'after',options):state;
}
