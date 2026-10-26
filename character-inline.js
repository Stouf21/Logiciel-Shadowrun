import {mountInlineEditing} from './inline-edit.js?v=0.15.0';
import {characterInlineSpec,updateCharacterInline,characterForInline,changeCharacterRows} from './inline-model.js?v=0.15.0';
import {getCharacterCatalogs} from './catalog.js?v=0.15.0';
import {describeSkill} from './skill-details.js?v=0.15.0';
import {skillReserve} from './sheet.js?v=0.15.0';
import {escape} from './ui.js?v=0.15.0';
export function mountCharacterInline(container,{getState,target,onSave,onEntry,onRefresh}){
 const apply=result=>{onSave(result.state);target.entryId=result.entryId;onEntry(result.entryId);const p=characterForInline(getState(),target).entry.profile??{};for(const b of container.querySelectorAll('[data-skill-reserve]')){const row=p.skillRows?.[Number(b.dataset.skillReserve)];if(row)b.textContent=skillReserve(row,p);}};let dialog=null;
 const dispose=mountInlineEditing(container,{scope:'character',resolve:(path,label)=>{const spec=characterInlineSpec(getState(),target,path,label);if(path.endsWith('.specialization')){const row=characterForInline(getState(),target).entry.profile.skillRows[Number(path.split('.')[2])],skill=getCharacterCatalogs(getState()).skills.find(s=>s.id===row.catalogId);if(skill)spec.suggestions=describeSkill(skill).specializations.map(s=>s.name);}return spec;},save:(path,value,category)=>apply(updateCharacterInline(getState(),target,path,value,category)),refresh:onRefresh});
 const click=e=>{
  const add=e.target.closest('[data-sheet-add]'),remove=e.target.closest('[data-sheet-remove]');if(!add&&!remove)return;e.preventDefault();e.stopPropagation();dispose();
  if(remove){if(!confirm('Retirer cette ligne de la fiche du personnage ?')){onRefresh();return;}try{apply(changeCharacterRows(getState(),target,{kind:remove.dataset.sheetRemove,index:Number(remove.dataset.index),remove:true}));}catch(err){alert(err.message);}onRefresh();return;}
  const kind=add.dataset.sheetAdd,unbound=characterForInline(getState(),target).unbound;
  if(!['skills','assets'].includes(kind)&&!unbound){try{apply(changeCharacterRows(getState(),target,{kind}));}catch(err){alert(err.message);}onRefresh();return;}
  const items=getCharacterCatalogs(getState())[kind]??[];dialog=document.createElement('dialog');dialog.className='sheet-add-row';dialog.innerHTML=`<form><h2>Ajouter ${kind==='skills'?'une compétence':kind==='assets'?'un atout':'une ligne'}</h2>${unbound?'<label>Catégorie du personnage<select name="category" required><option value="">Choisir…</option><option>PJ</option><option>PNJ principal</option><option>PNJ secondaire</option></select></label>':''}${items.length?`<label>Rechercher une référence<input name="query" type="search"></label><label>Référence à ajouter<select name="item" required>${items.map(i=>`<option value="${escape(i.id)}">${escape(i.name)}</option>`).join('')}</select></label>`:''}<p class="inline-edit-error" role="alert"></p><div class="actions"><button type="button" data-cancel>Annuler</button><button class="primary" type="submit">Ajouter à la fiche</button></div></form>`;document.body.append(dialog);const form=dialog.querySelector('form');
  const close=()=>{dialog.close();dialog.remove();dialog=null;};dialog.querySelector('[data-cancel]').onclick=()=>{close();onRefresh();};dialog.oncancel=e=>{e.preventDefault();close();onRefresh();};
  if(form.elements.query)form.elements.query.oninput=()=>{const q=form.elements.query.value.toLocaleLowerCase('fr');form.elements.namedItem('item').innerHTML=items.filter(i=>i.name.toLocaleLowerCase('fr').includes(q)).map(i=>`<option value="${escape(i.id)}">${escape(i.name)}</option>`).join('');};
  form.onsubmit=e=>{e.preventDefault();try{apply(changeCharacterRows(getState(),target,{kind,itemId:form.elements.namedItem('item')?.value,category:form.elements.category?.value}));close();onRefresh();}catch(err){dialog.querySelector('.inline-edit-error').textContent=err.message;}};dialog.showModal();
 };
 container.addEventListener('click',click);return ()=>{dispose();container.removeEventListener('click',click);dialog?.close();dialog?.remove();};
}
