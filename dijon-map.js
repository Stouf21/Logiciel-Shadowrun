import {escape,searchDisclosure} from './ui.js?v=0.10.0';
import {dijonPlaces} from './dijon-places.js?v=0.10.0';
import {worldSearch} from './world.js?v=0.10.0';
import {authorities} from './world-schema.js?v=0.10.0';
import {copyMapState,dijonMapCenter,imageSize,imagePointFromPercent,imagePointToPercent,validMapPoint,routeDistance,routeAfterEdit,formatDistance,maxWaypoints,requestStreetRoute} from './map-model.js?v=0.10.0';
export {dijonPlaces};

export function renderDijonMap(container,snapshot,onChange){
 let state=snapshot,mode=copyMapState(state.mapState).dijon.mode,map=null,observer=null,destroyed=false,routeRequest=null;
 const records=state.world?.records??[],L=globalThis.L;
 const options=items=>'<option value="">Tous / toutes</option>'+items.map(item=>{const [id,label]=Array.isArray(item)?item:[item,item];return `<option value="${escape(id)}">${escape(label)}</option>`;}).join('');
 container.innerHTML=`<div class="dijon-header"><span class="tag">DIJON / ${state.world?.settings.year??2082}</span><h3>Les ombres de la cité des Ducs.</h3></div>
 <div class="map-controls interactive-map-controls"><label>Fond de carte<select id="map-view" aria-label="Fond de carte"><option value="streets">Plan des rues · OpenStreetMap</option><option value="cyberpunk">Illustration cyberpunk</option></select></label><label>Action sur la carte<select id="map-action" aria-label="Action sur la carte"><option value="explore">Explorer</option><option value="route">Tracer un itinéraire</option><option value="character">Placer un personnage</option><option value="place">Positionner un lieu</option></select></label><div class="map-zoom"><button id="map-minus" aria-label="Réduire le zoom">−</button><output id="map-zoom-value"></output><button id="map-plus" aria-label="Augmenter le zoom">+</button></div><button id="map-recenter">Recentrer</button></div>
 <p id="map-background-note" class="muted map-background-note"></p>
 <div id="map-character-controls" class="map-placement-controls" hidden><label>Personnage à placer<select id="map-character" aria-label="Personnage à placer"></select></label><button id="clear-map">Retirer les pions de cette vue</button></div>
 <div id="map-place-controls" class="map-placement-controls" hidden><label>Lieu à positionner<select id="map-place" aria-label="Lieu à positionner"></select></label><p class="muted">Choisissez un dossier puis cliquez à son emplacement. Les positions du plan de rues sont indépendantes de l’illustration.</p></div>
 ${searchDisclosure('map-search-panel',`<div class="world-filters map-world-filters"><label>Autorité<select id="map-authority" aria-label="Autorité sur la carte">${options(authorities)}</select></label><label>Corporation<select id="map-corporation" aria-label="Corporation sur la carte"></select></label><label>Faction<select id="map-faction" aria-label="Faction sur la carte"></select></label><label>Sécurité<select id="map-security" aria-label="Sécurité sur la carte"></select></label><label>Type de lieu<select id="map-type" aria-label="Type de lieu sur la carte"></select></label><label class="check-label"><input id="map-labels" type="checkbox" checked>Afficher les noms des repères</label><label class="check-label"><input id="map-secrets" type="checkbox">Afficher les secrets du MJ</label></div>`,{label:'Filtrer la carte'})}
 <div class="map-route-controls"><button id="map-route-toggle" aria-pressed="false">Tracer un itinéraire</button><button id="map-route-road">Calculer par les rues</button><button id="map-route-undo">Retirer la dernière étape</button><button id="map-route-clear">Effacer l’itinéraire</button><output id="map-route-summary" aria-live="polite"></output></div>
 <p id="map-help" class="map-legend">Glissez pour déplacer la vue. Utilisez la molette, le pincement ou les boutons pour zoomer.</p>
 <p id="map-state-status" class="muted" role="status"></p><div id="map" class="interactive-map" role="region" aria-label="Carte interactive de Dijon"></div>
 <div class="map-inspector" id="map-inspector" role="status">Choisissez un repère pour ouvrir son dossier.</div><p id="map-world-count" class="muted" role="status"></p>
 <details><summary>Zones et lieux à positionner sur cette vue</summary><p class="muted">Les repères de l’illustration ne sont pas convertis automatiquement en coordonnées géographiques.</p><div class="place-list" id="unplaced-world-records"></div></details>`;
 const $=selector=>container.querySelector(selector);
 if(!L){$('#map-state-status').textContent='La bibliothèque cartographique n’a pas chargé. Rechargez la page.';return ()=>{};}
 let markerLayer,routeLayer;
 const initialModel=copyMapState(state.mapState).dijon;
 const model=()=>state.mapState?.dijon??initialModel;
 const currentRoute=()=>model().routes[mode];
 function status(value){if(!destroyed)$('#map-state-status').textContent=value;}
 function saveMap(change){
  const nextMap=copyMapState(state.mapState);change(nextMap.dijon);
  const next={...state,mapState:nextMap};try{state=onChange(next)??next;return true;}catch(error){status(error.message);return false;}
 }
 function visibleRecords(){return worldSearch(state.world,'',{includeSecrets:$('#map-secrets').checked,filters:{authority:$('#map-authority').value,corporation:$('#map-corporation').value,faction:$('#map-faction').value,security:$('#map-security').value}}).map(hit=>hit.record).filter(r=>['zone','place'].includes(r.kind)&&(!$('#map-type').value||r.fields.type===$('#map-type').value));}
 function characters(){
  const known=records.filter(r=>r.kind==='character'&&($('#map-secrets').checked||!r.isSecret));
  return [...state.entries.filter(e=>['PJ','PNJ principal','PNJ secondaire'].includes(e.category)&&!records.some(r=>r.gameEntryId===e.id&&r.isSecret&&!$('#map-secrets').checked)).map(e=>({id:e.id,name:e.name})),...known.filter(r=>!r.gameEntryId).map(r=>({id:r.id,name:r.name}))];
 }
 function refreshChoices(){
  const showSecrets=$('#map-secrets').checked;
  for(const [key,items] of [['corporation',records.filter(r=>r.kind==='corporation'&&(showSecrets||!r.isSecret)).map(r=>[r.id,r.name])],['faction',records.filter(r=>r.kind==='faction'&&(showSecrets||!r.isSecret)).map(r=>[r.id,r.name])],['security',[...new Set(records.filter(r=>['zone','place'].includes(r.kind)&&(showSecrets||!r.isSecret)).map(r=>r.fields.security).filter(Boolean))]],['type',[...new Set(records.filter(r=>['zone','place'].includes(r.kind)&&(showSecrets||!r.isSecret)).map(r=>r.fields.type).filter(Boolean))].sort()]]){
   const field=$('#map-'+key),previous=field.value;field.innerHTML=options(items);field.value=[...field.options].some(x=>x.value===previous)?previous:'';
  }
  const previous=$('#map-character').value;$('#map-character').innerHTML='<option value="">Choisir un personnage…</option>'+characters().map(c=>`<option value="${escape(c.id)}">${escape(c.name)}</option>`).join('');$('#map-character').value=previous;
 }
 function recordPoint(record){
  if(mode==='streets')return model().positions.find(p=>p.id===record.id)?.point;
  const original=dijonPlaces.find(p=>p.id===record.mapPlaceId);return original?imagePointFromPercent(original):record.coordinates?imagePointFromPercent(record.coordinates):null;
 }
 function pointMarker(point,label,html,{draggable=false,onDrag,onClick,iconSize=[160,32],iconAnchor=[11,16]}={}){
  const marker=L.marker(point,{icon:L.divIcon({className:'campaign-marker',html,iconSize,iconAnchor}),title:label,keyboard:true,draggable});
  marker.on('add',()=>marker.getElement()?.setAttribute('aria-label',label));
  if(onClick)marker.on('click',onClick);
  if(onDrag)marker.on('dragend',()=>onDrag([marker.getLatLng().lat,marker.getLatLng().lng]));
  return marker;
 }
 function authorityClass(record){return ({Municipale:'municipal','Étatique':'state',Corporatiste:'corporate',Mixte:'mixed',Clandestine:'secret'})[record.fields.authority]??'unknown';}
 function inspect(record){
  if(record.isSecret&&!$('#map-secrets').checked)return;
  const original=dijonPlaces.find(p=>p.id===record.mapPlaceId);
  $('#map-inspector').innerHTML=`<span class="tag">${escape(record.name)} · ${escape(record.fields.authority??'À définir')}</span><p>${escape(record.publicInfo)}</p><button data-open-world="${escape(record.id)}" ${$('#map-secrets').checked?'data-world-reveal="true"':''}>Ouvrir le dossier de campagne</button>${$('#map-secrets').checked?`<p class="map-secret-text">Secrets MJ : ${escape(record.secrets)}</p>`:''}${original?`<details><summary>Ancienne accroche de campagne</summary><p>${escape(original.hook)}</p></details>`:''}`;
 }
 function saveStreetPosition(id,point){return saveMap(m=>{m.positions=[...m.positions.filter(p=>p.id!==id),{id,point}];});}
 function updateMarkers(){
  markerLayer.clearLayers();const filtered=visibleRecords(),mapped=filtered.filter(r=>recordPoint(r));
  for(const record of mapped){
   const point=recordPoint(record),html=`<span class="map-pin authority-${authorityClass(record)}"><i></i><span class="map-pin-name">${escape(record.name)}</span></span>`;
   pointMarker(point,record.name,html,{draggable:mode==='streets'&&$('#map-action').value==='place',onDrag:point=>{if(validMapPoint(point,'streets'))saveStreetPosition(record.id,point);updateMarkers();},onClick:()=>inspect(record)}).addTo(markerLayer);
  }
  for(const character of characters()){
   const token=mode==='streets'?model().positions.find(p=>p.id===character.id):state.tokens.find(p=>p.id===character.id);
   if(!token)continue;const point=mode==='streets'?token.point:imagePointFromPercent(token);
   pointMarker(point,character.name,`<span class="map-pin character-pin"><i></i><span class="map-pin-name">${escape(character.name)}</span></span>`,{draggable:true,onDrag:point=>placeCharacter(character.id,point),onClick:()=>{$('#map-character').value=character.id;setAction('character');}}).addTo(markerLayer);
  }
  $('#map-world-count').textContent=mapped.length+' repère(s) · '+(filtered.length-mapped.length)+' dossier(s) à positionner';
  $('#unplaced-world-records').innerHTML=filtered.filter(r=>!recordPoint(r)).map(r=>`<button data-open-world="${escape(r.id)}" ${r.isSecret?'data-world-reveal="true"':''}>${escape(r.name)}</button>`).join('')||'Tous les dossiers visibles sont positionnés.';
  const previous=$('#map-place').value,placeChoices=filtered.filter(r=>mode==='streets'||!r.mapPlaceId);
  $('#map-place').innerHTML='<option value="">Choisir un lieu…</option>'+placeChoices.map(r=>`<option value="${escape(r.id)}">${escape(r.name)}</option>`).join('');$('#map-place').value=previous;
  $('#map').classList.toggle('map-labels-off',!$('#map-labels').checked);
 }
 function placeCharacter(id,point){
  if(!validMapPoint(point,mode)){status('Placez le pion dans les limites de cette carte.');updateMarkers();return;}
  if(mode==='streets')saveStreetPosition(id,point);
  else{const next={...state,tokens:[...state.tokens.filter(t=>t.id!==id),{id,...imagePointToPercent(point)}]};try{state=onChange(next)??next;}catch(error){status(error.message);}}
  updateMarkers();
 }
 function stopRequest(){if(routeRequest){routeRequest.abort();routeRequest=null;}$('#map-route-road').disabled=currentRoute().points.length<2;}
 function editRoute(points){stopRequest();if(saveMap(m=>{m.routes[mode]=routeAfterEdit(points);})){status('');drawRoute();}}
 function drawRoute(){
  routeLayer.clearLayers();const route=currentRoute(),points=route.points;
  if(points.length>1)L.polyline(route.road?.points??points,{color:route.road?'#65d0e6':'#ffc321',weight:5,opacity:.95,dashArray:route.road?null:'9 7'}).addTo(routeLayer);
  points.forEach((point,index)=>{
   const label=index===0?'Départ':index===points.length-1?'Arrivée':'Étape '+index;
   pointMarker(point,label,`<span class="route-waypoint" title="${label}">${index+1}</span>`,{draggable:true,iconSize:[29,29],iconAnchor:[14,14],onDrag:next=>{if(!validMapPoint(next,mode)){status('L’étape doit rester dans les limites de la carte.');drawRoute();return;}const nextPoints=currentRoute().points.map(p=>[...p]);nextPoints[index]=next;editRoute(nextPoints);}}).addTo(routeLayer);
  });
  let summary=points.length+' étape(s)';
  if(points.length>1&&mode==='streets')summary+=' · '+(route.road?'Par les rues · '+formatDistance(route.road.distanceMetres)+' · ~'+Math.max(1,Math.round(route.road.durationSeconds/60))+' min en voiture':'Tracé libre · ~'+formatDistance(routeDistance(points)));
  $('#map-route-summary').textContent=summary;$('#map-route-undo').disabled=!points.length;$('#map-route-clear').disabled=!points.length;$('#map-route-road').hidden=mode!=='streets';$('#map-route-road').disabled=points.length<2||!!routeRequest;
 }
 function setAction(action){
  $('#map-action').value=action;$('#map-character-controls').hidden=action!=='character';$('#map-place-controls').hidden=action!=='place';$('#map-route-toggle').setAttribute('aria-pressed',String(action==='route'));
  $('#map').classList.toggle('map-draw-mode',action!=='explore');
  if(action==='route')map.doubleClickZoom.disable();else map.doubleClickZoom.enable();
  $('#map-help').textContent=action==='route'?'Cliquez pour ajouter des étapes. Glissez une étape pour la déplacer ; glissez le fond pour déplacer la vue.':action==='character'?'Choisissez un personnage puis cliquez pour placer son pion. Ses pions peuvent être déplacés par glisser-déposer.':action==='place'?'Choisissez un lieu puis cliquez sur son emplacement. Sur le plan des rues, ses repères peuvent ensuite être déplacés.':'Glissez pour déplacer la vue. Utilisez la molette, le pincement ou les boutons pour zoomer.';
  updateMarkers();
 }
 function updateZoom(){
  $('#map-zoom-value').textContent=mode==='streets'?'Zoom '+map.getZoom():Math.round(2**map.getZoom()*100)+' %';
  $('#map-minus').disabled=map.getZoom()<=map.getMinZoom();$('#map-plus').disabled=map.getZoom()>=map.getMaxZoom();
 }
 function resetView(){if(mode==='streets')map.setView(dijonMapCenter,14);else map.fitBounds([[0,0],[imageSize.height,imageSize.width]],{padding:[12,12]});}
 function createMap(){
  stopRequest();observer?.disconnect();if(map)map.remove();
  const element=$('#map');element.classList.toggle('map-streets',mode==='streets');element.classList.toggle('map-cyberpunk',mode==='cyberpunk');
  map=L.map(element,{crs:mode==='streets'?L.CRS.EPSG3857:L.CRS.Simple,zoomControl:false,minZoom:mode==='streets'?3:-4,maxZoom:mode==='streets'?19:3,zoomSnap:mode==='streets'?1:.25,zoomDelta:mode==='streets'?1:.5,scrollWheelZoom:true,zoomAnimation:false,fadeAnimation:false,markerZoomAnimation:false,attributionControl:true});
  if(mode==='streets'){
   let failed=0;const streetMap=map;
   const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'});
   tiles.on('tileerror',()=>{if(++failed===3&&!destroyed&&mode==='streets'&&map===streetMap)status('Le plan de rues ne charge pas. Vérifiez la connexion ou choisissez l’illustration cyberpunk.');});tiles.addTo(map);
   $('#map-background-note').textContent='Plan actuel de Dijon · fond de rues en ligne. Les repères de la campagne sont à positionner sur ce plan.';
  }else{
   L.imageOverlay('./assets/dijon-cyberpunk.png',[[0,0],[imageSize.height,imageSize.width]],{attribution:'Illustration de campagne · géographie artistique'}).addTo(map);
   map.setMaxBounds([[-imageSize.height/2,-imageSize.width/2],[imageSize.height*1.5,imageSize.width*1.5]]);
   $('#map-background-note').textContent='Illustration cyberpunk · disponible sans fond de rues en ligne. Les onze repères préexistants gardent leur position.';
  }
  const saved=model().views[mode];if(saved)map.setView(saved.center,saved.zoom);else resetView();
  markerLayer=L.layerGroup().addTo(map);routeLayer=L.layerGroup().addTo(map);drawRoute();setAction($('#map-action').value);updateZoom();
  map.on('zoomend',updateZoom);
  map.on('moveend',()=>{const center=map.getCenter(),point=[center.lat,center.lng];if(mode==='streets'&&!validMapPoint(point,mode))return;saveMap(m=>{m.views[mode]={center:point,zoom:map.getZoom()};});});
  map.on('click',event=>{
   const point=[event.latlng.lat,event.latlng.lng],action=$('#map-action').value;
   if(action==='explore')return;
   if(!validMapPoint(point,mode)){status('Cliquez dans les limites de la carte.');return;}
   status('');
   if(action==='route'){const points=currentRoute().points;if(points.length>=maxWaypoints){status('L’itinéraire est limité à '+maxWaypoints+' étapes.');return;}editRoute([...points,point]);}
   if(action==='character'){const id=$('#map-character').value;if(id)placeCharacter(id,point);else status('Choisissez d’abord un personnage.');}
   if(action==='place'){
    const id=$('#map-place').value;if(!id){status('Choisissez d’abord un lieu.');return;}
    if(mode==='streets')saveStreetPosition(id,point);
    else{const next={...state,world:{...state.world,records:state.world.records.map(r=>r.id===id?{...r,coordinates:imagePointToPercent(point)}:r)}};try{state=onChange(next)??next;}catch(error){status(error.message);}}
    updateMarkers();
   }
  });
  observer=new ResizeObserver(()=>{if(!destroyed)map.invalidateSize({pan:false});});observer.observe(element);
 }
 $('#map-view').value=mode;
 $('#map-view').onchange=()=>{const selectedMode=$('#map-view').value;if(saveMap(m=>{m.mode=selectedMode;})){mode=selectedMode;status('');createMap();}else $('#map-view').value=mode;};
 $('#map-action').onchange=()=>setAction($('#map-action').value);
 $('#map-route-toggle').onclick=()=>setAction($('#map-action').value==='route'?'explore':'route');
 $('#map-route-undo').onclick=()=>editRoute(currentRoute().points.slice(0,-1));
 $('#map-route-clear').onclick=()=>{if(confirm('Effacer l’itinéraire de cette vue ?'))editRoute([]);};
 $('#map-route-road').onclick=async()=>{
  stopRequest();const points=currentRoute().points,snapshot=JSON.stringify(points),controller=new AbortController();routeRequest=controller;drawRoute();status('Calcul de l’itinéraire en voiture…');
  const timeout=setTimeout(()=>controller.abort(),12000);
  try{
   const road=await requestStreetRoute(points,{signal:controller.signal});
   if(destroyed||controller.signal.aborted||mode!=='streets'||JSON.stringify(currentRoute().points)!==snapshot)return;
   if(saveMap(m=>{m.routes.streets={points,road};}))status('Trajet routier calculé. Durée indicative, hors circulation et événements de campagne.');
  }catch(error){if(!destroyed&&!controller.signal.aborted)status('Calcul routier indisponible. Le tracé libre reste utilisable.');else if(!destroyed&&routeRequest===controller)status('Le calcul routier a pris trop de temps. Le tracé libre est conservé.');}
  finally{clearTimeout(timeout);if(routeRequest===controller)routeRequest=null;if(!destroyed)drawRoute();}
 };
 $('#map-plus').onclick=()=>map.zoomIn();$('#map-minus').onclick=()=>map.zoomOut();$('#map-recenter').onclick=resetView;
 $('#map-labels').onchange=updateMarkers;
 $('#map-secrets').onchange=()=>{refreshChoices();updateMarkers();$('#map-inspector').textContent='Choisissez un repère pour ouvrir son dossier.';};
 for(const id of ['map-authority','map-corporation','map-faction','map-security','map-type'])$('#'+id).onchange=()=>{updateMarkers();$('#map-inspector').textContent='Choisissez un repère pour ouvrir son dossier.';};
 $('#clear-map').onclick=()=>{
  if(!confirm('Retirer tous les pions des personnages sur cette vue ?'))return;
  if(mode==='streets'){const ids=new Set(characters().map(c=>c.id));saveMap(m=>{m.positions=m.positions.filter(p=>!ids.has(p.id));});}
  else{try{state=onChange({...state,tokens:[]})??{...state,tokens:[]};}catch(error){status(error.message);}}
  updateMarkers();
 };
 refreshChoices();createMap();
 return ()=>{destroyed=true;observer?.disconnect();routeRequest?.abort();routeRequest=null;map?.remove();};
}
