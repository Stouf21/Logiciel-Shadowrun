import {dice3D} from './dice-3d.js?v=0.23.0';
import {diceTextColor} from './dice-colors.js?v=0.23.0';
import {readDicePrefs,writeDicePrefs} from './dice-preferences.js?v=0.23.0';
import {rollAnarchy,rerollAnarchy,describeOutcome} from './anarchy-dice.js?v=0.23.0';
import {draggableWindow} from './floating-window.js?v=0.23.0';
const random=()=>crypto.getRandomValues(new Uint32Array(1))[0]/4294967296;
const applyColors=(element,colors)=>{for(const kind of ['normal','risk']){element.style.setProperty('--'+kind+'-die-color',colors[kind]);element.style.setProperty('--'+kind+'-die-text',diceTextColor(colors[kind]));}};
export function mountQuickDice(container){
 let last=null,busy=false,windowNode=null,drag=null,timer=null,sequence=0;const history=[];
 container.innerHTML='<form class="quick-dice" aria-label="Lanceur rapide de dés"><span class="eyebrow">LANCER DES DÉS</span><div class="quick-dice-fields"><label>Dés au total<input id="quick-dice-count" type="number" min="1" max="100" value="6" required></label><label>Dont risque<input id="quick-dice-risk" type="number" min="0" max="100" value="2" required></label></div><button class="primary" type="submit">Lancer</button><p class="quick-dice-error" role="alert"></p></form>';
 const form=container.querySelector('form'),error=container.querySelector('.quick-dice-error');
 function close(){drag?.dispose();drag=null;windowNode?.remove();windowNode=null;}
 function ensureWindow(){
  if(windowNode)return;windowNode=document.createElement('section');windowNode.className='floating-dice-window';windowNode.setAttribute('role','dialog');windowNode.setAttribute('aria-label','Résultat du lancer de dés');
  windowNode.innerHTML='<header class="floating-dice-header"><button class="floating-dice-grip" aria-label="Déplacer la fenêtre de dés">⠿ <span>Dés · Anarchy V2</span></button><button class="floating-dice-close" aria-label="Fermer les dés">×</button></header><div class="floating-dice-body"><div id="quick-dice-result" aria-live="polite"></div><div class="actions"><button id="quick-dice-reroll">Relancer · 1 Anarchy</button></div><details class="dice-history"><summary>Historique de la session</summary><ol></ol></details></div>';
  document.body.append(windowNode);windowNode.querySelector('.floating-dice-close').onclick=close;windowNode.querySelector('#quick-dice-reroll').onclick=()=>{if(last&&!busy)launch(rerollAnarchy(last,random));};windowNode.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}});
 }
 function show(rolling){
  if(!windowNode||!last)return;applyColors(windowNode,readDicePrefs().colors);const threshold={normal:5,advantage:4,disadvantage:6}[last.options.condition];
  const dice=(values,risk)=>values.map((d,i)=>dice3D(d,risk,d>=threshold,i)).join('');
  windowNode.querySelector('#quick-dice-result').innerHTML=`<p class="roll-status">${rolling?'Les dés roulent…':'Lancer terminé'}</p><div class="roll-outcome" ${rolling?'hidden':''}><h3>${last.hits} succès · ${last.complication}</h3><p>${describeOutcome(last)}</p></div><div class="dice-result-groups dice-tray ${rolling?'is-rolling':''}" aria-busy="${rolling}"><div><h4>Dés ordinaires · ${last.normalDice.length}</h4>${dice(last.normalDice,false)||'<span class="muted">Aucun</span>'}</div><div><h4>Dés de risque · ${last.riskDice.length}</h4>${dice(last.riskDice,true)||'<span class="muted">Aucun</span>'}</div></div><p class="muted">${last.options.count}d6 dont ${last.options.risk} de risque · RR ${last.options.rr}. Les succès des dés de risque comptent double.${last.rerolls?' Complication conservée du jet initial. '+last.rerolls+' point(s) d’Anarchy à décompter.':''}</p>`;
  windowNode.querySelector('#quick-dice-reroll').disabled=rolling;const list=windowNode.querySelector('.dice-history ol');list.replaceChildren(...history.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));drag?.clamp();
 }
 function launch(result){
  last=result;busy=true;error.textContent='';form.querySelector('button').disabled=true;sequence++;const current=sequence;clearTimeout(timer);ensureWindow();show(true);if(!drag)drag=draggableWindow(windowNode,windowNode.querySelector('.floating-dice-grip'));
  const finish=()=>{if(current!==sequence)return;history.unshift(new Date().toLocaleTimeString('fr-FR')+' · '+last.options.count+'d6 dont '+last.options.risk+' de risque · '+last.hits+' succès · '+last.complication);history.splice(20);busy=false;form.querySelector('button').disabled=false;show(false);};
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)finish();else timer=setTimeout(finish,1100);
 }
 form.onsubmit=e=>{e.preventDefault();if(busy)return;try{const prefs=readDicePrefs();launch(rollAnarchy({count:Number(form.querySelector('#quick-dice-count').value),risk:Number(form.querySelector('#quick-dice-risk').value),rr:prefs.rr,condition:prefs.condition,target:prefs.target},random));}catch(err){error.textContent=err.message;}};
 const onPrefs=()=>{if(windowNode)applyColors(windowNode,readDicePrefs().colors);};window.addEventListener('dice-preferences-change',onPrefs);
 return ()=>{sequence++;clearTimeout(timer);close();window.removeEventListener('dice-preferences-change',onPrefs);};
}
export function renderDiceSettings(container){
 const prefs=readDicePrefs();container.innerHTML=`<section class="settings-panel"><span class="tag">VOTRE TABLE</span><h3>Couleurs des dés</h3><div class="dice-colors"><label>Couleur des dés ordinaires<input id="normal-color" type="color" value="${prefs.colors.normal}"></label><span class="die-preview ordinary-preview">6</span><label>Couleur des dés de risque<input id="risk-color" type="color" value="${prefs.colors.risk}"></label><span class="die-preview risk-preview">6</span></div><p>Les deux couleurs doivent être différentes. Ces préférences sont conservées dans ce navigateur.</p><h3>Options des jets</h3><p class="muted">Le lanceur rapide utilise ces réglages. Les dés de risque remplacent des dés ordinaires dans la réserve totale.</p><div class="attribute-grid"><label>Réduction du risque (RR)<input id="dice-default-rr" type="number" min="0" max="3" value="${prefs.rr}"></label><label>Conditions du test<select id="dice-default-condition"><option value="normal">Normales · succès sur 5–6</option><option value="advantage">Avantage · succès sur 4–6</option><option value="disadvantage">Désavantage · succès sur 6</option></select></label><label>Seuil du test (facultatif)<input id="dice-default-target" type="number" min="0" max="1000" value="${prefs.target??''}" placeholder="Sans seuil / test opposé"></label></div><p class="settings-status" role="status"></p><small>Anarchy V2, p. 64–65, 70–71 et 77. Les points d’Anarchy et les effets narratifs restent à gérer sur la fiche et à la table.</small></section>`;
 const $=s=>container.querySelector(s);$('#dice-default-condition').value=prefs.condition;applyColors(container,prefs.colors);
 function save(){try{const next={colors:{normal:$('#normal-color').value,risk:$('#risk-color').value},rr:Number($('#dice-default-rr').value),condition:$('#dice-default-condition').value,target:$('#dice-default-target').value===''?null:Number($('#dice-default-target').value)};writeDicePrefs(next);applyColors(container,next.colors);$('.settings-status').textContent='Paramètres enregistrés.';window.dispatchEvent(new Event('dice-preferences-change'));}catch(err){$('.settings-status').textContent=err.message;}}
 for(const input of container.querySelectorAll('input,select'))input.addEventListener(input.type==='color'?'input':'change',save);
}
