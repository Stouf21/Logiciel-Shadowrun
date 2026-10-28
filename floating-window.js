export function boundedWindowPosition(x,y,width,height,viewportWidth,viewportHeight){return {x:Math.max(8,Math.min(x,Math.max(8,viewportWidth-width-8))),y:Math.max(8,Math.min(y,Math.max(8,viewportHeight-height-8)))};}
export function draggableWindow(panel,handle){
 let position={x:0,y:0},drag=null;const controller=new AbortController(),options={signal:controller.signal};
 const place=(x,y)=>{position=boundedWindowPosition(x,y,panel.offsetWidth,panel.offsetHeight,innerWidth,innerHeight);panel.style.left=position.x+'px';panel.style.top=position.y+'px';};
 const center=()=>place((innerWidth-panel.offsetWidth)/2,(innerHeight-panel.offsetHeight)/2);
 handle.addEventListener('pointerdown',e=>{if(e.button!==0||!e.isPrimary)return;e.preventDefault();drag={id:e.pointerId,x:e.clientX-position.x,y:e.clientY-position.y};handle.setPointerCapture(e.pointerId);panel.classList.add('window-dragging');},options);
 handle.addEventListener('pointermove',e=>{if(drag&&e.pointerId===drag.id){e.preventDefault();place(e.clientX-drag.x,e.clientY-drag.y);}},options);
 const release=()=>{drag=null;panel.classList.remove('window-dragging');};handle.addEventListener('pointerup',release,options);handle.addEventListener('pointercancel',release,options);
 handle.addEventListener('keydown',e=>{const delta={ArrowLeft:[-10,0],ArrowRight:[10,0],ArrowUp:[0,-10],ArrowDown:[0,10]}[e.key];if(delta){e.preventDefault();place(position.x+delta[0]*(e.shiftKey?3:1),position.y+delta[1]*(e.shiftKey?3:1));}if(e.key==='Home'){e.preventDefault();center();}},options);
 window.addEventListener('resize',()=>place(position.x,position.y),options);center();return {center,clamp:()=>place(position.x,position.y),dispose:()=>controller.abort()};
}

export function raiseGameWindow(panel){for(const other of document.querySelectorAll('.npc-quick-window,.chapter-test-window'))other.style.zIndex=other===panel?'8902':'8901';}
