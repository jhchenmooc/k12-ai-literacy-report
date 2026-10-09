from html.parser import HTMLParser
from pathlib import Path
import json

class Anchors(HTMLParser):
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            print(json.dumps({'tag': tag, 'attributes': attrs}))

for name in ['named-entity-Tab', 'named-entity-NewLine']:
    Anchors().feed((Path(__file__).parent / name / 'weekly/2026-10-09_10-15/index.html').read_text())
