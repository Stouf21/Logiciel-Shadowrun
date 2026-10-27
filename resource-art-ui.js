import {baseAssets} from './catalog-data.js?v=0.20.0';
import {escape} from './ui.js?v=0.20.0';
import {resourceImageKey,resourceArtwork,resourceArtPreview,defaultResourceArt,maxResourceImageLength} from './resource-art.js?v=0.20.0';

export async function readResourceImage(file){
 if(!file||!['image/png','image/jpeg','image/webp'].includes(file.type))throw Error('Choisissez une image PNG, JPEG ou WebP.');
 if(file.size>8*1024*1024)throw Error('Choisissez une image de moins de 8 Mo.');
 const url=URL.createObjectURL(file);
 try{
  const image=new Image();image.src=url;await image.decode();
  const canvas=document.createElement('canvas');
  for(const size of [1000,800,600]){
   const scale=Math.min(1,size/Math.max(image.naturalWidth,image.naturalHeight));
   canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
   canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
   const data=canvas.toDataURL('image/webp',.8);
   if(data.length<=maxResourceImageLength)return data;
  }
  throw Error('Cette image reste trop volumineuse. Choisissez une image plus petite.');
 }catch(error){if(error.name==='EncodingError')throw Error('Cette image ne peut pas être lue. Essayez un autre fichier.');throw error;}
 finally{URL.revokeObjectURL(url);}
}

export function mountResourceArt({getState,onSave}){
 function resolve(key){
  const state=getState();
  for(const [scope,items] of [['asset',[...baseAssets,...(state.customAssets??[])]],['entry',state.entries]]){
   const item=items.find(x=>resourceImageKey(scope,x.id)===key);if(item)return {scope,item};
  }
  return null;
 }
 function refresh(key){
  const resource=resolve(key);if(!resource)return;
  document.querySelectorAll('[data-resource-art]').forEach(node=>{if(node.dataset.resourceArt===key)node.outerHTML=resourceArtwork(resource.item,getState().resourceImages,resource.scope);});
 }
 function open(key){
  const resource=resolve(key);if(!resource)return;
  const {item}=resource,dialog=document.createElement('dialog');dialog.className='resource-art-dialog';dialog.dataset.artResource=key;
  let draft=getState().resourceImages?.[key]??null,busy=false;
  dialog.innerHTML=`<form><span class="eyebrow">ILLUSTRATION</span><h2 id="resource-art-title">${escape(item.name)}</h2><div class="resource-art-preview"></div><p class="resource-art-caption" data-art-caption></p><div class="actions resource-art-controls"><label class="button" role="button" tabindex="0">Choisir une image<input type="file" accept="image/png,image/jpeg,image/webp" data-art-file hidden></label><button type="button" data-art-reset>Retirer mon image</button></div><p class="muted">PNG, JPEG ou WebP, jusqu’à 8 Mo. Votre image est réduite et conservée dans ce navigateur, avec votre sauvegarde exportée.</p><p class="resource-art-error" role="alert"></p><div class="actions"><button type="button" data-art-close>Fermer</button><button type="submit" class="primary" data-art-save>Enregistrer</button></div></form>`;
  dialog.setAttribute('aria-labelledby','resource-art-title');
  document.body.append(dialog);
  const $=selector=>dialog.querySelector(selector),error=$('.resource-art-error');
  function preview(){
   const art=draft?{image:draft}:defaultResourceArt(item,resource.scope);
   $('.resource-art-preview').innerHTML=art?resourceArtPreview(art,item.name):'<p class="muted">Choisissez une illustration pour cette ressource.</p>';
   $('[data-art-caption]').textContent=draft?'Image personnelle':art?'Interprétation originale · '+art.name:'';
   $('[data-art-reset]').hidden=!draft;
  }
  function close(){dialog.close();dialog.remove();document.querySelectorAll('[data-art-open]').forEach(b=>{if(b.dataset.artOpen===key)b.focus({preventScroll:true});});}
  $('[data-art-close]').onclick=close;dialog.oncancel=e=>{e.preventDefault();close();};
  $('[data-art-reset]').onclick=()=>{draft=null;error.textContent='';preview();};
  $('.resource-art-controls label').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('[data-art-file]').click();}};
  $('[data-art-file]').onchange=async e=>{
   const file=e.target.files[0];if(!file)return;
   busy=true;$('[data-art-save]').disabled=true;$('[data-art-reset]').disabled=true;e.target.disabled=true;error.textContent='';
   try{const data=await readResourceImage(file);if(dialog.isConnected){draft=data;preview();}}
   catch(err){error.textContent=err.message;}
   finally{busy=false;$('[data-art-save]').disabled=false;$('[data-art-reset]').disabled=false;e.target.disabled=false;e.target.value='';}
  };
  $('form').onsubmit=async e=>{
   e.preventDefault();if(busy)return;
   try{
    if(!resolve(key))throw Error('Cette ressource n’existe plus.');
    const current=getState(),resourceImages={...current.resourceImages};
    if(draft)resourceImages[key]=draft;else delete resourceImages[key];
    await onSave({...current,resourceImages});refresh(key);close();
   }catch(err){error.textContent=err.message;}
  };
  preview();dialog.showModal();
 }
 const click=e=>{const button=e.target.closest('[data-art-open]');if(button){e.preventDefault();open(button.dataset.artOpen);}};
 const imageError=e=>{
  const img=e.target;if(!img.matches?.('img.resource-art-image, img.resource-art-atlas'))return;
  const root=img.closest('[data-resource-art], [data-art-resource]'),resource=resolve(root?.dataset.resourceArt??root?.dataset.artResource);
  if(img.matches('.resource-art-atlas')){
   const placeholder=document.createElement('span');placeholder.className='muted';placeholder.textContent='Illustration indisponible';img.closest('.resource-art-sprite').replaceWith(placeholder);return;
  }
  const fallback=resource&&defaultResourceArt(resource.item,resource.scope);
  img.outerHTML=fallback?resourceArtPreview(fallback,resource.item.name):'<span class="muted">Image indisponible</span>';
  const caption=root?.querySelector('.resource-art-caption');if(caption)caption.textContent='Image personnelle illisible : choisissez une autre image.';
 };
 document.addEventListener('click',click);
 document.addEventListener('error',imageError,true);
 return ()=>{document.removeEventListener('click',click);document.removeEventListener('error',imageError,true);};
}
