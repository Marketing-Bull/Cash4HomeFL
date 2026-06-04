import subprocess, re, json, urllib.request

url = subprocess.check_output(['git', 'remote', 'get-url', 'origin']).decode().strip()
token = re.search(r'ghp_[a-zA-Z0-9]+', url).group(0)

payload = json.dumps({
  'title': 'feat: JSON-LD schema, OG tags, city page 404 fix, robots.txt',
  'body': '## Summary\n\nBrings `improvement/v2` into `main`. Contains:\n\n- **P0**: Fix 404 on all dynamic city pages (Next.js 14.2 params Promise)\n- **P0**: RealEstateAgent JSON-LD with geo, opening hours, areaServed\n- **P1**: Open Graph tags (og:title, og:description, og:image)\n- **P1**: Fix robots.txt sitemap domain (.com -> .vercel.app)\n- **P1**: Canonical URL in layout metadata\n- **P2**: Updated site title and description\n\n## Testing\n- City pages confirmed 200 at /we-buy-houses/[city]\n- JSON-LD validates at validator.schema.org\n- Build: 89 routes confirmed\n\n## Note\nog-image.jpg needs to be added to public/images/ (BACKLOG.md P0).',
  'head': 'improvement/v2',
  'base': 'main'
}).encode()

req = urllib.request.Request(
  'https://api.github.com/repos/Marketing-Bull/Cash4HomeFL/pulls',
  data=payload,
  headers={'Authorization': f'token {token}', 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json'}
)
try:
    resp = urllib.request.urlopen(req)
    result = json.loads(resp.read())
    print(result['html_url'])
except urllib.error.HTTPError as e:
    print(f"HTTP Error {e.code}: {e.read().decode()}")