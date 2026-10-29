import {baseAssets,baseSkills} from './catalog-data.js?v=0.28.1';
import {describeSkill} from './skill-details.js?v=0.28.1';
export const normalizeRule=value=>String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[−–-]/g,' ').toLowerCase().replace(/\s+/g,' ').trim();
const attributes=[['force','Force'],['agilite','Agilité'],['volonte','Volonté'],['logique','Logique'],['charisme','Charisme']];
export function characterAssetName(asset){const kind=normalizeRule(asset.category||baseAssets.find(a=>a.id===asset.catalogId)?.category),name=asset.name??'';return kind.includes('esprit mentor')&&!normalizeRule(name).includes('esprit mentor')?'Esprit mentor '+name:kind==='esprit'&&!normalizeRule(name).startsWith('esprit ')?'Esprit '+name:name;}
export function characterAssetEffects(row){if(row.effectsHidden)return '';const ref=baseAssets.find(a=>a.id===row.catalogId);return row.notes?.trim()||[ref?.description,ref?.conditions,ref?.price?'Prix : '+ref.price:''].filter(Boolean).join('\n');}
const riskCache=new WeakMap();
export function assetRiskRules(row){
 const ref=baseAssets.find(a=>a.id===row.catalogId),text=row.effectsHidden?'':row.notes?.trim()||[ref?.description,ref?.conditions].filter(Boolean).join('\n'),rules=[],signature=[text,row.effectsHidden,row.category,ref?.category,row.rrActive,JSON.stringify(row.rrChoices)].join('|');
 const cached=riskCache.get(row);if(cached?.signature===signature)return cached.result;
 const add=(rule,rr)=>{const key=[rule.skill??rule.attribute,normalizeRule(rule.specialization)].join(':');if(!rules.some(r=>r.key===key&&r.rr===rr))rules.push({...rule,rr,key});};
 for(const match of text.matchAll(/\bRR\s*([1-3])\s+(?:aux?\s+tests?|pour les tests?)\s*([^.;\n]+)/gi)){
  const rr=Number(match[1]),clause=match[2],start=rules.length;
  for(const skill of baseSkills){const escaped=skill.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),m=clause.match(new RegExp(escaped+'(?:\\s*\\(([^)]+)\\))?','i'));if(!m)continue;
   if(m[1]){for(const name of m[1].split(/,\s*|\s+et\s+|\s+ou\s+/i)){
    if(/au choix/i.test(name)){for(const s of describeSkill(skill).specializations)add({skill:skill.id,specialization:s.name,choice:true},rr);}
    else add({skill:skill.id,specialization:name.trim()},rr);
   }}else add({skill:skill.id},rr);
  }
  if(rules.length===start)for(const [key,label] of attributes)if(normalizeRule(clause).includes(normalizeRule(label)))add({attribute:key},rr);
  if(/d[’']un attribut|d.une?\s+spécialisation|d.une? compétence/i.test(clause)){
   if(/attribut/i.test(clause))for(const [key] of attributes)add({attribute:key,choice:true},rr);
   else for(const s of baseSkills){if(/physique/i.test(clause)&&!['force','agilite'].includes(s.attribute))continue;if(/spécialisation/i.test(clause)){for(const v of describeSkill(s).specializations)add({skill:s.id,specialization:v.name,choice:true},rr);}else add({skill:s.id,choice:true},rr);}
  }
 }
 const count=Number(text.match(/Choisir\s+(\d+)\s+domaines/i)?.[1]??(rules.some(r=>r.choice)?1:0));
 // Alternatives without a choice count must be selected explicitly, never all granted.
 const manualChoice=!count&&/\bRR\b[^.\n;]+\bou\b/i.test(text),choiceCount=count;
 const category=normalizeRule(row.category||ref?.category),exclusiveGroup=category==='arme'||/portées/i.test(text)?'weapon':category==='cyberdeck'?'deck':null;
 const contextual=/drogue|vehicule|drone/.test(category)||/durée\s*:|en présence|siège du capitaine|lorsque|uniquement|sous l.effet/i.test(text);
 for(const rule of rules)rule.conditional=contextual||exclusiveGroup==='weapon'&&!["skill-6","skill-7","skill-10"].includes(rule.skill);
 const conditional=rules.some(r=>r.conditional),active=row.rrActive??!rules.every(r=>r.conditional),chosen=new Set(row.rrChoices??[]);

 const selected=rules.filter(r=>!(choiceCount||manualChoice)||chosen.has(r.key)),result={rules,choiceCount,manualChoice,conditional,active,text,exclusiveGroup,selected:choiceCount&&selected.length!==choiceCount?[]:selected};riskCache.set(row,{signature,result});return result;
}
export function riskRuleLabel(rule){const name=rule.skill?baseSkills.find(s=>s.id===rule.skill)?.name:attributes.find(([key])=>key===rule.attribute)?.[1];return (name??'Test')+(rule.specialization?' · '+rule.specialization:'')+' : RR '+rule.rr;}
function matches(rule,skill,specialization,attribute){
 const same=rule.skill?(rule.skill===skill.catalogId||normalizeRule(baseSkills.find(s=>s.id===rule.skill)?.name)===normalizeRule(skill.name)):rule.attribute===attribute;
 if(!same)return false;if(!rule.specialization)return true;
 const n=normalizeRule(specialization),r=normalizeRule(rule.specialization);return n===r||(n==='discretion physique'&&r==='physique')||(n==='de la rue'&&r==='la rue');
}
export function characterRisk(profile,skill,{name='',attribute=skill.attribute,rr=0}={}){
 const manual=Math.max(Number(skill.rr)||0,Number(rr)||0),sources=[],groups=new Map();let permanent=0,potential=0,active=0;
 for(const row of profile.assetRows??[]){
  if(row.target&&row.target!=='character')continue;const effects=assetRiskRules(row);let itemPermanent=0,itemPotential=0,itemActive=0;
  for(const rule of effects.selected){if(!matches(rule,skill,name,attribute))continue;const enabled=row.rrActive??!rule.conditional,source={name:characterAssetName(row),rr:rule.rr,conditional:rule.conditional||!enabled,active:enabled};sources.push(source);if(!source.conditional)itemPermanent+=rule.rr;if(enabled)itemActive+=rule.rr;itemPotential+=rule.rr;}
  if(effects.exclusiveGroup){const old=groups.get(effects.exclusiveGroup)??{permanent:0,potential:0,active:0};groups.set(effects.exclusiveGroup,{permanent:Math.max(old.permanent,itemPermanent),potential:Math.max(old.potential,itemPotential),active:Math.max(old.active,itemActive)});}
  else {permanent+=itemPermanent;potential+=itemPotential;active+=itemActive;}
 }
 for(const g of groups.values()){permanent+=g.permanent;potential+=g.potential;active+=g.active;}
 return {manual,permanent:Math.min(3,Math.max(manual,permanent)),active:Math.min(3,Math.max(manual,active)),potential:Math.min(3,Math.max(manual,potential)),sources};
}
export function riskSpecializations(profile,skill){const names=[];for(const a of profile.assetRows??[])for(const rule of assetRiskRules(a).selected){if(rule.specialization&&matches({...rule,specialization:undefined},skill,'',skill.attribute)&&!names.some(n=>normalizeRule(n)===normalizeRule(rule.specialization)))names.push(rule.specialization);}return names;}

