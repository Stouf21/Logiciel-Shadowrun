import {mountMapContextMenu} from './map-context-menu.js?v=0.28.1';
import {mountMapZoom} from './map-zoom.js?v=0.28.1';
import {characterCategories} from './character-options.js?v=0.28.1';
import {scaleMapLabels} from './map-labels.js?v=0.28.1';
import {mountMapShapes} from './map-shapes-ui.js?v=0.28.1';
import {mapPlaceTypes,createMapPlace,positionMapPlace,removeMapPlacePosition} from './map-places.js?v=0.28.1';
import {secretSection} from './secrets-ui.js?v=0.28.1';
import {escape,searchDisclosure} from './ui.js?v=0.28.1';
import {dijonPlaces} from './dijon-places.js?v=0.28.1';
import {worldSearch} from './world.js?v=0.28.1';
import {authorities} from './world-schema.js?v=0.28.1';
import {copyMapState,dijonMapCenter,imageSize,imagePointFromPercent,imagePointToPercent,validMapPoint,routeDistance,routeAfterEdit,formatDistance,maxWaypoints,requestStreetRoute} from './map-model.js?v=0.28.1';
export {dijonPlaces};

export function renderDijonMap(container,snapshot,onChange,{onOpenRecord}={}){
 let state=snapshot,mode=copyMapState(state.mapState).dijon.mode,map=null,observer=null,destroyed=false,routeRequest=null,placeDialog=null,geometry=null,wheelZoom=null,contextMenu=null;
 let records=state.world?.records??[];const L=globalThis.L;
 const options=items=>'<option value="">Tous / toutes</option>'+items.map(item=>{const [id,label]=Array.isArray(item)?item:[item,item];return `<option value="${escape(id)}">${escape(label)}</option>`;}).join('');
 container.innerHTML=`<div class="dijon-header"><span class="tag">DIJON / ${state.world?.settings.year??2082}</span><h3>Les ombres de la cité des Ducs.</h3></div>
 <div class="map-controls interactive-map-controls"><label>Fond de carte<select id="map-view" aria-label="Fond de carte"><option value="streets">Plan des rues · OpenStreetMap</option><option value="cyberpunk">Illustration cyberpunk</option></select></label><label>Action sur la carte<select id="map-action" aria-label="Action sur la carte"><option value="explore">Explorer</option><option value="route">Tracer un itinéraire</option><option value="character">Placer un personnage</option><option value="place">Positionner un lieu existant</option><option value="create-place">Ajouter un nouveau lieu</option><option value="draw-zone">Dessiner une zone</option><option value="draw-building">Dessiner un bâtiment / arcologie</option><option value="edit-shape">Modifier un contour</option></select></label><div class="map-zoom"><output id="map-zoom-value"></output></div><button id="map-recenter">Recentrer</button></div>
 <p id="map-background-note" class="muted map-background-note"></p>
 <div id="map-character-controls" class="map-placement-controls" hidden><label>Personnage à placer<select id="map-character" aria-label="Personnage à placer"></select></label><button id="clear-map">Retirer les pions de cette vue</button></div>
 <div id="map-place-controls" class="map-placement-controls" hidden><label>Lieu à positionner<select id="map-place" aria-label="Lieu à positionner"></select></label><p class="muted">Choisissez un dossier puis cliquez à son emplacement. Les positions du plan de rues sont indépendantes de l’illustration.</p></div>
 ${searchDisclosure('map-search-panel',`<div class="world-filters map-world-filters"><label>Autorité<select id="map-authority" aria-label="Autorité sur la carte">${options(authorities)}</select></label><label>Corporation<select id="map-corporation" aria-label="Corporation sur la carte"></select></label><label>Faction<select id="map-faction" aria-label="Faction sur la carte"></select></label><label>Sécurité<select id="map-security" aria-label="Sécurité sur la carte"></select></label><label>Type de lieu<select id="map-type" aria-label="Type de lieu sur la carte"></select></label><label class="check-label"><input id="map-labels" type="checkbox" checked>Afficher les noms des repères</label><label class="check-label"><input id="map-secrets" type="checkbox">Afficher les secrets du MJ</label></div>`,{label:'Filtrer la carte'})}
 <div class="map-route-controls"><button class="primary" id="map-add-place" aria-pressed="false">+ Ajouter un lieu</button><button id="map-route-toggle" aria-pressed="false">Tracer un itinéraire</button><button id="map-route-road">Calculer par les rues</button><button id="map-route-undo">Retirer la dernière étape</button><button id="map-route-clear">Effacer l’itinéraire</button><output id="map-route-summary" aria-live="polite"></output></div>
 <div id="map-shape-tools"></div><p id="map-help" class="map-legend">Glissez pour déplacer la vue. Zoomez avec ⌘ + molette sur Mac, Alt + molette sur Windows, le pincement ou les boutons + / −. Clic droit : actions à cet emplacement.</p>
 <p id="map-state-status" class="muted" role="status"></p><div id="map-draw-dock"></div><div id="map" class="interactive-map" role="region" aria-label="Carte interactive de Dijon" aria-describedby="map-help"></div>
 <div class="map-inspector" id="map-inspector" role="status">Choisissez un repère pour ouvrir son dossier.</div><p id="map-world-count" class="muted" role="status"></p>
 <details><summary>Zones et lieux à positionner sur cette vue</summary><p class="muted">Les repères de l’illustration ne sont pas convertis automatiquement en coordonnées géographiques.</p><div class="place-list" id="unplaced-world-records"></div></details>`;
 const $=selector=>container.querySelector(selector);
 if(!L){$('#map-state-status').textContent='La bibliothèque cartographique n’a pas chargé. Rechargez la page.';return ()=>{};}
 let markerLayer,routeLayer;
 const initialModel=copyMapState(state.mapState).dijon;
 const model=()=>state.mapState?.dijon??initialModel;
 const currentRoute=()=>model().routes[mode];
 function status(value){if(!destroyed)$('#map-state-status').textContent=value;}
 function apply(next){state=onChange(next)??next;records=state.world?.records??[];}
 function saveMap(change){
  const nextMap=copyMapState(state.mapState);change(nextMap.dijon);
  const next={...state,mapState:nextMap};try{apply(next);return true;}catch(error){status(error.message);return false;}
 }
 function visibleRecords(){return worldSearch(state.world,'',{includeSecrets:$('#map-secrets').checked,filters:{authority:$('#map-authority').value,corporation:$('#map-corporation').value,faction:$('#map-faction').value,security:$('#map-security').value}}).map(hit=>hit.record).filter(r=>['zone','place'].includes(r.kind)&&(!$('#map-type').value||r.fields.type===$('#map-type').value));}
 function characters(){
  const known=records.filter(r=>r.kind==='character'&&($('#map-secrets').checked||!r.isSecret));
  return [...state.entries.filter(e=>characterCategories.includes(e.category)&&!records.some(r=>r.gameEntryId===e.id&&r.isSecret&&!$('#map-secrets').checked)).map(e=>({id:e.id,name:e.name})),...known.filter(r=>!r.gameEntryId).map(r=>({id:r.id,name:r.name}))];
 }
 function refreshChoices(){
  const showSecrets=$('#map-secrets').checked;
  for(const [key,items] of [['corporation',records.filter(r=>r.kind==='corporation'&&(showSecrets||!r.isSecret)).map(r=>[r.id,r.name])],['faction',records.filter(r=>r.kind==='faction'&&(showSecrets||!r.isSecret)).map(r=>[r.id,r.name])],['security',[...new Set(records.filter(r=>['zone','place'].includes(r.kind)&&(showSecrets||!r.isSecret)).map(r=>r.fields.security).filter(Boolean))]],['type',[...new Set(records.filter(r=>['zone','place'].includes(r.kind)&&(showSecrets||!r.isSecret)).map(r=>r.fields.type).filter(Boolean))].sort()]]){
   const field=$('#map-'+key),previous=field.value;field.innerHTML=options(items);field.value=[...field.options].some(x=>x.value===previous)?previous:'';
  }
  const previous=$('#map-character').value;$('#map-character').innerHTML='<option value="">Choisir un personnage…</option>'+characters().map(c=>`<option value="${escape(c.id)}">${escape(c.name)}</option>`).join('');$('#map-character').value=previous;
 }
 function placeSymbol(type){
  if(type==='Boutique')return '<svg class="map-place-symbol" aria-hidden="true" viewBox="0 0 20 20"><path d="M4 7h12l1 11H3L4 7Zm3 0V5a3 3 0 0 1 6 0v2"/></svg>';
  if(type==='Lieu important')return '<svg class="map-place-symbol" aria-hidden="true" viewBox="0 0 20 20"><path d="m10 2 2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9L7.5 7Z"/></svg>';
  return '';
 }
 function openPlaceDialog(point){
  if(placeDialog)return;const selectedMode=mode,dialog=document.createElement('dialog');placeDialog=dialog;dialog.className='map-place-editor';
  const zones=records.filter(r=>r.kind==='zone'&&($('#map-secrets').checked||!r.isSecret));
  dialog.innerHTML=`<form><span class="eyebrow">NOUVEAU REPÈRE</span><h2>Ajouter un lieu</h2><p class="muted">Le repère sera placé à l’emplacement choisi sur ${selectedMode==='streets'?'le plan des rues':'l’illustration cyberpunk'}.</p><label>Nom du lieu<input name="name" required maxlength="200" autocomplete="off" placeholder="Une boutique, une planque…"></label><label>Type de lieu<select name="type" required aria-label="Type du nouveau lieu"><option value="">Choisir un type…</option>${mapPlaceTypes.map(type=>`<option>${escape(type)}</option>`).join('')}</select></label><label id="custom-place-type" hidden>Type personnalisé<input name="customType" maxlength="100"></label><label>Description (facultative)<textarea name="description" aria-label="Description du lieu" rows="3" maxlength="30000"></textarea></label><label>Quartier / zone<select name="zoneId" aria-label="Quartier du nouveau lieu"><option value="">À définir</option>${zones.map(r=>`<option value="${escape(r.id)}">${escape(r.name)}</option>`).join('')}</select></label><label class="check-label"><input type="checkbox" name="isSecret">Repère réservé au MJ</label>${secretSection('Notes du MJ','<label>Notes privées<textarea name="gmNotes" aria-label="Notes privées du lieu" rows="3" maxlength="30000"></textarea></label>')}<p class="map-place-error" role="alert"></p><div class="actions"><button type="button" data-place-cancel>Annuler</button><button type="submit" class="primary">Ajouter le repère</button></div></form>`;
  document.body.append(dialog);const form=dialog.querySelector('form');
  const close=()=>{dialog.close();dialog.remove();if(placeDialog===dialog)placeDialog=null;};
  const cancel=()=>{close();if(!destroyed)setAction('explore');};
  dialog.querySelector('[data-place-cancel]').onclick=cancel;dialog.oncancel=event=>{event.preventDefault();cancel();};
  form.elements.type.onchange=()=>{const custom=form.elements.type.value==='Autre';dialog.querySelector('#custom-place-type').hidden=!custom;form.elements.customType.required=custom;};
  form.onsubmit=event=>{
   event.preventDefault();try{
    const data=Object.fromEntries(new FormData(form)),id='place-'+crypto.randomUUID();
    const next=createMapPlace(state,{mode:selectedMode,point,name:data.name,type:data.type==='Autre'?data.customType:data.type,description:data.description,gmNotes:data.gmNotes,zoneId:data.zoneId,isSecret:form.elements.isSecret.checked},id);
    apply(next);refreshChoices();const record=records.find(r=>r.id===id);
    if((!record.isSecret||$('#map-secrets').checked)&&!visibleRecords().some(r=>r.id===id))for(const key of ['authority','corporation','faction','security','type'])$('#map-'+key).value='';
    setAction('explore');
    if(record.isSecret&&!$('#map-secrets').checked){$('#map-inspector').textContent='Repère réservé au MJ enregistré.';status('Activez « Afficher les secrets du MJ » dans les filtres pour voir ce repère.');}
    else{inspect(record);status('Lieu ajouté et position enregistrée sur cette carte.');}
    close();
   }catch(error){dialog.querySelector('.map-place-error').textContent=error.message;}
  };
  dialog.showModal();form.elements.name.focus();
 }
 function recordPoint(record){
  if(mode==='streets')return model().positions.find(p=>p.id===record.id)?.point;
  const original=dijonPlaces.find(p=>p.id===record.mapPlaceId);return original?imagePointFromPercent(original):record.coordinates?imagePointFromPercent(record.coordinates):null;
 }
 function pointMarker(point,label,html,{draggable=false,onDrag,onClick,recordId=null,iconSize=[160,32],iconAnchor=[11,16]}={}){
  const marker=L.marker(point,{icon:L.divIcon({className:'campaign-marker'+(iconSize[0]===160?' scalable-map-label':''),html,iconSize,iconAnchor}),title:label,keyboard:true,draggable});
  marker.on('add',()=>{const root=marker.getElement();root?.setAttribute('aria-label',label);if(iconSize[0]===160&&root)root.dataset.labelAnchor='point';const link=root?.querySelector('[data-map-dossier]');if(link)link.onclick=e=>{e.preventDefault();e.stopPropagation();if(marker.dragging?.moved())return;if($('#map-action').value==='explore'&&onOpenRecord)onOpenRecord(recordId,$('#map-secrets').checked);else onClick?.();};scaleMapLabels($('#map'),mode,map.getZoom());});
  if(onClick)marker.on('click',onClick);
  if(onDrag)marker.on('dragend',()=>onDrag([marker.getLatLng().lat,marker.getLatLng().lng]));
  return marker;
 }
 function authorityClass(record){return ({Municipale:'municipal','Étatique':'state',Corporatiste:'corporate',Mixte:'mixed',Clandestine:'secret'})[record.fields.authority]??'unknown';}
 function inspect(record){
  if(record.isSecret&&!$('#map-secrets').checked)return;
  const original=dijonPlaces.find(p=>p.id===record.mapPlaceId);
  $('#map-inspector').innerHTML=`<span class="tag">${escape(record.name)} · ${escape(record.fields.authority??'À définir')}</span><p>${escape(record.publicInfo)}</p><div class="actions"><button data-open-world="${escape(record.id)}" ${$('#map-secrets').checked?'data-world-reveal="true"':''}>Ouvrir le dossier de campagne</button><button data-world-edit="${escape(record.id)}">Modifier le dossier</button>${record.building?'<button id="map-building-file">Fiche du bâtiment et plans</button>':''}${mode==='streets'||!record.mapPlaceId?'<button id="map-move-position">Déplacer le repère</button><button id="map-remove-position">Retirer de cette carte</button>':''}</div>${$('#map-secrets').checked?`<p class="map-secret-text">Secrets MJ : ${escape(record.secrets)}</p>`:''}${original?`<details><summary>Ancienne accroche de campagne</summary><p>${escape(original.hook)}</p></details>`:''}`;
  const building=$('#map-building-file');if(building)building.onclick=()=>geometry.showBuilding(record.id);
  const move=$('#map-move-position');if(move)move.onclick=()=>{setAction('place');$('#map-place').value=record.id;status('Glissez le repère ou cliquez sur son nouvel emplacement.');$('#map').scrollIntoView({block:'center'});};
  const remove=$('#map-remove-position');if(remove)remove.onclick=()=>{if(!confirm('Retirer ce repère de cette carte ? Son dossier et sa position sur l’autre fond seront conservés.'))return;try{apply(removeMapPlacePosition(state,record.id,mode));updateMarkers();$('#map-inspector').textContent='Repère retiré de cette vue. Le dossier reste dans les lieux.';}catch(error){status(error.message);}};
 }
 function saveStreetPosition(id,point){return saveMap(m=>{m.positions=[...m.positions.filter(p=>p.id!==id),{id,point}];});}
 function updateMarkers(){
  markerLayer.clearLayers();const filtered=visibleRecords(),shapeIds=geometry?.mappedIds()??new Set(),mapped=filtered.filter(r=>recordPoint(r)&&!shapeIds.has(r.id));
  for(const record of mapped){
   const point=recordPoint(record),html=`<a href="#" data-map-dossier class="map-pin authority-${authorityClass(record)}"><i></i>${placeSymbol(record.fields.type)}<span class="map-pin-name">${escape(record.name)}</span></a>`;
   pointMarker(point,record.name,html,{recordId:record.id,draggable:$('#map-action').value==='place'&&(mode==='streets'||!record.mapPlaceId),onDrag:point=>{try{apply(positionMapPlace(state,record.id,mode,point));}catch(error){status(error.message);}updateMarkers();},onClick:()=>inspect(record)}).addTo(markerLayer);
  }
  for(const character of characters()){
   const token=mode==='streets'?model().positions.find(p=>p.id===character.id):state.tokens.find(p=>p.id===character.id);
   if(!token)continue;const point=mode==='streets'?token.point:imagePointFromPercent(token);
   pointMarker(point,character.name,`<span class="map-pin character-pin"><i></i><span class="map-pin-name">${escape(character.name)}</span></span>`,{draggable:true,onDrag:point=>placeCharacter(character.id,point),onClick:()=>{$('#map-character').value=character.id;setAction('character');}}).addTo(markerLayer);
  }
  const unplaced=filtered.filter(r=>!recordPoint(r)&&!shapeIds.has(r.id));
  $('#map-world-count').textContent=mapped.length+' repère(s) · '+unplaced.length+' dossier(s) à positionner';
  $('#unplaced-world-records').innerHTML=unplaced.map(r=>`<button data-open-world="${escape(r.id)}" ${r.isSecret?'data-world-reveal="true"':''}>${escape(r.name)}</button>`).join('')||'Tous les dossiers visibles sont positionnés.';
  const previous=$('#map-place').value,placeChoices=filtered.filter(r=>mode==='streets'||!r.mapPlaceId);
  $('#map-place').innerHTML='<option value="">Choisir un lieu…</option>'+placeChoices.map(r=>`<option value="${escape(r.id)}">${escape(r.name)}</option>`).join('');$('#map-place').value=previous;
  $('#map').classList.toggle('map-labels-off',!$('#map-labels').checked);geometry?.draw();scaleMapLabels($('#map'),mode,map.getZoom());
 }
 function placeCharacter(id,point){
  if(!validMapPoint(point,mode)){status('Placez le pion dans les limites de cette carte.');updateMarkers();return false;}
  let saved=false;
  if(mode==='streets')saved=saveStreetPosition(id,point);
  else{const next={...state,tokens:[...state.tokens.filter(t=>t.id!==id),{id,...imagePointToPercent(point)}]};try{apply(next);saved=true;}catch(error){status(error.message);}}
  updateMarkers();return saved;
 }
 function openPlacementDialog(kind,point){
  if(placeDialog)return;const selectedMode=mode,list=kind==='character'?characters():visibleRecords().filter(r=>mode==='streets'||!r.mapPlaceId),dialog=document.createElement('dialog');placeDialog=dialog;dialog.className='map-place-editor';
  dialog.innerHTML=`<form><h2>${kind==='character'?'Placer un personnage ici':'Positionner un lieu ici'}</h2><label>${kind==='character'?'Personnage':'Lieu ou zone'}<select name="record" required><option value="">Choisir…</option>${list.map(r=>`<option value="${escape(r.id)}">${escape(r.name)}</option>`).join('')}</select></label><p class="map-place-error" role="alert"></p><div class="actions"><button type="button" data-cancel>Annuler</button><button type="submit" class="primary">Placer ici</button></div></form>`;
  document.body.append(dialog);const close=()=>{dialog.close();dialog.remove();if(placeDialog===dialog)placeDialog=null;};dialog.querySelector('[data-cancel]').onclick=close;dialog.oncancel=e=>{e.preventDefault();close();};
  dialog.querySelector('form').onsubmit=e=>{e.preventDefault();try{const id=dialog.querySelector('select').value;if(!id||!list.some(r=>r.id===id))throw Error('Choisissez un élément de la liste.');if(destroyed||mode!==selectedMode)throw Error('La vue a changé. Fermez cette fenêtre puis recommencez.');if(kind==='character'){if(!placeCharacter(id,point))throw Error($('#map-state-status').textContent||'Position non enregistrée.');}else{apply(positionMapPlace(state,id,selectedMode,point));updateMarkers();inspect(records.find(r=>r.id===id));}close();status('Position enregistrée à l’emplacement du clic droit.');}catch(error){dialog.querySelector('.map-place-error').textContent=error.message;}};
  dialog.showModal();dialog.querySelector('select').focus();
 }
 function contextActions(point){
  const separator={separator:true},drawing=$('#map-action').value.startsWith('draw-'),valid=validMapPoint(point,mode),actions=[];
  if(drawing){actions.push({label:'Ajouter un sommet ici',disabled:!valid,run:()=>geometry.click(point)},{label:'Fermer le contour',disabled:$('#map-finish-shape').disabled,run:()=>$('#map-finish-shape').click()},{label:'Retirer le dernier sommet',disabled:$('#map-undo-shape').disabled,run:()=>$('#map-undo-shape').click()},{label:'Annuler le contour',run:()=>$('#map-cancel-shape').click()});}
  else actions.push(
   {label:'Ajouter un lieu ici…',disabled:!valid,run:()=>openPlaceDialog(point)},
   {label:'Placer un personnage ici…',disabled:!valid||!characters().length,run:()=>openPlacementDialog('character',point)},
   {label:'Positionner un lieu existant ici…',disabled:!valid||!visibleRecords().some(r=>mode==='streets'||!r.mapPlaceId),run:()=>openPlacementDialog('place',point)},separator,
   {label:'Commencer un itinéraire ici',disabled:!valid,run:()=>{if(currentRoute().points.length&&!confirm('Remplacer l’itinéraire de cette vue par un nouveau départ ici ?'))return;if(editRoute([point]))setAction('route');}},
   {label:'Ajouter une étape ici',disabled:!valid||currentRoute().points.length>=maxWaypoints,run:()=>{if(editRoute([...currentRoute().points,point]))setAction('route');}},
   ...($('#map-action').value==='route'?[{label:'Terminer le tracé',run:()=>setAction('explore')}]:[]),
   ...(mode==='streets'?[{label:'Calculer l’itinéraire par les rues',disabled:currentRoute().points.length<2||!!routeRequest,run:()=>$('#map-route-road').click()}]:[]),
   {label:'Effacer l’itinéraire',disabled:!currentRoute().points.length,run:()=>$('#map-route-clear').click()},separator,
   {label:'Dessiner une zone ici',disabled:!valid,run:()=>{geometry.begin('zone');geometry.click(point);}},
   {label:'Dessiner un bâtiment / une arcologie ici',disabled:!valid,run:()=>{geometry.begin('building');geometry.click(point);}},
   {label:'Modifier un contour',run:()=>setAction('edit-shape')}
  );
  return [...actions,separator,{label:'Centrer la vue ici',disabled:!valid,run:()=>{wheelZoom?.stop();map.panTo(point,{animate:false});}},{label:'Zoom avant ici',disabled:map.getZoom()>=map.getMaxZoom(),run:()=>wheelZoom.zoomBy(map.options.zoomDelta,map.latLngToContainerPoint(point))},{label:'Zoom arrière ici',disabled:map.getZoom()<=map.getMinZoom(),run:()=>wheelZoom.zoomBy(-map.options.zoomDelta,map.latLngToContainerPoint(point))},{label:'Recentrer sur Dijon',run:resetView}];
 }
 function stopRequest(){if(routeRequest){routeRequest.abort();routeRequest=null;}$('#map-route-road').disabled=currentRoute().points.length<2;}
 function editRoute(points){stopRequest();const saved=saveMap(m=>{m.routes[mode]=routeAfterEdit(points);});if(saved){status('');drawRoute();}return saved;}
 function drawRoute(){
  routeLayer.clearLayers();const route=currentRoute(),points=route.points;
  if(points.length>1)L.polyline(route.road?.points??points,{pane:'campaign-routes',color:route.road?'#65d0e6':'#ffc321',weight:5,opacity:.95,dashArray:route.road?null:'9 7'}).addTo(routeLayer);
  points.forEach((point,index)=>{
   const label=index===0?'Départ':index===points.length-1?'Arrivée':'Étape '+index;
   pointMarker(point,label,`<span class="route-waypoint" title="${label}">${index+1}</span>`,{draggable:true,iconSize:[29,29],iconAnchor:[14,14],onDrag:next=>{if(!validMapPoint(next,mode)){status('L’étape doit rester dans les limites de la carte.');drawRoute();return;}const nextPoints=currentRoute().points.map(p=>[...p]);nextPoints[index]=next;editRoute(nextPoints);}}).addTo(routeLayer);
  });
  let summary=points.length+' étape(s)';
  if(points.length>1&&mode==='streets')summary+=' · '+(route.road?'Par les rues · '+formatDistance(route.road.distanceMetres)+' · ~'+Math.max(1,Math.round(route.road.durationSeconds/60))+' min en voiture':'Tracé libre · ~'+formatDistance(routeDistance(points)));
  $('#map-route-summary').textContent=summary;$('#map-route-undo').disabled=!points.length;$('#map-route-clear').disabled=!points.length;$('#map-route-road').hidden=mode!=='streets';$('#map-route-road').disabled=points.length<2||!!routeRequest;
 }
 function setAction(action){
  $('#map-action').value=action;$('#map-character-controls').hidden=action!=='character';$('#map-place-controls').hidden=action!=='place';$('#map-route-toggle').setAttribute('aria-pressed',String(action==='route'));$('#map-add-place').setAttribute('aria-pressed',String(action==='create-place'));
  $('#map').classList.toggle('map-draw-mode',action!=='explore');
  if(action==='route'||action.startsWith('draw-'))map.doubleClickZoom.disable();else map.doubleClickZoom.enable();
  geometry?.syncAction();
  $('#map-help').textContent=action.startsWith('draw-')?'Cliquez pour ajouter les sommets, puis fermez le contour avec le bouton ou le premier point.':action==='edit-shape'?'Choisissez un contour puis « Modifier les sommets ». Glissez un sommet ; les points + ajoutent un sommet.':action==='create-place'?'Cliquez sur l’emplacement du nouveau lieu, puis renseignez son nom et son type.':action==='route'?'Cliquez pour ajouter des étapes. Glissez une étape pour la déplacer ; glissez le fond pour déplacer la vue.':action==='character'?'Choisissez un personnage puis cliquez pour placer son pion. Ses pions peuvent être déplacés par glisser-déposer.':action==='place'?'Choisissez un lieu puis cliquez sur son emplacement. Les repères ajoutés peuvent ensuite être déplacés par glisser-déposer.':'Glissez pour déplacer la vue. Zoomez avec ⌘ + molette sur Mac, Alt + molette sur Windows, le pincement ou les boutons + / −. Clic droit : actions à cet emplacement.';
  updateMarkers();
 }
 function updateZoom(){
  if(destroyed||!map?.getPane('mapPane'))return;
  scaleMapLabels($('#map'),mode,map.getZoom());
  $('#map-zoom-value').textContent=mode==='streets'?'Zoom '+map.getZoom().toLocaleString('fr-FR',{maximumFractionDigits:2}):Math.round(2**map.getZoom()*100)+' %';
  $('#map-minus').disabled=map.getZoom()<=map.getMinZoom();$('#map-plus').disabled=map.getZoom()>=map.getMaxZoom();
 }
 function resetView(){wheelZoom?.stop();if(mode==='streets')map.setView(dijonMapCenter,14);else map.fitBounds([[0,0],[imageSize.height,imageSize.width]],{padding:[12,12]});}
 function createMap(){
  stopRequest();contextMenu?.dispose();contextMenu=null;observer?.disconnect();wheelZoom?.dispose();wheelZoom=null;if(map)map.remove();
  const element=$('#map');element.classList.toggle('map-streets',mode==='streets');element.classList.toggle('map-cyberpunk',mode==='cyberpunk');
  map=L.map(element,{crs:mode==='streets'?L.CRS.EPSG3857:L.CRS.Simple,zoomControl:false,minZoom:mode==='streets'?3:-4,maxZoom:mode==='streets'?19:3,zoomSnap:0,zoomDelta:mode==='streets'?1:.5,scrollWheelZoom:false,zoomAnimation:false,fadeAnimation:false,markerZoomAnimation:false,attributionControl:true});
  const activeMap=map,activeMode=mode;
  const Zoom=L.Control.extend({options:{position:'topright'},onAdd(){const box=L.DomUtil.create('div','map-floating-zoom leaflet-control leaflet-bar');box.innerHTML='<button id="map-plus" type="button" aria-label="Augmenter le zoom">+</button><button id="map-minus" type="button" aria-label="Réduire le zoom">−</button>';L.DomEvent.disableClickPropagation(box);L.DomEvent.disableScrollPropagation(box);box.querySelector('#map-plus').onclick=()=>wheelZoom.zoomBy(activeMap.options.zoomDelta);box.querySelector('#map-minus').onclick=()=>wheelZoom.zoomBy(-activeMap.options.zoomDelta);return box;}});new Zoom().addTo(map);
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
  geometry?.attach();markerLayer=L.layerGroup().addTo(map);routeLayer=L.layerGroup().addTo(map);drawRoute();setAction($('#map-action').value);updateZoom();
  wheelZoom=mountMapZoom(activeMap);contextMenu=mountMapContextMenu(activeMap,{getActions:contextActions,onError:error=>status(error.message)});
  map.on('zoom',updateZoom);
  map.on('moveend',()=>{if(destroyed||map!==activeMap||!activeMap.getPane('mapPane'))return;const center=activeMap.getCenter(),point=[center.lat,center.lng];if(activeMode==='streets'&&!validMapPoint(point,activeMode))return;saveMap(m=>{m.views[activeMode]={center:point,zoom:activeMap.getZoom()};});});
  map.on('click',event=>{
   const point=[event.latlng.lat,event.latlng.lng],action=$('#map-action').value;
   if(action==='explore')return;
   if(!validMapPoint(point,mode)){status('Cliquez dans les limites de la carte.');return;}
   status('');
   if(geometry?.click(point))return;
   if(action==='route'){const points=currentRoute().points;if(points.length>=maxWaypoints){status('L’itinéraire est limité à '+maxWaypoints+' étapes.');return;}editRoute([...points,point]);}
   if(action==='character'){const id=$('#map-character').value;if(id)placeCharacter(id,point);else status('Choisissez d’abord un personnage.');}
   if(action==='create-place')openPlaceDialog(point);
   if(action==='place'){
    const id=$('#map-place').value;if(!id){status('Choisissez d’abord un lieu.');return;}
    try{apply(positionMapPlace(state,id,mode,point));}catch(error){status(error.message);}
    updateMarkers();
   }
  });
  observer=new ResizeObserver(()=>{if(!destroyed&&map===activeMap&&activeMap.getPane('mapPane'))activeMap.invalidateSize({pan:false});});observer.observe(element);
 }
 $('#map-view').value=mode;
 $('#map-view').onchange=()=>{const selectedMode=$('#map-view').value;if(saveMap(m=>{m.mode=selectedMode;})){mode=selectedMode;status('');createMap();}else $('#map-view').value=mode;};
 $('#map-action').onchange=()=>setAction($('#map-action').value);
 $('#map-add-place').onclick=()=>{const action=$('#map-action').value==='create-place'?'explore':'create-place';setAction(action);if(action==='create-place')$('#map').scrollIntoView({block:'center'});};
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
 $('#map-recenter').onclick=resetView;
 $('#map-labels').onchange=updateMarkers;
 $('#map-secrets').onchange=()=>{refreshChoices();updateMarkers();$('#map-inspector').textContent='Choisissez un repère pour ouvrir son dossier.';};
 for(const id of ['map-authority','map-corporation','map-faction','map-security','map-type'])$('#'+id).onchange=()=>{updateMarkers();$('#map-inspector').textContent='Choisissez un repère pour ouvrir son dossier.';};
 $('#clear-map').onclick=()=>{
  if(!confirm('Retirer tous les pions des personnages sur cette vue ?'))return;
  if(mode==='streets'){const ids=new Set(characters().map(c=>c.id));saveMap(m=>{m.positions=m.positions.filter(p=>!ids.has(p.id));});}
  else{try{state=onChange({...state,tokens:[]})??{...state,tokens:[]};}catch(error){status(error.message);}}
  updateMarkers();
 };
 geometry=mountMapShapes({container,L,getMap:()=>map,getState:()=>state,getMode:()=>mode,getAction:()=>$('#map-action').value,setAction,visibleRecords,onSave:next=>{apply(next);return state;},onRefresh:()=>{refreshChoices();updateMarkers();},onInspect:inspect,onOpenRecord,getRecordPoint:recordPoint,scaleLabels:()=>scaleMapLabels($('#map'),mode,map.getZoom()),status});
 refreshChoices();createMap();
 return ()=>{contextMenu?.dispose();contextMenu=null;wheelZoom?.dispose();wheelZoom=null;destroyed=true;geometry?.dispose();placeDialog?.close();placeDialog?.remove();placeDialog=null;observer?.disconnect();routeRequest?.abort();routeRequest=null;map?.remove();};
}
