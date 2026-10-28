import {inlineField,mountInlineEditing} from './inline-edit.js?v=0.26.2';
import {groups,validateCampaign} from './campaign.js?v=0.26.2';
export const entryField=(entry,key,label)=>inlineField('entry',JSON.stringify([entry.id,key]),entry[key],label);
export function mountEntryInline(container,{getState,onSave,onRefresh}){
 return mountInlineEditing(container,{scope:'entry',resolve:(path,label)=>{const [id,key]=JSON.parse(path),e=getState().entries.find(e=>e.id===id);return {label,value:e[key],type:key==='category'?'select':key==='name'?'text':'textarea',options:[...groups.catalog,...groups.rules],required:key==='name',maxLength:30000};},save:(path,value)=>{const [id,key]=JSON.parse(path),state=getState();if(!['name','category','description','notes'].includes(key))throw Error('Champ invalide.');const next={...state,entries:state.entries.map(e=>e.id===id?{...e,[key]:value}:e)};validateCampaign(next);onSave(next);},refresh:onRefresh});
}
