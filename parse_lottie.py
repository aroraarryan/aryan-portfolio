import json

with open('src/assets/HomeLoop.json', 'r') as f:
    data = json.load(f)

def find_colors(obj, colors=None):
    if colors is None:
        colors = set()
    if isinstance(obj, dict):
        if 'ty' in obj and obj['ty'] in ['fl', 'st']:
            if 'c' in obj and 'k' in obj['c']:
                k = obj['c']['k']
                if isinstance(k, list) and not isinstance(k[0], dict):
                    colors.add(tuple(k))
        for key, value in obj.items():
            find_colors(value, colors)
    elif isinstance(obj, list):
        for item in obj:
            find_colors(item, colors)
    return colors

colors = find_colors(data)
for c in colors:
    print(c)
