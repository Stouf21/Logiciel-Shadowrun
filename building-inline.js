import {readPath} from './inline-model.js?v=0.28.0';
import {saveBuilding,saveBuildingPlan} from './buildings.js?v=0.28.0';
import {buildingTypes} from './building-schema.js?v=0.28.0';
export function buildingInlineSpec(state,id,path,label,{includeSecrets=false}={}){
 const r=state.world.records.find(r=>r.id===id),parts=path.split('.');let value,type='text',options;
 if(parts[0]==='plans'){const p=r.building.plans.find(p=>p.id===parts[1]);if(!p)throw Error('Plan introuvable.');value=p[parts[2]];type=['description','gmNotes'].includes(parts[2])?'textarea':parts[2]==='isSecret'?'boolean':'text';}
 else{value=readPath(r,path);if(path==='building.type'){type='select';options=buildingTypes;}if(path==='building.color')type='color';if(['publicInfo','gmNotes','building.entrances'].includes(path))type='textarea';if(path==='isSecret')type='boolean';
  if(path==='building.ownerId'){type='select';options=[['','Autre / À définir'],...state.world.records.filter(r=>r.kind==='corporation'&&(includeSecrets||!r.isSecret)).map(r=>[r.id,r.name])];if(r.building.ownerId&&!options.some(([id])=>id===r.building.ownerId))options.push([r.building.ownerId,'Corporation réservée au MJ']);}
 }
 return {label,value:value??'',type,options,required:path==='name'||parts[0]==='plans'&&parts[2]==='name',maxLength:30000};
}
export function updateBuildingInline(state,id,path,value){
 const r=state.world.records.find(r=>r.id===id);if(!r?.building)throw Error('Bâtiment introuvable.');const parts=path.split('.');
 if(parts[0]==='plans'){
  if(parts.length!==3||!['name','level','description','gmNotes','isSecret'].includes(parts[2]))throw Error('Champ de plan invalide.');const p=r.building.plans.find(p=>p.id===parts[1]);if(!p)throw Error('Plan introuvable.');return saveBuildingPlan(state,id,{...p,[parts[2]]:value});
 }
 const building=structuredClone(r.building),values={building,name:r.name,description:r.publicInfo,security:r.fields.security,gmNotes:r.gmNotes,isSecret:r.isSecret};
 if(parts[0]==='building'&&parts.length===2&&['type','color','ownerId','ownerText','floors','basements','entrances'].includes(parts[1]))building[parts[1]]=parts[1]==='ownerId'?value||null:value;
 else if(['name','gmNotes','isSecret'].includes(path))values[path]=value;
 else if(path==='publicInfo')values.description=value;else if(path==='fields.security')values.security=value;else throw Error('Champ de bâtiment invalide.');
 return saveBuilding(state,id,values);
}
