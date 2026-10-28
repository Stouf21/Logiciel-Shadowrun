import {inlineField,mountInlineEditing} from './inline-edit.js?v=0.24.0';
import {worldInlineSpec,updateWorldInline} from './inline-model.js?v=0.24.0';
import {worldFields} from './world-schema.js?v=0.24.0';
import {escape} from './ui.js?v=0.24.0';
import {secretSection} from './secrets-ui.js?v=0.24.0';
export function mountScenarioNpcDossier(container,record,{getState,onSave,onRefresh}){
 const scope='local-dossier-'+record.id,section=document.createElement('section'),field=(key,value,label)=>inlineField(scope,key,value,label);
 const info=(key,label)=>`<section><h4>${label}</h4>${field(key,record[key],label)}</section>`;
 section.className='scenario-npc-dossier';section.innerHTML=`<details><summary>En savoir plus sur ce PNJ</summary>${record.portraitUrl?`<img class="world-portrait" src="${escape(record.portraitUrl)}" alt="Portrait de ${escape(record.name)}">`:''}${field('portraitUrl',record.portraitUrl,'Portrait (URL)')}<dl class="world-facts">${worldFields.character.filter(([key,,secret])=>secret!=='secret'&&key!=='metatype').map(([key,label])=>`<div><dt>${label}</dt><dd>${field('fields.'+key,record.fields[key],label)}</dd></div>`).join('')}<div><dt>Alias</dt><dd>${field('aliases',record.aliases.join(', '),'Alias du PNJ')}</dd></div></dl>${[['publicInfo','Informations publiques'],['knownInfo','Informations connues des PJ'],['rumors','Rumeurs'],['revealedInfo','Informations révélées']].map(([key,label])=>info(key,label)).join('')}${secretSection('Dossier narratif du MJ',`${[['secrets','Secrets'],['gmNotes','Notes du dossier'],['history','Historique'],['consequences','Conséquences possibles']].map(([key,label])=>info(key,label)).join('')}${worldFields.character.filter(([, ,secret])=>secret==='secret').map(([key,label])=>`<section><h4>${label}</h4>${field('fields.'+key,record.fields[key],label)}</section>`).join('')}`)}</details>`;container.append(section);
 const button=document.createElement('button');button.type='button';button.textContent='En savoir plus sur le PNJ';container.querySelector('.sheet-toolbar .actions').prepend(button);button.onclick=()=>{section.querySelector('details').open=true;section.scrollIntoView({block:'start'});};
 return mountInlineEditing(section,{scope,resolve:(key,label)=>worldInlineSpec(getState(),record.id,key,label),save:(key,value)=>onSave(updateWorldInline(getState(),record.id,key,value)),refresh:onRefresh});
}
