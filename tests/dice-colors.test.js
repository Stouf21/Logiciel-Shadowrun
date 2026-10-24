import test from 'node:test';
import assert from 'node:assert/strict';
import {validColors,diceTextColor} from '../dice-colors.js';
test('Les deux couleurs doivent être valides et distinctes',()=>{assert.ok(validColors({normal:'#112233',risk:'#ff0000'}));for(const colors of [null,{normal:'#ABCDEF',risk:'#abcdef'},{normal:'red',risk:'#ffffff'},{normal:'#ff0000;display:none',risk:'#ffffff'}])assert.ok(!validColors(colors));});
test('Le texte des dés reste lisible sur les couleurs claires et sombres',()=>{assert.equal(diceTextColor('#000000'),'#ffffff');assert.equal(diceTextColor('#ffffff'),'#000000');assert.equal(diceTextColor('#eeb600'),'#000000');assert.equal(diceTextColor('#45385f'),'#ffffff');});
