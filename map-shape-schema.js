export function validateMapShapes(shapes,validPoint,recordKinds){
 if(shapes===undefined)return;
 if(!shapes||typeof shapes!=='object'||Array.isArray(shapes)||Object.keys(shapes).some(mode=>!['streets','cyberpunk'].includes(mode)))throw Error('Contours de carte invalides.');
 for(const [mode,items] of Object.entries(shapes)){
  if(!Array.isArray(items)||items.length>500)throw Error('Liste de contours invalide.');
  const ids=new Set(),links=new Set();let vertices=0;
  for(const shape of items){
   if(!shape||typeof shape.id!=='string'||!/^shape-[a-z0-9_-]+$/.test(shape.id)||ids.has(shape.id)||!['zone','building'].includes(shape.kind)||typeof shape.recordId!=='string'||!/^#[0-9a-f]{6}$/i.test(shape.color)||typeof shape.source!=='string'||!validPolygon(shape.points,p=>validPoint(p,mode)))throw Error('Contour polygonal invalide.');
   const key=shape.kind+':'+shape.recordId;if(links.has(key))throw Error('Un contour de ce type existe déjà pour ce dossier.');links.add(key);ids.add(shape.id);
   if(recordKinds&&!(shape.kind==='zone'?recordKinds.get(shape.recordId)==='zone':['zone','place'].includes(recordKinds.get(shape.recordId))))throw Error('Le dossier associé au contour est introuvable ou incompatible.');
   vertices+=shape.points.length;
  }
  if(vertices>10000)throw Error('Trop de sommets sur cette carte (10 000 maximum).');
 }
}
const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
export function validPolygon(points,validPoint){
 if(!Array.isArray(points)||points.length<3||points.length>200||!points.every(validPoint)||new Set(points.map(p=>p.join(','))).size!==points.length)return false;
 // Coordonnées locales : évite la perte de précision sur de petits bâtiments GPS.
 const local=points.map(p=>[p[0]-points[0][0],p[1]-points[0][1]]);
 const area=local.reduce((sum,p,i)=>{const next=local[(i+1)%local.length];return sum+p[0]*next[1]-next[0]*p[1];},0);if(Math.abs(area)<1e-14)return false;
 const between=(a,b,c)=>Math.abs(cross(a,b,c))<1e-16&&c[0]>=Math.min(a[0],b[0])&&c[0]<=Math.max(a[0],b[0])&&c[1]>=Math.min(a[1],b[1])&&c[1]<=Math.max(a[1],b[1]);
 for(let i=0;i<local.length;i++)for(let j=i+2;j<local.length;j++){
  if(i===0&&j===local.length-1)continue;
  const a=local[i],b=local[(i+1)%local.length],c=local[j],d=local[(j+1)%local.length];
  if(cross(a,b,c)*cross(a,b,d)<0&&cross(c,d,a)*cross(c,d,b)<0||between(a,b,c)||between(a,b,d)||between(c,d,a)||between(c,d,b))return false;
 }
 return true;
}
