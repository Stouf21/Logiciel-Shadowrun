import test from 'node:test';import assert from 'node:assert/strict';
import {mergeWorld} from '../world.js';import {validateCampaign} from '../campaign.js';
import {changeCharacterRows,updateCharacterInline,deleteCharacterElement} from '../inline-model.js';
import {skillVariants,variantReserve,skillReserves,validateProfile} from '../sheet.js';
import {baseAssets,baseSkills} from '../catalog.js';
import {assetRiskRules,characterRisk,characterAssetName} from '../character-rules.js';
import {characterSkillLines,characterAssetLines} from '../character-layout.js';import {characterSheet} from '../character-sheet.js';import {testSkillChoices} from '../chapter-tests.js';
const skill=(id='skill-6')=>{const s=baseSkills.find(s=>s.id===id);return {name:s.name,catalogId:id,rating:5,attribute:s.attribute,specialization:'Pistolets',specialized:true,rr:0};};
const asset=(id,extra={})=>{const a=baseAssets.find(a=>a.id===id);return {name:a.name,catalogId:id,category:a.category,level:a.level,essence:a.essence,notes:a.description,source:a.source,...extra};};
const fresh=()=>mergeWorld({entries:[{id:'runner',name:'Runner',category:'PJ',description:'Texte',notes:'Secret',profile:{agilite:3,force:4,logique:4,skillRows:[skill()],assetRows:[]}}],tokens:[],customSkills:[],customAssets:[]});
const target={entryId:'runner'},profile=s=>s.entries[0].profile;
test('Plusieurs spécialisations gardent des réserves indépendantes et survivent à l’export/import sans cumuler les +2',()=>{
 const original=fresh();let s=changeCharacterRows(original,target,{kind:'specializations',index:0,name:'Fusils',attribute:'agilite'}).state;s=changeCharacterRows(s,target,{kind:'specializations',index:0,name:'Arme lourde personnelle',attribute:'force'}).state;const p=profile(validateCampaign(JSON.parse(JSON.stringify(s)))),v=skillVariants(p.skillRows[0],p);assert.equal(v.length,3);assert.deepEqual(v.map(x=>variantReserve(p.skillRows[0],p,x)),[10,10,11]);assert.equal(profile(original).skillRows[0].extraSpecializations,undefined);assert.throws(()=>changeCharacterRows(s,target,{kind:'specializations',index:0,name:'Fusils'}));
 s=deleteCharacterElement(s,target,'profile.skillRows.0.extraSpecializations.0.name').state;assert.deepEqual(skillVariants(profile(s).skillRows[0],profile(s)).map(v=>v.name),['Pistolets','Arme lourde personnelle']);s=deleteCharacterElement(s,target,'profile.skillRows.0.specialization').state;assert.equal(skillVariants(profile(s).skillRows[0],profile(s))[0].name,'Arme lourde personnelle');assert.equal(skillReserves(profile(s).skillRows[0],profile(s)).base,8);
});
test('Les RR s’additionnent par domaine, sans contaminer les autres spécialisations et sans doubler un total manuel ancien',()=>{
 const s=fresh(),p=profile(s),row=p.skillRows[0];p.assetRows=[asset('asset-16',{rrActive:true}),asset('asset-54')];assert.equal(characterRisk(p,row).active,0);assert.equal(characterRisk(p,row,{name:'Pistolets'}).active,3);assert.equal(characterRisk(p,row,{name:'Fusils'}).active,0);
 p.assetRows=[asset('asset-55')];assert.equal(characterRisk(p,row).active,1);assert.equal(characterRisk(p,row,{name:'Fusils'}).active,2);assert.equal(characterRisk(p,{...row,rr:2},{name:'Fusils'}).active,2);
 p.assetRows.push(asset('asset-88'));assert.equal(characterRisk(p,row).active,2);assert.equal(characterRisk(p,row,{name:'Fusils'}).active,3);assert.equal(characterRisk(p,row,{name:'Pistolets'}).active,2);
});
test('Les RR conditionnelles sont signalées sans être appliquées avant activation ; supprimer l’atout retire seulement sa contribution',()=>{
 let s=fresh();profile(s).assetRows=[asset('asset-16',{rrActive:false})];const p=profile(s),v={name:'Pistolets'};assert.equal(characterRisk(p,p.skillRows[0],v).potential,1);assert.equal(characterRisk(p,p.skillRows[0],v).active,0);
 s=updateCharacterInline(s,target,'profile.assetRows.0.rrActive',true).state;assert.equal(characterRisk(profile(s),profile(s).skillRows[0],v).active,1);s=deleteCharacterElement(s,target,'profile.assetRows.0.name').state;assert.equal(characterRisk(profile(s),profile(s).skillRows[0],v).active,0);assert.equal(profile(s).skillRows[0].specialization,'Pistolets');
});
test('Les mentors exigent leurs choix de domaines ; une ligne de RR ne donne pas une spécialisation +2 gratuite',()=>{
 const a=asset('asset-108'),risk=assetRiskRules(a);assert.equal(characterAssetName(a),'Esprit mentor Chien');assert.equal(risk.choiceCount,2);assert.equal(risk.selected.length,0);const chosen={...a,rrChoices:risk.rules.slice(0,2).map(r=>r.key)},p={logique:3,assetRows:[chosen]},row={...skill('skill-3'),specialization:'',specialized:false};const variants=skillVariants(row,p);assert.ok(variants.some(v=>v.name==='physique'&&!v.specialized));assert.equal(variantReserve(row,p,variants[0]),8);assert.equal(characterRisk(p,row,variants[0]).active,1);assert.equal(characterRisk(p,row).active,0);assert.equal(baseAssets.find(a=>a.id==='asset-108').name,'Chien');
});
test('Effacer les valeurs, armes, véhicules et cyberdeck respecte les contraintes et préserve les autres éléments de la fiche',()=>{
 let s=fresh();profile(s).weaponRows=[{name:'Arme personnelle',type:'VD 5'},{name:'Sort personnel',type:'Sort'}];profile(s).vehicleRows=[Object.fromEntries(['name','type','auto','structure','handling','speed','armor','light','serious','incap','notes'].map(k=>[k,k==='name'?'Moto':'']))];profile(s).deck=Object.fromEntries(['name','attack','firewall','light','serious','incap','minRisk','penalty','notes'].map(k=>[k,'Valeur']));
 s=deleteCharacterElement(s,target,'profile.force').state;s=deleteCharacterElement(s,target,'profile.weaponRows.0.name').state;s=deleteCharacterElement(s,target,'profile.vehicleRows.0.name').state;s=deleteCharacterElement(s,target,'profile.deck.name').state;s=deleteCharacterElement(s,target,'profile.skillRows.0.rating').state;assert.equal(profile(s).force,'');assert.equal(profile(s).weaponRows[0].name,'Sort personnel');assert.equal(profile(s).vehicleRows.length,0);assert.ok(Object.values(profile(s).deck).every(v=>v===''));assert.equal(profile(s).skillRows[0].rating,0);assert.equal(s.entries[0].notes,'Secret');assert.doesNotThrow(()=>validateCampaign(s));
});
test('Les imports refusent les spécialisations et choix de RR incohérents tout en acceptant les anciennes fiches',()=>{
 const p=profile(fresh());for(const v of [{name:'',attribute:'agilite',specialized:true,rr:0},{name:'Fusils',attribute:'inventé',specialized:true,rr:0},{name:'Fusils',attribute:'agilite',specialized:true,rr:4}])assert.throws(()=>validateProfile({...p,skillRows:[{...p.skillRows[0],extraSpecializations:[v]}]}));
 assert.throws(()=>validateProfile({...p,assetRows:[asset('asset-108',{rrChoices:['x','x']})]}));assert.throws(()=>validateProfile({...p,assetRows:[asset('asset-16',{rrActive:'oui'})]}));assert.doesNotThrow(()=>validateProfile(p));
});
test('La place occupée par les spécialisations et effets ne chevauche pas les autres rubriques ; les débordements sont imprimables',()=>{
 const p=profile(fresh());p.skillRows=Array.from({length:20},()=>({...skill(),extraSpecializations:[{name:'Fusils',attribute:'agilite',specialized:true,rr:0}]}));p.assetRows=Array.from({length:36},()=>asset('asset-108'));const a=characterSkillLines(p),b=characterAssetLines(p);assert.equal(a.overflow,true);assert.equal(b.overflow,true);assert.ok(a.lines.every(l=>l.y+l.height<476));for(let i=1;i<b.lines.length;i++)assert.ok(b.lines[i].y>=b.lines[i-1].y+b.lines[i-1].height-0.01);const html=characterSheet({...fresh().entries[0],profile:p});assert.match(html,/sheet-print-appendix/);assert.match(html,/profile.skillRows.19/);assert.match(html,/profile.assetRows.35/);assert.doesNotMatch(html,/data-sheet-remove=/);
});
test('Les tests d’un personnage reprennent chaque spécialisation, son attribut et ses RR actives',()=>{
 const p=profile(fresh());p.skillRows[0].extraSpecializations=[{name:'Fusils',attribute:'force',specialized:true,rr:0}];p.assetRows=[asset('asset-54')];const choices=testSkillChoices({profile:p});assert.equal(choices.find(c=>c.specialization==='Pistolets').rr,2);assert.equal(choices.find(c=>c.specialization==='Fusils').count,11);assert.equal(choices.find(c=>c.specialization==='Fusils').rr,0);assert.equal(choices.find(c=>c.id==='row:0:base').count,8);
});

