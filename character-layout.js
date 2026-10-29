import {skillVariants} from './sheet.js?v=0.28.0';
import {isCharacterAsset} from './catalog.js?v=0.28.0';
import {characterAssetSummary} from './character-rules.js?v=0.28.0';
export function characterSkillLines(profile){
 const lines=[];let count=0;
 for(const [index,row] of (profile.skillRows??[]).entries()){
  const variants=skillVariants(row,profile),group=[{index,kind:'base'},...(variants.length?variants.map(variant=>({index,kind:'specialization',variant})):[{index,kind:'add'}])];
  for(const line of group){if(count<38)lines.push({...line,y:142.2+count*8.504,height:8.1});count++;}
 }
 return {lines,overflow:count>38};
}
export const assetRowStep=17.008;
let effectContext;
export function wrapAssetEffects(text,measure){
 if(!measure&&typeof document!=='undefined'){effectContext??=document.createElement('canvas').getContext('2d');if(effectContext){effectContext.font='400 6.00945px Arial';measure=value=>effectContext.measureText(value).width;}}
 measure??=value=>[...value].reduce((n,c)=>n+(/\s/.test(c)?1.7:/[WM@]/.test(c)?5:3.1),0);
 const lines=[];
 for(const paragraph of text.split('\n').filter(line=>line.trim())){
  let line='';for(const word of paragraph.trim().split(/\s+/)){
   if(measure((line?line+' ':'')+word)<=313){line+=(line?' ':'')+word;continue;}
   if(line){lines.push(line);line='';}
   for(const c of word){if(line&&measure(line+c)>313){lines.push(line);line='';}line+=c;}
  }if(line)lines.push(line);
 }
 return lines;
}
export function characterAssetLines(profile,{measure}={}){
 const lines=[];let slot=0,overflow=false;
 for(const [index,row] of (profile.assetRows??[]).entries()){
  if(!isCharacterAsset(row))continue;
  const effects=characterAssetSummary(row),wrapped=wrapAssetEffects(effects,measure),needed=1+wrapped.length;
  if(slot>=35){overflow=true;continue;}
  const slots=Math.min(needed,35-slot),shown=wrapped.slice(0,slots-1);
  if(slots<needed){overflow=true;if(shown.length)shown[shown.length-1]='… suite dans les compléments';}
  lines.push({index,row,y:39.1+slot*assetRowStep,height:slots*assetRowStep,effects,display:shown.join('\n'),effectLines:shown});slot+=slots;
 }
 return {lines,overflow};
}
