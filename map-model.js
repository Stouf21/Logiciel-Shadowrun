import {validateMapShapes} from './map-shape-schema.js?v=0.27.0';
export const mapModes=['streets','cyberpunk'];
export const dijonMapCenter=[47.322,5.0415];
export const imageSize={width:1600,height:1200};
export const maxWaypoints=100;

export function defaultMapState(){
 return {version:1,dijon:{mode:'streets',views:{},positions:[],routes:{streets:{points:[]},cyberpunk:{points:[]}}}};
}
export const copyMapState=state=>structuredClone(state??defaultMapState());
export function validMapPoint(point,mode){
 if(!Array.isArray(point)||point.length!==2||!point.every(Number.isFinite))return false;
 return mode==='streets'?Math.abs(point[0])<=85&&Math.abs(point[1])<=180:
  mode==='cyberpunk'&&point[0]>=0&&point[0]<=imageSize.height&&point[1]>=0&&point[1]<=imageSize.width;
}
export function imagePointFromPercent({x,y}){return [imageSize.height*(1-y/100),imageSize.width*x/100];}
export function imagePointToPercent(point){return {x:point[1]/imageSize.width*100,y:(1-point[0]/imageSize.height)*100};}
export function routeDistance(points){
 let total=0;const rad=n=>n*Math.PI/180;
 for(let i=1;i<points.length;i++){
  const [lat1,lng1]=points[i-1],[lat2,lng2]=points[i];
  const a=Math.sin(rad(lat2-lat1)/2)**2+Math.cos(rad(lat1))*Math.cos(rad(lat2))*Math.sin(rad(lng2-lng1)/2)**2;
  total+=6371000*2*Math.atan2(Math.sqrt(a),Math.sqrt(Math.max(0,1-a)));
 }
 return total;
}
export function routeAfterEdit(points){return {points:points.map(point=>[...point])};}
export function formatDistance(metres){return metres<1000?Math.round(metres)+' m':(metres/1000).toLocaleString('fr-FR',{maximumFractionDigits:1})+' km';}

export function validateMapState(value,allowedPositionIds,recordKinds){
 if(value===undefined)return;
 if(!value||value.version!==1||!value.dijon)throw Error('Sauvegarde de carte invalide.');
 const m=value.dijon;
 validateMapShapes(m.shapes,validMapPoint,recordKinds);
 if(!mapModes.includes(m.mode)||!m.views||typeof m.views!=='object'||Array.isArray(m.views)||!m.routes||!Array.isArray(m.positions)||m.positions.length>3000)throw Error('Données de carte invalides.');
 for(const [mode,view] of Object.entries(m.views)){
  const imageView=mode==='cyberpunk';
  if(!mapModes.includes(mode)||!view||!Array.isArray(view.center)||view.center.length!==2||!view.center.every(Number.isFinite)||!Number.isFinite(view.zoom)||view.zoom<(imageView?-4:3)||view.zoom>(imageView?3:19))throw Error('Vue de carte invalide.');
  if(!imageView&&!validMapPoint(view.center,'streets')||imageView&&view.center.some(n=>Math.abs(n)>10000))throw Error('Centre de carte invalide.');
 }
 const ids=new Set();
 for(const p of m.positions){
  if(!p||typeof p.id!=='string'||ids.has(p.id)||allowedPositionIds&&!allowedPositionIds.has(p.id)||!validMapPoint(p.point,'streets'))throw Error('Repère géographique invalide.');
  ids.add(p.id);
 }
 for(const mode of mapModes){
  const route=m.routes[mode];
  if(!route||!Array.isArray(route.points)||route.points.length>maxWaypoints||!route.points.every(p=>validMapPoint(p,mode)))throw Error('Étapes d’itinéraire invalides.');
  if(route.road!==undefined){
   const road=route.road;
   if(mode!=='streets'||route.points.length<2||!road||!Array.isArray(road.points)||road.points.length<2||road.points.length>20000||!road.points.every(p=>validMapPoint(p,'streets'))||!Number.isFinite(road.distanceMetres)||road.distanceMetres<0||!Number.isFinite(road.durationSeconds)||road.durationSeconds<0)throw Error('Itinéraire routier invalide.');
  }
 }
}

export function streetRouteUrl(points){
 if(!Array.isArray(points)||points.length<2||points.length>maxWaypoints||!points.every(p=>validMapPoint(p,'streets')))throw Error('Choisissez au moins deux étapes valides.');
 const coordinates=points.map(([lat,lng])=>[lng.toFixed(6),lat.toFixed(6)].join(',')).join(';');
 return 'https://router.project-osrm.org/route/v1/driving/'+coordinates+'?overview=full&geometries=geojson&steps=false';
}
export async function requestStreetRoute(points,{fetcher=globalThis.fetch,signal}={}){
 const response=await fetcher(streetRouteUrl(points),{signal,headers:{Accept:'application/json'}});
 if(!response.ok)throw Error('Le service d’itinéraire est indisponible.');
 const data=await response.json(),route=data?.routes?.[0];
 if(data?.code!=='Ok'||route?.geometry?.type!=='LineString'||!Array.isArray(route.geometry.coordinates))throw Error('Aucun trajet routier trouvé pour ces étapes.');
 const road={points:route.geometry.coordinates.map(p=>Array.isArray(p)&&p.length===2?[p[1],p[0]]:null),distanceMetres:route.distance,durationSeconds:route.duration};
 const testState=defaultMapState();testState.dijon.routes.streets={points,road};validateMapState(testState);
 return road;
}
