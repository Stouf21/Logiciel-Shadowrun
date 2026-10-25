import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultMapState,copyMapState,validateMapState,imagePointFromPercent,imagePointToPercent,routeDistance,routeAfterEdit,streetRouteUrl,requestStreetRoute} from '../map-model.js';
import {mergeWorld} from '../world.js';
import {validateCampaign} from '../campaign.js';
import {dijonPlaces} from '../dijon-places.js';
const points=[[47.322,5.0415],[47.325,5.05]];
const response={code:'Ok',routes:[{distance:1100,duration:180,geometry:{type:'LineString',coordinates:[[5.0415,47.322],[5.045,47.324],[5.05,47.325]]}}]};

test('Une ancienne campagne reste compatible et chaque vue possède son propre itinéraire',()=>{
 const old={entries:[],tokens:[]};assert.doesNotThrow(()=>validateCampaign(old));assert.equal(old.mapState,undefined);
 const a=defaultMapState(),b=defaultMapState();a.dijon.routes.streets.points.push(points[0]);
 assert.deepEqual(b.dijon.routes.streets.points,[]);assert.deepEqual(a.dijon.routes.cyberpunk.points,[]);
 const copy=copyMapState(a);copy.dijon.positions.push({id:'other',point:points[0]});assert.deepEqual(a.dijon.positions,[]);
});

test('Les positions historiques en pourcentage gardent leur sens sur l’illustration interactive',()=>{
 for(const original of dijonPlaces){const actual=imagePointToPercent(imagePointFromPercent(original));assert.ok(Math.abs(actual.x-original.x)<1e-9);assert.ok(Math.abs(actual.y-original.y)<1e-9);}
 assert.deepEqual(imagePointFromPercent({x:0,y:0}),[1200,0]);assert.deepEqual(imagePointFromPercent({x:100,y:100}),[0,1600]);
});

test('La distance du tracé libre est géographique, et modifier les étapes supprime l’ancien calcul routier',()=>{
 assert.ok(Math.abs(routeDistance([[0,0],[0,1]])-111194.93)<1);
 assert.equal(routeDistance([[47,5],[47,5]]),0);
 const edited=routeAfterEdit(points);assert.deepEqual(edited,{points});assert.notEqual(edited.points,points);assert.notEqual(edited.points[0],points[0]);assert.equal(edited.road,undefined);
});

test('L’URL de calcul routier utilise longitude,latitude et uniquement les étapes numériques',()=>{
 const url=streetRouteUrl(points);assert.match(url,/\/driving\/5\.041500,47\.322000;5\.050000,47\.325000\?/);
 for(const value of [[],[points[0]],[[NaN,5],points[1]],[[47,181],points[1]],Array.from({length:101},()=>points[0])])assert.throws(()=>streetRouteUrl(value));
});

test('Un calcul routier valide conserve sa géométrie, sa longueur et sa durée sans muter les étapes',async()=>{
 const before=structuredClone(points),controller=new AbortController();let called;
 const road=await requestStreetRoute(points,{signal:controller.signal,fetcher:async(url,options)=>{called={url,options};return {ok:true,json:async()=>response};}});
 assert.deepEqual(road,{points:[[47.322,5.0415],[47.324,5.045],[47.325,5.05]],distanceMetres:1100,durationSeconds:180});
 assert.equal(called.options.signal,controller.signal);assert.deepEqual(points,before);
});

test('Les erreurs de service et géométries invalides ne remplacent pas un tracé manuel',async()=>{
 await assert.rejects(requestStreetRoute(points,{fetcher:async()=>({ok:false})}),/indisponible/);
 for(const mutate of [r=>r.code='NoRoute',r=>r.routes[0].geometry.type='Polygon',r=>r.routes[0].geometry.coordinates[0]=[5,99],r=>r.routes[0].distance=-1,r=>r.routes[0].geometry.coordinates=[]]){
  const invalid=structuredClone(response);mutate(invalid);await assert.rejects(requestStreetRoute(points,{fetcher:async()=>({ok:true,json:async()=>invalid})}));
 }
});

test('Les sauvegardes géographiques malformées et les liens de repères invalides sont rejetés',()=>{
 for(const mutate of [m=>m.version=2,m=>m.dijon.mode='satellite',m=>m.dijon.positions=[{id:'missing',point:points[0]}],m=>m.dijon.positions=[{id:'char-david',point:[95,5]}],m=>m.dijon.views.streets={center:points[0],zoom:30},m=>m.dijon.routes.cyberpunk.points=[[1201,5]],m=>m.dijon.routes.streets.points=Array.from({length:101},()=>points[0]),m=>m.dijon.routes.streets.road={points,distanceMetres:1,durationSeconds:1}]){
  const value=defaultMapState();mutate(value);assert.throws(()=>validateMapState(value,new Set(['char-david'])));
 }
 const duplicates=defaultMapState();duplicates.dijon.positions=[{id:'char-david',point:points[0]},{id:'char-david',point:points[1]}];assert.throws(()=>validateMapState(duplicates,new Set(['char-david'])));
});

test('Export/import conserve les deux vues, le trajet routier, les positions et les anciens pions',async()=>{
 const campaign=mergeWorld({entries:[{id:'runner',name:'Ancien PJ',category:'PJ',description:'Histoire conservée',notes:'Notes conservées'}],tokens:[{id:'runner',x:13,y:27}]});
 const mapState=defaultMapState();mapState.dijon.views.streets={center:points[0],zoom:15};mapState.dijon.positions=[{id:'runner',point:points[0]},{id:'zone-valmy',point:points[1]}];mapState.dijon.routes.streets={points,road:await requestStreetRoute(points,{fetcher:async()=>({ok:true,json:async()=>response})})};mapState.dijon.routes.cyberpunk.points=[[500,300],[600,500]];
 const restored=validateCampaign(JSON.parse(JSON.stringify({...campaign,mapState})));
 assert.deepEqual(restored.mapState,mapState);assert.deepEqual(restored.tokens,campaign.tokens);assert.deepEqual(restored.entries,campaign.entries);
});
