#!/usr/bin/env python3

import os
import json

from datetime import datetime
from string import Template

class Builder():
    def __init__(self):
        self.project_root = os.path.dirname(os.path.dirname(__file__))
        self.source_root = f"{self.project_root}/builder/src"
        self.site_root = f"{self.project_root}/site"
        self.color_data_path = f"{self.source_root}/color-data.json"
        self.parts = {}
        self.palettes = {}
        self.palettes_list = []

    def load_template(self):
        with open(f"{self.source_root}/TEMPLATE.html") as _template:
            self.template = _template.read()

    def build_content(self):
        # Make dynamic content here
        # self.parts['CONTENT'] = "the quick brown fox"
        pass

    def load_color_data(self):
        color_list = []
        with open(self.color_data_path) as _cd:
            json_in = json.load(_cd)
            raw_palettes = json_in['data']
            counter = 0
            for raw_palette in raw_palettes:
                colors = []
                for i in range(0,4):
                    colors.append(
                        raw_palette['colors'][i]['hex']
                    )

                color_item = [
                    '<div class="palette-wrapper">',
                    f'''<button style="background-color: {colors[0]}; color: {colors[3]}" id="palette-{raw_palette['name']}" class="palette-name" data-palette="{counter}">''', 
                    raw_palette['name'],
                    '</button><br />'
                ]

                order = [0, 3, 1, 2]
                for i in order:
                    hex_string = raw_palette['colors'][i]['hex']
                    color_item.append(
                        f'''<button class="color-swatch" style="background-color: {hex_string}" data-palette="{counter}">&nbsp;</button>'''
                    )

                self.palettes[raw_palette['name']] = colors 
                self.palettes_list.append({"name": raw_palette['name'], "colors": colors })

                color_item.append('</div>')
                color_list.append("".join(color_item))
                counter += 1

        # print(self.palettes)
        self.parts['JS_DATA'] = f"const palettes = {json.dumps(self.palettes_list)}"
        self.parts['COLORS'] = "\n".join(color_list)
        print(self.parts['COLORS'])

    def load_parts(self):
        for file_part in self.file_parts:
            with open(f"{self.source_root}/{file_part}") as _file_part:
                name_parts = file_part.split('.')
                self.parts[name_parts[0]] = _file_part.read()

    def output_file(self):
        with open(f"{self.site_root}/index.html", 'w') as _out:
            _out.write(self.template)

    def setup_arrangements(self):
        arrangements = []
        order_hack = [
            2, 0, 5,  3, 1, 4,
            23, 21, 19, 22, 20, 18,
            9, 11, 6, 8, 10, 7,
            15, 17, 12, 14, 16, 13, 
        ]
        # for i in range(0,24):
        for i in order_hack:
            arrangement = [f'<div id="color-arrangement-{i}" class="color-arrangement color-arrangement-inactive">']
            arrangement.append(f'<button id="swatch--{i}--0" class="color-arrangement-swatch-0" data-arrangement="{i}">&nbsp;</button>')
            arrangement.append(f'<button id="swatch--{i}--3" class="color-arrangement-swatch-3" data-arrangement="{i}">&nbsp;</button>')
            arrangement.append(f'<button id="swatch--{i}--1" class="color-arrangement-swatch-1" data-arrangement="{i}">&nbsp;</button>')
            arrangement.append(f'<button id="swatch--{i}--2" class="color-arrangement-swatch-2" data-arrangement="{i}">&nbsp;</button>')
            arrangement.append('</div>')
            arrangements.append("\n".join(arrangement))
        self.parts['ARRANGEMENTS'] = "\n".join(arrangements)

    def make_page(self, template_path, output_path, data):
        with open(template_path) as _template:
            template = Template(_template.read())
            with open(output_path, 'w') as _output:
                _output.write(
                    template.substitute(data)
                )

if __name__ == "__main__":
    b = Builder()
    b.load_template()
    b.load_color_data()
    b.file_parts = ['HEAD.html', 'BODY.html', 'CSS.css', 'JS.js']
    b.load_parts()
    b.setup_arrangements()
    b.build_content()
    b.make_page(
        f"{b.source_root}/TEMPLATE.html",
        f"{b.site_root}/index.html",
        b.parts
    )

    print(f"## Completed Build: {datetime.now()}")
