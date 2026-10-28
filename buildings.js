import {emptyBuilding,validateBuilding} from './building-schema.js?v=0.27.0';
import {validateWorld,UNKNOWN} from './world-schema.js?v=0.27.0';
import {getMapShapes} from './map-shapes.js?v=0.27.0';
import {copyMapState,validateMapState} from './map-model.js?v=0.27.0';
const recordFor=(state,id)=>{const r=state.world.records.find(r=>r.id===id&&['zone','place'].includes(r.kind));if(!r)throw Error('Bâtiment introuvable.');return r;};
const save=(state,record)=>{const next={...state,world:{...state.world,records:state.world.records.map(r=>r.id===record.id?record:r)}};validateWorld(next.world);return next;};
export function saveBuilding(state,id,{building,name,description,security,gmNotes,isSecret}){
 const r=recordFor(state,id);validateBuilding(building);
 if(typeof name!=='string'||!name.trim()||name.length>200||![description,security,gmNotes].every(s=>typeof s==='string')||typeof isSecret!=='boolean')throw Error('Renseignez les informations du bâtiment.');
 const next=save(state,{...r,name:name.trim(),publicInfo:description.trim()||UNKNOWN,gmNotes:gmNotes.trim()||UNKNOWN,isSecret,fields:{...r.fields,security:security.trim()||UNKNOWN},building:structuredClone(building)});
 if(r.building?.color!==building.color){
  const mapState=copyMapState(state.mapState);mapState.dijon.shapes={...mapState.dijon.shapes};
  for(const mode of ['streets','cyberpunk'])mapState.dijon.shapes[mode]=getMapShapes(next,mode).map(s=>s.kind==='building'&&s.recordId===id?{...s,color:building.color}:s);
  validateMapState(mapState,undefined,new Map(next.world.records.map(r=>[r.id,r.kind])));return {...next,mapState};
 }
 return next;
}
export function saveBuildingPlan(state,recordId,plan){
 const r=recordFor(state,recordId),building=r.building??emptyBuilding();
 const plans=building.plans.some(p=>p.id===plan.id)?building.plans.map(p=>p.id===plan.id?structuredClone(plan):p):[...building.plans,structuredClone(plan)];
 return save(state,{...r,building:{...building,plans}});
}
export function removeBuildingPlan(state,recordId,planId){
 const r=recordFor(state,recordId);if(!r.building?.plans.some(p=>p.id===planId))throw Error('Plan introuvable.');
 return save(state,{...r,building:{...r.building,plans:r.building.plans.filter(p=>p.id!==planId)}});
}
export function buildingOwner(world,building,{includeSecrets=false}={}){
 if(!building.ownerId)return building.ownerText;
 const owner=world.records.find(r=>r.id===building.ownerId&&r.kind==='corporation');
 return owner&&(includeSecrets||!owner.isSecret)?owner.name:UNKNOWN;
}
