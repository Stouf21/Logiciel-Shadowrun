// These are editable campaign assumptions, not published census statistics.
export const npcMetatypes=['Humain','Elfe','Nain','Ork','Troll'];
export const npcOccupations={rue:'Rue et contrebande',securite:'Sécurité et enquête',technique:'Technique et Matrice',magie:'Magie',soins:'Soins',militaire:'Militaire',corporation:'Corporations'};
export const defaultNpcPreferences={
 provenance:'Estimation de campagne : aucun pourcentage officiel Dijon/France ou par profession trouvé dans les documents fournis.',
 populations:{France:[50,15,10,20,5],Dijon:[50,15,10,20,5]},
 occupations:{rue:[1,1,1,1.3,1.3],securite:[1,1,1,1.15,1.15],technique:[1,1,1.2,1,1],magie:[1,1,1,1,1],soins:[1,1,1,1,1],militaire:[1,1,1,1.15,1.15],corporation:[1.2,1.2,1,.75,.6]}
};
export function validateNpcPreferences(value){
 if(value===undefined)return;
 if(!value||typeof value!=='object'||typeof value.provenance!=='string'||!value.provenance.trim()||value.provenance.length>2000)throw Error('Source des proportions de métatypes invalide.');
 for(const region of ['France','Dijon']){const a=value.populations?.[region];if(!Array.isArray(a)||a.length!==5||a.some(n=>typeof n!=='number'||!Number.isFinite(n)||n<0||n>100)||Math.abs(a.reduce((a,b)=>a+b,0)-100)>.01)throw Error('Les proportions de '+region+' doivent totaliser 100 %.');}
 for(const role of Object.keys(npcOccupations)){const a=value.occupations?.[role];if(!Array.isArray(a)||a.length!==5||a.some(n=>typeof n!=='number'||!Number.isFinite(n)||n<=0||n>10))throw Error('Les coefficients de profession doivent être compris entre 0 (exclu) et 10.');}
}
export function npcPreferences(state){return structuredClone(state.npcPreferences??defaultNpcPreferences);}
export function metatypeDistribution(preferences,region,occupation){
 validateNpcPreferences(preferences);if(!['France','Dijon'].includes(region)||!Object.hasOwn(npcOccupations,occupation))throw Error('Population ou profession inconnue.');
 const weights=preferences.populations[region].map((n,i)=>n*preferences.occupations[occupation][i]),total=weights.reduce((a,b)=>a+b,0);
 return weights.map((w,i)=>({name:npcMetatypes[i],weight:w/total}));
}
export function drawMetatype(preferences,region,occupation,rng=Math.random){
 const distribution=metatypeDistribution(preferences,region,occupation);let cursor=rng();if(cursor<0||cursor>=1||!Number.isFinite(cursor))throw Error('Tirage aléatoire invalide.');
 for(const option of distribution){cursor-=option.weight;if(cursor<0)return option.name;}return distribution.filter(x=>x.weight>0).at(-1).name;
}
export function validateNpcProfile(npc){
 if(npc===undefined)return;
 if(npc?.sequence!==undefined&&(!Number.isInteger(npc.sequence)||npc.sequence<1||npc.sequence>1000000))throw Error('Numéro du PNJ invalide.');
 if(!npc||!['templateId','templateName','source','rank','region','provenance','combativeness','notes'].every(k=>typeof npc[k]==='string'&&npc[k].length<30000)||!['second','premier'].includes(npc.rank)||!['Dijon','France'].includes(npc.region)||!Number.isInteger(npc.page)||npc.page<244||npc.page>255)throw Error('Origine du profil PNJ invalide.');
}
