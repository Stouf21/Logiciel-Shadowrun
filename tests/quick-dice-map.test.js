import test from 'node:test';import assert from 'node:assert/strict';
import {readDicePrefs,writeDicePrefs,dicePrefsKey,validateDicePrefs} from '../dice-preferences.js';
import {boundedWindowPosition} from '../floating-window.js';import {mapLabelScale} from '../map-labels.js';
const storage=()=>{const values=new Map();return {getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};};
test('Les anciennes couleurs sont reprises, puis les couleurs et options des dés se conservent ensemble',()=>{
 const s=storage();s.setItem('shadowrun-dice-colors-v1',JSON.stringify({normal:'#123456',risk:'#fedcba'}));const prefs=readDicePrefs(s);assert.deepEqual(prefs.colors,{normal:'#123456',risk:'#fedcba'});assert.equal(prefs.rr,0);
 writeDicePrefs({...prefs,rr:2,condition:'advantage',target:3},s);assert.deepEqual(JSON.parse(s.getItem(dicePrefsKey)),readDicePrefs(s));
 assert.throws(()=>validateDicePrefs({...prefs,colors:{normal:'#ffffff',risk:'#ffffff'}}));assert.throws(()=>validateDicePrefs({...prefs,rr:4}));
});
test('Une fenêtre déplacée reste dans l’écran et les étiquettes diminuent au dézoom sur chaque fond',()=>{
 assert.deepEqual(boundedWindowPosition(-200,2000,600,500,1000,800),{x:8,y:292});assert.deepEqual(boundedWindowPosition(1000,-20,360,700,390,844),{x:22,y:8});
 for(const mode of ['streets','cyberpunk']){const ref=mode==='streets'?15:0;assert.ok(mapLabelScale(mode,ref-2)<mapLabelScale(mode,ref));assert.ok(mapLabelScale(mode,ref+1)>mapLabelScale(mode,ref));assert.equal(mapLabelScale(mode,ref-20),.26);assert.equal(mapLabelScale(mode,ref+20),1.3);}
});
