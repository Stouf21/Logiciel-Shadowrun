import {escape} from './ui.js?v=0.6.0';
// Repères approximatifs d'une réinterprétation artistique, pas des données de navigation.
export const dijonPlaces=[
 {id:'gare',name:'Gare Dijon-Ville',x:42,y:56,hook:'Hub ferroviaire sous surveillance : extraction à la sortie du dernier train.'},
 {id:'darcy',name:'Darcy',x:47,y:54,hook:'Point de rencontre public ; les drones de voirie filment les échanges.'},
 {id:'palais',name:'Palais des Ducs',x:55,y:58,hook:'Patrimoine protégé et réception de mécènes : terrain d’infiltration sociale.'},
 {id:'republique',name:'République',x:61,y:49,hook:'Carrefour des transports et des foules ; idéal pour une filature.'},
 {id:'wilson',name:'Wilson',x:60,y:68,hook:'Rendez-vous discret à la limite du centre historique.'},
 {id:'gastronomie',name:'Cité de la gastronomie',x:40,y:69,hook:'Vitrines luxueuses et arrière-salles où se négocient les contrats.'},
 {id:'universite',name:'Université',x:84,y:68,hook:'Campus de recherche : un prototype intéresse plusieurs employeurs.'},
 {id:'chu',name:'CHU',x:81,y:57,hook:'Centre médical et clinique clandestine voisine, selon votre scénario.'},
 {id:'kir',name:'Lac Kir',x:10,y:57,hook:'Échange sur les berges ; le reflet des néons masque les observateurs.'},
 {id:'toison',name:'Toison d’Or',x:63,y:10,hook:'Zone commerciale transformée en enclave corporatiste pour cette campagne.'},
 {id:'canal',name:'Port du Canal',x:35,y:75,hook:'Convois logistiques, contrebande et entrepôts sous contrat privé.'}
];
export function renderDijonMap(container,state,onChange){
 const chars=state.entries.filter(e=>['PJ','PNJ principal','PNJ secondaire'].includes(e.category));let selected=null,zoom=1;
 container.innerHTML=`<div class="dijon-header"><div><span class="tag">DIJON / 2084</span><h3>Les ombres de la cité des Ducs.</h3><p class="muted">Carte de campagne artistique. Repères dijonnais approximatifs, implantations et accroches cyberpunk fictives ; aucune valeur de navigation ou de canon officiel.</p></div></div><div class="map-controls"><label>Personnage à placer<select id="map-character" aria-label="Personnage à placer"><option value="">Choisir une fiche…</option>${chars.map(e=>`<option value="${escape(e.id)}">${escape(e.name)}</option>`).join('')}</select></label><label class="check-label"><input id="map-labels" type="checkbox" checked>Repères de Dijon</label><div class="map-zoom"><button id="map-minus" aria-label="Réduire le zoom">−</button><output id="map-zoom-value">100 %</output><button id="map-plus" aria-label="Augmenter le zoom">+</button></div><button id="clear-map">Retirer les pions</button></div><p class="map-legend">Choisissez un personnage puis cliquez sur la carte pour le placer. Cliquez sur son pion pour le déplacer. Les repères numérotés ouvrent une accroche de scénario. Faites défiler la carte après avoir zoomé.</p><div class="dijon-viewport"><div class="dijon-map" id="map" role="group" aria-label="Carte artistique de Dijon cyberpunk"><div class="map-north" aria-hidden="true">N ↑</div>${dijonPlaces.map((p,i)=>`<button class="dijon-poi" data-place="${p.id}" style="left:${p.x}%;top:${p.y}%" aria-label="${escape(p.name)}"><b>${String(i+1).padStart(2,'0')}</b><span>${escape(p.name)}</span></button>`).join('')}<div id="map-tokens"></div></div></div><div class="map-inspector" id="map-inspector" role="status"><strong>Choisissez un repère dijonnais.</strong><p>Les lieux existent ; leurs descriptions de campagne ci-dessous sont des propositions fictives.</p></div><details class="dijon-legend"><summary>Répertoire des lieux</summary><div class="place-list">${dijonPlaces.map(p=>`<button data-place="${p.id}">${escape(p.name)}</button>`).join('')}</div></details>`;
 const $=s=>container.querySelector(s);
 function tokens(){ $('#map-tokens').innerHTML=state.tokens.map(t=>{const e=state.entries.find(x=>x.id===t.id);return e?`<button class="token" data-token="${escape(t.id)}" style="left:${t.x}%;top:${t.y}%">${escape(e.name)}</button>`:'';}).join('');}
 function persist(tokensNext){const next={...state,tokens:tokensNext};try{onChange(next);state=next;tokens();}catch(err){$('#map-inspector').textContent=err.message;}}
 $('#map-character').onchange=e=>selected=e.target.value;
 $('#map').onclick=e=>{const place=e.target.closest('[data-place]');if(place){inspect(place.dataset.place);return;}const token=e.target.closest('[data-token]');if(token){selected=token.dataset.token;$('#map-character').value=selected;return;}if(!selected){$('#map-inspector').textContent='Choisissez un personnage dans la liste pour placer son pion.';return;}const rect=$('#map').getBoundingClientRect();const t={id:selected,x:Math.max(0,Math.min(100,(e.clientX-rect.left)/rect.width*100)),y:Math.max(0,Math.min(100,(e.clientY-rect.top)/rect.height*100))};persist([...state.tokens.filter(x=>x.id!==selected),t]);};
 function inspect(id){const p=dijonPlaces.find(x=>x.id===id);$('#map-inspector').innerHTML=`<span class="tag">${escape(p.name)} · proposition de campagne</span><p>${escape(p.hook)}</p>`;}
 container.querySelectorAll('.place-list [data-place]').forEach(b=>b.onclick=()=>inspect(b.dataset.place));
 $('#map-labels').onchange=()=>$('#map').classList.toggle('hide-places',!$('#map-labels').checked);
 function changeZoom(delta){zoom=Math.max(1,Math.min(3,zoom+delta));$('#map').style.width=(zoom*100)+'%';$('#map-zoom-value').textContent=Math.round(zoom*100)+' %';$('#map-minus').disabled=zoom<=1;$('#map-plus').disabled=zoom>=3;}
 $('#map-minus').onclick=()=>changeZoom(-.25);$('#map-plus').onclick=()=>changeZoom(.25);changeZoom(0);
 $('#clear-map').onclick=()=>{if(confirm('Retirer tous les pions de la carte ?'))persist([]);};tokens();
}
