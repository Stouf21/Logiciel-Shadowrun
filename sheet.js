import {validateNpcProfile} from './npc-preferences.js?v=0.26.2';
export const attributeFields=[['force','Force'],['agilite','Agilité'],['volonte','Volonté'],['logique','Logique'],['charisme','Charisme']];
export const numberFields=[...attributeFields,['anarchy','Anarchy actuel'],['essence','Essence'],['nuyens','Nuyens'],['magicCancelled','Succès annulés (magie)'],['healingCancelled','Succès annulés (soins)']];
export const textFields=[['keywords','Mots-clés'],['behaviors','Comportements'],['quotes','Répliques'],['skills','Compétences : indice, attribut, RD et RR'],['knowledge','Connaissances'],['weapons','Armes et sorts : type et caractéristiques'],['wounds','Blessures : seuils légère / grave / incapacité, état et RR'],['assets','Atouts : essence et niveau'],['equipment','Équipement'],['cyberdeck','Cyberdeck : attaque, firewall, dommages et seuils'],['vehicles','Véhicules / drones : autopilote, structure, maniabilité, vitesse, blindage'],['essenceEffects','Essence : succès annulés en magie / soins et désavantage social']];
export function validateProfile(profile){
 if(profile===undefined)return;
 if(!profile||typeof profile!=='object'||Array.isArray(profile))throw Error('Fiche structurée invalide.');
 for(const [key] of numberFields){const v=profile[key];if(v!==undefined&&v!==''&&(typeof v!=='number'||!Number.isFinite(v)||v<0))throw Error('Valeur numérique de fiche invalide.');}
 for(const [key] of [...textFields,...structuredTextFields]){if(profile[key]!==undefined&&typeof profile[key]!=='string')throw Error('Texte de fiche invalide.');}
 validateNpcProfile(profile.npc);
 validateRows(profile);
}
export function profileSearchText(profile={}){return [...numberFields,...textFields,...structuredTextFields].map(([key,label])=>profile[key]!==undefined?label+' '+profile[key]:'').join(' ')+' '+[...(profile.skillRows??[]),...(profile.assetRows??[]),...(profile.weaponRows??[])].map(r=>[r.name,r.specialization,r.notes,r.category,r.type,r.source].filter(Boolean).join(' ')).join(' ');}

export function skillReserve(row,profile){
 const reserves=skillReserves(row,profile);return reserves.specialization??reserves.base;
}
export function skillReserves(row,profile){
 const name=row.specialization.trim(),included=!!(name&&row.includesSpecialization);
 const baseRating=Number(row.rating||0)-(included?2:0),base=baseRating+Number(profile[row.attribute]||0);
 const bonus=name&&baseRating>0&&(!profile.npc||row.specialized)?2:0;
 return {baseRating,base,specialization:name?base+bonus:null,bonus,label:name?'('+name+(bonus?' +2':'')+')':''};
}
export function updateSkillRow(row,changes,{npc=false}={}){
 const next={...row,...changes};
 if(row.includesSpecialization&&['rating','specialization','specialized'].some(k=>Object.hasOwn(changes,k))){
  next.rating=Object.hasOwn(changes,'rating')?changes.rating:skillReserves(row,{}).baseRating;
  next.includesSpecialization=false;
 }
 if(Object.hasOwn(changes,'specialization'))next.specialized=next.rating>0&&!!next.specialization.trim();
 else if(Object.hasOwn(changes,'rating'))next.specialized=next.rating>0&&!!next.specialization.trim()&&(!npc||row.specialized);
 if(Object.hasOwn(changes,'specialized')&&next.specialization.trim()&&next.rating>0)next.specialized=changes.specialized;
 return next;
}
export const woundLabels=['Sans armure','Armure principale','Armure secondaire','Mental'];
export const structuredTextFields=[['metatype','Métatype'],['socialDisadvantage','Désavantage social (essence)']];

function validateRows(profile){
 for(const key of ['skillRows','assetRows','woundRows','vehicleRows','weaponRows'])if(profile[key]!==undefined&&(!Array.isArray(profile[key])||profile[key].length>300))throw Error('Table de fiche invalide.');
 for(const r of profile.skillRows??[]){
  if(!r||!['name','catalogId','specialization'].every(k=>typeof r[k]==='string')||!r.name.trim()||!attributeFields.some(([k])=>k===r.attribute)||!Number.isInteger(r.rating)||r.rating<0||r.rating>(profile.npc?12:8)||!Number.isInteger(r.rr)||r.rr<0||r.rr>3||typeof r.specialized!=='boolean'||(r.specialized&&(!r.specialization.trim()||r.rating<1)))throw Error('Compétence de fiche invalide.');
 }
 for(const r of profile.skillRows??[]){if(r.mean!==undefined&&(!profile.npc||!Number.isInteger(r.mean)||r.mean<0||r.mean>30))throw Error('Succès moyens de PNJ invalides.');if(r.includesSpecialization!==undefined&&(!profile.npc||typeof r.includesSpecialization!=='boolean'))throw Error('Spécialisation de PNJ invalide.');}
 for(const r of profile.assetRows??[]){
  if(r.target!==undefined&&!['character','vehicle','drone'].includes(r.target))throw Error('Application d’atout invalide.');
  if(!r||!['name','catalogId','category','notes','source'].every(k=>typeof r[k]==='string')||!r.name.trim())throw Error('Atout de fiche invalide.');
  for(const k of ['level','essence'])if(r[k]!==''&&(typeof r[k]!=='number'||!Number.isFinite(r[k])||r[k]<0))throw Error('Valeur d’atout invalide.');
 }
 for(const r of profile.weaponRows??[]){if(!r||typeof r.name!=='string'||typeof r.type!=='string')throw Error('Arme ou sort invalide.');for(const key of ['spellId','notes','source'])if(r[key]!==undefined&&typeof r[key]!=='string')throw Error('Référence ou notes d’arme / sort invalides.');}
 for(const r of profile.woundRows??[])if(!r||!['label','light','serious','incap','rr','status'].every(k=>typeof r[k]==='string'))throw Error('Blessures invalides.');
 for(const r of profile.vehicleRows??[])if(!r||!['name','type','auto','structure','handling','speed','armor','light','serious','incap','notes'].every(k=>typeof r[k]==='string'))throw Error('Véhicule invalide.');
 if(profile.deck!==undefined&&(!profile.deck||typeof profile.deck!=='object'||!['name','attack','firewall','light','serious','incap','minRisk','penalty','notes'].every(k=>typeof profile.deck[k]==='string')))throw Error('Cyberdeck invalide.');
}
