export function mapMenuPosition(anchor,size,viewport){return {left:Math.max(12,Math.min(anchor.x,viewport.width-size.width-12)),top:Math.max(12,Math.min(anchor.y,viewport.height-size.height-12))};}
export function mountMapContextMenu(map,{getActions,onError=()=>{}}){
 const container=map.getContainer();let menu=null,origin=null,openedView=null,disposed=false;
 function close(focus=false){menu?.remove();menu=null;openedView=null;if(focus)(origin?.isConnected&&typeof origin.focus==='function'?origin:container).focus({preventScroll:true});origin=null;}
 function open(point,anchor,target){
  close();if(disposed)return;origin=target;menu=document.createElement('div');menu.className='map-context-menu';menu.setAttribute('role','menu');menu.setAttribute('aria-label','Actions à cet emplacement');
  const heading=document.createElement('p');heading.className='map-context-title';heading.textContent='Actions à cet emplacement';menu.append(heading);
  for(const item of getActions(point)){
   if(item.separator){const line=document.createElement('div');line.className='map-context-separator';line.setAttribute('role','separator');menu.append(line);continue;}
   const button=document.createElement('button');button.type='button';button.setAttribute('role','menuitem');button.textContent=item.label;button.disabled=!!item.disabled;button.onclick=e=>{e.preventDefault();e.stopPropagation();close();try{Promise.resolve(item.run()).catch(onError);}catch(err){onError(err);}};menu.append(button);
  }
  const current=menu;document.body.append(current);const position=mapMenuPosition(anchor,{width:current.offsetWidth,height:current.offsetHeight},{width:innerWidth,height:innerHeight});current.style.left=position.left+'px';current.style.top=position.top+'px';
  current.onkeydown=e=>{const buttons=[...current.querySelectorAll('button:not(:disabled)')],index=buttons.indexOf(document.activeElement);if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close(true);}else if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();e.stopPropagation();const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(index+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons[next]?.focus();}};
  current.querySelector('button:not(:disabled)')?.focus({preventScroll:true});const bounds=container.getBoundingClientRect();openedView={x:scrollX,y:scrollY,left:bounds.left,top:bounds.top};
 }
 function context(e){if(e.target.closest?.('.leaflet-control'))return;e.preventDefault();e.stopPropagation();const p=map.mouseEventToLatLng(e);open([p.lat,p.lng],{x:e.clientX,y:e.clientY},e.target);}
 function keyboard(e){if(e.target.closest?.('.leaflet-control'))return;if(e.key!=='ContextMenu'&&!(e.shiftKey&&e.key==='F10'))return;e.preventDefault();e.stopPropagation();const p=map.getCenter(),r=container.getBoundingClientRect();open([p.lat,p.lng],{x:r.left+r.width/2,y:r.top+r.height/2},document.activeElement);}
 function outside(e){if(menu&&!menu.contains(e.target))close();}
 function scroll(e){if(!menu||menu.contains(e.target))return;const r=container.getBoundingClientRect();if(openedView&&scrollX===openedView.x&&scrollY===openedView.y&&Math.abs(r.left-openedView.left)<.5&&Math.abs(r.top-openedView.top)<.5)return;close();}
 function escape(e){if(menu&&e.key==='Escape'){e.preventDefault();close(true);}}
 const move=()=>close();container.addEventListener('contextmenu',context,true);container.addEventListener('keydown',keyboard);document.addEventListener('pointerdown',outside,true);document.addEventListener('keydown',escape);window.addEventListener('scroll',scroll,true);window.addEventListener('resize',move);map.on('movestart zoomstart',move);
 return {close,dispose(){if(disposed)return;disposed=true;close();container.removeEventListener('contextmenu',context,true);container.removeEventListener('keydown',keyboard);document.removeEventListener('pointerdown',outside,true);document.removeEventListener('keydown',escape);window.removeEventListener('scroll',scroll,true);window.removeEventListener('resize',move);map.off('movestart zoomstart',move);}};
}
