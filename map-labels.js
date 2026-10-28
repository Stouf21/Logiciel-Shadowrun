export function mapLabelScale(mode,zoom){
 const reference=mode==='streets'?15:0;
 return Math.max(.26,Math.min(1.3,2**((zoom-reference)*.65)));
}
export function scaleMapLabels(element,mode,zoom){
 const scale=mapLabelScale(mode,zoom);element.style.setProperty('--map-label-scale',scale);
 // Read dimensions together before writing transforms to avoid a layout per label during zoom.
 const labels=[...element.querySelectorAll('.scalable-map-label')].map(root=>{const label=root.querySelector('.map-pin');return label?{root,label,width:label.offsetWidth,height:label.offsetHeight}:null;}).filter(Boolean);
 for(const {root,label,width,height} of labels){
  const point=root.dataset.labelAnchor==='point';
  label.style.transform=`scale(${scale})`;label.style.transformOrigin='0 0';
  Object.assign(root.style,{width:width*scale+'px',height:height*scale+'px',marginLeft:-(point?11:width/2)*scale+'px',marginTop:-(point?16:height/2)*scale+'px'});
 }
}
