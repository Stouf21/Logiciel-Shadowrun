"""Extract the identified book illustrations from the user's PDFs.

Usage: python scripts/extract-book-art.py /path/to/pdf-directory
Requires PyMuPDF and Pillow. No PDF, full page, caption text or customer footer
is copied into the application. Only raster illustration objects are read.
"""
import hashlib
import io
import json
import sys
from pathlib import Path

import fitz
from PIL import Image

root = Path(__file__).resolve().parents[1]
pdf_root = Path(sys.argv[1])
plan = json.loads((root / 'docs/BOOK_ART_SOURCES.json').read_text())
output = root / 'assets/book'
output.mkdir(parents=True, exist_ok=True)
documents = {}
page_numbers = {}
for part in {item['part'] for item in plan}:
    candidates = list(pdf_root.rglob('* ' + part + '.pdf'))
    if len(candidates) != 1:
        raise ValueError(f'Expected one PDF for {part}, found {len(candidates)}')
    document = fitz.open(candidates[0])
    documents[part] = document
    pages = {}
    for index, page in enumerate(document):
        for block in page.get_text('dict')['blocks']:
            if block['type'] != 0:
                continue
            for line in block['lines']:
                for span in line['spans']:
                    if span['text'].strip().isdigit() and span['size'] > 20 and span['bbox'][1] > 700:
                        pages[int(span['text'])] = index + 1
    page_numbers[part] = pages


def extract(document, xref):
    image = document.extract_image(xref)
    pixmap = fitz.Pixmap(document, xref)
    if pixmap.colorspace and pixmap.colorspace.n > 3:
        pixmap = fitz.Pixmap(fitz.csRGB, pixmap)
    if image['smask']:
        pixmap = fitz.Pixmap(pixmap, fitz.Pixmap(document, image['smask']))
    return Image.open(io.BytesIO(pixmap.tobytes('png'))).convert('RGBA')


result = []
for item in plan:
    document = documents[item['part']]
    pieces = [extract(document, xref) for xref in item['xrefs']]
    if item.get('join') == 'horizontal':
        if len({image.height for image in pieces}) != 1:
            raise ValueError('Unaligned source fragments: ' + item['id'])
        image = Image.new('RGBA', (sum(piece.width for piece in pieces), pieces[0].height))
        offset = 0
        for piece in pieces:
            image.paste(piece, (offset, 0))
            offset += piece.width
    else:
        if len(pieces) != 1:
            raise ValueError('Unexpected source list: ' + item['id'])
        image = pieces[0]
    if item.get('sourceCrop'):
        image = image.crop(tuple(item['sourceCrop']))
    bounds = image.getchannel('A').getbbox()
    if bounds is None:
        raise ValueError('Empty illustration: ' + item['id'])
    image = image.crop(bounds)
    name = item['id'] + '.png'
    path = output / name
    image.save(path, optimize=True)
    path.chmod(0o644)
    result.append({**item, 'legend': item.get('legend', item['name']),
                   'assetIds': item.get('assetIds', []),
                   'bookImage': name, 'width': image.width, 'height': image.height,
                   'pdfPage': page_numbers[item['part']][item['page']],
                   'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})

source = '// Illustrations extraites du livre fourni. Sources : docs/BOOK_ART_SOURCES.json.\n'
source += 'export const bookArtworks=' + json.dumps(result, ensure_ascii=False, indent=2) + ';\n'
source += "export const bookArtCredit='Illustrations : Benjamin Giletti · Shadowrun : Anarchy 2.0 · © 2026 The Topps Company, Inc. · Édition française : Black Book Éditions';\n"
(root / 'book-art-data.js').write_text(source)
print(f'{len(result)} illustrations extracted, {len(set(asset for item in result for asset in item["assetIds"]))} catalog references matched.')
