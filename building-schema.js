export const buildingTypes=['Arcologie','Tour corporatiste','Complexe','Immeuble résidentiel','Boutique','Clinique','Planque','Bâtiment'];
export const maxPlanImageLength=720000;
export const validPlanImage=value=>typeof value==='string'&&(value===''||value.length<=maxPlanImageLength&&/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value));
export function validateBuilding(value){
 if(value===undefined)return;
 if(!value||!buildingTypes.includes(value.type)||!/^#[0-9a-f]{6}$/i.test(value.color)||!(value.ownerId===null||typeof value.ownerId==='string')||!Array.isArray(value.plans)||value.plans.length>30)throw Error('Fiche de bâtiment invalide.');
 for(const key of ['ownerText','floors','basements','entrances'])if(typeof value[key]!=='string'||value[key].length>10000)throw Error('Caractéristique de bâtiment invalide.');
 const ids=new Set();for(const plan of value.plans){
  if(!plan||typeof plan.id!=='string'||!/^plan-[a-z0-9_-]+$/.test(plan.id)||ids.has(plan.id)||typeof plan.isSecret!=='boolean'||!validPlanImage(plan.imageData))throw Error('Plan intérieur invalide.');
  for(const key of ['name','level','description','gmNotes'])if(typeof plan[key]!=='string'||plan[key].length>(key==='name'?200:30000))throw Error('Texte de plan intérieur invalide.');
  if(!plan.name.trim())throw Error('Nommez le plan intérieur.');ids.add(plan.id);
 }
}
export const emptyBuilding=(type='Bâtiment',color='#eeb600')=>({type,color,ownerId:null,ownerText:'À définir',floors:'À définir',basements:'À définir',entrances:'À définir',plans:[]});
export function buildingSearchText(record,secret=false){
 const b=record.building;if(!b)return '';
 const plans=b.plans.filter(p=>secret?p.isSecret:!p.isSecret);
 return [...(secret?[]:[b.type,b.ownerText,b.floors,b.basements,b.entrances]),...plans.flatMap(p=>[p.name,p.level,p.description,...(secret?[p.gmNotes]:[])]),...(secret?b.plans.filter(p=>!p.isSecret).map(p=>p.gmNotes):[])].join(' ');
}
