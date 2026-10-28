import {bookArtworks} from './book-art-data.js?v=0.26.2';
import {baseAssets} from './catalog-data.js?v=0.26.2';

const normalize=value=>String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const byId=new Map(bookArtworks.map(x=>[x.id,x]));
const assets=new Map(baseAssets.map(x=>[x.id,x]));
const byAsset=new Map();
const byName=new Map();
for(const art of bookArtworks){
 if(art.primary===false)continue;
 for(const id of art.assetIds)byAsset.set(id,art);
 for(const name of [art.name,...(art.matchNames??[]),...art.assetIds.map(id=>assets.get(id)?.name).filter(Boolean)])byName.set(normalize(art.category)+'|'+normalize(name),art);
}
export const bookArtworkById=id=>byId.get(id)??null;
export const bookArtworkPath=art=>'./assets/book/'+art.bookImage+'?v=0.26.2';
export const bookArtworkSource=art=>'Shadowrun : Anarchy 2.0 · p. '+(art.pages??[art.page]).join('–');
export function findBookArtwork(item,scope='asset'){
 if(scope==='asset'&&byAsset.has(item.id)){
  const source=assets.get(item.id);
  if(source&&normalize(source.name)===normalize(item.name)&&normalize(source.category)===normalize(item.category))return byAsset.get(item.id);
 }
 return byName.get(normalize(item.category)+'|'+normalize(item.name))??null;
}
export function bookArtworkMatches(art,query=''){
 return normalize([art.name,art.legend,art.category,art.page,...(art.aliases??[]),...(art.matchNames??[]),...art.assetIds.map(id=>assets.get(id)?.name).filter(Boolean)].join(' ')).includes(normalize(query));
}
