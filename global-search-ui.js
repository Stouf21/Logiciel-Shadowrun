import {spellCard} from './spells-ui.js?v=0.28.0';
import {bookArtworkCard} from './book-art-ui.js?v=0.28.0';
import {resourceArtwork} from './resource-art.js?v=0.28.0';
import {globalSearch,searchTabs} from './global-search.js?v=0.28.0';
import {escape,searchDisclosure} from './ui.js?v=0.28.0';
import {worldCard,renderWorldList} from './world-ui.js?v=0.28.0';
import {corporationCard} from './corporations-ui.js?v=0.28.0';
import {ruleSource} from './rules-data.js?v=0.28.0';
export function renderGlobalSearch(container,state,prefs,{entryCard,onResultsChanged,onQuery,getState}={}){
 if(!searchTabs.some(([id])=>id===prefs.tab))prefs.tab='all';prefs.query??='';prefs.includeSecrets??=false;
 const $=selector=>container.querySelector(selector);let worldPanel=false;
 container.innerHTML=`<div class="toolbar"><div><span class="tag">RESSOURCES ET CAMPAGNE</span><h3>Recherche globale</h3></div></div>${searchDisclosure('global-resources-search',`<label>Rechercher dans toutes les ressources<input id="resource-query" type="search" value="${escape(prefs.query)}" placeholder="Nom, spécialisation, effet, équipement…"></label><label class="check-label"><input id="resource-secrets" type="checkbox" ${prefs.includeSecrets?'checked':''}>Afficher les informations réservées au MJ</label>`,{expanded:prefs.expanded??!!prefs.query})}<div class="section-tabs resource-tabs" role="tablist" aria-label="Catégories de recherche">${searchTabs.map(([id,label])=>`<button id="resource-tab-${id}" type="button" role="tab" data-resource-tab="${id}" aria-selected="${prefs.tab===id}" aria-controls="resource-panel"><span>${label}</span><small data-count="${id}"></small></button>`).join('')}</div><div id="resource-panel" role="tabpanel" aria-labelledby="resource-tab-${prefs.tab}"></div>`;
 container.querySelector('[data-toggle-search="global-resources-search"]').addEventListener('click',()=>{prefs.expanded=$('#global-resources-search').hidden;});
 function referenceCard(row){const x=row.item,d=row.detail;return `<article class="card ${row.type==='skills'?'skill-card':'asset-card'}">${row.type==='assets'?resourceArtwork(x,state.resourceImages,'asset',state.resourceArtRefs):''}<span class="tag">${row.type==='skills'?'Compétence':'Atout'} · ${escape(x.category)}${x.id.startsWith('custom-')?' · Personnel':''}</span><h3>${escape(x.name)}</h3>${row.type==='skills'?`<p>${escape(d.summary)}</p><p class="skill-attribute">${escape(d.attributes)}</p><details><summary>Spécialisations · ${d.specializations.length}</summary>${d.specializations.map(s=>`<details><summary>${escape(s.name)}</summary><p>${escape(s.description)}</p><small>${escape(s.attribute)}</small></details>`).join('')||'<p>Aucune spécialisation renseignée.</p>'}</details>`:`<dl class="asset-book-stats"><div><dt>Niveau</dt><dd>${x.level===''?'Non chiffré':escape(x.levelLabel??x.level)}</dd></div><div><dt>Essence</dt><dd>${x.essence?'−'+escape(x.essence):'—'}</dd></div>${x.price?`<div><dt>Prix</dt><dd>${escape(x.price)}</dd></div>`:''}</dl><p>${escape(x.description)}</p>${x.conditions?`<p>${escape(x.conditions)}</p>`:''}`}<small>${escape(x.source)}</small></article>`;}
 function card(row){
  if(row.type==='world')return worldCard(row.hit);
  if(row.protected)return '<article class="card protected-result"><span class="tag">Réservé au MJ</span><h3>Correspondance dans une information MJ</h3><p>Révélez les informations du meneur pour consulter cette correspondance.</p><button data-search-reveal>Révéler les informations MJ</button></article>';
  if(row.type==='entry')return entryCard(row.item);
  if(row.type==='book-art')return bookArtworkCard(row.item);
  if(row.type==='spell')return spellCard(row.item);
  if(row.type==='skills'||row.type==='assets')return referenceCard(row);
  if(row.type==='corporation')return corporationCard(row.item);
  if(row.type==='rule')return `<article class="card"><span class="tag">Règle · ${escape(row.item.category)}</span><h3>${escape(row.item.title)}</h3><p>${escape(row.item.summary)}</p><button data-open-rule="${escape(row.item.id)}">Consulter la règle</button><small>${escape(ruleSource(row.item))}</small></article>`;
  const x=row.item;return `<article class="card"><span class="tag">${escape(x.status)}</span><h3>${escape(x.title)}</h3><p>${escape(x.text)}</p><small>${escape(x.source)}</small></article>`;
 }
 function updateCounts(result){for(const [id] of searchTabs)$('[data-count="'+id+'"]').textContent=result.counts[id];}
 function showPanel(){
  state=getState?.()??state;
  const result=globalSearch(state,prefs.query,{tab:prefs.tab,includeSecrets:prefs.includeSecrets});updateCounts(result);
  container.querySelectorAll('[data-resource-tab]').forEach(b=>{const selected=b.dataset.resourceTab===prefs.tab;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});$('#resource-panel').setAttribute('aria-labelledby','resource-tab-'+prefs.tab);
  worldPanel=prefs.tab==='world';
  if(worldPanel){
   renderWorldList($('#resource-panel'),state,'',{}, {initialQuery:prefs.query});
   $('#world-query').closest('label').hidden=true;$('#world-show-secrets').closest('label').hidden=true;$('#world-show-secrets').checked=prefs.includeSecrets;$('#world-show-secrets').dispatchEvent(new Event('change'));
  }else{
   $('#resource-panel').innerHTML=`<p class="muted" role="status">${result.rows.length} résultat(s)</p><div class="grid">${result.rows.map(card).join('')||'<div class="empty"><h3>Aucun résultat dans cet onglet.</h3><p>Essayez une autre recherche ou ajoutez vos ressources dans le Catalogue ou dans Compétences & atouts.</p></div>'}</div>`;
   $('#resource-panel').querySelectorAll('[data-search-reveal]').forEach(b=>b.onclick=()=>{$('#resource-secrets').checked=true;prefs.includeSecrets=true;showPanel();});
  }
  onResultsChanged?.();
 }
 $('#resource-query').oninput=e=>{prefs.query=e.target.value;onQuery?.(prefs.query);if(worldPanel){updateCounts(globalSearch(getState?.()??state,prefs.query,{includeSecrets:prefs.includeSecrets}));$('#world-query').value=prefs.query;$('#world-query').dispatchEvent(new Event('input'));}else showPanel();};
 $('#resource-secrets').onchange=e=>{prefs.includeSecrets=e.target.checked;if(worldPanel){updateCounts(globalSearch(getState?.()??state,prefs.query,{includeSecrets:prefs.includeSecrets}));$('#world-show-secrets').checked=prefs.includeSecrets;$('#world-show-secrets').dispatchEvent(new Event('change'));}else showPanel();};
 container.querySelectorAll('[data-resource-tab]').forEach(b=>{b.onclick=()=>{prefs.tab=b.dataset.resourceTab;showPanel();};b.onkeydown=e=>{const keys=['ArrowLeft','ArrowRight','Home','End'];if(!keys.includes(e.key))return;e.preventDefault();const list=[...container.querySelectorAll('[data-resource-tab]')],i=list.indexOf(b),next=e.key==='Home'?0:e.key==='End'?list.length-1:(i+(e.key==='ArrowRight'?1:-1)+list.length)%list.length;list[next].click();list[next].focus();};});showPanel();
}
