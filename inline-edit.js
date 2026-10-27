import {escape} from './ui.js?v=0.16.0';
let active=null,installed=false;
export const inlineField=(scope,key,value,label,{display,empty='À définir'}={})=>`<button type="button" class="inline-field" data-inline-scope="${escape(scope)}" data-inline-key="${escape(key)}" data-inline-label="${escape(label)}" aria-label="Modifier ${escape(label)}" title="Cliquer pour modifier">${escape(display??(value===undefined||value===''?empty:value))}</button>`;

export function mountInlineEditing(container,{scope,resolve,save,refresh}){
 if(!installed){
  const finishOutside=e=>{if(!active||active.form.contains(e.target))return;const previous=active;
   if(!previous.commit(false)){e.preventDefault();if(e.type==='click')e.stopImmediatePropagation();return;}
   if(!e.target.closest('button,a,input,select,textarea,label,summary'))setTimeout(()=>{if(!active)previous.refresh?.();},0);
  };
  document.addEventListener('pointerdown',finishOutside,{capture:true});document.addEventListener('click',finishOutside,{capture:true});installed=true;
 }
 container.dataset.inlineContext=scope;let current=null,disposed=false;
 function cancel(){if(!current)return;clearTimeout(current.timer);if(current.form.isConnected)current.form.replaceWith(current.button);if(active?.owner===owner)active=null;current=null;}
 function commit(update=true){
  if(!current)return true;const edit=current;if(edit.saving)return true;
  if(!edit.form.reportValidity())return false;
  const value=edit.spec.type==='boolean'?edit.input.checked:edit.spec.type==='number'?edit.input.value===''?'':Number(edit.input.value):edit.input.value;
  try{
   edit.saving=true;const opened=[...container.querySelectorAll('.secret-panel')].filter(p=>!p.querySelector('.secret-content')?.hidden).map(p=>p.querySelector('h4')?.textContent);
   save(edit.key,value);clearTimeout(edit.timer);current=null;if(active?.owner===owner)active=null;
   if(edit.form.isConnected){const option=edit.spec.type==='select'?[...edit.input.options].find(o=>o.value===String(value))?.textContent:null;edit.button.textContent=edit.spec.format?edit.spec.format(value):option??(edit.spec.type==='boolean'?value?'Oui':'Non':value===''?'À définir':String(value));edit.form.replaceWith(edit.button);}
   if(update&&!disposed){const scroll={x:scrollX,y:scrollY};refresh?.();const root=document.querySelector('[data-inline-context="'+CSS.escape(scope)+'"]');
    for(const panel of root?.querySelectorAll('.secret-panel')??[])if(opened.includes(panel.querySelector('h4')?.textContent)){panel.querySelector('.secret-content').hidden=false;const button=panel.querySelector('[data-reveal-secret]');button.setAttribute('aria-expanded','true');button.textContent='Masquer';}
    window.scrollTo(scroll.x,scroll.y);root?.querySelector('[data-inline-key="'+CSS.escape(edit.key)+'"]')?.focus({preventScroll:true});
   }
   return true;
  }catch(error){edit.saving=false;edit.error.textContent=error.message;return false;}
 }
 function start(button){
  if(active&&!active.commit(false))return;if(current)cancel();const key=button.dataset.inlineKey,spec=resolve(key,button.dataset.inlineLabel);if(!spec)return;
  const form=document.createElement('form');form.className='inline-edit-form';const label=document.createElement('label');label.textContent=spec.label;
  const input=document.createElement(spec.type==='select'?'select':spec.type==='textarea'?'textarea':'input');input.setAttribute('aria-label',spec.label);
  if(spec.type==='select'){for(const item of spec.options??[]){const [value,text]=Array.isArray(item)?item:[item,item];const option=document.createElement('option');option.value=value;option.textContent=text;input.append(option);}if(![...input.options].some(o=>o.value===String(spec.value??''))){const o=document.createElement('option');o.value=spec.value??'';o.textContent=spec.value||'Choisir…';input.prepend(o);}}
  else if(spec.type!=='textarea')input.type=spec.type==='boolean'?'checkbox':spec.type==='number'?'number':spec.type==='color'?'color':spec.type==='url'?'url':'text';
  if(spec.type==='boolean')input.checked=!!spec.value;else input.value=spec.value??'';
  if(spec.type==='textarea')input.rows=4;for(const key of ['min','max','step','maxLength','required'])if(spec[key]!==undefined)input[key]=spec[key];label.append(input);form.append(label);
  if(spec.suggestions?.length&&spec.type!=='select'){const list=document.createElement('datalist');list.id='inline-suggestions-'+crypto.randomUUID();for(const s of spec.suggestions){const o=document.createElement('option');o.value=s;list.append(o);}input.setAttribute('list',list.id);form.append(list);}
  const error=document.createElement('p');error.className='inline-edit-error';error.setAttribute('role','alert');form.append(error);
  const actions=document.createElement('div');actions.className='inline-edit-actions';actions.innerHTML='<button type="submit" aria-label="Enregistrer cette valeur" title="Enregistrer">✓</button><button type="button" data-inline-cancel aria-label="Annuler cette modification" title="Annuler">×</button>';form.append(actions);
  current={key,spec,input,form,button,error,timer:null,saving:false};active={owner,commit,form,refresh};button.replaceWith(form);
  form.onsubmit=e=>{e.preventDefault();e.stopPropagation();commit();};form.querySelector('[data-inline-cancel]').onclick=e=>{e.stopPropagation();cancel();};
  form.onkeydown=e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();cancel();}else if(e.key==='Enter'&&(spec.type!=='textarea'||e.ctrlKey||e.metaKey)){e.preventDefault();e.stopPropagation();commit();}};
  form.onfocusout=()=>{const edit=current;if(!edit)return;clearTimeout(edit.timer);edit.timer=setTimeout(()=>{if(current===edit&&form.isConnected&&!form.contains(document.activeElement))commit();},0);};input.focus({preventScroll:true});if(input.type!=='checkbox'&&input.tagName!=='SELECT')input.select();
 }
 const owner={};const click=e=>{const button=e.target.closest('[data-inline-scope]');if(!button||button.dataset.inlineScope!==scope)return;e.preventDefault();e.stopPropagation();start(button);};container.addEventListener('click',click);
 return ()=>{if(disposed)return;if(current&&!current.saving)commit(false);cancel();disposed=true;container.removeEventListener('click',click);};
}
