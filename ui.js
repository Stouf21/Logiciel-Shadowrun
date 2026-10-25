export const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const valueOrDash=value=>value===undefined||value===''?'—':escape(value);
export function searchDisclosure(id,html,{label='Rechercher et filtrer',expanded=false}={}){
 return `<div class="search-tools"><button type="button" class="search-toggle" aria-label="${escape(label)}" data-toggle-search="${escape(id)}" aria-controls="${escape(id)}" aria-expanded="${expanded}">${escape(label)}</button><div class="search-panel" id="${escape(id)}" ${expanded?'':'hidden'}>${html}</div></div>`;
}
export function toggleSearchDisclosure(event){
 const button=event.target.closest('[data-toggle-search]');if(!button)return false;
 const panel=document.getElementById(button.dataset.toggleSearch);if(!panel)return false;
 panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));
 if(!panel.hidden)panel.querySelector('input[type="search"]')?.focus();
 return true;
}
