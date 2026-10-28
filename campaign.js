import {validateNpcPreferences} from './npc-preferences.js?v=0.27.0';
import {characterCategories} from './character-options.js?v=0.27.0';
import {validateMapState} from './map-model.js?v=0.27.0';
import {validateWorld} from './world-schema.js?v=0.27.0';
import {validateCorporations} from './corporations.js?v=0.27.0';
import {validateProfile} from './sheet.js?v=0.27.0';
import {validateCustomCatalog} from './catalog.js?v=0.27.0';
import {validateResourceImages,validateResourceArtRefs} from './resource-art.js?v=0.27.0';
export const groups={characters:characterCategories,catalog:['Objet','Accessoire','Arme','Armure','Sort','Programme','Véhicule','Drone','Esprit','Drogue','Autre'],rules:['Règle','Aide-mémoire']};
export function validateCampaign(data){
 if(!data||!Array.isArray(data.entries)||!Array.isArray(data.tokens))throw Error('Format de sauvegarde invalide.');
 validateWorld(data.world);
 const ids=new Set();for(const e of data.entries){if(!e||typeof e.id!=='string'||ids.has(e.id)||!Object.values(groups).flat().includes(e.category)||!['name','description','notes'].every(k=>typeof e[k]==='string')||!e.name.trim())throw Error('Fiche invalide.');validateProfile(e.profile);ids.add(e.id);}
 for(const r of data.world?.records??[])for(const n of r.localNpcs??[])if(ids.has(n.entry.id))throw Error('Une fiche locale ne peut pas aussi être un personnage de la campagne.');
 for(const r of data.world?.records??[])if(r.kind==='character')ids.add(r.id);
 for(const t of data.tokens)if(!t||!ids.has(t.id)||!Number.isFinite(t.x)||!Number.isFinite(t.y)||t.x<0||t.x>100||t.y<0||t.y>100)throw Error('Position invalide.');
 const positionIds=new Set(data.entries.filter(e=>groups.characters.includes(e.category)).map(e=>e.id));for(const r of data.world?.records??[])if(['character','zone','place'].includes(r.kind))positionIds.add(r.id);
 validateMapState(data.mapState,positionIds,new Map((data.world?.records??[]).map(r=>[r.id,r.kind])));
 validateCorporations(data.corporations);
 validateCustomCatalog(data.customSkills,'skills');validateCustomCatalog(data.customAssets,'assets');
 validateResourceImages(data.resourceImages);
 validateResourceArtRefs(data.resourceArtRefs);
 validateNpcPreferences(data.npcPreferences);
 return {...data,customSkills:data.customSkills??[],customAssets:data.customAssets??[]};
}
