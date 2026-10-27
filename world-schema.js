import {validateBuilding} from './building-schema.js?v=0.17.0';
export const UNKNOWN='À définir';
export const worldKinds={character:'Personnage',corporation:'Corporation',faction:'Faction',zone:'Quartier / zone',place:'Lieu',scenario:'Scénario',clue:'Indice',secret:'Secret',event:'Événement'};
export const discoveryStates=['Non découvert','Partiellement découvert','Découvert'];
export const visibilities=['public','known','rumor','secret','revealed'];
export const visibilityLabels={public:'Public',known:'Connu des PJ',rumor:'Rumeur',secret:'Secret MJ',revealed:'Révélé'};
export const authorities=['À définir','Municipale','Étatique','Corporatiste','Mixte','Clandestine'];
// key, label, information scope. Domain fields remain strings, including unresolved facts.
export const worldFields={
 character:[['nickname','Surnom'],['metatype','Métatype'],['age','Âge'],['gender','Genre'],['role','Métier / rôle'],['life','Statut vital'],['usualLocation','Localisation habituelle'],['physical','Description physique'],['personality','Personnalité'],['motivations','Motivations','secret'],['objectives','Objectifs','secret'],['resources','Ressources','secret'],['skills','Compétences importantes'],['implants','Implants / pouvoirs','secret'],['enemies','Ennemis','secret']],
 faction:[['officialName','Nom officiel'],['type','Type'],['symbol','Symbole'],['history','Histoire'],['organization','Organisation interne','secret'],['leaders','Dirigeants'],['members','Membres connus'],['territory','Territoire'],['legal','Activités légales'],['illegal','Activités clandestines','secret'],['resources','Ressources','secret'],['allies','Alliés'],['enemies','Ennemis','secret'],['objectives','Objectifs','secret'],['influence','Niveau d’influence'],['headquarters','Siège / implantation'],['contacts','Contacts / interlocuteurs']],
 zone:[['type','Type'],['authority','Autorité / juridiction'],['officialAuthority','Autorité officielle'],['corporation','Corporation dominante'],['faction','Faction dominante'],['security','Niveau de sécurité'],['surveillance','Surveillance'],['mood','Ambiance'],['population','Population'],['metatypes','Métatypes présents'],['visibleActivities','Activités visibles'],['hiddenActivities','Activités clandestines','secret'],['dangers','Dangers','secret'],['location','Localisation générale']],
 place:[['type','Type de lieu'],['authority','Autorité / juridiction'],['officialAuthority','Autorité officielle'],['corporation','Corporation dominante'],['faction','Faction dominante'],['security','Niveau de sécurité'],['address','Adresse / quartier'],['mood','Ambiance'],['population','Population / fréquentation'],['metatypes','Métatypes présents'],['visibleActivities','Activités visibles'],['hiddenActivities','Activités clandestines','secret'],['dangers','Dangers','secret']],
 scenario:[['workingTitle','Titre définitif'],['status','Avancement'],['trigger','Déclencheur'],['stakes','Enjeux','secret'],['opposition','Opposition','secret'],['resolution','Résolution','secret'],['rewards','Récompenses','secret']],
 clue:[['type','Type d’indice'],['location','Lieu de découverte'],['interpretation','Interprétation','secret'],['reliability','Fiabilité','secret']],
 secret:[['subject','Sujet'],['truth','Vérité cachée','secret'],['revealCondition','Condition de révélation','secret']],
 event:[['date','Date / repère temporel'],['status','État de l’événement'],['consequence','Conséquence','secret']]
};
worldFields.corporation=worldFields.faction;
export function makeWorldRecord(kind,id,name,common={},fields={}){
 return {id,kind,name,aliases:[],publicInfo:UNKNOWN,knownInfo:UNKNOWN,rumors:UNKNOWN,secrets:UNKNOWN,revealedInfo:UNKNOWN,discovery:'Non découvert',state:UNKNOWN,gmNotes:UNKNOWN,consequences:UNKNOWN,history:UNKNOWN,portraitUrl:'',isSecret:kind==='secret',gameEntryId:null,corporationId:null,mapPlaceId:null,coordinates:null,source:'Éléments de campagne fournis par le meneur',fields:Object.fromEntries(worldFields[kind].map(([key])=>[key,UNKNOWN])),...common, ...{fields:{...Object.fromEntries(worldFields[kind].map(([key])=>[key,UNKNOWN])),...fields}}};
}
const technicalId=id=>typeof id==='string'&&/^[a-z0-9][a-z0-9_-]*$/.test(id);
export function validateWorld(world){
 if(world===undefined)return;
 if(!world||world.version!==1||!world.settings||world.settings.system!=='Shadowrun: Anarchy V2'||!Number.isInteger(world.settings.year)||typeof world.settings.city!=='string'||!Array.isArray(world.records)||!Array.isArray(world.relations))throw Error('Univers de campagne invalide.');
 const ids=new Set();for(const r of world.records){
  validateBuilding(r?.building);
  if(r?.building&&!['zone','place'].includes(r.kind))throw Error('Un bâtiment doit être un lieu ou une zone.');
  if(!r||!technicalId(r.id)||ids.has(r.id)||!Object.hasOwn(worldKinds,r.kind)||typeof r.name!=='string'||!r.name.trim())throw Error('Fiche d’univers invalide ou identifiant dupliqué.');ids.add(r.id);
  for(const key of ['publicInfo','knownInfo','rumors','secrets','revealedInfo','state','gmNotes','consequences','history','source','portraitUrl'])if(typeof r[key]!=='string')throw Error('Champ d’univers invalide : '+key);
  if(!Array.isArray(r.aliases)||r.aliases.some(x=>typeof x!=='string')||!discoveryStates.includes(r.discovery)||typeof r.isSecret!=='boolean'||!r.fields||typeof r.fields!=='object'||Array.isArray(r.fields)||Object.values(r.fields).some(x=>typeof x!=='string'))throw Error('Métadonnées de fiche invalides.');
  if(r.coordinates!==undefined&&r.coordinates!==null&&(!Number.isFinite(r.coordinates.x)||!Number.isFinite(r.coordinates.y)||r.coordinates.x<0||r.coordinates.x>100||r.coordinates.y<0||r.coordinates.y>100))throw Error('Coordonnées cartographiques invalides.');
  if(r.portraitUrl&&!/^https?:\/\/[^\s]+$/i.test(r.portraitUrl))throw Error('Portrait : utilisez une adresse HTTP ou HTTPS.');
  for(const key of ['gameEntryId','corporationId','mapPlaceId'])if(r[key]!==null&&typeof r[key]!=='string')throw Error('Lien externe de fiche invalide.');
 }
 for(const r of world.records)if(r.building?.ownerId&&!world.records.some(owner=>owner.id===r.building.ownerId&&(owner.kind==='corporation'||owner.kind==='faction'&&(owner.corporationId||/corporation|corporatiste/i.test(owner.fields.type)))))throw Error('Corporation propriétaire du bâtiment introuvable.');
 const relationIds=new Set();for(const r of world.relations){
  if(!r||!technicalId(r.id)||relationIds.has(r.id)||!ids.has(r.from)||!ids.has(r.to))throw Error('Relation invalide : '+(r?.id??'identifiant absent')+' (extrémité introuvable).');relationIds.add(r.id);
  for(const key of ['type','description','confidence','evolution'])if(typeof r[key]!=='string')throw Error('Champ de relation invalide.');
  if(!visibilities.includes(r.visibility))throw Error('Visibilité de relation invalide.');
 }
 for(const [key,active] of [['deletedRecordIds',ids],['deletedRelationIds',relationIds]])if(world[key]!==undefined){
  const values=world[key];if(!Array.isArray(values)||values.some(id=>!technicalId(id)||active.has(id))||new Set(values).size!==values.length)throw Error('Historique de suppression invalide.');
 }
 for(const r of world.records)if(r.timelineOrder!==undefined){
  if(r.kind!=='scenario'||!Array.isArray(r.timelineOrder)||new Set(r.timelineOrder).size!==r.timelineOrder.length||r.timelineOrder.some(id=>!world.records.some(x=>x.id===id&&x.kind==='event')||!world.relations.some(link=>(link.from===r.id&&link.to===id)||(link.to===r.id&&link.from===id))))throw Error('Ordre de la frise invalide.');
 }
}
