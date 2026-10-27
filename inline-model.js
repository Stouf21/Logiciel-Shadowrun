import {spellRow} from './spells.js?v=0.18.0';
import {sheetSlots} from './sheet-layout.js?v=0.18.0';
import {unclassifiedCharacter,metatypeOptions} from './character-options.js?v=0.18.0';
import {numberFields,textFields,structuredTextFields,woundLabels,attributeFields} from './sheet.js?v=0.18.0';
import {getCharacterCatalogs,assetReferenceText} from './catalog.js?v=0.18.0';
import {characterEntryForRecord,upsertWorldRecord} from './world.js?v=0.18.0';
import {worldFields,discoveryStates,authorities} from './world-schema.js?v=0.18.0';
import {groups,validateCampaign} from './campaign.js?v=0.18.0';
const rowKeys={skillRows:['catalogId','rating','attribute','rr','specialization','specialized'],assetRows:['catalogId','name','category','notes','source','level','essence'],weaponRows:['name','type','notes','source','spellId'],woundRows:['label','light','serious','incap','rr','status'],vehicleRows:['name','type','auto','structure','handling','speed','armor','light','serious','incap','notes']};
export const deckKeys=['name','attack','firewall','light','serious','incap','minRisk','penalty','notes'];
export const readPath=(record,path)=>path.split('.').reduce((value,key)=>value?.[key],record);
function blankRows(key){return key==='woundRows'?woundLabels.map(label=>({label,light:'',serious:'',incap:'',rr:'',status:''})):Array.from({length:key==='vehicleRows'?sheetSlots.vehicles:sheetSlots.weapons},()=>Object.fromEntries(rowKeys[key].map(k=>[k,''])));}
export function characterForInline(state,{entryId,worldId}){
 const record=state.world.records.find(r=>r.id===worldId&&r.kind==='character');const existing=state.entries.find(e=>e.id===(record?.gameEntryId??entryId));
 if(existing&&!groups.characters.includes(existing.category))throw Error('Cette entrée n’est pas un personnage.');
 if(!existing&&!record)throw Error('Personnage introuvable.');return {entry:existing??characterEntryForRecord(state,record),record,unbound:!existing};
}
function assertCharacterPath(path){
 if(['name','category','description','notes'].includes(path))return;
 const parts=path.split('.');if(parts[0]!=='profile')throw Error('Champ de personnage invalide.');
 if(parts.length===2&&[...numberFields,...textFields,...structuredTextFields].some(([k])=>k===parts[1]))return;
 if(parts[1]==='deck'&&parts.length===3&&deckKeys.includes(parts[2]))return;
 if(parts.length===4&&rowKeys[parts[1]]?.includes(parts[3])&&/^\d+$/.test(parts[2])&&Number(parts[2])<300)return;
 throw Error('Champ de personnage invalide.');
}
export function updateCharacterInline(state,target,path,value,category){
 if(path==='category'&&!groups.characters.includes(value))throw Error('Choisissez une catégorie PJ ou PNJ.');
 assertCharacterPath(path);const {entry,record,unbound}=characterForInline(state,target),next=structuredClone(entry);
 if(unbound){next.id='runner-'+crypto.randomUUID();next.category=path==='category'?value:category??unclassifiedCharacter;if(!groups.characters.includes(next.category))throw Error('Catégorie de personnage invalide.');}
 next.profile??={};const parts=path.split('.');
 if(parts[1]==='deck')next.profile.deck??=Object.fromEntries(deckKeys.map(k=>[k,'']));
 if(rowKeys[parts[1]]){const key=parts[1],i=Number(parts[2]);if(!next.profile[key]){if(['skillRows','assetRows'].includes(key))throw Error('Ajoutez d’abord cette ligne à la fiche.');next.profile[key]=blankRows(key);}if(!next.profile[key][i]&&['weaponRows','vehicleRows','woundRows'].includes(key)&&i<({weaponRows:sheetSlots.weapons,vehicleRows:sheetSlots.vehicles,woundRows:sheetSlots.wounds}[key])){const empty=blankRows(key);while(next.profile[key].length<=i)next.profile[key].push(empty[next.profile[key].length]);}if(!next.profile[key][i])throw Error('Ligne de fiche introuvable.');}
 let parent=next;for(const key of parts.slice(0,-1))parent=parent[key];parent[parts.at(-1)]=value;
 if(parts.at(-1)==='catalogId'){
  const kind=parts[1]==='skillRows'?'skills':'assets',item=getCharacterCatalogs(state)[kind].find(x=>x.id===value);if(!item)throw Error('Référence applicable au personnage introuvable.');parent.name=item.name;
  if(kind==='assets')Object.assign(parent,{category:item.category,source:item.source,level:item.level,essence:item.essence,notes:assetReferenceText(item),target:'character'});
 }
 const entries=unbound?[...state.entries,next]:state.entries.map(e=>e.id===entry.id?next:e);
 const updated={...state,entries,world:unbound?{...state.world,records:state.world.records.map(r=>r.id===record.id?{...r,gameEntryId:next.id}:r)}:state.world};validateCampaign(updated);return {state:updated,entryId:next.id};
}
export function changeCharacterRows(state,target,{kind,itemId,index,remove=false,category}){
 const keys={skills:'skillRows',assets:'assetRows',spells:'weaponRows',weapons:'weaponRows',vehicles:'vehicleRows'};const key=keys[kind];if(!key)throw Error('Table de personnage invalide.');
 const current=characterForInline(state,target);let nextState=state,entryId=current.entry.id;
 if(current.unbound){const created=updateCharacterInline(state,target,'category',category??unclassifiedCharacter);nextState=created.state;entryId=created.entryId;}
 const entry=structuredClone(nextState.entries.find(e=>e.id===entryId));entry.profile??={};const rows=entry.profile[key]??(['weaponRows','vehicleRows'].includes(key)?blankRows(key):[]);
 if(remove){if(!Number.isInteger(index)||index<0||index>=rows.length)throw Error('Ligne introuvable.');entry.profile[key]=rows.filter((_,i)=>i!==index);}
 else{
  let row;if(kind==='spells'){const spell=getCharacterCatalogs(nextState).spells.find(s=>s.id===itemId);if(!spell)throw Error('Choisissez un sort de la liste.');row=spellRow(spell);}
  else if(['skills','assets'].includes(kind)){const item=getCharacterCatalogs(nextState)[kind].find(x=>x.id===itemId);if(!item)throw Error('Choisissez une référence applicable au personnage.');row=kind==='skills'?{catalogId:item.id,name:item.name,rating:0,attribute:item.attribute,rr:0,specialization:'',specialized:false}:{catalogId:item.id,name:item.name,category:item.category,level:item.level,essence:item.essence,source:item.source,notes:assetReferenceText(item),target:'character'};}
  else row=Object.fromEntries(rowKeys[key].map(k=>[k,'']));
  const blank=kind==='spells'?rows.findIndex(r=>!r.name.trim()&&!r.type.trim()&&!r.spellId&&!r.notes?.trim()&&!r.source?.trim()):-1;entry.profile[key]=blank>=0?rows.map((r,i)=>i===blank?row:r):[...rows,row];
 }
 const updated={...nextState,entries:nextState.entries.map(e=>e.id===entryId?entry:e)};validateCampaign(updated);return {state:updated,entryId};
}
export function updateWorldInline(state,id,path,value){
 const record=state.world.records.find(r=>r.id===id);if(!record)throw Error('Dossier introuvable.');const next=structuredClone(record);
 if(path.startsWith('fields.')&&worldFields[record.kind].some(([key])=>key===path.slice(7)))next.fields[path.slice(7)]=value;
 else if(['name','publicInfo','knownInfo','rumors','revealedInfo','secrets','gmNotes','consequences','history','state','discovery','isSecret','portraitUrl','aliases'].includes(path))next[path]=path==='aliases'?String(value).split(',').map(x=>x.trim()).filter(Boolean):value;
 else throw Error('Champ de dossier invalide.');return upsertWorldRecord(state,next);
}
export function characterInlineSpec(state,target,path,label){
 assertCharacterPath(path);const {entry}=characterForInline(state,target),parts=path.split('.');let value=readPath(entry,path),type='text',options,suggestions,min,max,step;
 if(path==='profile.metatype'){type='select';options=metatypeOptions(value);}else if(path==='category'){type='select';options=groups.characters;}else if(path==='name')type='text';
 else if(parts.at(-1)==='spellId'){type='select';options=getCharacterCatalogs(state).spells.map(s=>[s.id,s.name]);}
 else if(parts.at(-1)==='catalogId'){type='select';options=getCharacterCatalogs(state)[parts[1]==='skillRows'?'skills':'assets'].map(x=>[x.id,x.name]);}
 else if(path.startsWith('profile.')&&parts.length===2&&numberFields.some(([k])=>k===parts[1])||['rating','rr','level','essence'].includes(parts.at(-1))&&parts.length===4){type='number';min=0;step=parts.at(-1)==='essence'?'any':1;max=parts.at(-1)==='rating'?8:parts.at(-1)==='rr'?3:undefined;}
 else if(parts.at(-1)==='attribute'){type='select';options=attributeFields;}
 else if(parts.at(-1)==='specialized'){type='boolean';}
 else if(parts.at(-1)==='specialization'){suggestions=[];}
 else if(['description','notes','knowledge','keywords','behaviors','quotes','equipment','skills','assets','weapons','wounds','vehicles','cyberdeck','essenceEffects'].includes(parts.at(-1)))type='textarea';
 if(value===undefined&&parts[1]==='woundRows')value=blankRows('woundRows')[Number(parts[2])]?.[parts[3]];
 return {value:value??'',label,type,options,suggestions,min,max,step,required:path==='name',maxLength:path==='name'?120:30000};
}
export function worldInlineSpec(state,id,path,label){
 const record=state.world.records.find(r=>r.id===id),key=path.split('.').at(-1);let type=['isSecret'].includes(path)?'boolean':['name','state','portraitUrl','aliases'].includes(path)?'text':'textarea',options;
 if(key==='metatype'){type='select';options=metatypeOptions(record.fields.metatype);}if(path==='discovery'){type='select';options=discoveryStates;}if(key==='authority'){type='select';options=authorities;}if(key==='life'){type='select';options=['À définir','Vivant','Mort','Disparu','Inconnu'];}if(path==='portraitUrl')type='url';
 return {value:path==='aliases'?record.aliases.join(', '):readPath(record,path),type,options,label,required:path==='name',maxLength:path==='name'?200:30000};
}
