// Pointer Events : souris et poignée tactile, sans bibliothèque distante.
export function mountScenarioDrag(list,onDrop,onError){
 let cancelDrag=()=>{};
 list.querySelectorAll('[data-timeline-event]').forEach(item=>{
  item.addEventListener('pointerdown',event=>{
   if(event.button!==0||!event.isPrimary)return;
   const handle=event.target.closest('[data-event-drag]');
   if(!handle&&event.target.closest('button,a,input,select,textarea,summary'))return;
   cancelDrag();
   const controller=new AbortController(),options={signal:controller.signal};
   const start={x:event.clientX,y:event.clientY};let active=false,target=null,edge='before',ghost=null,frame=null,x=start.x,y=start.y;
   const clearTarget=()=>{list.querySelectorAll('[data-drop-edge]').forEach(el=>el.removeAttribute('data-drop-edge'));target=null;};
   const cleanup=()=>{
    controller.abort();if(frame!==null)cancelAnimationFrame(frame);ghost?.remove();clearTarget();item.classList.remove('is-dragging');document.body.classList.remove('scenario-dragging');
    if(item.hasPointerCapture(event.pointerId))item.releasePointerCapture(event.pointerId);
    cancelDrag=()=>{};
   };
   cancelDrag=cleanup;
   const locate=()=>{
    clearTarget();const hit=document.elementFromPoint(x,y)?.closest('[data-timeline-event]');
    if(!hit||hit===item||!list.contains(hit))return;
    const rect=hit.getBoundingClientRect();target=hit;edge=y<rect.top+rect.height/2?'before':'after';hit.dataset.dropEdge=edge;
   };
   const animate=()=>{
    if(!item.isConnected){cleanup();return;}
    const margin=85,speed=y<margin?-Math.ceil((margin-y)/5):y>innerHeight-margin?Math.ceil((y-innerHeight+margin)/5):0;
    if(speed){window.scrollBy(0,Math.max(-24,Math.min(24,speed)));locate();}
    frame=requestAnimationFrame(animate);
   };
   const move=e=>{
    if(e.pointerId!==event.pointerId)return;if(!item.isConnected){cleanup();return;}
    x=e.clientX;y=e.clientY;
    if(!active&&Math.hypot(x-start.x,y-start.y)<6)return;
    if(!active){
     active=true;item.setPointerCapture(event.pointerId);item.classList.add('is-dragging');document.body.classList.add('scenario-dragging');window.getSelection()?.removeAllRanges();
     ghost=document.createElement('div');ghost.className='scenario-drag-preview';ghost.textContent=item.querySelector('h5').textContent;ghost.setAttribute('aria-hidden','true');document.body.append(ghost);frame=requestAnimationFrame(animate);
     // Un glissement depuis la poignée ne doit pas devenir un clic après le dépôt.
     item.addEventListener('click',click=>{click.preventDefault();click.stopPropagation();},{once:true,capture:true,signal:controller.signal});
    }
    e.preventDefault();ghost.style.left=Math.min(Math.max(8,x+15),Math.max(8,innerWidth-ghost.offsetWidth-8))+'px';ghost.style.top=Math.max(8,Math.min(y+15,innerHeight-ghost.offsetHeight-8))+'px';locate();
   };
   const finish=e=>{
    if(e.pointerId!==event.pointerId)return;
    const destination=item.isConnected&&active&&target?{id:target.dataset.timelineEvent,edge}:null;
    cleanup();if(destination)try{onDrop(item.dataset.timelineEvent,destination.id,destination.edge);}catch(err){onError(err);}
   };
   document.addEventListener('pointermove',move,{...options,passive:false});document.addEventListener('pointerup',finish,options);
   document.addEventListener('pointercancel',cleanup,options);
   // Le tactile capture implicitement la poignée ; le transfert vers la carte
   // émet une perte sur la poignée qui remonte jusqu’ici, sans annuler le geste.
   item.addEventListener('lostpointercapture',e=>{if(e.target===item)cleanup();},options);
   document.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();cleanup();}},options);
  });
 });
 return ()=>cancelDrag();
}
