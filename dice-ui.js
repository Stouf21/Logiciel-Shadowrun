import {dice3D} from './dice-3d.js?v=0.14.0';
import {defaultColors,validColors,diceTextColor} from './dice-colors.js?v=0.14.0';
import {rollAnarchy,rerollAnarchy,describeOutcome} from './anarchy-dice.js?v=0.14.0';
let lastRoll=null;
const history=[];
const colorKey='shadowrun-dice-colors-v1';
let colors={...defaultColors};
try{const saved=JSON.parse(localStorage.getItem(colorKey));if(validColors(saved))colors=saved;}catch{}
const random=()=>crypto.getRandomValues(new Uint32Array(1))[0]/4294967296;
export function renderDice(container){
 let parametersChanged=false,busy=false;
 container.innerHTML=`<div class="dice-panel"><span class="tag">ANARCHY V2 · RÈGLES STANDARD</span><h3>Chaque risque compte.</h3><p class="muted">Réserve totale = compétence + attribut (+2 si spécialisation applicable). Les dés de risque remplacent des dés ordinaires : ils ne s’ajoutent pas à la réserve.</p><div class="dice-colors"><label>Couleur des dés ordinaires<input type="color" id="normal-color" value="${colors.normal}"></label><span class="die-preview ordinary-preview" aria-hidden="true">6</span><label>Couleur des dés de risque<input type="color" id="risk-color" value="${colors.risk}"></label><span class="die-preview risk-preview" aria-hidden="true">6</span></div><p class="muted">Les deux couleurs sont personnalisables. Les dés restent séparés par libellé ; les succès sont signalés par une étoile.</p><form id="roll"><div class="dice-fields"><label>Réserve totale<input id="count" type="number" min="1" max="100" value="6" required></label><label>Dont dés de risque<input id="risk" type="number" min="0" max="100" value="2" required></label><label>Réduction du risque (RR)<input id="rr" type="number" min="0" max="3" value="0" required></label><label>Conditions du test<select id="condition"><option value="normal">Normales · succès sur 5–6</option><option value="advantage">Avantage · succès sur 4–6</option><option value="disadvantage">Désavantage · succès sur 6</option></select></label><label>Seuil du test (facultatif)<input id="target" type="number" min="0" max="1000" placeholder="Sans seuil / test opposé"></label></div><p class="muted">Les succès des dés de risque valent 2. Après RR, leurs « 1 » donnent : 1 = complication mineure, 2 = critique, 3+ = désastre. Les « 1 » ordinaires ne provoquent aucune complication.</p><div class="actions"><button class="primary" type="submit">Lancer les dés</button><button type="button" id="reroll" disabled>Relancer · 1 Anarchy</button></div></form><p id="dice-error" role="alert"></p><div id="result" role="status" aria-live="polite"></div><details class="dice-help"><summary>Aide & références</summary><p>Références : livre principal, p. 64–65, 70–71 et 77 ; fichier P1, pages PDF 66–67, 72–73 et 79.</p><p>Une relance conserve la réserve, les conditions et la complication du jet initial ; seuls les succès changent. Le point d’Anarchy est à décompter sur votre fiche. Les jets ne sont pas liés automatiquement à un personnage.</p><p>Le seuil facultatif concerne un test simple. Pour un test opposé, comparez les deux jets et arbitrez les égalités selon la situation. Les effets narratifs des complications, annulations de succès (par exemple liées à l’essence) et règles optionnelles de risque ne sont pas automatisés.</p></details></div><section class="dice-history"><h3>Derniers jets de cette session</h3><p class="muted">20 résultats maximum, sans sauvegarde après rechargement.</p><ol id="dice-history-list"></ol></section>`;
 const $=s=>container.querySelector(s);
 const defaults=lastRoll?.options;
 function applyColors(){container.style.setProperty('--normal-die-color',colors.normal);container.style.setProperty('--risk-die-color',colors.risk);container.style.setProperty('--normal-die-text',diceTextColor(colors.normal));container.style.setProperty('--risk-die-text',diceTextColor(colors.risk));}
 applyColors();
 for(const type of ['normal','risk'])$('#'+type+'-color').oninput=()=>{const proposed={...colors,[type]:$('#'+type+'-color').value};if(!validColors(proposed)){$('#'+type+'-color').value=colors[type];$('#dice-error').textContent='Choisissez deux couleurs différentes pour distinguer les dés.';return;}colors=proposed;applyColors();$('#dice-error').textContent='';try{localStorage.setItem(colorKey,JSON.stringify(colors));}catch{$('#dice-error').textContent='Couleurs appliquées pour cette session ; leur sauvegarde locale est indisponible.';}};
 if(defaults)for(const field of ['count','risk','rr','condition','target'])$('#'+field).value=defaults[field]??'';
 function showResult(rolling=false){
  if(!lastRoll)return;
  const r=lastRoll,threshold={normal:5,advantage:4,disadvantage:6}[r.options.condition];
  const dice=(values,risk)=>values.map((d,i)=>dice3D(d,risk,d>=threshold,i)).join('');
  $('#result').innerHTML=`<div class="roll-status" role="status">${rolling?'Les dés roulent…':'Lancer terminé'}</div><div class="roll-outcome" ${rolling?'hidden':''}><h3>${r.hits} succès · ${r.complication}</h3><p>${describeOutcome(r)}</p></div><div class="dice-result-groups dice-tray ${rolling?'is-rolling':''}" aria-busy="${rolling}"><div><h4>Dés ordinaires · ${r.normalHits} succès</h4>${dice(r.normalDice,false)||'<span class="muted">Aucun</span>'}</div><div><h4>Dés de risque · ${r.riskHits} succès (doublés)</h4>${dice(r.riskDice,true)||'<span class="muted">Aucun</span>'}</div></div><p class="muted">${r.rerolls?'Complication conservée du jet initial : ':''}${r.riskOnes} résultat(s) de 1 sur les dés de risque, RR ${r.options.rr} → ${r.effectiveOnes} retenu(s).${r.rerolls?` ${r.rerolls} point(s) d’Anarchy à décompter pour les relances de ce jet.`:''}</p>`;
  $('#reroll').disabled=parametersChanged||rolling;
  $('#roll button[type=submit]').disabled=rolling;
 }
 function showHistory(){const list=$('#dice-history-list');list.replaceChildren();for(const r of history){const item=document.createElement('li');item.textContent=`${r.time} · ${r.count}d6 dont ${r.risk} de risque · RR ${r.rr} · ${r.hits} succès · ${r.complication}${r.rerolls?' · Relance Anarchy':''}`;list.append(item);}}
 async function record(){
  const snapshot=lastRoll;busy=true;const resultNode=$('#result');showResult(true);
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduced)await new Promise(resolve=>setTimeout(resolve,1100));
  history.unshift({...snapshot,...snapshot.options,time:new Date().toLocaleTimeString('fr-FR')});history.splice(20);busy=false;
  if(resultNode.isConnected&&resultNode===$('#result')){showResult();showHistory();}
 }
 $('#roll').onsubmit=e=>{e.preventDefault();if(busy)return;try{const options={count:Number($('#count').value),risk:Number($('#risk').value),rr:Number($('#rr').value),condition:$('#condition').value,target:$('#target').value===''?null:Number($('#target').value)};lastRoll=rollAnarchy(options,random);parametersChanged=false;$('#dice-error').textContent='';void record();}catch(err){$('#dice-error').textContent=err.message;}};
 $('#reroll').onclick=()=>{if(!lastRoll||busy)return;lastRoll=rerollAnarchy(lastRoll,random);$('#dice-error').textContent='';void record();};
 // Éviter qu'une modification du formulaire laisse croire qu'elle s'applique
 // à une relance : il faut alors lancer un nouveau test.
 $('#roll').oninput=()=>{parametersChanged=true;$('#reroll').disabled=true;};
 showResult();showHistory();
}
