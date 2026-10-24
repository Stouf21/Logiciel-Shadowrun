export const defaultColors={normal:'#45385f',risk:'#eeb600'};
export function validColors(value){return value&&/^#[0-9a-f]{6}$/i.test(value.normal)&&/^#[0-9a-f]{6}$/i.test(value.risk)&&value.normal.toLowerCase()!==value.risk.toLowerCase();}
export function diceTextColor(hex){
 const [r,g,b]=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
 const luminance=.2126*r+.7152*g+.0722*b;
 return (luminance+.05)/.05>=1.05/(luminance+.05)?'#000000':'#ffffff';
}