test('Les drogues gardent leurs conditions, les armes ou decks alternatifs ne cumulent pas artificiellement leurs bonus',()=>{
 const p=profile(fresh()),row=p.skillRows[0];p.assetRows=[asset('asset-16'),asset('asset-17')];assert.equal(characterRisk(p,row,{name:'Pistolets'}).active,1);p.assetRows=[asset('asset-28')];const combat={...skill('skill-7'),specialization:'',specialized:false};assert.equal(characterRisk(p,combat).active,0);assert.equal(characterRisk(p,combat).potential,1);p.assetRows[0].rrActive=true;assert.equal(characterRisk(p,combat).active,1);
});
test('Effacer un effet d’atout est explicite et ne fait pas réapparaître la référence par défaut ; les anciennes notes vides la conservent',()=>{
 let s=fresh();profile(s).assetRows=[asset('asset-54')];s=deleteCharacterElement(s,target,'profile.assetRows.0.notes').state;const a=profile(s).assetRows[0];assert.equal(a.effectsHidden,true);assert.equal(assetRiskRules(a).rules.length,0);s=updateCharacterInline(s,target,'profile.assetRows.0.notes','RR 1 aux tests d’Armes à distance (pistolets).').state;assert.equal(profile(s).assetRows[0].effectsHidden,false);assert.equal(characterRisk(profile(s),profile(s).skillRows[0],{name:'Pistolets'}).active,1);assert.ok(assetRiskRules(asset('asset-54',{notes:''})).rules.length);
});

test('Les alternatives complexes restent au choix du meneur et les fixateurs physiques ne proposent pas les spécialités magiques',()=>{
 const fatal=assetRiskRules(asset('asset-148'));assert.equal(fatal.manualChoice,true);assert.equal(fatal.choiceCount,0);assert.equal(fatal.selected.length,0);const physical=assetRiskRules(asset('asset-80'));assert.ok(physical.rules.length>0);assert.ok(physical.rules.every(r=>['force','agilite'].includes(baseSkills.find(s=>s.id===r.skill).attribute)));
});
