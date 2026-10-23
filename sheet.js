export const attributeFields=[['force','Force'],['agilite','Agilité'],['volonte','Volonté'],['logique','Logique'],['charisme','Charisme']];
export const numberFields=[...attributeFields,['anarchy','Anarchy actuel'],['essence','Essence'],['nuyens','Nuyens']];
export const textFields=[['keywords','Mots-clés'],['behaviors','Comportements'],['quotes','Répliques'],['skills','Compétences : indice, attribut, RD et RR'],['knowledge','Connaissances'],['weapons','Armes et sorts : type et caractéristiques'],['wounds','Blessures : seuils légère / grave / incapacité, état et RR'],['assets','Atouts : essence et niveau'],['equipment','Équipement'],['cyberdeck','Cyberdeck : attaque, firewall, dommages et seuils'],['vehicles','Véhicules / drones : autopilote, structure, maniabilité, vitesse, blindage'],['essenceEffects','Essence : succès annulés en magie / soins et désavantage social']];
export function validateProfile(profile){
 if(profile===undefined)return;
 if(!profile||typeof profile!=='object'||Array.isArray(profile))throw Error('Fiche structurée invalide.');
 for(const [key] of numberFields){const v=profile[key];if(v!==undefined&&v!==''&&(typeof v!=='number'||!Number.isFinite(v)||v<0))throw Error('Valeur numérique de fiche invalide.');}
 for(const [key] of textFields){if(profile[key]!==undefined&&typeof profile[key]!=='string')throw Error('Texte de fiche invalide.');}
}
export function profileSearchText(profile={}){return [...numberFields,...textFields].map(([key,label])=>profile[key]!==undefined?label+' '+profile[key]:'').join(' ');}
