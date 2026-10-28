import test from 'node:test';
import assert from 'node:assert/strict';
import {validateCampaign} from '../campaign.js';
import {getCatalogs,baseSkills,baseAssets} from '../catalog.js';
import {skillReserve,skillReserves,profileSearchText,validateProfile} from '../sheet.js';
const skill={catalogId:'skill-11',name:'Influence',rating:4,attribute:'charisme',rr:1,specialization:'Négociation',specialized:true};
const asset={catalogId:'asset-custom',name:'Talent de campagne',category:'Trait',level:3,essence:0,notes:'Contacts locaux',source:'Création personnelle'};
const character={id:'runner',name:'Runner',category:'PJ',description:'',notes:'',profile:{charisme:3,skills:'Ancien texte',assets:'Ancien atout',skillRows:[skill],assetRows:[asset],weaponRows:[{name:"Éclair",type:"Combat"}]}};
test('La réserve combine indice, attribut et spécialisation appliquée',()=>{assert.equal(skillReserve(skill,{charisme:3}),9);assert.equal(skillReserve({...skill,specialized:false},{charisme:3}),7);assert.equal(skillReserve({...skill,specialization:''},{charisme:3}),7);});
test('Une ancienne campagne reste importable sans listes personnelles',()=>{const campaign=validateCampaign({entries:[{...character,profile:{skills:'Influence : 4',assets:'Focus personnel'}}],tokens:[]});assert.equal(campaign.entries[0].profile.skills,'Influence : 4');assert.deepEqual(campaign.customSkills,[]);assert.deepEqual(campaign.customAssets,[]);});
test('Export/import conserve sélections, anciennes notes et créations personnelles',()=>{const data={entries:[character],tokens:[],customSkills:[{id:'custom-test',name:'Mon savoir-faire',category:'Personnel',attribute:'logique',description:'Détail',source:'Création personnelle'}],customAssets:[{id:'custom-atout',name:'Mon atout',category:'Personnel',level:2,essence:.5,description:'Mon effet',source:'Création personnelle'}]};const restored=validateCampaign(JSON.parse(JSON.stringify(data)));assert.deepEqual(restored,data);assert.equal(getCatalogs(restored).assets.at(-1).name,'Mon atout');assert.match(profileSearchText(character.profile),/Négociation/);assert.match(profileSearchText(character.profile),/Contacts locaux/);assert.match(profileSearchText(character.profile),/Éclair/);assert.match(profileSearchText(character.profile),/Combat/);});
test('Les compétences incohérentes et les personnalisations qui masquent une référence sont refusées',()=>{for(const invalid of [{rating:9},{rating:-1},{rr:4},{attribute:'invented'},{rating:0,specialized:true},{specialization:'',specialized:true}])assert.throws(()=>validateProfile({skillRows:[{...skill,...invalid}]}));assert.throws(()=>validateCampaign({entries:[],tokens:[],customSkills:[{...baseSkills[0],id:'skill-1'}]}));assert.throws(()=>validateProfile({assetRows:[{...asset,essence:-1}]}));});
test('Les entrées de référence ont des identifiants distincts et des sources',()=>{for(const items of [baseSkills,baseAssets]){assert.equal(new Set(items.map(x=>x.id)).size,items.length);assert.ok(items.every(x=>x.source.includes('Anarchy V2')));}assert.equal(baseSkills.find(x=>x.name==='Conjuration').category,'Magique');assert.equal(baseAssets.find(x=>x.name==='Datajack').essence,1);});

test('La fiche distingue la réserve normale et le bonus possédé, y compris les anciens indices PNJ déjà majorés',()=>{
 const row={...skill,name:'Armes à distance',rating:5,attribute:'agilite',specialization:'pistolets',specialized:false},profile={agilite:3},before=structuredClone(row);
 const reserves=skillReserves(row,profile);assert.equal(reserves.base,8);assert.equal(reserves.specialization,10);assert.equal(reserves.label,'(pistolets +2)');assert.deepEqual(row,before);
 assert.equal(skillReserves({...row,rating:6},profile).specialization,11);assert.equal(skillReserves(row,{agilite:4}).specialization,11);
 const npc={...profile,npc:{}};const included=skillReserves({...row,rating:7,includesSpecialization:true,specialized:true},npc);assert.equal(included.baseRating,5);assert.equal(included.base,8);assert.equal(included.specialization,10);
 const unowned=skillReserves(row,npc);assert.equal(unowned.bonus,0);assert.equal(unowned.specialization,8);assert.equal(unowned.label,'(pistolets)');
 assert.equal(skillReserves({...row,specialization:''},profile).specialization,null);assert.equal(skillReserves({...row,rating:0},profile).bonus,0);
});
