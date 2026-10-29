import {makeWorldRecord,UNKNOWN,validateWorld} from './world-schema.js?v=0.29.0';
import {copyMapState,validMapPoint,imagePointToPercent,validateMapState} from './map-model.js?v=0.29.0';

export const mapPlaceTypes=['Boutique','Lieu important','Bar / restaurant','Clinique','Planque','Autre'];
const text=value=>typeof value==='string'?value.trim():'';

export function positionMapPlace(state,id,mode,point){
 if(!validMapPoint(point,mode))throw Error('Choisissez un emplacement valide sur cette carte.');
 const record=state.world.records.find(r=>r.id===id&&['zone','place'].includes(r.kind));
 if(!record)throw Error('Lieu introuvable.');
 if(mode==='cyberpunk'&&record.mapPlaceId)throw Error('La position de ce repère historique est conservée.');
 const mapState=copyMapState(state.mapState);mapState.dijon.mode=mode;
 const records=mode==='cyberpunk'?state.world.records.map(r=>r.id===id?{...r,coordinates:imagePointToPercent(point)}:r):state.world.records;
 if(mode==='streets')mapState.dijon.positions=[...mapState.dijon.positions.filter(p=>p.id!==id),{id,point:[...point]}];
 const next={...state,world:{...state.world,records},mapState};validateWorld(next.world);validateMapState(mapState);return next;
}

export function createMapPlace(state,{mode,point,name,type,description='',gmNotes='',isSecret=false,zoneId=''},id='place-'+crypto.randomUUID()){
 name=text(name);type=text(type);
 if(!name||name.length>200)throw Error('Indiquez un nom de lieu (200 caractères maximum).');
 if(!type||type.length>100)throw Error('Choisissez un type de lieu (100 caractères maximum).');
 if(typeof isSecret!=='boolean')throw Error('Visibilité du lieu invalide.');
 if(state.world.records.some(r=>r.id===id))throw Error('Cet identifiant de lieu existe déjà.');
 const zone=zoneId?state.world.records.find(r=>r.id===zoneId&&r.kind==='zone'):null;
 if(zoneId&&!zone)throw Error('Quartier ou zone introuvable.');
 const record=makeWorldRecord('place',id,name,{publicInfo:text(description)||UNKNOWN,gmNotes:text(gmNotes)||UNKNOWN,isSecret,source:'Lieu ajouté sur la carte par le meneur'},{type,address:zone&&!zone.isSecret?zone.name:UNKNOWN});
 const relation=zone?{id:'rel-map-zone-'+id,from:id,to:zone.id,type:'Situé dans',description:UNKNOWN,confidence:'Renseigné par le MJ',visibility:isSecret||zone.isSecret?'secret':'public',evolution:UNKNOWN}:null;
 const world={...state.world,records:[...state.world.records,record],relations:relation?[...state.world.relations,relation]:state.world.relations};
 return positionMapPlace({...state,world},id,mode,point);
}

export function removeMapPlacePosition(state,id,mode){
 const record=state.world.records.find(r=>r.id===id&&['zone','place'].includes(r.kind));
 if(!record)throw Error('Lieu introuvable.');
 if(!['streets','cyberpunk'].includes(mode))throw Error('Fond de carte invalide.');
 if(mode==='cyberpunk'&&record.mapPlaceId)throw Error('Ce repère historique est conservé.');
 if(mode==='cyberpunk')return {...state,world:{...state.world,records:state.world.records.map(r=>r.id===id?{...r,coordinates:null}:r)}};
 const mapState=copyMapState(state.mapState);mapState.dijon.positions=mapState.dijon.positions.filter(p=>p.id!==id);return {...state,mapState};
}
