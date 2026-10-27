"""Extract the 25 NPC blocks (printed pp. 244–255) from the user's P5 PDF.
Usage: python scripts/extract-npc-templates.py /path/to/P5.pdf
Requires PyMuPDF. Does not include purchase footers, artwork or the PDF itself.
"""
import sys,re,json
from pathlib import Path
import fitz

def clean_text(page,rect):
    lines=[]
    for block in page.get_text('dict',clip=rect)['blocks']:
        for line in block.get('lines',[]):
            spans=[s for s in line['spans'] if not(15.9<s['size']<16.1 and s['font']=='StolzlDisplay-Regular')]
            if spans:lines.append((line['bbox'][1],line['bbox'][0],''.join(s['text'] for s in spans).strip()))
    return '\n'.join(t for _,__,t in sorted(lines) if t and '@' not in t)

attrs={'FOR':'force','AGI':'agilite','VOL':'volonte','LOG':'logique','CHA':'charisme'}
ids=['ganger','ganger-elite','ganger-eveille','ganger-adepte','ganger-decker','go-ganger-rigger','agent-securite','officier-securite','mage-securite','decker-securite','adepte-securite','rigger-securite','medecin-combat','mage-elite','officier-elite','adepte-elite','rigger-elite','militaire','decker-elite','commando','johnson','employe','enqueteur','cadre','coyote']
roles=['rue']*6+['securite']*6+['soins','magie','securite','securite','technique','militaire','technique','militaire','corporation','corporation','securite','corporation','rue']
head=lambda s:s in ['COMPÉTENCES','ATOUTS','ARMES','SORTS','ÉQUIPEMENT'] or 'ATOUT' in s and (('CHOIX' in s) or s.startswith('RIGGER')) or 'COMPÉTENCE ET SPÉCIALISATION' in s or s.startswith('SEUILS DE BLESSURES')
profiles=[];doc=fitz.open(sys.argv[1])
for i in range(1,13):
    pg=doc[i];headers=[]
    for b in pg.get_text('dict')['blocks']:
        for l in b.get('lines',[]):
            for s in l['spans']:
                if 15.9<s['size']<16.1 and s['font']=='StolzlDisplay-Regular':headers.append((s['bbox'][1],s['bbox'][3],s['text'].strip()))
    headers.sort();left=71 if i%2 else 43;mid=319 if i%2 else 291;right=565 if i%2 else 550
    for index,(top,bottom,title) in enumerate(headers):
        end=headers[index+1][0]-3 if index+1<len(headers) else 730
        a=clean_text(pg,fitz.Rect(left-1,bottom,mid-7,end));b=clean_text(pg,fitz.Rect(mid-1,top,right,end))
        words=pg.get_text('words',clip=fitz.Rect(left-1,bottom,mid-7,min(end,bottom+90)))
        labels=sorted([w for w in words if w[4] in attrs],key=lambda w:w[0]);values={}
        assert len(labels)==5,(title,labels)
        for j,label in enumerate(labels):
            x0=left if j==0 else (labels[j-1][0]+labels[j-1][2]+label[0]+label[2])/4
            x1=mid-7 if j==4 else (labels[j+1][0]+labels[j+1][2]+label[0]+label[2])/4
            raw=pg.get_text('text',clip=fitz.Rect(x0,label[3],x1,label[3]+42),sort=True).strip()
            values[attrs[label[4]]]={'base':int(re.search(r'\d+',raw)[0]),**{m.group(2):int(m.group(1)) for m in re.finditer(r'(\d+)\s*\((orks|trolls|nains|elfes)\)',raw)}}
        sections=[];current=None
        for line in (a+'\n'+b).splitlines():
            line=re.sub(r'\s+',' ',line).strip()
            if head(line):
                current={'heading':line,'items':[]};sections.append(current)
            elif current:
                if line.startswith(('•','◊')):current['items'].append({'kind':'specialization' if line[0]=='◊' else 'bullet','text':line[1:].strip()})
                elif current['items']:current['items'][-1]['text']+=' '+line
        n=len(profiles);profiles.append({'id':ids[n],'name':title[0]+title[1:].lower(),'page':243+i,'occupation':roles[n],'attributes':values,'sections':sections})
assert len(profiles)==25
out=Path(__file__).resolve().parent.parent/'npc-templates.js'
out.write_text('// Source: Shadowrun: Anarchy V2, printed pp. 244–255, supplied by the user.\nexport const npcTemplates='+json.dumps(profiles,ensure_ascii=False,indent=1)+';\n')
print('25 NPC templates extracted without document footers.')
