import {escape} from './ui.js?v=0.24.0';
import {buildingTypes} from './building-schema.js?v=0.24.0';
import {getMapShapes,initializeMapShapes,saveMapShape,updateMapShape,removeMapShape,shapeCenter} from './map-shapes.js?v=0.24.0';
import {validPolygon} from './map-shape-schema.js?v=0.24.0';
import {validMapPoint} from './map-model.js?v=0.24.0';
import {openBuildingDialog} from './buildings-ui.js?v=0.24.0';

export function mountMapShapes({container,L,getMap,getState,getMode,getAction,setAction,visibleRecords,onSave,onRefresh,onInspect,onOpenRecord,getRecordPoint,scaleLabels,status}){
 const $=s=>container.querySelector(s);let layer=null,draftLayer=null,draft=null,editing=null,dialog=null,buildingDialog=null;
 $('#map-shape-tools').innerHTML=`<div class="map-shape-toolbar"><button id="map-draw-zone">+ Dessiner une zone</button><button id="map-draw-building">+ Bâtiment / arcologie</button><button id="map-arcologies">Arcologies de la campagne</button><label class="check-label"><input id="map-show-zones" type="checkbox" checked>Zones colorées</label><label class="check-label"><input id="map-show-buildings" type="checkbox" checked>Bâtiments</label></div><div class="map-draw-controls" hidden><b id="map-draw-count"></b><button id="map-finish-shape" class="primary">Fermer le contour</button><button id="map-undo-shape">Retirer le dernier point</button><button id="map-cancel-shape">Annuler le dessin</button></div><p class="map-shape-note muted"></p><button id="map-preview-proposals">Voir l’illustration avec les contours préparés</button><details class="map-features-list"><summary>Zones, bâtiments et arcologies</summary><div id="map-shape-list"></div></details>`;
 $('#map-draw-dock').append($('.map-draw-controls'));
 const save=next=>{onSave(next);onRefresh();};
 const levels=b=>!b.floors||b.floors==='À définir'?'Étages à définir':/niveaux?|étages?/i.test(b.floors)?b.floors:b.floors+' étages';
 const shapes=()=>getMapShapes(getState(),getMode());
 const visible=()=>new Set(visibleRecords().map(r=>r.id));
 function closeDialog(){dialog?.close();dialog?.remove();dialog=null;}
 function begin(kind,recordId=''){
  editing=null;draft={kind,recordId,points:[]};setAction('draw-'+kind);draw();status('Cliquez pour tracer le contour ; terminez avec « Fermer le contour ».');$('#map').scrollIntoView({block:'center'});
 }
 function cancel(resetAction=true){draft=null;editing=null;draftLayer?.clearLayers();$('.map-draw-controls').hidden=true;if(resetAction)setAction('explore');}
 function openShapeForm(){
  if(!draft||!validPolygon(draft.points,p=>validMapPoint(p,getMode()))){status('Il faut au moins trois points distincts, sans croisement.');return;}
  const proposal={...draft,points:draft.points.map(p=>[...p])},mode=getMode(),records=visibleRecords().filter(r=>proposal.kind==='zone'?r.kind==='zone':['zone','place'].includes(r.kind));
  const existing=getState().world.records.find(r=>r.id===proposal.recordId),color=existing?.building?.color??(proposal.kind==='zone'?'#65d0e6':'#eeb600');
  closeDialog();dialog=document.createElement('dialog');dialog.className='map-shape-editor';
  dialog.innerHTML=`<form><span class="eyebrow">${proposal.kind==='zone'?'ZONE COLORÉE':'BÂTIMENT / ARCOLOGIE'}</span><h2>Enregistrer le contour</h2><label>Dossier à associer<select name="recordId" aria-label="Dossier du contour"><option value="">Créer un nouveau dossier</option>${records.map(r=>`<option value="${escape(r.id)}" ${r.id===proposal.recordId?'selected':''}>${escape(r.name)}</option>`).join('')}</select></label><div data-new-shape-fields><label>Nom du nouveau dossier<input name="name" maxlength="200"></label><label>Description du nouveau dossier<textarea name="description" rows="3" maxlength="30000"></textarea></label><label class="check-label"><input type="checkbox" name="isSecret">Dossier réservé au MJ</label></div>${proposal.kind==='building'?`<label>Type du nouveau bâtiment<select name="type" aria-label="Type du nouveau bâtiment">${buildingTypes.map(t=>`<option ${t==='Bâtiment'?'selected':''}>${t}</option>`).join('')}</select></label>`:''}<label>Couleur du contour<input name="color" type="color" value="${color}"></label><p class="muted">Ce contour appartient uniquement à ${mode==='streets'?'ce plan des rues':'cette illustration'}. Le dossier associé est conservé si vous retirez le contour.</p><p class="map-shape-error" role="alert"></p><div class="actions"><button type="button" data-shape-cancel>Revenir au dessin</button><button type="submit" class="primary">Enregistrer le contour</button></div></form>`;
  document.body.append(dialog);const form=dialog.querySelector('form');
  const sync=()=>{const linked=!!form.elements.recordId.value;dialog.querySelector('[data-new-shape-fields]').hidden=linked;form.elements.name.required=!linked;};sync();form.elements.recordId.onchange=sync;
  dialog.querySelector('[data-shape-cancel]').onclick=closeDialog;dialog.oncancel=e=>{e.preventDefault();closeDialog();};
  form.onsubmit=e=>{e.preventDefault();try{
   const data=Object.fromEntries(new FormData(form));const result=saveMapShape(getState(),{...proposal,mode,recordId:data.recordId,name:data.name,description:data.description,color:data.color,type:data.type,isSecret:form.elements.isSecret.checked});
   save(result.state);closeDialog();const record=getState().world.records.find(r=>r.id===result.shape.recordId);if((!record.isSecret||$('#map-secrets').checked)&&!visible().has(record.id)){for(const key of ['authority','corporation','faction','security','type'])$('#map-'+key).value='';onRefresh();}cancel();if(record.isSecret&&!$('#map-secrets').checked){$('#map-inspector').textContent='Contour réservé au MJ enregistré.';status('Activez les secrets du MJ pour afficher ce contour.');}else{onInspect(record);inspectShape(result.shape.id);status('Contour enregistré dans votre campagne.');}
  }catch(error){dialog.querySelector('.map-shape-error').textContent=error.message;}};
  dialog.showModal();
 }
 function inspectShape(id){
  const shape=shapes().find(s=>s.id===id);if(!shape||!visible().has(shape.recordId))return;
  const record=getState().world.records.find(r=>r.id===shape.recordId);onInspect(record);
  const controls=document.createElement('div');controls.className='map-shape-inspector';controls.innerHTML=`<p class="muted">${escape(shape.source)}</p><label>Couleur du contour<input type="color" value="${shape.color}" aria-label="Couleur du contour sélectionné"></label><div class="actions"><button data-edit-shape>Modifier les sommets</button>${editing===id?'<button data-finish-edit>Terminer la modification</button>':''}<button data-redraw-shape>Redessiner le contour</button><button data-remove-shape>Retirer le contour</button></div>`;$('#map-inspector').append(controls);
  controls.querySelector('input').onchange=e=>{try{save(updateMapShape(getState(),getMode(),id,{color:e.target.value}));inspectShape(id);}catch(error){status(error.message);}};
  controls.querySelector('[data-edit-shape]').onclick=()=>{draft=null;editing=id;setAction('edit-shape');draw();status('Glissez les sommets. Cliquez sur un point + pour ajouter un sommet ; clic droit sur un sommet pour le retirer.');inspectShape(id);$('#map').scrollIntoView({block:'center'});};
  controls.querySelector('[data-finish-edit]')?.addEventListener('click',()=>{editing=null;setAction('explore');inspectShape(id);status('Contour enregistré.');});
  controls.querySelector('[data-redraw-shape]').onclick=()=>begin(shape.kind,shape.recordId);
  controls.querySelector('[data-remove-shape]').onclick=()=>{if(!confirm('Retirer ce contour de cette vue ? Son dossier et ses plans seront conservés.'))return;try{save(removeMapShape(getState(),getMode(),id));cancel();$('#map-inspector').textContent='Contour retiré. Le dossier et ses plans sont conservés.';}catch(error){status(error.message);}};
 }
 function showBuilding(id){
  const record=getState().world.records.find(r=>r.id===id);if(!record||record.isSecret&&!$('#map-secrets').checked)return;
  buildingDialog?.close();buildingDialog=openBuildingDialog(getState(),id,next=>{save(next);const updated=getState().world.records.find(r=>r.id===id),shape=shapes().find(s=>s.recordId===id&&s.kind==='building');if(updated.isSecret&&!$('#map-secrets').checked)$('#map-inspector').textContent='Bâtiment réservé au MJ enregistré.';else if(shape)inspectShape(shape.id);else onInspect(updated);return getState();},{includeSecrets:$('#map-secrets').checked,getState});
 }
 function renderList(){
  const shown=visible(),all=shapes();const records=visibleRecords().filter(r=>r.kind==='zone'||r.building);
  $('#map-shape-list').innerHTML=records.map(r=>{const s=all.find(s=>s.recordId===r.id&&(r.building?s.kind==='building':s.kind==='zone'));return `<article class="map-feature-row" data-building-kind="${escape(r.building?.type??'zone')}"><div><b>${escape(r.name)}</b><span>${r.building?escape(r.building.type)+' · '+escape(levels(r.building)):'Zone'} · ${s?'Contour présent':'À dessiner sur cette vue'}</span></div><div class="actions">${s?`<button data-focus-shape="${s.id}">Voir le contour</button>`:`<button data-draw-record="${r.id}" data-kind="${r.building?'building':'zone'}">Dessiner le contour</button>`}${r.building?`<button data-show-building="${r.id}">Fiche du bâtiment</button>`:''}</div></article>`;}).join('')||'<p>Aucun dossier visible avec ces filtres.</p>';
  $('#map-shape-list').querySelectorAll('[data-focus-shape]').forEach(b=>b.onclick=()=>{const s=shapes().find(s=>s.id===b.dataset.focusShape);if(s&&shown.has(s.recordId)){getMap().fitBounds(L.latLngBounds(s.points),{padding:[35,35],maxZoom:getMode()==='streets'?18:2});inspectShape(s.id);}});
  $('#map-shape-list').querySelectorAll('[data-draw-record]').forEach(b=>b.onclick=()=>begin(b.dataset.kind,b.dataset.drawRecord));
  $('#map-shape-list').querySelectorAll('[data-show-building]').forEach(b=>b.onclick=()=>showBuilding(b.dataset.showBuilding));
  $('.map-shape-note').textContent=getMode()==='cyberpunk'?'Contours indicatifs de campagne sur l’illustration, modifiables. Les emplacements inconnus restent à dessiner.':'Dessinez vos contours sur le plan des rues. Les contours de l’illustration restent indépendants.';
  $('#map-preview-proposals').hidden=getMode()==='cyberpunk';
 }
 function vertexMarker(point,html,label,draggable,onDrag,onClick,onRemove){
  const marker=L.marker(point,{icon:L.divIcon({className:'shape-vertex-icon',html,iconSize:[22,22],iconAnchor:[11,11]}),draggable,title:label,keyboard:true});
  marker.on('add',()=>marker.getElement()?.setAttribute('aria-label',label));if(onDrag)marker.on('dragend',()=>onDrag([marker.getLatLng().lat,marker.getLatLng().lng]));if(onClick)marker.on('click',onClick);if(onRemove)marker.on('contextmenu',onRemove);return marker;
 }
 function draw(){
  if(!layer)return;layer.clearLayers();draftLayer.clearLayers();const shown=visible(),action=getAction(),interactive=action==='explore'||action==='edit-shape';
  const visibleShapes=shapes().filter(s=>shown.has(s.recordId)&&$('#map-show-'+(s.kind==='zone'?'zones':'buildings')).checked),preferred=new Map();
  for(const shape of visibleShapes)if(!preferred.has(shape.recordId)||shape.kind==='building')preferred.set(shape.recordId,shape.id);
  for(const shape of visibleShapes){
   const record=getState().world.records.find(r=>r.id===shape.recordId),building=shape.kind==='building';
   const polygon=L.polygon(shape.points,{pane:building?'campaign-buildings':'campaign-zones',color:shape.color,fillColor:shape.color,fillOpacity:building ? .42 : .12,weight:building?3:2,dashArray:building?null:'7 4',interactive,bubblingMouseEvents:false,className:building?'campaign-building-shape':'campaign-zone-shape'}).addTo(layer);
   polygon.on('click',()=>inspectShape(shape.id));
   const element=polygon.getElement();if(element&&interactive){element.setAttribute('tabindex','0');element.setAttribute('role','button');element.setAttribute('aria-label',(building?'Bâtiment : ':'Zone : ')+record.name);element.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();inspectShape(shape.id);}});}
   if(preferred.get(record.id)===shape.id&&$('#map-labels').checked){
    const point=getRecordPoint(record)??shapeCenter(shape),label=L.marker(point,{pane:'campaign-building-labels',interactive,icon:L.divIcon({className:'campaign-marker map-feature-label scalable-map-label',html:`<a href="#" data-map-dossier class="map-pin ${building?'building-label':'zone-label'}"><span class="map-pin-name">${escape(record.name)}</span></a>`,iconSize:[190,32],iconAnchor:[95,16]}),title:record.name+' · ouvrir la fiche'}).addTo(layer);
    const root=label.getElement();if(root){root.setAttribute('aria-label',record.name+' · ouvrir la fiche');root.querySelector('a').onclick=e=>{e.preventDefault();e.stopPropagation();if(interactive&&onOpenRecord)onOpenRecord(record.id,$('#map-secrets').checked);else inspectShape(shape.id);};}label.on('click',()=>inspectShape(shape.id));
   }
  }
  const shape=shapes().find(s=>s.id===editing);
  if(shape&&shown.has(shape.recordId)&&action==='edit-shape')shape.points.forEach((point,i)=>{
   const update=points=>{try{save(updateMapShape(getState(),getMode(),shape.id,{points}));}catch(error){status(error.message);draw();}};
   vertexMarker(point,'<span class="shape-vertex">'+(i+1)+'</span>','Sommet '+(i+1)+' du contour',true,p=>update(shape.points.map((value,j)=>j===i?p:value)),null,()=>{if(shape.points.length<=3){status('Un contour conserve au moins trois sommets.');return;}update(shape.points.filter((_,j)=>j!==i));}).addTo(draftLayer);
   const next=shape.points[(i+1)%shape.points.length],mid=[(point[0]+next[0])/2,(point[1]+next[1])/2];vertexMarker(mid,'<span class="shape-midpoint">+</span>','Ajouter un sommet après le sommet '+(i+1),false,null,()=>{const points=shape.points.map(p=>[...p]);points.splice(i+1,0,mid);update(points);}).addTo(draftLayer);
  });
  if(draft){
   if(draft.points.length>1)L.polyline(draft.points,{pane:'campaign-buildings',color:'#ffdf38',weight:3,dashArray:'6 5',interactive:false}).addTo(draftLayer);
   draft.points.forEach((p,i)=>vertexMarker(p,'<span class="shape-vertex">'+(i+1)+'</span>',i===0?'Fermer le contour au premier point':'Point '+(i+1),false,null,i===0?openShapeForm:null).addTo(draftLayer));
  }
  $('.map-draw-controls').hidden=!draft;$('#map-draw-count').textContent=(draft?.points.length??0)+' point(s)';$('#map-finish-shape').disabled=!draft||draft.points.length<3;$('#map-undo-shape').disabled=!draft?.points.length;
  $('#map-draw-zone').setAttribute('aria-pressed',String(action==='draw-zone'));$('#map-draw-building').setAttribute('aria-pressed',String(action==='draw-building'));renderList();scaleLabels();
 }
 $('#map-draw-zone').onclick=()=>begin('zone');$('#map-draw-building').onclick=()=>begin('building');$('#map-finish-shape').onclick=openShapeForm;$('#map-undo-shape').onclick=()=>{draft?.points.pop();draw();};$('#map-cancel-shape').onclick=()=>{cancel();draw();};
 $('#map-show-zones').onchange=onRefresh;$('#map-show-buildings').onchange=onRefresh;
 $('#map-arcologies').onclick=()=>{$('.map-features-list').open=true;$('#map-shape-list [data-building-kind="Arcologie"]')?.scrollIntoView({block:'center'});};
 $('#map-preview-proposals').onclick=()=>{$('#map-view').value='cyberpunk';$('#map-view').dispatchEvent(new Event('change'));};
 return {
  attach(){cancel(false);closeDialog();buildingDialog?.close();buildingDialog=null;const initialized=initializeMapShapes(getState());if(initialized!==getState())try{onSave(initialized);}catch(error){status(error.message);}const map=getMap();for(const [name,z] of [['campaign-zones',410],['campaign-buildings',420],['campaign-routes',450],['campaign-building-labels',620]]){const pane=map.getPane(name)??map.createPane(name);pane.style.zIndex=z;}layer=L.layerGroup().addTo(map);draftLayer=L.layerGroup().addTo(map);},
  click(point){if(!getAction().startsWith('draw-'))return false;if(!draft)draft={kind:getAction()==='draw-zone'?'zone':'building',recordId:'',points:[]};if(draft.points.length>=200){status('Un contour est limité à 200 points.');return true;}if(!draft.points.length||point.some((v,i)=>v!==draft.points.at(-1)[i]))draft.points.push(point);draw();return true;},
  syncAction(){if(!getAction().startsWith('draw-')&&draft){draft=null;draftLayer?.clearLayers();}if(getAction()!=='edit-shape')editing=null;},
  draw,showBuilding,begin,mappedIds:()=>new Set(shapes().filter(s=>$('#map-show-'+(s.kind==='zone'?'zones':'buildings')).checked).map(s=>s.recordId)),
  dispose(){cancel(false);closeDialog();buildingDialog?.close();buildingDialog=null;layer?.clearLayers();draftLayer?.clearLayers();layer=null;draftLayer=null;}
 };
}
