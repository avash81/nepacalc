import re
with open('index.js', encoding='utf-8') as f:
    text = f.read()

# find context around 'monthwisehistory'
idx = text.find('monthwisehistory')
if idx != -1:
    print('monthwisehistory context:')
    print(text[max(0, idx-100):min(len(text), idx+100)])

# find context around 'datewisehistory'
idx = text.find('datewisehistory')
if idx != -1:
    print('\ndatewisehistory context:')
    print(text[max(0, idx-100):min(len(text), idx+100)])

# find context around 'ratehistory'
idx = text.find('ratehistory')
if idx != -1:
    print('\nratehistory context:')
    print(text[max(0, idx-100):min(len(text), idx+100)])
