import test from 'node:test';
import assert from 'node:assert/strict';
import {baseSkills,validateCustomCatalog} from '../catalog.js';
import {describeSkill} from '../skill-details.js';
import {validateCampaign} from '../campaign.js';

test('Chaque compétence a une synthèse et des spécialisations explicites, avec les exceptions d’attribut de la V2',()=>{
 for(const skill of baseSkills){const d=describeSkill(skill);assert.ok(d.summary&&d.source&&d.attributes);assert.ok(d.specializations.length>0);assert.ok(d.specializations.every(s=>s.name&&s.attribute&&s.description));}
 const spec=(id,name)=>describeSkill(baseSkills.find(s=>s.id===id)).specializations.find(s=>s.name===name).attribute;
 assert.equal(spec('skill-1','Course'),'Force');assert.equal(spec('skill-1','Défense à distance'),'Agilité');
 assert.equal(spec('skill-2','Discrétion matricielle'),'Logique');assert.equal(spec('skill-9','Cybercombat'),'Volonté');assert.equal(spec('skill-5','Dressage'),'Charisme');assert.equal(spec('skill-7','Combat astral'),'Volonté');
 assert.equal(spec('skill-14','Bannissement'),'Logique ou Charisme');
});

test('Les spécialisations personnelles survivent à l’export sans interpréter les anciennes descriptions',()=>{
 const skill={id:'custom-perso',name:'Savoir-faire',category:'Personnel',description:'Une explication libre',attribute:'logique',source:'Création personnelle',specializations:['Archives','Enquête']};
 const restored=validateCampaign(JSON.parse(JSON.stringify({entries:[],tokens:[],customSkills:[skill],customAssets:[]})));
 assert.deepEqual(describeSkill(restored.customSkills[0]).specializations.map(s=>s.name),skill.specializations);
 const {specializations,...legacy}=skill;assert.deepEqual(describeSkill(legacy).specializations,[]);
 for(const invalid of [[''],['Archives','Archives'],[123],['a'.repeat(121)],'Archives'])assert.throws(()=>validateCustomCatalog([{...skill,specializations:invalid}],'skills'));
});
