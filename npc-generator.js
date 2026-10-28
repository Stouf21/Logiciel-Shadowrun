import {scenarioNpcs} from './scenario-npcs.js?v=0.26.2';
import {npcTemplates} from './npc-templates.js?v=0.26.2';
import {npcPreferences,drawMetatype,npcMetatypes} from './npc-preferences.js?v=0.26.2';
import {makeWorldRecord} from './world-schema.js?v=0.26.2';
import {attachChapterCharacter,addChapterVehicle} from './scenario-chapters.js?v=0.26.2';
import {validateCampaign} from './campaign.js?v=0.26.2';
import {baseSkills} from './catalog.js?v=0.26.2';
export const npcTypes=npcTemplates.flatMap(t=>t.id==='go-ganger-rigger'?[{...t,id:'go-ganger',name:'Go-ganger',variant:'go-ganger'},{...t,id:'rigger-gang',name:'Rigger de gang',variant:'rigger'}]:[t]);
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,' ').replace(/\s+/g,' ').trim();
const pick=(a,rng)=>a[Math.floor(rng()*a.length)];
function sample(a,n,rng){const result=[],pool=[...a];while(result.length<n&&pool.length)result.push(pool.splice(Math.floor(rng()*pool.length),1)[0]);return result;}
const metaPlural={Humain:'humains',Elfe:'elfes',Nain:'nains',Ork:'orks',Troll:'trolls'};
const sourceFor=t=>'Shadowrun: Anarchy V2, p. '+t.page;
function conditionApplies(condition,assets,options){
 const c=norm(condition).replace(/^(si|avec) /,'');if(c.includes('cadre superieur'))return !!options.senior;
 if(c.includes('manteau'))return options.coat;if(c.includes('bouclier'))return options.shield;
 return assets.some(a=>{const name=norm(assetName(a));return name.includes(c)||c.includes(name)||c==='marteau'&&name.includes('marteau')||c==='navigateur'&&name.includes('navigateur')||c==='agresseur'&&name.includes('agresseur')||c==='exploitation'&&name.includes('exploitation')||c==='moniteur'&&name.includes('moniteur')||c==='focus de feu'&&name.includes('focus de feu')||c==='frappe elementaire'&&name.includes('frappe elementaire')||c==='yeux cybernetiques'&&name.includes('yeux cybernetiques')||c==='focus de combat'&&name.includes('focus de combat');});
}
function resolveConditions(text,assets,options){
 // Optional branches replace the baseline only when their matching atout is selected.
 let value=text;const start=text.search(/\[(?:si|avec) /i);if(start<0)return text;
 value=text.slice(0,start).trim();
 const branches=[...text.matchAll(/\[(?:si|avec)\s+(.+?)(?=\[(?:si|avec)\s|$)/gi)];
 for(const branch of branches){const b=branch[1].replace(/\]+\.?$/,'').trim(),m=b.match(/^(.+?)(?:\s*:\s*|\s+)(?=(?:VD\s*)?\d)/i);if(m&&conditionApplies(m[1],assets,options)){const replacement=b.slice(m[0].length);if(/\bVD\b/.test(replacement)||/^\d/.test(replacement))value=replacement;}}
 return value;
}
function skillRow(item,parent,assets,options,metatype){
 const original=item.text,baseline=original.split(/\[(?:si|avec) /i)[0],nameMatch=baseline.match(/^(.*?)\s+(\d)/);if(!nameMatch)return null;
 let active=resolveConditions(original,assets,options);
 // A few printed conditional pools use a comma instead of an opening parenthesis.
 const pool=active.match(/(\d+)\s*\+\s*([FAVLＣCL](?:\/[CL])?)[, ]+RR\s*(\d)/i);if(!pool)return null;
 const name=nameMatch[1].trim(),attribute={F:'force',A:'agilite',V:'volonte',L:'logique',C:'charisme'}[pool[2][0].toUpperCase()];
 let mean=Number(active.match(/\d+/)?.[0]??nameMatch[2]);const variants=[...active.split(/\d+\s*\+/)[0].matchAll(/\(([^)]+)\)/g)];
 for(const [,group] of variants)if(group.includes(metaPlural[metatype]))mean=Number(group.match(/\d+/)?.[0]??mean);
 const specialization=item.kind==='specialization'?name:'',baseName=specialization?parent:name;
 const catalog=baseSkills.find(s=>norm(s.name)===norm(baseName));
 return {name:baseName,catalogId:catalog?.id??'',rating:Number(pool[1]),attribute,rr:Number(pool[3]),specialization,specialized:!!specialization,includesSpecialization:!!specialization,mean,source:original};
}
function assetName(text){return text.split(/\s*[(:]/)[0].trim().replace(/^2 /,'');}
function assetRow(text,t){const category=text.match(/\(([^)]+)\)/)?.[1]??'Atout de PNJ';return {name:assetName(text),catalogId:'',category,notes:text,source:sourceFor(t),level:'',essence:'',target:'character'};}
export function vehicleFromText(text,source=''){
 const read=label=>text.match(new RegExp(label+'\\s*:?\\s*(\\d+)','i'))?.[1]??'';
 const row={name:assetName(text),type:/drone/i.test(text.split(':')[0])?'Drone':'Véhicule',auto:read('Autopilote'),structure:read('Structure'),handling:read('Maniabilité'),speed:read('Vitesse'),armor:read('Blindage'),light:'',serious:'',incap:'',notes:text,source};
 if(row.structure!==''&&row.armor!==''){const s=Number(row.structure),a=Number(row.armor);[row.light,row.serious,row.incap]=[s+a,2*s+a,3*s+a].map(String);}
 return row;
}
function selectAssets(t,rng,options){
 let fixed=[],chosen=[];
 for(const s of t.sections){const h=s.heading,items=s.items.map(i=>i.text);
  if(h==='ATOUTS')fixed.push(...items);
  else if(h==='COMPÉTENCES')fixed.push(...items.filter(x=>!/[0-9]\s*\+\s*[FAVLC]/.test(x)));
  else if(h.startsWith('GO-GANGER')){if(t.variant==='go-ganger'){const vehicle=pick(items.slice(0,3),rng);chosen.push(vehicle,pick(items.slice(3).filter(a=>!a.startsWith('Moto personnalisée')||!/Voiture/.test(vehicle)),rng));}}
  else if(h.startsWith('RIGGER')){if(t.variant==='rigger')fixed.push(...items);}
  else if(h.startsWith('2 ATOUTS DRONES')){const drones=items.filter(x=>/^2 /.test(x)),vehicles=items.filter(x=>!/^2 /.test(x));chosen.push(...(rng()<.5?sample(drones,2,rng):[pick(vehicles,rng)]));}
  else if(h.includes('ATOUT')&&h.includes('CHOIX')){const f=h.startsWith('ÉVEILLÉ')?1:h.startsWith('CYBERDECK')?2:0;fixed.push(...items.slice(0,f));chosen.push(...sample(items.slice(f),h.startsWith('2 ')?2:1,rng));}
 }
 if(!options.senior)fixed=fixed.filter(x=>!norm(x).includes('cadres superieurs uniquement'));
 const all=[...fixed,...chosen];
 if(all.some(x=>norm(x).startsWith('cyberjack')))return all.filter(x=>!norm(x).startsWith('datajack'));
 // An improved optional adept power replaces its baseline version.
 return all.filter((x,i)=>!all.slice(i+1).some(y=>assetName(x)===assetName(y)));
}
function metaNumbers(text,metatype){
 const plural=metaPlural[metatype];
 return text.replace(/(VD\s+\d+|\d+\/\d+\/\d+)\s*\(([^)]+)\)/g,(full,base,variants)=>{const chosen=variants.match(new RegExp('(?:^|[, ])'+plural+'\\s+(\\d+(?:/\\d+/\\d+)?)'));return chosen?(base.startsWith('VD')?'VD ':'')+chosen[1]:base;});
}
function weaponRows(t,assets,options,metatype,rng){
 const rows=[];let choices=[];
 for(const section of t.sections.filter(s=>s.heading==='ARMES'||s.heading==='SORTS')){
  let optional=false;for(const item of section.items){if(norm(item.text).startsWith('une arme au choix')){optional=true;continue;}if(optional)choices.push(item.text);else rows.push({text:item.text,spell:section.heading==='SORTS'});}
 }
 if(choices.length)rows.push({text:pick(choices,rng),spell:false});
 return rows.filter(({text})=>{
  if(/sur Doberman/i.test(text))return assets.some(x=>x.includes('Doberman'));
  if(/Fusil d’assaut \(drones\)/.test(text))return assets.some(x=>/avec fusil/.test(x));
  if(/Mitrailleuse \(drones et véhicules\)/.test(text))return assets.some(x=>/mitrailleuse/.test(x));
  if(/Missiles anti-véhicules \(Ares Venture\)/.test(text))return assets.some(x=>x.includes('Ares Venture'));
  if(t.id==='coyote'&&/^Mitrailleuse/.test(text))return assets.some(x=>/mitrailleuse/.test(x));return true;
 }).map(({text,spell})=>{
  let value=resolveConditions(text,assets,options);if(!/^[^\d]+VD/.test(value)&&/^VD/.test(value))value=text.split(/\bVD/)[0]+value;
  value=metaNumbers(value,metatype);const range=text.match(/\[(?:OK|Dés\.|–|-)[^\]]*\]/)?.[0];if(range&&!/\[(?:OK|Dés\.|–|-)/.test(value))value+=' '+range;
  if(text.includes('si marteau VD'))value=text.replace(/VD \d+ \(si marteau VD \d+\)/,'VD '+(assets.some(x=>norm(x).includes('programme marteau'))?7:5));
  const name=text.split(/\s+VD|\s+\(/)[0],type=spell?'Sort':value.match(/VD\s*(?:=\s*)?[^,;\[()]+/)?.[0]?.trim()??'Arme';
  return {name,type,notes:value,source:sourceFor(t)};
 });
}
export function buildNpcProfile(typeId,metatype,{rng=Math.random,rank='second',region='Dijon',senior=false,provenance='Barème de campagne'}={}){
 const t=npcTypes.find(t=>t.id===typeId);if(!t||!npcMetatypes.includes(metatype)||!['second','premier'].includes(rank))throw Error('Type de PNJ, rôle ou métatype invalide.');
 const options={senior,coat:t.id==='cadre'&&rng()<.5,shield:['officier-securite','officier-elite'].includes(t.id)&&rng()<.5};
 let assets=selectAssets(t,rng,options);const attributes=Object.fromEntries(Object.entries(t.attributes).map(([k,v])=>[k,v[metaPlural[metatype]]??v.base]));
 const baseGroups=[];for(const item of t.sections.find(s=>s.heading==='COMPÉTENCES').items.filter(i=>/\d+\s*\+\s*[FAVLC]/.test(i.text))){if(item.kind==='bullet')baseGroups.push([]);baseGroups.at(-1).push(item);}
 let items=baseGroups.flat();
 const optionalSkills=t.sections.find(s=>s.heading.includes('COMPÉTENCE ET SPÉCIALISATION'));
 if(optionalSkills){const groups=[];for(const item of optionalSkills.items){if(item.kind==='bullet')groups.push([]);groups.at(-1).push(item);}const chosen=pick(groups,rng),base=chosen[0].text.match(/^(.+?)\s+\d/)[1];const existing=baseGroups.find(g=>g[0].text.startsWith(base+' '));items=baseGroups.filter(g=>g!==existing).flat();items.push(chosen[0],...(existing?.slice(1)??[]),...chosen.slice(1));if(t.id==='cadre'){const pool=t.sections.find(s=>s.heading==='1 ATOUT AU CHOIX').items.map(i=>i.text),index=['Électronique','Influence','Ingénierie','Réseau'].indexOf(base);assets=assets.filter(a=>!pool.includes(a));assets.push(pool[index]);}}
 let parent='',parentRow=null;const skillRows=items.map(item=>{if(item.kind==='bullet')parent=item.text.match(/^(.+?)\s+\d/)?.[1]??'';const row=skillRow(item,parent,assets,options,metatype);if(!row)return null;if(item.kind==='bullet')parentRow=row;else {row.includesSpecialization=row.rating===(parentRow?.rating??-2)+2;row.specialized=row.includesSpecialization;}return row;}).filter(Boolean);
 const vehicleRows=assets.filter(a=>/Autopilote\s*\d/.test(a)).flatMap(a=>Array.from({length:/^2 /.test(a)?2:1},()=>vehicleFromText(a,sourceFor(t))));
 if(assets.some(a=>/^Moto personnalisée/.test(a)))for(const vehicle of vehicleRows)vehicle.notes+='\nMoto personnalisée : RR 1 aux tests de Pilotage (motos).';
 const material=assets.filter(a=>!(/Autopilote\s*\d/.test(a)||/\(véhicule\)/.test(a)));
 const deckText=assets.find(a=>/^Cyberdeck/.test(a));
 const equipment=t.sections.find(s=>s.heading==='ÉQUIPEMENT').items.map(i=>i.text).join('\n');
 const wounds=t.sections.find(s=>s.heading.startsWith('SEUILS')).items,physical=wounds.find(i=>i.text.startsWith('Physiques'))?.text,mental=wounds.find(i=>i.text.startsWith('Mentales'))?.text;
 const thresholds=(raw,extra)=>{const m=metaNumbers(raw??'',metatype).match(/(\d+)\/(\d+)\/(\d+)/);return m?m.slice(1).map(n=>String(Number(n)+extra)):['','',''];};
 const has=s=>assets.some(a=>norm(assetName(a)).includes(s));
 // Baseline thresholds already include fixed armour (including the commando's dermal armour).
 const extra=(has('armure dermique')&&t.id!=='commando'?1:0)+(has('armure mystique')?1:0)+(options.shield?1:0)+(options.coat?1:0);
 const phys=thresholds(physical,extra),ment=thresholds(mental,has('armure mystique')?1:0),bare=[attributes.force,attributes.force+3,attributes.force+6].map(String);
 const wound=(label,values)=>({label,light:values[0],serious:values[1],incap:values[2],rr:'0',status:''});
 const combat=has('zele')?'forte':wounds.find(i=>i.text.startsWith('Combativité'))?.text.match(/Combativité (\S+)/)?.[1]??'';
 const initiatives=assets.filter(a=>/\+1 action par (combat|narration)/.test(a));
 const anarchy=rank==='premier'?(metatype==='Humain'?4:3)+initiatives.reduce((n,a)=>n+(/par narration/.test(a)?2:1),0):'';
 const notes=[options.shield?'Bouclier : +1 aux seuils physiques.':'',options.coat?'Manteau : Armure 2.':'',has('producteur de plaquettes')?'Producteur de plaquettes : une case de blessure légère supplémentaire.':'',rank==='premier'?'Premier rôle (p. 243) : bonus d’initiative convertis en Anarchy ; effets spéciaux des attaques/sorts contre 1 point d’Anarchy.':'Second rôle : utiliser les succès moyens ou lancer la réserve de dés indiquée.'].filter(Boolean).join('\n');
 const profile={...attributes,metatype,anarchy,skillRows,assetRows:material.filter(a=>!/^Cyberdeck/.test(a)).map(a=>assetRow(a,t)),weaponRows:weaponRows(t,assets,options,metatype,rng),vehicleRows,woundRows:[wound('Sans armure',bare),wound('Armure principale',phys),wound('Armure secondaire',['','','']),wound('Mental',ment)],equipment:equipment+(options.shield?'\nBouclier équipé.':'')+(options.coat?'\nManteau équipé (Armure 2).':''),npc:{templateId:t.id,templateName:t.name,page:t.page,source:sourceFor(t),rank,region,provenance,combativeness:combat,notes}};
 if(deckText){const fw=deckText.match(/Firewall (\d+)/)?.[1]??'',base=Number(fw);profile.deck={name:'Cyberdeck',attack:deckText.match(/Attaque (\d+)/)?.[1]??'',firewall:fw,light:String(base),serious:String(base+3),incap:String(base+6),minRisk:'',penalty:'',notes:deckText};}
 return profile;
}
export const npcTypeLabel=id=>({cadre:'Cadre corpo',employe:'Employé corpo'}[id]??npcTypes.find(t=>t.id===id)?.name??'PNJ');
export function generateNpcBatch(state,{typeId,count=1,scenarioId,senior=false,isSecret=false},rng=Math.random){
 const t=npcTypes.find(t=>t.id===typeId);if(!t||!Number.isInteger(count)||count<1||count>50)throw Error('Choisissez un profil et un nombre entier de PNJ entre 1 et 50.');
 const scenario=state.world.records.find(r=>r.id===scenarioId&&r.kind==='scenario'),locals=scenario?scenario.localNpcs??[]:state.world.records.flatMap(r=>r.localNpcs??[]),allLocal=locals.flatMap(n=>[n.entry,n.record]),region=/dijon/i.test(state.world.settings.city)?'Dijon':'France',rank='second',label=npcTypeLabel(typeId);
 let sequence=Math.max(scenario?.npcCounters?.[typeId]??0,...locals.filter(n=>n.entry.profile?.npc?.templateId===typeId).map(n=>n.entry.profile.npc.sequence??0));
 const preferences=npcPreferences(state),used=new Set([...state.entries,...state.world.records,...allLocal].flatMap(r=>[r.name,...(r.aliases??[])]).map(norm)),batch=[];
 for(let i=0;i<count;i++){
  const metatype=drawMetatype(preferences,region,t.occupation,rng);let name;do{if(++sequence>1000000)throw Error('Numérotation des PNJ épuisée.');name=label+' '+sequence;}while(used.has(norm(name)));used.add(norm(name));
  const profile=buildNpcProfile(typeId,metatype,{rng,rank,region,senior,provenance:preferences.provenance});profile.npc.sequence=sequence;
  const entry={id:'npc-sheet-'+crypto.randomUUID(),name,category:rank==='premier'?'PNJ principal':'PNJ secondaire',description:t.name+' · '+metatype,notes:'',profile};
  const record=makeWorldRecord('character','npc-'+crypto.randomUUID(),name,{isSecret,gameEntryId:entry.id,publicInfo:entry.description,source:sourceFor(t)},{metatype,role:t.name,life:'Vivant'});batch.push({entry,record});
 }
 return batch;
}
export function attachNpcBatch(state,scenarioId,chapterId,batch,{withVehicles=true}={}){
 if(!Array.isArray(batch)||!batch.length||batch.length>50)throw Error('Groupe de PNJ invalide.');
 const allLocal=state.world.records.flatMap(r=>r.localNpcs??[]).flatMap(n=>[n.entry,n.record]);
 const ids=new Set([...state.entries,...state.world.records,...allLocal].map(e=>e.id)),names=new Set([...state.entries,...state.world.records,...scenarioNpcs(state,scenarioId).flatMap(n=>[n.entry,n.record])].flatMap(r=>[r.name,...(r.aliases??[])]).map(norm));
 for(const {entry,record} of batch){if(ids.has(entry.id)||ids.has(record.id)||names.has(norm(record.name)))throw Error('Ce groupe existe déjà ou un nom a été utilisé. Relancez la génération.');ids.add(entry.id);ids.add(record.id);names.add(norm(record.name));}
 if(!state.world.records.some(r=>r.id===scenarioId&&r.kind==='scenario'))throw Error('Scénario introuvable.');
 const counters={...state.world.records.find(r=>r.id===scenarioId).npcCounters};for(const n of batch)if(n.entry.profile.npc.sequence)counters[n.entry.profile.npc.templateId]=Math.max(counters[n.entry.profile.npc.templateId]??0,n.entry.profile.npc.sequence);
 let next={...state,world:{...state.world,records:state.world.records.map(r=>r.id===scenarioId?{...r,npcCounters:counters,localNpcs:[...scenarioNpcs(state,scenarioId),...structuredClone(batch)]}:r)}};
 for(const {entry,record} of batch){next=attachChapterCharacter(next,scenarioId,chapterId,record.id);if(withVehicles)for(const row of entry.profile.vehicleRows)next=addChapterVehicle(next,scenarioId,chapterId,{...row,source:entry.profile.npc.source,ownerId:record.id,isSecret:record.isSecret});}
 validateCampaign(next);return next;
}
