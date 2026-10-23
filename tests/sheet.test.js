import test from 'node:test';
import assert from 'node:assert/strict';
import {validateProfile,profileSearchText} from '../sheet.js';
test('Les anciennes fiches sans profil restent compatibles',()=>assert.doesNotThrow(()=>validateProfile(undefined)));
test('Les attributs et textes survivent à un export JSON et sont recherchables',()=>{const profile=JSON.parse(JSON.stringify({force:3,essence:4.5,anarchy:0,skills:'Influence : 4',weapons:'Sort de soin'}));validateProfile(profile);assert.match(profileSearchText(profile),/Influence : 4/);assert.match(profileSearchText(profile),/Anarchy actuel 0/);assert.match(profileSearchText(profile),/Sort de soin/);});
test('Un import de profil invalide est rejeté',()=>{for(const p of [null,[],{force:-1},{force:'3'},{essence:Infinity},{skills:5}])assert.throws(()=>validateProfile(p));});
