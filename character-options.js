export const unclassifiedCharacter='PJ / PNJ : À définir';
export const characterCategories=['PJ','PNJ principal','PNJ secondaire',unclassifiedCharacter];
// Métatypes du livre Anarchy V2 et du tableau de l’écran du meneur.
export const metatypes=['Humain','Elfe','Nain','Ork','Troll'];
export function metatypeOptions(current=''){
 const blank=current==='À définir'?'À définir':'';
 return [[blank,'À définir'],...metatypes.map(value=>[value,value]),...(current&&current!==blank&&!metatypes.includes(current)?[[current,current]]:[])];
}
