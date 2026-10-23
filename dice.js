export function rollDice(count, threshold=5, random=Math.random){
 if(!Number.isInteger(count)||count<1||count>100)throw new Error('Choisissez entre 1 et 100 dés.');
 if(!Number.isInteger(threshold)||threshold<2||threshold>6)throw new Error('Seuil invalide.');
 const dice=Array.from({length:count},()=>Math.floor(random()*6)+1);
 return {dice,hits:dice.filter(d=>d>=threshold).length,ones:dice.filter(d=>d===1).length};
}
