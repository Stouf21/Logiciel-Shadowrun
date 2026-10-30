import {normalizeRule} from './character-rules.js?v=0.30.0';
import {assetReferenceText} from './catalog.js?v=0.30.0';
import {spellRow} from './spells.js?v=0.30.0';
import {escape} from './ui.js?v=0.30.0';
export const equipmentFields={
 decks:[['name','Nom du cyberdeck'],['attack','Attaque'],['firewall','Firewall'],['light','Seuil léger'],['serious','Seuil grave'],['incap','Seuil incapacitant'],['minRisk','Dés de risque minimum (Piratage)'],['penalty','Augmentation du seuil (Piratage)'],['notes','Notes']],
 vehicles:[['name','Nom du véhicule / drone'],['type','Type'],['auto','Autopilote'],['structure','Structure'],['handling','Maniabilité'],['speed','Vitesse'],['armor','Blindage'],['light','Seuil léger'],['serious','Seuil grave'],['incap','Seuil incapacitant'],['notes','Notes']],
 weapons:[['name','Arme ou sort'],['type','Type'],['notes','Caractéristiques et notes']]
};
export const equipmentTitles={decks:'Choisir un cyberdeck',vehicles:'Choisir un véhicule ou un drone',weapons:'Ajouter une arme ou un sort'};
export function equipmentChoices(catalog,kind){
 const groups=new Map(),put=(label,item)=>{if(!groups.has(label))groups.set(label,[]);groups.get(label).push(item);};
 for(const item of [...(catalog.assets??[]),...(catalog.equipment??[]).map(entry=>({id:'entry:'+entry.id,name:entry.name,category:entry.category,description:entry.description,source:'Catalogue personnel',personal:true}))]){const category=normalizeRule(item.category),name=normalizeRule(item.name);
  if(kind==='decks'&&(category==='cyberdeck'||name==='cyberdeck a personnaliser'))put('Cyberdecks',item);
  if(kind==='vehicles'){if(/^drones?$/.test(category)||item.target==='drone'||name==='drone a personnaliser')put('Drones',item);else if(/^vehicules?$/.test(category)||item.target==='vehicle'||name==='vehicule a personnaliser')put('Véhicules',item);}
  if(kind==='weapons'&&/^armes?$/.test(category))put('Armes',item);
 }
 if(kind==='weapons')for(const item of catalog.spells??[])put('Sorts',item);
 return [...groups].sort(([a],[b])=>a.localeCompare(b,'fr')).map(([label,items])=>({label,items:items.sort((a,b)=>a.name.localeCompare(b.name,'fr',{sensitivity:'base',numeric:true}))}));
}
function stat(text,label){return text.match(new RegExp('(?:^|[; .\\n])'+label+'\\s*:?\\s*([0-9]+(?:[,.][0-9]+)?)','i'))?.[1]?.replace(',','.')??'';}
export function equipmentRow(item,kind){
 const text=assetReferenceText(item),notes=[text,item.source?'Source : '+item.source:''].filter(Boolean).join('\n');
 if(kind==='decks'){
  const firewall=stat(text,'Firewall'),attack=stat(text,'Attaque');
  return {name:item.name,attack,firewall,light:firewall,serious:firewall!==''?String(Number(firewall)+3):'',incap:firewall!==''?String(Number(firewall)+6):'',minRisk:'0',penalty:'0',notes};
 }
 if(kind==='vehicles'){
  const row={name:item.name,type:normalizeRule(item.category).includes('drone')||item.target==='drone'||normalizeRule(item.name).startsWith('drone ')?'Drone':'Véhicule',auto:stat(text,'Autopilote'),structure:stat(text,'Structure'),handling:stat(text,'Maniabilité'),speed:stat(text,'Vitesse'),armor:stat(text,'Blindage'),light:'',serious:'',incap:'',notes};
  if(/Vitesse\s*\d+\s*\(volant\s*\d+\)/i.test(text))row.speed=text.match(/Vitesse\s*(\d+\s*\(volant\s*\d+\))/i)[1];
  if(row.structure!==''&&row.armor!=='')for(const [key,multiple] of [['light',1],['serious',2],['incap',3]])row[key]=String(Number(row.structure)*multiple+Number(row.armor));
  return row;
 }
 if(item.family)return spellRow(item);
 return {name:item.name,type:item.category,notes,source:item.source??''};
}
// Le choix remplit les champs, puis le meneur peut adapter les valeurs avant validation.
export function mountEquipmentPicker(root,catalog,kind,onPick){
 const groups=equipmentChoices(catalog,kind);
 root.innerHTML='<label>Rechercher<input type="search" data-equipment-search placeholder="Nom ou famille…"></label><label>Modèle enregistré<select data-equipment-select aria-label="Modèle enregistré"></select></label><p data-equipment-count role="status"></p>';
 const select=root.querySelector('select'),query=root.querySelector('input');
 function update(){const previous=select.value,words=normalizeRule(query.value).split(' ').filter(Boolean),matches=groups.map(group=>({...group,items:group.items.filter(item=>words.every(word=>normalizeRule(item.name+' '+group.label).includes(word)))})).filter(group=>group.items.length),count=matches.reduce((sum,g)=>sum+g.items.length,0);select.innerHTML='<option value="">'+(count?'Choisir un modèle…':'Aucun modèle correspondant')+'</option>'+matches.map(g=>`<optgroup label="${escape(g.label)} (${g.items.length})">${g.items.map(item=>`<option value="${escape(item.id)}">${escape(item.name)}${item.id.startsWith('custom-')||item.personal?' · Personnel':''}</option>`).join('')}</optgroup>`).join('');if(matches.some(g=>g.items.some(item=>item.id===previous)))select.value=previous;select.disabled=!count;root.querySelector('[data-equipment-count]').textContent=count+' modèle'+(count>1?'s disponibles':' disponible');}
 select.onchange=()=>{const item=groups.flatMap(g=>g.items).find(item=>item.id===select.value);if(item)onPick(equipmentRow(item,kind),item);};query.oninput=update;update();
 return {select};
}
