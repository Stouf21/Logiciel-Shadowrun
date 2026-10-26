import {escape} from './ui.js?v=0.12.0';
import {makeWorldRecord,UNKNOWN} from './world-schema.js?v=0.12.0';
import {scenarioMembers,attachScenarioRecord,detachScenarioRecord,moveScenarioEvent} from './scenarios.js?v=0.12.0';

export function renderScenarioWorkspace(container,initialState,scenarioId,{onSave,editRecord}){
 let state=initialState,showSecrets=false;
 const link=r=>`<button class="world-link" ${r.kind==='character'?'data-open-character':'data-open-world'}="${escape(r.id)}" ${r.isSecret?'data-world-reveal="true"':''}>${escape(r.name)}</button>`;
 const apply=next=>{state=onSave(next)??next;render();};
 const attempt=action=>{try{action();}catch(err){container.querySelector('.scenario-error').textContent=err.message;}};
 const members=kind=>scenarioMembers(state.world,scenarioId,kind,{includeSecrets:showSecrets});
 const picker=kind=>{
  const attached=new Set(scenarioMembers(state.world,scenarioId,kind,{includeSecrets:true}).map(r=>r.id));
  const options=state.world.records.filter(r=>r.kind===kind&&!attached.has(r.id)&&(showSecrets||!r.isSecret));
  const label=kind==='character'?'Personnage à ajouter':'Événement à ajouter';
  return `<form class="scenario-picker" data-scenario-kind="${kind}"><label>${label}<select name="record" required aria-label="${label}"><option value="">${options.length?'Choisir une fiche existante…':'Aucune autre fiche disponible'}</option>${options.map(r=>`<option value="${escape(r.id)}">${escape(r.name)}${r.isSecret?' · MJ':''}</option>`).join('')}</select></label><button type="submit" ${options.length?'':'disabled'}>Ajouter au scénario</button><button type="button" data-scenario-new="${kind}">+ ${kind==='character'?'Nouveau personnage':'Nouvel événement'}</button></form>`;
 };
 const remove=r=>`<button class="scenario-remove" data-scenario-remove="${escape(r.id)}" aria-label="Retirer ${escape(r.name)} du scénario">Retirer du scénario</button>`;
 function render(){
  const characters=members('character'),events=members('event');
  container.innerHTML=`<div class="scenario-workspace-heading"><div><span class="tag">PRÉPARATION DU SCÉNARIO</span><h4>Votre distribution et votre chronologie</h4></div><label class="check-label"><input id="scenario-show-secrets" type="checkbox" ${showSecrets?'checked':''}>Afficher les éléments réservés au MJ</label></div><p class="muted">Les ajouts sont sauvegardés automatiquement. Retirer un élément de ce scénario conserve sa fiche dans la campagne.</p><section class="scenario-cast"><h4>Personnages du scénario <span class="scenario-count">${characters.length}</span></h4>${picker('character')}<div class="scenario-cast-list">${characters.map(r=>`<article class="scenario-character"><div><span class="tag">${r.isSecret?'Personnage · MJ':'Personnage'}</span><h5>${link(r)}</h5><p>${escape([r.fields.metatype,r.fields.role].filter(v=>v&&v!==UNKNOWN).join(' · ')||'Fiche Anarchy V2 à compléter')}</p></div>${remove(r)}</article>`).join('')||'<p class="muted">Aucun personnage visible dans ce scénario. Ajoutez-en depuis la liste.</p>'}</div></section><section class="scenario-timeline-section"><h4>Frise chronologique du scénario <span class="scenario-count">${events.length}</span></h4><p class="muted">Choisissez l’ordre avec les flèches. La date ou le repère temporel se modifie dans l’événement ; une date inconnue reste « À définir ».</p>${picker('event')}<ol class="scenario-timeline">${events.map((r,i)=>`<li class="scenario-timeline-item"><span class="scenario-step" aria-hidden="true">${i+1}</span><article class="scenario-event"><div class="scenario-event-heading"><span class="timeline-date">${escape(r.fields.date||UNKNOWN)}</span>${r.isSecret?'<span class="tag">Réservé au MJ</span>':''}</div><h5>${link(r)}</h5><p>${escape(r.publicInfo)}</p><span class="world-discovery">${escape(r.fields.status||UNKNOWN)}</span><div class="actions"><div class="scenario-order"><button data-scenario-move="${escape(r.id)}" data-direction="-1" aria-label="Avancer ${escape(r.name)} dans la frise" ${i===0?'disabled':''}>↑</button><button data-scenario-move="${escape(r.id)}" data-direction="1" aria-label="Reculer ${escape(r.name)} dans la frise" ${i===events.length-1?'disabled':''}>↓</button><button data-scenario-edit="${escape(r.id)}">Modifier l’événement</button></div>${remove(r)}</div></article></li>`).join('')}</ol>${events.length?'':'<p class="muted">La frise est vide. Ajoutez un événement existant ou créez le prochain temps fort.</p>'}</section><p class="scenario-error" role="alert"></p>`;
  container.querySelector('#scenario-show-secrets').onchange=e=>{showSecrets=e.target.checked;render();};
  container.querySelectorAll('.scenario-picker').forEach(form=>form.onsubmit=e=>{e.preventDefault();attempt(()=>apply(attachScenarioRecord(state,scenarioId,form.elements.record.value)));});
  container.querySelectorAll('[data-scenario-remove]').forEach(b=>b.onclick=()=>attempt(()=>apply(detachScenarioRecord(state,scenarioId,b.dataset.scenarioRemove))));
  container.querySelectorAll('[data-scenario-move]').forEach(b=>b.onclick=()=>attempt(()=>apply(moveScenarioEvent(state,scenarioId,b.dataset.scenarioMove,Number(b.dataset.direction),{includeSecrets:showSecrets}))));
  container.querySelectorAll('[data-scenario-new]').forEach(b=>b.onclick=()=>{const kind=b.dataset.scenarioNew;editRecord(state,makeWorldRecord(kind,kind+'-'+crypto.randomUUID(),''),(next,id)=>apply(attachScenarioRecord(next,scenarioId,id)));});
  container.querySelectorAll('[data-scenario-edit]').forEach(b=>b.onclick=()=>editRecord(state,state.world.records.find(r=>r.id===b.dataset.scenarioEdit),next=>apply(next)));
 }
 render();
}
