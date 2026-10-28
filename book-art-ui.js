import {bookArtworks,bookArtCredit} from './book-art-data.js?v=0.27.0';
import {bookArtworkPath,bookArtworkSource,bookArtworkMatches} from './book-art.js?v=0.27.0';
import {resourceArtPreview} from './resource-art.js?v=0.27.0';
import {escape,searchDisclosure} from './ui.js?v=0.27.0';

export function bookArtworkCard(art){
 return `<article class="card book-art-card"><span class="tag">Illustration du livre · ${escape(art.category)}</span><h3>${escape(art.name)}</h3><button type="button" class="resource-art-open" data-book-art-view="${escape(art.id)}" aria-label="Agrandir l’illustration du livre : ${escape(art.name)}">${resourceArtPreview(art,art.name)}</button><p>${escape(art.description??'Illustration identifiée par sa légende dans le livre fourni.')}</p>${art.legend?`<p class="book-art-legend">Légende : ${escape(art.legend)}</p>`:''}<div class="actions"><button type="button" data-book-art-view="${escape(art.id)}">Agrandir</button><a class="button" href="${bookArtworkPath(art)}" download="${escape(art.bookImage)}">Télécharger</a></div><small>${escape(bookArtworkSource(art))} · ${escape(art.part)}, PDF ${art.pdfPage}<br>Benjamin Giletti</small></article>`;
}
export function renderSourceLibrary(container,referencesHtml){
 let section='references',query='',category='';
 const categories=[...new Set(bookArtworks.map(x=>x.category))].sort((a,b)=>a.localeCompare(b,'fr'));
 function render(){
  container.innerHTML=`<div class="section-tabs" role="tablist" aria-label="Bibliothèque et sources"><button type="button" id="source-refs-tab" role="tab" data-source-section="references" aria-selected="${section==='references'}" aria-controls="source-library-panel">Références</button><button type="button" id="source-art-tab" role="tab" data-source-section="art" aria-selected="${section==='art'}" aria-controls="source-library-panel">Illustrations du livre · ${bookArtworks.length}</button></div><div role="tabpanel" id="source-library-panel" aria-labelledby="${section==='art'?'source-art-tab':'source-refs-tab'}">${section==='references'?`<div class="grid">${referencesHtml}</div>`:`<div class="toolbar"><div><h3>Illustrations du livre</h3><p class="muted">Dessins extraits du PDF fourni, avec leurs légendes et pages. Les planches générales gardent cette désignation.</p></div></div>${searchDisclosure('book-art-search-panel',`<label>Rechercher une illustration<input type="search" id="book-art-query" value="${escape(query)}" placeholder="Nom, légende ou page…"></label><label>Catégorie<select id="book-art-category"><option value="">Toutes les catégories</option>${categories.map(c=>`<option ${c===category?'selected':''}>${escape(c)}</option>`).join('')}</select></label>`,{expanded:!!query||!!category})}<p data-book-art-count class="muted" role="status"></p><div class="grid" data-book-art-results></div><p class="book-art-credit">${escape(bookArtCredit)}</p>`}</div>`;
  container.querySelectorAll('[data-source-section]').forEach(b=>b.onclick=()=>{section=b.dataset.sourceSection;render();});
  if(section==='art'){
   container.querySelector('#book-art-query').oninput=e=>{query=e.target.value;results();};
   container.querySelector('#book-art-category').onchange=e=>{category=e.target.value;results();};results();
  }
 }
 function results(){const rows=bookArtworks.filter(x=>(!category||x.category===category)&&bookArtworkMatches(x,query));container.querySelector('[data-book-art-count]').textContent=rows.length+' illustration(s)';container.querySelector('[data-book-art-results]').innerHTML=rows.map(bookArtworkCard).join('')||'<p class="muted">Aucune illustration correspondante.</p>';}
 render();
}