export function characterAssetSummary(row){
 if(row.effectsHidden)return '';
 const ref=baseAssets.find(a=>a.id===row.catalogId),risk=assetRiskRules(row);
 let text=row.notes?.trim()||ref?.description||'';
 if(ref?.conditions)text=text.replace(ref.conditions,'');
 text=text.replace(/^\s*(?:Prix|Source|Référence)\s*:[^\n]*$/gim,'').replace(/Mentors? proches?\s*:[^.\n]*(?:\.|$)/gi,'').replace(/\bChoisir\s+\d+\s+domaines[^:]*:\s*/gi,'');
 if(risk.choiceCount||risk.manualChoice){
  const selected=risk.selected.map(rule=>{const name=rule.skill?baseSkills.find(s=>s.id===rule.skill)?.name:attributes.find(([key])=>key===rule.attribute)?.[1];return 'RR '+rule.rr+' aux tests '+(/^[aeiouyéèêàâîô]/i.test(name)?'d’':'de ')+name+(rule.specialization?' ('+rule.specialization+')':'')+'.';}).join('\n');
  let inserted=false;
  text=text.replace(/\bRR\s*[1-3]\s+(?:aux?\s+tests?|pour les tests?)\s*[^.;\n]+[.;]?/gi,()=>{if(inserted)return '';inserted=true;return selected?selected+'\n':'';});
 }
 return text.split('\n').map(line=>line.trim()).filter(line=>line&&!/^(?:Personnage Éveillé|Réservé aux personnages|Niveau de base|Ajouter le coût|Choix à la création)/i.test(line)).join('\n').replace(/^[\s;]+|[\s;]+$/g,'').replace(/;\s*;/g,';');
}
export function assetEssenceCost(row){
 if(!row||row.target&&row.target!=='character'||/\b(drones?|vehicules?)\b/.test(normalizeRule(row.category)))return 0;
 return typeof row.essence==='number'&&Number.isFinite(row.essence)&&row.essence>0?row.essence:0;
}
export function paidEssenceCost(row){return Math.max(assetEssenceCost(row),typeof row?.essenceSpent==='number'&&Number.isFinite(row.essenceSpent)?row.essenceSpent:0);}
export function deductEssence(current,loss){
 if(!(loss>0))return current;
 const base=typeof current==='number'&&Number.isFinite(current)?current:6;
 return Math.max(0,Math.round((base-loss)*10000)/10000);
}
