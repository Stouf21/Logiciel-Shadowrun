// Public Leaflet APIs only: accumulate wheel input, then ease the view with flyTo.
export function mapZoomModifier(platform=globalThis.navigator?.userAgentData?.platform??globalThis.navigator?.platform??''){
 return /Mac|iPhone|iPad|iPod/i.test(platform)?'metaKey':'altKey';
}
export function wheelZoomDelta(event,pageHeight=800){
 const pixels=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?pageHeight:1);
 return Number.isFinite(pixels)?-Math.max(-240,Math.min(240,pixels))/240:0;
}
export function mountMapZoom(map,{modifier=mapZoomModifier(),reducedMotion=()=>globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false,requestFrame=callback=>requestAnimationFrame(callback),cancelFrame=id=>cancelAnimationFrame(id)}={}){
 const element=map.getContainer();map.scrollWheelZoom.disable();
 let frame=null,target=map.getZoom(),anchor=null,moving=false,disposed=false;
 const clamp=zoom=>Math.max(map.getMinZoom(),Math.min(map.getMaxZoom(),zoom));
 const settled=()=>{moving=false;if(frame===null)target=map.getZoom();};
 function animate(){
  frame=null;if(disposed)return;
  const zoom=clamp(target),point=anchor??map.getSize().divideBy(2);
  if(Math.abs(zoom-map.getZoom())<.00001)return;
  if(reducedMotion()){moving=false;map.setZoomAround(point,zoom,{animate:false});return;}
  // Match setZoomAround's target centre so the location under the mouse stays in view.
  const half=map.getSize().divideBy(2),scale=map.getZoomScale(zoom);
  const center=map.containerPointToLatLng(half.add(point.subtract(half).multiplyBy(1-1/scale)));
  moving=true;map.flyTo(center,zoom,{animate:true,duration:.22});
 }
 function zoomBy(delta,point=null){
  if(disposed||!Number.isFinite(delta)||!delta)return;
  if(!moving&&frame===null)target=map.getZoom();
  target=clamp(target+delta);anchor=point;
  if(frame===null)frame=requestFrame(animate);
 }
 function stop(){
  if(frame!==null){cancelFrame(frame);frame=null;}
  if(moving){moving=false;map.stop();}
  target=map.getZoom();anchor=null;
 }
 function wheel(event){
  // Leave page scrolling and popup/control scrolling to the browser.
  if(!event[modifier]){stop();return;}
  if(event.target.closest?.('.leaflet-control,.leaflet-popup,input,select,textarea,button'))return;
  const delta=wheelZoomDelta(event,element.clientHeight);if(!delta)return;
  event.preventDefault();zoomBy(delta,map.mouseEventToContainerPoint(event));
 }
 const pointer=()=>stop();
 element.addEventListener('wheel',wheel,{passive:false});
 element.addEventListener('pointerdown',pointer,{capture:true});
 map.on('zoomend moveend',settled);
 return {zoomBy,stop,dispose(){if(disposed)return;stop();disposed=true;element.removeEventListener('wheel',wheel);element.removeEventListener('pointerdown',pointer,true);map.off('zoomend moveend',settled);}};
}
