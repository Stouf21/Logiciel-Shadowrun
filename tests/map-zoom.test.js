import test from 'node:test';
import assert from 'node:assert/strict';
import {mapZoomModifier,wheelZoomDelta,mountMapZoom} from '../map-zoom.js';
function harness(reduced=false){
 const element=new EventTarget();Object.defineProperty(element,'clientHeight',{value:600});let callback=null,stops=0,disabled=false;const handlers=new Map(),moves=[];
 const point=(x,y)=>({x,y,divideBy(n){return point(x/n,y/n);},add(p){return point(x+p.x,y+p.y);},subtract(p){return point(x-p.x,y-p.y);},multiplyBy(n){return point(x*n,y*n);}});
 const map={zoom:10,getContainer:()=>element,scrollWheelZoom:{disable:()=>disabled=true},getZoom(){return this.zoom;},getMinZoom:()=>3,getMaxZoom:()=>19,getSize:()=>point(800,600),getZoomScale:z=>2**(z-map.zoom),containerPointToLatLng:p=>p,mouseEventToContainerPoint:()=>point(500,350),flyTo(center,zoom,options){moves.push({center,zoom,options});},setZoomAround(center,zoom,options){moves.push({center,zoom,options});map.zoom=zoom;handlers.get('zoomend moveend')?.();},stop(){stops++;},on:(names,f)=>handlers.set(names,f),off:names=>handlers.delete(names)};
 const controller=mountMapZoom(map,{modifier:'altKey',reducedMotion:()=>reduced,requestFrame:f=>{callback=f;return 1;},cancelFrame:()=>callback=null});
 const wheel=(delta,alt=false,mode=0)=>{const e=new Event('wheel',{cancelable:true});Object.assign(e,{deltaY:delta,deltaMode:mode,altKey:alt});element.dispatchEvent(e);return e;};
 return {map,moves,controller,wheel,get disabled(){return disabled;},get stops(){return stops;},frame(){const f=callback;callback=null;f?.();}};
}
test('Le raccourci utilise Command sur Mac et Alt sur Windows ou Linux ; les unités de molette et les grands deltas sont normalisés',()=>{
 assert.equal(mapZoomModifier('MacIntel'),'metaKey');assert.equal(mapZoomModifier('macOS'),'metaKey');assert.equal(mapZoomModifier('Win32'),'altKey');assert.equal(mapZoomModifier('Linux x86_64'),'altKey');
 assert.equal(wheelZoomDelta({deltaY:120,deltaMode:0}),-.5);assert.equal(wheelZoomDelta({deltaY:-3,deltaMode:1}),.2);assert.equal(wheelZoomDelta({deltaY:-1,deltaMode:2},600),1);assert.equal(wheelZoomDelta({deltaY:-99999,deltaMode:0}),1);assert.equal(wheelZoomDelta({deltaY:NaN}),0);
});
test('La molette seule laisse défiler la page ; les événements autorisés s’accumulent avant une animation et respectent les limites',()=>{
 const h=harness();assert.equal(h.disabled,true);assert.equal(h.wheel(-120).defaultPrevented,false);h.frame();assert.equal(h.moves.length,0);
 assert.equal(h.wheel(-120,true).defaultPrevented,true);h.wheel(-120,true);h.frame();assert.equal(h.moves.length,1);assert.equal(h.moves[0].zoom,11);assert.equal(h.moves[0].options.animate,true);assert.equal(h.moves[0].options.duration,.22);assert.ok(h.moves[0].center.x>400);
 for(let i=0;i<30;i++)h.wheel(-240,true);h.frame();assert.equal(h.moves.at(-1).zoom,19);
});
test('La réduction des animations reste instantanée ; une interruption ou le démontage annule les événements différés et retire les écouteurs',()=>{
 const h=harness(true);h.wheel(-120,true);h.frame();assert.equal(h.moves[0].options.animate,false);assert.equal(h.map.zoom,10.5);
 h.wheel(-120,true);h.controller.stop();h.frame();assert.equal(h.moves.length,1);h.controller.dispose();assert.equal(h.wheel(-120,true).defaultPrevented,false);h.controller.zoomBy(1);h.frame();assert.equal(h.moves.length,1);
 const animated=harness();animated.wheel(-120,true);animated.frame();animated.wheel(120);assert.equal(animated.stops,1);animated.controller.dispose();
});
