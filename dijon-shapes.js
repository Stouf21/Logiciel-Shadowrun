// Propositions schématiques sur l’illustration uniquement. Aucun point GPS déduit.
// Les repères historiques restent dans dijon-places.js, sans déplacement.
import {imagePointFromPercent} from './map-model.js?v=0.25.0';
const shape=(recordId,kind,color,points)=>({id:'shape-proposal-'+kind+'-'+recordId,recordId,kind,color,points:points.map(([x,y])=>imagePointFromPercent({x,y})),source:'Proposition sur l’illustration · limites de campagne à ajuster'});
export const dijonIllustrationShapes=[
 shape('zone-centre','zone','#65d0e6',[[45,47],[59,43],[65,52],[63,70],[48,67],[44,59]]),
 shape('zone-toison','zone','#eeb600',[[54,4],[70,4],[73,17],[65,24],[54,19]]),
 shape('zone-gastronomie','zone','#c897ed',[[35,63],[46,64],[47,73],[40,77],[34,72]]),
 shape('zone-gare','zone','#73aaff',[[36,47],[43,46],[45,59],[40,64],[34,61]]),
 shape('zone-universite','zone','#72d8a5',[[78,63],[94,64],[95,79],[82,81],[76,73]]),
 shape('zone-chu','zone','#70c3e8',[[76,50],[90,49],[93,61],[78,64],[74,58]]),
 shape('zone-kir','zone','#63c9ba',[[4,24],[14,25],[19,45],[16,68],[8,76],[3,62]]),
 shape('zone-canal','zone','#eaa16c',[[28,73],[38,72],[43,78],[37,86],[28,82]]),
 shape('zone-toison','building','#ffcf42',[[59,7],[67,7],[68,14],[61,16],[58,12]]),
 shape('zone-gastronomie','building','#c897ed',[[37,66],[43,66],[44,72],[39,74],[36,70]])
];
