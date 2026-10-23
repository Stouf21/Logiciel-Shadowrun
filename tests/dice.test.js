import test from 'node:test';
import assert from 'node:assert/strict';
import {rollDice} from '../dice.js';
test('Compte les succès et les 1 sur une réserve connue',()=>{const values=[0,1/6,2/6,3/6,4/6,5/6];assert.deepEqual(rollDice(6,5,()=>values.shift()),{dice:[1,2,3,4,5,6],hits:2,ones:1});});
test('Respecte le seuil configurable et les limites',()=>{assert.equal(rollDice(3,6,()=>0.8).hits,0);for(const count of [0,-1,101,2.5,NaN])assert.throws(()=>rollDice(count));assert.throws(()=>rollDice(1,7));});
