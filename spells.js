import {baseSpells} from './spells-data.js?v=0.28.1';
const normalize=value=>String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr');
export function getSpellCatalog(state={}){
 return [...baseSpells,...(state.entries??[]).filter(e=>e.category==='Sort').map(e=>({id:'spell-personal-'+e.id,entryId:e.id,name:e.name,category:'Sort',family:'Personnalisé',subtype:'',duration:'',threshold:'À définir',range:'À définir',description:e.description,conditions:'',damage:'',anarchy:'',source:'Création personnelle',origin:'personal'}))];
}
export function spellSearchText(s){return [s.name,s.category,s.castingTest,s.family,s.subtype,s.duration==='I'?'Instantané':s.duration==='M'?'Maintenu':'',s.threshold,s.range,s.description,s.conditions,s.damage,s.anarchy,s.source].filter(Boolean).join(' ');}
export function spellMatches(s,query){return normalize(spellSearchText(s)).includes(normalize(query));}
export function spellType(s){if(s.origin==='personal')return 'Sort personnel';const detail=[s.subtype?.toLocaleLowerCase('fr'),s.duration].filter(Boolean).join(', ');return s.family+(detail?' ('+detail+')':'');}
export function spellReferenceText(s){
 return ['Sort · '+spellType(s),s.castingTest?'Test : '+s.castingTest:'',s.threshold?'Seuil / opposition : '+s.threshold:'',s.range?'Cible / portée : '+s.range:'',s.description,s.damage?'Dommages : '+s.damage:'',s.conditions,s.anarchy?'Effet pour 1 Anarchy : '+s.anarchy:'',s.learningCost!==undefined?'Apprentissage : '+s.learningCost.toLocaleString('fr-FR')+' ¥':'',s.source].filter(Boolean).join('\n');
}
export function spellRow(s){return {name:s.name,type:spellType(s),spellId:s.id,notes:spellReferenceText(s),source:s.source};}
