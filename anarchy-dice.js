// Règles standard : Anarchy V2, pages imprimées 64–65, 70–71 et 77.
// Les règles optionnelles de risque ne sont pas utilisées.
const conditions={normal:5,advantage:4,disadvantage:6};
export function validateOptions(options){
 if(!options||!Number.isInteger(options.count)||options.count<1||options.count>100)throw Error('La réserve doit contenir de 1 à 100 dés.');
 if(!Number.isInteger(options.risk)||options.risk<0||options.risk>options.count)throw Error('Les dés de risque doivent être compris entre 0 et la réserve totale.');
 if(!Number.isInteger(options.rr)||options.rr<0||options.rr>3)throw Error('La réduction du risque doit être comprise entre 0 et 3.');
 if(!Object.hasOwn(conditions,options.condition))throw Error('Conditions de test invalides.');
 if(options.target!==null&&(!Number.isInteger(options.target)||options.target<0||options.target>1000))throw Error('Le seuil du test doit être un entier positif ou nul, ou rester vide.');
}
export function evaluateRoll(dice,options){
 validateOptions(options);
 if(!Array.isArray(dice)||dice.length!==options.count||dice.some(d=>!Number.isInteger(d)||d<1||d>6))throw Error('Résultats de dés invalides.');
 const normalDice=dice.slice(0,options.count-options.risk),riskDice=dice.slice(options.count-options.risk);
 const threshold=conditions[options.condition];
 const normalHits=normalDice.filter(d=>d>=threshold).length;
 const riskHits=riskDice.filter(d=>d>=threshold).length*2;
 const riskOnes=riskDice.filter(d=>d===1).length;
 const effectiveOnes=Math.max(0,riskOnes-options.rr);
 const complication=['Aucune complication','Complication mineure','Complication critique','Désastre'][Math.min(effectiveOnes,3)];
 return {options:{...options},normalDice,riskDice,normalHits,riskHits,hits:normalHits+riskHits,riskOnes,effectiveOnes,complication,rerolls:0};
}
export function rollAnarchy(options,random=Math.random){
 validateOptions(options);
 return evaluateRoll(Array.from({length:options.count},()=>Math.floor(random()*6)+1),options);
}
export function rerollAnarchy(previous,random=Math.random){
 const next=rollAnarchy(previous.options,random);
 // La relance remplace les succès mais conserve la complication initiale,
 // y compris son absence. Les nouveaux 1 n'ont donc aucun effet.
 return {...next,riskOnes:previous.riskOnes,effectiveOnes:previous.effectiveOnes,complication:previous.complication,rerolls:previous.rerolls+1};
}
export function describeOutcome(result){
 if(result.complication==='Désastre')return 'Désastre : échec par défaut, sauf exception décidée par le meneur.';
 if(result.options.target===null)return 'Sans seuil : comparez les succès au seuil ou au résultat adverse.';
 const net=result.hits-result.options.target;
 const base=net>=0?`Réussite · ${net} succès net(s)`:`Échec · ${-net} succès manquant(s)`;
 return base+(result.complication==='Complication critique'?' · Le meneur peut imposer un échec selon la complication.':'');
}
