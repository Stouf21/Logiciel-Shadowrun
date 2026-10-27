import {copyMapState,mapModes,validMapPoint,validateMapState} from './map-model.js?v=0.18.0';
import {makeWorldRecord,UNKNOWN,validateWorld} from './world-schema.js?v=0.18.0';
import {emptyBuilding} from './building-schema.js?v=0.18.0';
import {validPolygon} from './map-shape-schema.js?v=0.18.0';
import {dijonIllustrationShapes} from './dijon-shapes.js?v=0.18.0';
export function getMapShapes(state,mode){
 if(!mapModes.includes(mode))throw Error('Fond de carte invalide.');
 const saved=state.mapState?.dijon.shapes?.[mode];
 return saved??(mode==='cyberpunk'?dijonIllustrationShapes.filter(s=>state.world.records.some(r=>r.id===s.recordId)):[]);
}
export function initializeMapShapes(state){
 if(mapModes.every(mode=>state.mapState?.dijon.shapes?.[mode]!==undefined))return state;
 const mapState=copyMapState(state.mapState);mapState.dijon.shapes={...mapState.dijon.shapes};
 for(const mode of mapModes)if(mapState.dijon.shapes[mode]===undefined)mapState.dijon.shapes[mode]=structuredClone(getMapShapes(state,mode));
 return {...state,mapState};
}
function saveShapes(state,mode,shapes){
 const mapState=copyMapState(state.mapState);mapState.dijon.shapes={...mapState.dijon.shapes,[mode]:structuredClone(shapes)};
 const next={...state,mapState};validateWorld(next.world);validateMapState(mapState,undefined,new Map(state.world.records.map(r=>[r.id,r.kind])));return next;
}
export function saveMapShape(state,{mode,kind,points,color,recordId='',name='',description='',isSecret=false,type='Bâtiment'},id='shape-'+crypto.randomUUID()){
 if(!mapModes.includes(mode)||!['zone','building'].includes(kind)||!validPolygon(points,p=>validMapPoint(p,mode)))throw Error('Dessinez au moins trois points distincts, sans croisement.');
 if(!/^#[0-9a-f]{6}$/i.test(color))throw Error('Couleur de contour invalide.');
 let record=state.world.records.find(r=>r.id===recordId),next=state;
 if(recordId&&!record)throw Error('Dossier associé introuvable.');
 if(record&&(kind==='zone'?record.kind!=='zone':!['place','zone'].includes(record.kind)))throw Error('Type de dossier incompatible.');
 if(!record){
  if(typeof name!=='string'||!name.trim()||name.length>200||typeof description!=='string'||typeof isSecret!=='boolean')throw Error('Nommez votre zone ou bâtiment (200 caractères maximum).');
  record=makeWorldRecord(kind==='zone'?'zone':'place',(kind==='zone'?'zone-':'place-')+crypto.randomUUID(),name.trim(),{publicInfo:description.trim()||UNKNOWN,isSecret,source:'Contour et dossier créés par le meneur'},{type:kind==='building'?type:'Zone de campagne'});
  next={...state,world:{...state.world,records:[...state.world.records,record]}};
 }
 if(kind==='building'&&!record.building){record={...record,building:emptyBuilding(type,color)};next={...next,world:{...next.world,records:next.world.records.map(r=>r.id===record.id?record:r)}};}
 const shape={id,recordId:record.id,kind,color,points:points.map(p=>[...p]),source:'Contour dessiné par le meneur'};
 const previous=getMapShapes(next,mode),otherId=previous.find(s=>s.recordId===record.id&&s.kind===kind)?.id;
 shape.id=otherId??id;
 return {state:saveShapes(next,mode,[...previous.filter(s=>s.id!==shape.id),shape]),shape};
}
export function updateMapShape(state,mode,id,changes){
 const previous=getMapShapes(state,mode),shape=previous.find(s=>s.id===id);if(!shape)throw Error('Contour introuvable.');
 const allowed=Object.fromEntries(Object.entries(changes).filter(([key])=>['color','points'].includes(key)));
 return saveShapes(state,mode,previous.map(s=>s.id===id?{...s,...allowed,source:'Contour modifié par le meneur'}:s));
}
export function removeMapShape(state,mode,id){
 const shapes=getMapShapes(state,mode);if(!shapes.some(s=>s.id===id))throw Error('Contour introuvable.');
 return saveShapes(state,mode,shapes.filter(s=>s.id!==id));
}
export const shapeCenter=shape=>shape.points.reduce((sum,p)=>[sum[0]+p[0]/shape.points.length,sum[1]+p[1]/shape.points.length],[0,0]);
