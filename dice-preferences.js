import {defaultColors,validColors} from './dice-colors.js?v=0.30.0';
import {validateOptions} from './anarchy-dice.js?v=0.30.0';
export const dicePrefsKey='shadowrun-dice-preferences-v1';
export const defaultDicePrefs=()=>({colors:{...defaultColors},rr:0,condition:'normal',target:null});
export function validateDicePrefs(value){
 if(!value||!validColors(value.colors))throw Error('Choisissez deux couleurs différentes pour les dés.');
 validateOptions({count:6,risk:2,rr:value.rr,condition:value.condition,target:value.target});return value;
}
export function readDicePrefs(storage=globalThis.localStorage){
 try{const saved=JSON.parse(storage.getItem(dicePrefsKey));if(saved)return validateDicePrefs(saved);}catch{}
 const defaults=defaultDicePrefs();try{const colors=JSON.parse(storage.getItem('shadowrun-dice-colors-v1'));if(validColors(colors))defaults.colors=colors;}catch{}return defaults;
}
export function writeDicePrefs(value,storage=globalThis.localStorage){validateDicePrefs(value);storage.setItem(dicePrefsKey,JSON.stringify(value));return value;}
