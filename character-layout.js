import {skillVariants} from './sheet.js?v=0.27.0';
import {isCharacterAsset} from './catalog.js?v=0.27.0';
import {characterAssetEffects} from './character-rules.js?v=0.27.0';
export function characterSkillLines(profile){
 const lines=[];let count=0;
 for(const [index,row] of (profile.skillRows??[]).entries()){
  const variants=skillVariants(row,profile),group=[{index,kind:'base'},...(variants.length?variants.map(variant=>({index,kind:'specialization',variant})):[{index,kind:'add'}])];
  for(const line of group){if(count<38)lines.push({...line,y:142.2+count*8.504,height:8.1});count++;}
 }
 return {lines,overflow:count>38};
}
export function characterAssetLines(profile){
 const lines=[];let slot=0,overflow=false;
 for(const [index,row] of (profile.assetRows??[]).entries()){
  if(!isCharacterAsset(row))continue;
  const effects=characterAssetEffects(row),needed=effects?Math.max(1,Math.ceil((10+effects.split('\n').reduce((n,line)=>n+Math.max(1,Math.ceil(line.length/82)),0)*7.5)/17.008)):1;
  if(slot>=35){overflow=true;continue;}
  const slots=Math.min(needed,35-slot),limit=Math.max(50,Math.floor((slots*17.008-10)/7.5)*82),display=effects.length>limit?effects.slice(0,Math.max(0,limit-40))+'… (suite dans les compléments)':effects;
  lines.push({index,row,y:39.1+slot*17.008,height:slots*17.008,effects,display});slot+=slots;if(slots<needed||display!==effects)overflow=true;
 }
 return {lines,overflow};
}
