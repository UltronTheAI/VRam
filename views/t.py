import requests, json

code = requests.get('http://worldtimeapi.org/api/timezone/Asia/Kolkata')

res = code.text
res = json.loads(str(res))

print(res['utc_offset'].replace('+', '').replace(':', ',').split(','))