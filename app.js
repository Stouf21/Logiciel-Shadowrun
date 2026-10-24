import {getCorporations,corporationMatches} from './corporations.js?v=0.7.0';
import {renderCorporations,corporationCard} from './corporations-ui.js?v=0.7.0';
import {renderDijonMap} from './dijon-map.js?v=0.7.0';
import {renderRules} from './rules-ui.js?v=0.7.0';
import {rules,ruleMatches,ruleSource} from './rules-data.js?v=0.7.0';
import {validateProfile,profileSearchText} from './sheet.js?v=0.7.0';
import {references} from './references.js?v=0.7.0';
import {renderDice} from './dice-ui.js?v=0.7.0';
import {escape} from './ui.js?v=0.7.0';
import {groups,validateCampaign} from './campaign.js?v=0.7.0';
import {getCatalogs,getCharacterCatalogs} from './catalog.js?v=0.7.0';
import {renderCatalogLibrary,showCustomEditor} from './catalog-ui.js?v=0.7.0';
import {mountCharacterEditor} from './character-editor.js?v=0.7.0';
import {characterSheet} from './character-sheet.js?v=0.7.0';
const $=s=>document.querySelector(s),key='shadowrun-table-v1';
const icons={characters:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2"/>',catalog:'<path d="m12 3 9 5-9 5-9-5 9-5ZM3 8v9l9 5 9-5V8M12 13v9"/>',rules:'<path d="M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v15"/>',dice:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h.01M17 7h.01M12 12h.01M7 17h.01M17 17h.01" stroke-width="3" stroke-linecap="round"/>',map:'<path d="m3 5 6-2 6 3 6-2v15l-6 2-6-3-6 2V5ZM9 3v15M15 6v15"/>',references:'<path d="M4 4h5v17H4zM10 4h4v17h-4zM15 5l4-1 4 16-4 1z"/>'};
icons.library=icons.rules;
icons.corporations='<path d="M3 21V7h7v14M10 21V3h11v18M1 21h22M6 10h1M6 14h1M6 18h1M14 7h3M14 11h3M14 15h3M14 19h3"/>';
const tabs={characters:'Personnages',corporations:'Corporations',library:'Compétences & atouts',catalog:'Catalogue',rules:'Règles & références',dice:'Lanceur de dés',map:'Dijon cyberpunk',references:'Bibliothèque & sources'};
let state={entries:[],tokens:[],customSkills:[],customAssets:[]},tab='characters',editing=null,selected=null,viewing=null,readProfile=null,unreadableBackup=null,corporationViewing=null;
try{const saved=localStorage.getItem(key);if(saved){unreadableBackup=saved;state=validateCampaign(JSON.parse(saved));unreadableBackup=null;}}catch{message('Sauvegarde illisible. Exportez-la pour la récupérer ou importez une sauvegarde valide avant toute modification.');}
function message(s){$('#message').textContent=s;}
function persist(next){
 if(unreadableBackup!==null)throw Error('La sauvegarde illisible est protégée : exportez-la puis importez une sauvegarde valide.');
 state=next;
 try{localStorage.setItem(key,JSON.stringify(state));message('Sauvegardé dans ce navigateur.');}catch{message('Échec de sauvegarde locale : exportez vos données pour les conserver.');}
}
function referenceCards(items){return items.map(r=>`<article class="card"><span class="tag">${escape(r.status)}</span><h3>${escape(r.title)}</h3><p>${escape(r.text)}</p><small>${escape(r.source)}</small></article>`).join('');}
function entryCard(e){const character=groups.characters.includes(e.category);return `<article class="card ${character?'character-card':''}" ${character?`data-character="${escape(e.id)}"`:''}><span class="tag">${escape(e.category)}</span><h3>${character?`<button class="character-name" data-open="${escape(e.id)}">${escape(e.name)}</button>`:escape(e.name)}</h3><p>${escape(e.description)}</p>${character?`<button class="sheet-open-button" data-open="${escape(e.id)}">Consulter la fiche</button>`:`<details><summary>Consulter la fiche</summary>${escape(e.notes)||'Fiche à compléter'}</details>`}<div class="actions"><button data-edit="${escape(e.id)}">Modifier</button><button data-delete="${escape(e.id)}">Supprimer</button></div></article>`;}
function render(){
 $('#content').onclick=null;
 $('nav').innerHTML=Object.entries(tabs).map(([id,label])=>`<button data-tab="${id}" class="${id===tab?'active':''}" ${id===tab?'aria-current="page"':''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${icons[id]}</svg><span>${label}</span></button>`).join('');
 const entry=state.entries.find(e=>e.id===viewing&&groups.characters.includes(e.category));
 document.body.classList.toggle('viewing-character',!!entry);$('#title').textContent=entry?'Fiche de personnage':tabs[tab];
 if(entry){$('#content').innerHTML=characterSheet(entry);return;}
 const q=$('#search').value.trim().toLocaleLowerCase('fr');
 if(tab==='corporations'&&!q){renderCorporations($('#content'),state,next=>persist(next),corporationViewing);return;}
 if(tab==='rules'&&!q){renderRules($('#content'),state.entries.filter(e=>groups.rules.includes(e.category)).map(entryCard).join(''),()=>openEditor());return;}
 if(q||groups[tab]){
  const corporationMatchesList=q?getCorporations(state).filter(c=>corporationMatches(c,q)):[];
  const bookMatches=q?rules.filter(r=>ruleMatches(r,q)):[];
  const sourceMatches=q?references.filter(r=>[r.title,r.source,r.status,r.text].join(' ').toLocaleLowerCase('fr').includes(q)):[];
  const libraryMatches=q?Object.values(getCatalogs(state)).flat().filter(r=>[r.name,r.category,r.description,r.source].join(' ').toLocaleLowerCase('fr').includes(q)):[];
  const entries=state.entries.filter(e=>(q||groups[tab].includes(e.category))&&(!q||[e.name,e.category,e.description,e.notes,profileSearchText(e.profile)].join(' ').toLocaleLowerCase('fr').includes(q)));
  $('#content').innerHTML=`<div class="toolbar"><span class="muted">${entries.length} entrée(s)${q?` · ${libraryMatches.length} compétence(s) / atout(s) · ${bookMatches.length} règle(s) · ${corporationMatchesList.length} corporation(s) · ${sourceMatches.length} référence(s)`:''}</span><button id="add" class="primary">+ Ajouter une entrée</button></div><div class="grid">${entries.map(entryCard).join('')}</div>${corporationMatchesList.length?`<h3>Corporations</h3><div class="grid">${corporationMatchesList.map(corporationCard).join('')}</div>`:''}${libraryMatches.length?`<h3>Compétences & atouts</h3><div class="grid">${libraryMatches.map(r=>`<article class="card"><span class="tag">${escape(r.category)}</span><h3>${escape(r.name)}</h3><p>${escape(r.description)}</p><small>${escape(r.source)}</small></article>`).join('')}</div>`:''}${bookMatches.length?`<h3>Règles du livre</h3><div class="grid">${bookMatches.map(r=>`<article class="card"><span class="tag">${escape(r.category)}</span><h3>${escape(r.title)}</h3><p>${escape(r.summary)}</p><button data-open-rule="${r.id}">Consulter la règle</button><small>${escape(ruleSource(r))}</small></article>`).join('')}</div>`:''}${sourceMatches.length?`<h3>Références documentaires</h3><div class="grid">${referenceCards(sourceMatches)}</div>`:''}${entries.length||sourceMatches.length||libraryMatches.length||bookMatches.length||corporationMatchesList.length?'':'<div class="empty"><img class="empty-mark" src="./assets/anarchy-mark.svg" alt="" width="68" height="68"><h3>Les ombres attendent votre histoire.</h3><p class="muted">Rassemblez vos runners, préparez vos rencontres et gardez vos ressources à portée de main.</p></div>'}`;
  $('#add').onclick=()=>openEditor();return;
 }
 if(tab==='library'){renderCatalogLibrary($('#content'),getCatalogs(state),createCatalogEntry);return;}
 if(tab==='references'){$('#content').innerHTML='<div class="toolbar"><span class="muted">Références personnelles · aucun PDF publié par le serveur</span></div><div class="grid">'+referenceCards(references)+'</div>';return;}
 if(tab==='dice'){renderDice($('#content'));return;}
 renderMap();
}
function createCatalogEntry(kind,onDone){
 showCustomEditor(kind,item=>{
  if(getCatalogs(state)[kind].some(x=>x.name.toLocaleLowerCase('fr')===item.name.toLocaleLowerCase('fr')))throw Error('Ce nom existe déjà dans la liste.');
  const field=kind==='skills'?'customSkills':'customAssets';
  const next=validateCampaign({...state,[field]:[...state[field],item]});persist(next);
  if(typeof onDone==='function')onDone(item);else{render();const select=$('#library-kind');if(select){select.value=kind;select.dispatchEvent(new Event('change'));}}
 },{characterOnly:typeof onDone==='function'});
}
function openEditor(id){
 editing=id||null;const entry=state.entries.find(e=>e.id===id);const form=$('#form');form.reset();$('#form-error').textContent='';$('#form-title').textContent=entry?'Modifier la fiche':'Nouvelle entrée';
 form.elements.category.innerHTML=Object.values(groups).flat().map(c=>`<option>${c}</option>`).join('');
 if(entry)for(const field of ['name','category','description','notes'])form.elements[field].value=entry[field];else form.elements.category.value=(groups[tab]||groups.characters)[0];
 readProfile=mountCharacterEditor(form,entry?.profile,()=>getCharacterCatalogs(state),createCatalogEntry);toggleProfile();$('#editor').showModal();
}
function toggleProfile(){const section=$('#profile-editor');if(!section)return;section.hidden=!groups.characters.includes($('#form').elements.category.value);section.disabled=section.hidden;}
$('#form').elements.category.onchange=toggleProfile;
$('#form').onsubmit=e=>{
 e.preventDefault();try{
  const form=e.target;const data=Object.fromEntries(['name','category','description','notes'].map(k=>[k,form.elements[k].value]));data.name=data.name.trim();if(!data.name)return;
  const previous=state.entries.find(x=>x.id===editing);const entry={...previous,...data,id:editing||crypto.randomUUID()};if(groups.characters.includes(data.category))entry.profile=readProfile();validateProfile(entry.profile);
  const entries=editing?state.entries.map(x=>x.id===editing?entry:x):[...state.entries,entry];persist({...state,entries});$('#editor').close();render();
 }catch(err){$('#form-error').textContent=err.message;$('#form-error').scrollIntoView({block:'nearest'});}
};
$('#cancel').onclick=()=>$('#editor').close();
document.addEventListener('click',e=>{
 const b=e.target.closest('button');
 if(b?.dataset.tab){corporationViewing=null;tab=b.dataset.tab;viewing=null;$('#search').value='';render();return;}
 if(b?.dataset.openCorporation){corporationViewing=b.dataset.openCorporation;tab='corporations';viewing=null;$('#search').value='';render();window.scrollTo(0,0);return;}
 if(b?.hasAttribute('data-sheet-back')){viewing=null;tab='characters';render();return;}
 if(b?.hasAttribute('data-sheet-print')){window.print();return;}
 if(b?.dataset.openRule){tab='rules';viewing=null;$('#search').value='';render();const rule=document.getElementById(b.dataset.openRule);if(rule){rule.open=true;rule.scrollIntoView({block:'center'});}return;}
 if(b?.dataset.open){viewing=b.dataset.open;render();window.scrollTo(0,0);return;}
 if(b?.dataset.edit){openEditor(b.dataset.edit);return;}
 if(b?.dataset.delete&&confirm('Supprimer cette fiche et son pion sur la carte ?')){try{persist({...state,entries:state.entries.filter(x=>x.id!==b.dataset.delete),tokens:state.tokens.filter(x=>x.id!==b.dataset.delete)});render();}catch(err){message(err.message);}return;}
 const card=e.target.closest('[data-character]');if(card&&!e.target.closest('button,a,input,select,textarea,details')){viewing=card.dataset.character;render();window.scrollTo(0,0);}
});
$('#search').oninput=()=>{viewing=null;corporationViewing=null;render();};
$('.import-button').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#import').click();}};
$('#export').onclick=()=>{const url=URL.createObjectURL(new Blob([unreadableBackup??JSON.stringify(state,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=unreadableBackup?'shadowrun-sauvegarde-a-recuperer.json':'shadowrun-campagne.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('#import').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>5000000)throw Error('Fichier trop volumineux (5 Mo maximum).');const data=validateCampaign(JSON.parse(await file.text()));if(confirm('Remplacer la campagne locale et les listes personnelles par ce fichier ? Exportez d’abord pour garder une copie.')){unreadableBackup=null;persist(data);viewing=null;selected=null;corporationViewing=null;render();}}catch(err){message('Import refusé : '+err.message);}finally{e.target.value='';}};
function renderMap(){renderDijonMap($('#content'),state,next=>persist(next));}
render();
