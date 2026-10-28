export const chapterVehicleFields=['name','type','auto','structure','handling','speed','armor','light','serious','incap','notes','source'];
const idOk=id=>typeof id==='string'&&/^[a-z0-9][a-z0-9_-]*$/.test(id);
const textOk=(value,max=30000)=>typeof value==='string'&&value.length<=max;
export function validateScenarioChapters(world){
 const characters=new Set(world.records.filter(r=>r.kind==='character').map(r=>r.id)),events=new Set(world.records.filter(r=>r.kind==='event').map(r=>r.id));
 for(const r of world.records){
  if(r.chapters===undefined)continue;
  if(r.kind!=='scenario'||!Array.isArray(r.chapters)||r.chapters.length>300)throw Error('Chapitres de scénario invalides.');
  const allowedCharacters=new Set([...characters,...(r.localNpcs??[]).map(n=>n.record.id)]),ids=new Set();
  for(const c of r.chapters){
   if(!c||!idOk(c.id)||ids.has(c.id)||!textOk(c.title,200)||!c.title.trim()||!textOk(c.notes)||!textOk(c.date,200)||typeof c.isSecret!=='boolean')throw Error('Chapitre invalide.');ids.add(c.id);
   if(c.legacyEventId!==undefined&&!events.has(c.legacyEventId))throw Error('Événement d’origine du chapitre introuvable.');
   if(!Array.isArray(c.characterIds)||c.characterIds.length>300||new Set(c.characterIds).size!==c.characterIds.length||c.characterIds.some(id=>!allowedCharacters.has(id)))throw Error('Personnages du chapitre invalides.');
   if(!Array.isArray(c.secretCharacterIds)||new Set(c.secretCharacterIds).size!==c.secretCharacterIds.length||c.secretCharacterIds.some(id=>!c.characterIds.includes(id)))throw Error('Visibilité des personnages du chapitre invalide.');
   if(!Array.isArray(c.vehicles)||c.vehicles.length>300)throw Error('Véhicules du chapitre invalides.');
   const vehicleIds=new Set();
   for(const v of c.vehicles){
    if(!v||!idOk(v.id)||vehicleIds.has(v.id)||!chapterVehicleFields.every(k=>textOk(v[k],k==='notes'?30000:2000))||!v.name.trim()||typeof v.isSecret!=='boolean')throw Error('Véhicule du chapitre invalide.');vehicleIds.add(v.id);
    for(const key of ['sourceCatalogId','sourceEntryId','ownerId'])if(v[key]!==undefined&&!textOk(v[key],200))throw Error('Référence de véhicule invalide.');
   }
  }
 }
}
export function chapterSearchText(record,secret=false){
 return (record.chapters??[]).flatMap(c=>[...(c.isSecret===secret?[c.title,c.date,c.notes]:[]),...c.vehicles.filter(v=>secret?c.isSecret||v.isSecret:!c.isSecret&&!v.isSecret).map(v=>v.name+' '+v.type+' '+v.notes)]).join(' ');
}
export function chapterHasCharacter(world,scenarioId,characterId,includeSecrets){
 const scenario=world.records.find(r=>r.id===scenarioId&&r.kind==='scenario');if(!scenario||scenario.isSecret&&!includeSecrets)return false;
 return (scenario.chapters??[]).some(c=>(includeSecrets||!c.isSecret)&&c.characterIds.includes(characterId)&&(includeSecrets||!c.secretCharacterIds.includes(characterId)&&!world.records.find(r=>r.id===characterId)?.isSecret));
}
