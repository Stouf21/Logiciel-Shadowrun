import {scenarioChapters,chapterCharacters} from './scenario-chapters.js?v=0.26.2';
import {scenarioNpcs} from './scenario-npcs.js?v=0.26.2';
import {baseSkills} from './catalog.js?v=0.26.2';
import {skillReserve,skillReserves} from './sheet.js?v=0.26.2';
import {rollAnarchy,rerollAnarchy,validateOptions} from './anarchy-dice.js?v=0.26.2';
export const chapterTestTypes=[
 {id:'simple',name:'Test simple',opposed:false,source:'p. 64–65',help:'Choisissez la compétence et le seuil de difficulté.'},
 {id:'opposed',name:'Test opposé',opposed:true,source:'p. 64–65',help:'Comparez les succès. Une égalité se tranche selon la situation.'},
 {id:'ranged',name:'Combat à distance',opposed:true,combat:true,source:'p. 66, 68–69',help:'Attaque contre défense à distance. L’égalité touche ; VD = arme + succès nets. Réglez les conditions selon la portée et le couvert.'},
 {id:'melee',name:'Combat rapproché',opposed:true,combat:true,source:'p. 67–69',help:'Comparez les intentions des deux combattants. La défense active coûte une action et donne un avantage.'},
 {id:'piloting',name:'Pilotage · manœuvre',opposed:false,piloting:true,source:'p. 230, 233',help:'En manuel : Pilotage + Agilité. En autonome : réserve Autopilote. Le MJ fixe le seuil de la manœuvre.'},
 {id:'pursuit',name:'Pilotage · poursuite',opposed:true,piloting:true,source:'p. 230',help:'Test opposé de Pilotage. Selon le terrain, comparez Vitesse, Maniabilité ou leur somme ; le véhicule supérieur bénéficie d’un avantage.'},
 {id:'perception',name:'Perception',opposed:false,source:'p. 64–65',help:'Perception + Logique ; adaptez la spécialisation et le seuil à la scène.'},
 {id:'social',name:'Influence',opposed:true,source:'p. 137–139',help:'Choisissez l’approche sociale, la compétence opposée et les conditions adaptées.'},
 {id:'magic',name:'Sorcellerie',opposed:false,source:'p. 178–184',help:'Vérifiez Éveillé, le sort et sa spécialisation. Ajustez le seuil pour les succès annulés par l’Essence ; connexion, drain et effets dépendent du sort.'},
 {id:'matrix',name:'Piratage',opposed:true,source:'p. 207–225',help:'Choisissez la spécialisation et l’opposition adaptées. Accès, équipement, RV et effets du programme restent à prendre en compte.'}
];
const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const number=v=>v!==''&&v!==null&&v!==undefined&&Number.isFinite(Number(v))?Number(v):null;
export function chapterTestParticipants(state,scenarioId,chapterId,{includeSecrets=false}={}){
 const chapter=scenarioChapters(state,scenarioId,{includeSecrets}).find(c=>c.id===chapterId);if(!chapter)throw Error('Chapitre introuvable ou réservé au MJ.');
 const locals=new Map(scenarioNpcs(state,scenarioId).map(n=>[n.record.id,n.entry]));
 return chapterCharacters(state,chapter,{scenarioId,includeSecrets}).map(record=>({id:record.id,name:record.name,record,entry:locals.get(record.id)??state.entries.find(e=>e.id===record.gameEntryId),profile:(locals.get(record.id)??state.entries.find(e=>e.id===record.gameEntryId))?.profile??{}}));
}
export function testSkillChoices(person){
 const p=person.profile,rows=p.skillRows??[],choices=rows.flatMap((r,i)=>{
  const reserves=skillReserves(r,p),known=number(p[r.attribute])!==null,choice={id:'row:'+i,name:r.name,specialization:r.specialization,label:r.name+(r.specialization?' · '+r.specialization+(reserves.bonus?' +2':''):''),count:known?(p.npc?skillReserve(r,p):reserves.specialization??reserves.base):null,rr:r.rr,mean:number(r.mean),attribute:r.attribute};
  return !p.npc&&r.specialization.trim()?[{...choice,id:choice.id+':base',specialization:'',label:r.name+' · sans spécialisation',count:known?reserves.base:null,mean:null},choice]:[choice];
 });
 for(const skill of baseSkills)if(!rows.some(r=>norm(r.name)===norm(skill.name))){const trained=Array.isArray(p.skillRows)&&number(p[skill.attribute])!==null;choices.push({id:'skill:'+skill.id,name:skill.name,specialization:'',label:skill.name+' · indice à renseigner / non entraîné',count:trained?number(p[skill.attribute]):null,rr:0,mean:null,attribute:skill.attribute});}
 return [...choices,{id:'manual',name:'Valeurs manuelles',label:'Valeurs manuelles',count:null,rr:0,mean:null}];
}
export function defaultTestSkill(person,type,side='a',intent='both'){
 const wanted={ranged:side==='a'?'Armes à distance':'Athlétisme',melee:'Combat rapproché',piloting:'Pilotage',pursuit:'Pilotage',perception:'Perception',social:side==='a'?'Influence':'Perception',magic:'Sorcellerie',matrix:'Piratage',opposed:side==='a'?'Furtivité':'Perception',simple:'Perception'}[type];
 const choices=testSkillChoices(person),match=choices.filter(c=>norm(c.name)===norm(wanted));
 if(type==='ranged'&&side==='b')return match.find(c=>/defense a distance/.test(norm(c.specialization)))??match.find(c=>!c.specialization)??choices[0];
 if(type==='melee'&&side==='b'&&intent!=='both')return match.find(c=>norm(c.specialization)==='defense')??match.find(c=>!c.specialization)??choices[0];
 return match.find(c=>!c.specialization)??match[0]??choices[0];
}
export function chapterTestVehicles(state,scenarioId,chapterId,{includeSecrets=false}={}){
 const c=scenarioChapters(state,scenarioId,{includeSecrets}).find(c=>c.id===chapterId);if(!c)throw Error('Chapitre introuvable.');const ids=new Set(scenarioNpcs(state,scenarioId).map(n=>n.record.id));return c.vehicles.filter(v=>includeSecrets||!v.isSecret||ids.has(v.ownerId));
}
export function testWeapons(person){return (person.profile.weaponRows??[]).map((r,index)=>({...r,index,vd:number(r.type?.match(/\bVD\s*(\d+)/)?.[1]??r.notes?.match(/\bVD\s*(\d+)/)?.[1])})).filter(r=>r.name&&!r.spellId&&r.type!=='Sort'&&!/cybercombat/i.test(r.name));}
export function testProtections(person){return (person.profile.woundRows??[]).map((r,index)=>({...r,index})).filter(r=>['light','serious','incap'].some(k=>number(r[k])!==null));}
function checkInt(n,min,max,label){if(!Number.isInteger(n)||n<min||n>max)throw Error(label+' invalide.');return n;}
const score=c=>({normal:0,advantage:1,disadvantage:-1}[c]);
const condition=n=>n>0?'advantage':n<0?'disadvantage':'normal';
function rollSide(input,conditionValue,random){
 if(input.mode==='mean'){checkInt(input.mean,0,1000,'Succès moyens');return {mode:'mean',hits:input.mean,complication:'Aucune complication',normalDice:[],riskDice:[]};}
 if(input.mode!=='roll')throw Error('Mode de résolution invalide.');
 checkInt(input.count,0,100,'Réserve de dés');checkInt(input.risk,0,input.count,'Dés de risque');
 const options={count:input.count,risk:input.risk,rr:input.rr,condition:conditionValue,target:null};
 if(!input.count){validateOptions({...options,count:1});return {mode:'roll',options,normalDice:[],riskDice:[],hits:0,complication:'Aucune complication',effectiveOnes:0};}
 return {mode:'roll',...rollAnarchy(options,random)};
}
export function injuryFromThresholds(damage,values){
 if(!Number.isFinite(damage)||damage<0)throw Error('Dommages invalides.');
 const limits=['light','serious','incap'].map(k=>number(values?.[k]));if(limits.includes(null))return null;
 if(limits.some(n=>n<0)||limits[0]>limits[1]||limits[1]>limits[2])throw Error('Les seuils de blessure doivent être positifs et croissants.');
 return damage>limits[2]?'Incapacitante':damage>limits[1]?'Grave':damage>limits[0]?'Légère':'Aucune blessure';
}
export function resolveChapterTest(state,scenarioId,chapterId,config,{includeSecrets=false,random=Math.random,previous=null,reroll=null}={}){
 const type=chapterTestTypes.find(t=>t.id===config.type);if(!type)throw Error('Type de test invalide.');
 const participants=chapterTestParticipants(state,scenarioId,chapterId,{includeSecrets}),find=side=>{const p=participants.find(p=>p.id===side?.characterId);if(!p)throw Error('Choisissez un personnage présent dans ce chapitre.');if(!testSkillChoices(p).some(s=>s.id===side.skillId))throw Error('Compétence du test introuvable.');return p;};
 const pa=find(config.a),pb=type.opposed?find(config.b):null;if(pb?.id===pa.id)throw Error('Choisissez deux personnages différents.');
 if(!type.opposed)checkInt(config.target,0,1000,'Seuil');
 if(type.id==='melee'&&!['both','defend','active'].includes(config.intent))throw Error('Intention de mêlée invalide.');
 const inputs=[config.a,type.opposed?config.b:null],people=[pa,pb],boosts=[0,0],notes=[],vehicles=type.piloting?chapterTestVehicles(state,scenarioId,chapterId,{includeSecrets}):[];
 const sides=inputs.map((input,i)=>{
  if(!input)return null;
  if(score(input.condition)===undefined)throw Error('Conditions du test invalides.');
  if(input.mode==='mean'&&input.condition!=='normal')throw Error('Appliquez la circonstance inverse à l’adversaire, ou lancez les dés pour ce PNJ.');
  const result={...input};if(type.piloting&&!['manual','autonomous'].includes(input.control))throw Error('Mode de pilotage invalide.');if(input.vehicleId&&!vehicles.some(v=>v.id===input.vehicleId))throw Error('Véhicule absent du chapitre.');
  if(type.piloting&&input.control==='autonomous'){const v=vehicles.find(v=>v.id===input.vehicleId);if(number(v?.auto)===null)throw Error('Sélectionnez un véhicule avec un Autopilote renseigné.');result.count=number(v.auto);result.mode='roll';}
  return result;
 });
 if(type.id==='melee'&&config.intent==='active')boosts[1]++;
 if(type.id==='pursuit'){
  if(!['speed','handling','combined'].includes(config.metric))throw Error('Critère de poursuite invalide.');
  const ratings=sides.map(s=>{const v=vehicles.find(v=>v.id===s.vehicleId);if(!v)return null;if(config.metric==='combined')return number(v.speed)!==null&&number(v.handling)!==null?Number(v.speed)+Number(v.handling):null;return number(v[config.metric]);});
  if(ratings.every(n=>n!==null)&&ratings[0]!==ratings[1]){const best=ratings[0]>ratings[1]?0:1;boosts[best]++;notes.push('Avantage de véhicule pour '+people[best].name+' ('+ratings[best]+' contre '+ratings[1-best]+').');}
  else if(ratings.some(n=>n===null))notes.push('Caractéristiques des deux véhicules à renseigner pour comparer leurs avantages.');
 }
 const mods=sides.map(s=>s?score(s.condition):0);
 boosts.forEach((boost,i)=>{if(!boost)return;if(sides[i].mode==='mean'){if(!sides[1-i]||sides[1-i].mode==='mean')throw Error('Choisissez un jet de dés pour au moins un protagoniste afin de résoudre cet avantage.');mods[1-i]-=boost;notes.push('La circonstance du PNJ est inversée sur le jet adverse (p. 82).');}else mods[i]+=boost;});
 if(type.combat)for(const damage of [config.damageA,config.damageB]){const base=number(damage?.base);if(base!==null&&(base<0||base>1000))throw Error('VD de l’arme invalide.');injuryFromThresholds(0,damage?.thresholds);}
 for(const [i,input] of sides.entries())if(input){
  if(input.mode==='mean')checkInt(input.mean,0,1000,'Succès moyens');
  else {if(input.mode!=='roll')throw Error('Mode de résolution invalide.');checkInt(input.count,0,100,'Réserve de dés');checkInt(input.risk,0,input.count,'Dés de risque');validateOptions({count:input.count||1,risk:input.risk,rr:input.rr,condition:condition(mods[i]),target:null});}
 }
 const canReroll=person=>{if(!person)return false;const secondary=person.profile.npc?person.profile.npc.rank==='second':person.entry?.category==='PNJ secondaire';return !secondary&&(number(person.profile.anarchy)===null||number(person.profile.anarchy)>0);};
 const sidesToResolve=[['a',pa],['b',pb]];
 if(reroll&&!canReroll(reroll==='a'?pa:pb))throw Error('La relance nécessite un personnage disposant d’Anarchy ; les seconds rôles n’en ont pas.');
 if(reroll&&(!['a','b'].includes(reroll)||!previous||previous.type!==type.id||previous.a.id!==pa.id||previous.b?.id!==pb?.id||previous[reroll]?.mode!=='roll'||!previous[reroll]?.options?.count))throw Error('Cette relance n’est pas disponible.');
 const resolved=sidesToResolve.map(([key,person],i)=>{
  if(!person)return null;
  const value=reroll?(key===reroll?{mode:'roll',...rerollAnarchy(previous[key],random)}:previous[key]):rollSide(sides[i],condition(mods[i]),random);
  return {...value,canReroll:canReroll(person),name:person.name,id:person.id,skill:type.piloting&&sides[i].control==='autonomous'?'Autopilote · '+vehicles.find(v=>v.id===sides[i].vehicleId).name:testSkillChoices(person).find(s=>s.id===inputs[i].skillId).label};
 });
 const [a,b]=resolved;
 if(reroll)notes.push('Relance de '+resolved[reroll==='a'?0:1].name+' : 1 Anarchy à décompter ; complication initiale conservée (p. 77).');

 const result={type:type.id,typeName:type.name,source:type.source,a,b,target:type.opposed?null:config.target,notes,winner:null,net:null,status:'tie',damage:null};
 for(const r of [a,b].filter(Boolean))if(r.complication==='Complication critique')notes.push(r.name+' : complication critique ; le MJ peut imposer un échec.');
 if(a.complication==='Désastre'||b?.complication==='Désastre'){result.status='disaster';result.winner=a.complication==='Désastre'?b?.complication==='Désastre'?null:b?.id??null:a.id;notes.push('Désastre : échec par défaut du protagoniste concerné ; effets et dommages à arbitrer par le MJ.');return result;}
 const difference=a.hits-(b?.hits??config.target);result.net=Math.abs(difference);
 if(!b){result.status=difference>=0?'success':'failure';result.winner=difference>=0?a.id:null;result.net=difference;return result;}
 if(difference>0)result.winner=a.id;else if(difference<0)result.winner=b.id;
 else if(type.id==='ranged'||type.id==='melee'&&config.intent!=='both')result.winner=a.id;
 else if(type.id!=='melee'&&config.tie==='initiator')result.winner=a.id;
 else {notes.push(type.id==='melee'?'Égalité : aucune intention accomplie par défaut ; le MJ peut décider que les deux réussissent.':'Égalité : situation indécise ou réussite des deux ; si cela ne convient pas, l’initiateur réussit (p. 65).');}
 result.status=result.winner===a.id?'success':result.winner===b.id?'opposition':'tie';
 if(type.combat&&result.winner){
  const winnerIsA=result.winner===a.id,canAttack=winnerIsA||type.id==='melee'&&config.intent==='both';
  if(canAttack){const damageInput=winnerIsA?config.damageA:config.damageB,base=number(damageInput?.base);if(base===null)notes.push('VD de l’arme à renseigner pour calculer les dommages.');else{if(base<0)throw Error('VD de l’arme invalide.');const value=base+Math.max(0,result.net);result.damage={attacker:result.winner,target:winnerIsA?b.id:a.id,base,value,injury:injuryFromThresholds(value,damageInput?.thresholds)};}}
 }
 return result;
}
