import {escape} from './ui.js?v=0.29.0';
import {inlineField,mountInlineEditing} from './inline-edit.js?v=0.29.0';
import {worldInlineSpec,updateWorldInline} from './inline-model.js?v=0.29.0';
import {renderScenarioWorkspace} from './scenarios-ui.js?v=0.29.0';
import {worldFields,UNKNOWN} from './world-schema.js?v=0.29.0';
import {secretSection} from './secrets-ui.js?v=0.29.0';
import {relatedRecords,relationIsSecret} from './world.js?v=0.29.0';
export function renderScenarioPage(container,state,id,callbacks){
 const r=state.world.records.find(r=>r.id===id),scope='scenario-'+id,f=(key,value,label)=>inlineField(scope,key,value,label);
 const links=relatedRecords(state.world,id,false).filter(x=>!['character','event'].includes(x.other.kind));
 const hiddenLinks=relatedRecords(state.world,id,true).filter(x=>relationIsSecret(state.world,x.relation));
 const linkRows=items=>items.map(({other,relation})=>`<p><span class="tag">${escape(relation.type)}</span> <button class="world-link" ${other.kind==='character'?'data-open-character':'data-open-world'}="${escape(other.id)}" ${other.isSecret?'data-world-reveal="true"':''}>${escape(other.name)}</button> · ${escape(relation.description)}</p>`).join('');
 const publicKeys=[['publicInfo','Résumé'],['knownInfo','Informations connues des PJ'],['rumors','Rumeurs'],['revealedInfo','Informations révélées'],['state','État actuel']];
 container.innerHTML=`<div class="toolbar"><button data-world-back="scenario">← Scénarios</button><button class="danger" data-scenario-delete="${escape(id)}">Supprimer le scénario</button></div><article class="scenario-page"><header class="scenario-page-heading"><span class="tag">SCÉNARIO · DIJON ${state.world.settings.year}</span><h3>${f('name',r.name,'Titre du scénario')}</h3></header><section class="scenario-workspace"></section><details class="scenario-dossier-details"><summary>Résumé et informations du scénario</summary>${publicKeys.map(([key,label])=>`<section><h4>${label}</h4>${f(key,r[key],label)}</section>`).join('')}<dl class="world-facts">${worldFields.scenario.filter(([, ,s])=>s!=='secret').map(([key,label])=>`<div><dt>${escape(label)}</dt><dd>${f('fields.'+key,r.fields[key],label)}</dd></div>`).join('')}<div><dt>Alias</dt><dd>${f('aliases',r.aliases.join(', '),'Alias du scénario')}</dd></div><div><dt>Découverte</dt><dd>${f('discovery',r.discovery,'Statut de découverte')}</dd></div></dl>${links.length?`<h4>Autres dossiers liés</h4>${linkRows(links)}`:''}<button data-world-edit="${escape(id)}">Éditeur complet du dossier</button></details>${secretSection('Notes et secrets du scénario',`<p>Scénario réservé au MJ : ${f('isSecret',r.isSecret,'Scénario réservé au MJ')}</p>${[['secrets','Secrets'],['gmNotes','Notes du MJ'],['consequences','Conséquences possibles'],['history','Historique']].map(([key,label])=>`<section><h4>${label}</h4>${f(key,r[key],label)}</section>`).join('')}${worldFields.scenario.filter(([, ,s])=>s==='secret').map(([key,label])=>`<p>${escape(label)} : ${f('fields.'+key,r.fields[key],label)}</p>`).join('')}${linkRows(hiddenLinks)}`)}</article>`;
 const disposeWorkspace=renderScenarioWorkspace(container.querySelector('.scenario-workspace'),state,id,callbacks);
 const disposeInline=mountInlineEditing(container,{scope,resolve:(path,label)=>worldInlineSpec(callbacks.getState?.()??state,id,path,label),save:(path,value)=>{state=callbacks.onSave(updateWorldInline(callbacks.getState?.()??state,id,path,value))??state;},refresh:callbacks.onRefresh});
 return ()=>{disposeWorkspace();disposeInline();};
}
