// Coordonnées en points du PDF fourni, pages 3 et 4 (faces en couleur).
export const sheetSize={width:600.945,height:779.528};
export const sheetSlots={skills:19,weapons:8,assets:35,vehicles:3,wounds:4};
export const rowStep=17.008;
export const skillLine=index=>({x:27.7,y:142.2+index*rowStep,width:326,height:16.4});
export const weaponLine=index=>({x:27.7,y:532.6+index*rowStep,width:326,height:16.4});
export const assetLine=index=>({x:255.1,y:39.1+index*rowStep,width:320,height:16.4});
export const vehicleTop=index=>218.66+index*182.665;
export const sheetBox=(x,y,width,height)=>`left:${x/sheetSize.width*100}%;top:${y/sheetSize.height*100}%;width:${width/sheetSize.width*100}%;height:${height/sheetSize.height*100}%;`;
