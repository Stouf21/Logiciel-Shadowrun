import {validateCorporations} from './corporations.js?v=0.7.0';
import {validateProfile} from './sheet.js?v=0.7.0';
import {validateCustomCatalog} from './catalog.js?v=0.7.0';
export const groups={characters:['PJ','PNJ principal','PNJ secondaire'],catalog:['Objet','Accessoire','Arme','Armure','Sort','Programme','Véhicule','Autre'],rules:['Règle','Aide-mémoire']};
export function validateCampaign(data){
 if(!data||!Array.isArray(data.entries)||!Array.isArray(data.tokens))throw Error('Format de sauvegarde invalide.');
 const ids=new Set();for(const e of data.entries){if(!e||typeof e.id!=='string'||ids.has(e.id)||!Object.values(groups).flat().includes(e.category)||!['name','description','notes'].every(k=>typeof e[k]==='string')||!e.name.trim())throw Error('Fiche invalide.');validateProfile(e.profile);ids.add(e.id);}
 for(const t of data.tokens)if(!t||!ids.has(t.id)||!Number.isFinite(t.x)||!Number.isFinite(t.y)||t.x<0||t.x>100||t.y<0||t.y>100)throw Error('Position invalide.');
 validateCorporations(data.corporations);
 validateCustomCatalog(data.customSkills,'skills');validateCustomCatalog(data.customAssets,'assets');
 return {...data,customSkills:data.customSkills??[],customAssets:data.customAssets??[]};
}
