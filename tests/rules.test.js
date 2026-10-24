import test from 'node:test';
import assert from 'node:assert/strict';
import {rules,ruleSections,ruleMatches,ruleSource} from '../rules-data.js';
test('Chaque thème dispose de synthèses et de références imprimées valides',()=>{for(const category of ruleSections)assert.ok(rules.some(r=>r.category===category));assert.equal(new Set(rules.map(r=>r.id)).size,rules.length);for(const r of rules){assert.ok(r.pages.length%2===0);for(let i=0;i<r.pages.length;i+=2){assert.ok(r.pages[i]>0&&r.pages[i]<=r.pages[i+1]);}assert.match(ruleSource(r),/Anarchy V2/);}});
test('La recherche retrouve un mécanisme malgré accents et casse',()=>{const healing=rules.find(r=>r.title.startsWith('Guérison'));assert.ok(ruleMatches(healing,'GUERISON'));assert.ok(ruleMatches(rules.find(r=>r.title==='Drain'),'incapacité'));assert.ok(rules.filter(r=>r.optional).every(r=>r.title.includes('Variante')||r.title.includes('totale')));});
