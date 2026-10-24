const pips={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};
const rotations={1:[0,0],2:[-90,0],3:[0,-90],4:[0,90],5:[90,0],6:[0,180]};
export function dice3D(value,risk,hit,index=0){
 if(!Number.isInteger(value)||value<1||value>6)throw Error('Face de d6 invalide.');
 const [x,y]=rotations[value];
 return `<span class="die ${risk?'risk-die ':''}${hit?'hit':''}" role="img" aria-label="Dé ${risk?'de risque':'ordinaire'} : ${value}${hit?`, ${risk?2:1} succès`:''}" data-value="${value}" style="--face-x:${x}deg;--face-y:${y}deg;--roll-delay:${Math.min(index*18,180)}ms"><span class="die-body" aria-hidden="true">${[1,2,3,4,5,6].map(face=>`<span class="die-face face-${face}">${pips[face].map(position=>`<i class="pip" style="grid-area:${Math.ceil(position/3)} / ${(position-1)%3+1}"></i>`).join('')}</span>`).join('')}</span></span>`;
}
