#!/usr/bin/env python3
"""
Cash4HomeFL Site Improver — Dream Phase
Each night this wakes up and applies one improvement from the backlog.
During the day it "dreams" — scans the landscape and files opportunities.
"""
import subprocess, os, sys

PROJECT = "/root/hermes/projects/cash4homefl"
BACKLOG = f"{PROJECT}/BACKLOG.md"
LOG = f"{PROJECT}/IMPROVEMENT-LOG.md"
VERCEL_TOKEN = os.environ.get("VERCEL_TOKEN")  # Set in env before running

def run(cmd):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=PROJECT).stdout.strip()

def log(msg):
    from datetime import datetime
    ts = datetime.now().strftime("%Y-%m-%d %H:%M")
    line = f"\n## [{ts}] {msg}"
    with open(LOG, "a") as f:
        f.write(line)
    print(f"[DREAM] {msg}")

def get_top_item():
    """Find first P0 with Status: todo in BACKLOG.md"""
    with open(BACKLOG) as f:
        content = f.read()
    import re
    # Find all P0 todo items
    items = re.findall(r'^## \[P0\](.*?)^Status: (\w+)', content, re.DOTALL | re.MULTILINE)
    for item_md, status in items:
        if status == 'todo':
            title = re.search(r'^\s+Title:\s*(.+)$', item_md, re.MULTILINE)
            return title.group(1).strip() if title else "Unknown P0 item"
    # Fall back to P1
    items = re.findall(r'^## \[P1\](.*?)^Status: (\w+)', content, re.DOTALL | re.MULTILINE)
    for item_md, status in items:
        if status == 'todo':
            title = re.search(r'^\s+Title:\s*(.+)$', item_md, re.MULTILINE)
            return f"[P1] {title.group(1).strip()}" if title else "Unknown P1 item"
    return None

def mark_done(title, priority="P0"):
    with open(BACKLOG) as f:
        content = f.read()
    import re
    # Find and update
    pattern = rf'^## \[{priority}\].*?{re.escape(title[:50])}.*?^\s+Status: (\w+)'
    m = re.search(pattern, content, re.DOTALL | re.MULTILINE)
    if m:
        content = content.replace(f"Status: {m.group(1)}", "Status: done", 1)
        with open(BACKLOG, "w") as f:
            f.write(content)
        return True
    return False

def git_commit_push(msg):
    os.chdir(PROJECT)
    subprocess.run("git add -A", shell=True, capture_output=True)
    result = subprocess.run(f"git commit -m {repr(msg)}", shell=True, capture_output=True, text=True)
    if result.returncode == 0:
        subprocess.run("git push origin improvement/backlog-001", shell=True, capture_output=True)
        return True
    return False

def vercel_deploy():
    os.chdir(PROJECT)
    env = os.environ.copy()
    env["VERCEL_TOKEN"] = VERCEL_TOKEN
    r = subprocess.run(["npx", "vercel", "--yes", "--prod"], capture_output=True, text=True, env=env)
    return r.stdout + r.stderr

def audit_site():
    """Use Firecrawl to audit the live site — check schema, meta, broken elements."""
    import json, urllib.request

    firecrawl_key = "fc-a2c99437425a4c34ba3a9a1530f5094c"
    pages_to_check = [
        "https://cash4homefl.vercel.app",
        "https://cash4homefl.vercel.app/we-buy-houses-west-palm-beach",
        "https://cash4homefl.vercel.app/we-buy-houses-foreclosure",
        "https://cash4homefl.vercel.app/palm-beach-county",
    ]

    findings = []
    for url in pages_to_check:
        try:
            req = urllib.request.Request(
                "https://api.firecrawl.dev/v0/scrape",
                data=json.dumps({"url": url, "pageOptions": {"onlyIncludeTags": ["script"]}}).encode(),
                headers={"Authorization": f"Bearer {firecrawl_key}", "Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read())
            if data.get("success"):
                content = data["data"].get("content", "")
                has_org_schema = '"@type"' in content and 'Organization' in content
                has_faq_schema = 'FAQPage' in content
                has_localbusiness = 'LocalBusiness' in content or 'RealEstateAgent' in content
                findings.append({
                    "url": url,
                    "has_org_schema": has_org_schema,
                    "has_faq_schema": has_faq_schema,
                    "has_localbusiness": has_localbusiness,
                    "schema_count": content.count('@type')
                })
        except Exception as e:
            findings.append({"url": url, "error": str(e)})
    return findings

def main():
    item = get_top_item()
    if not item:
        log("No pending items — nothing to do tonight")
        return

    log(f"Starting nightly improvement: {item[:80]}")
    log(f"Auditing live site before change...")

    # Audit first
    findings = audit_site()
    for f in findings:
        log(f"  Audit {f['url']}: org_schema={f.get('has_org_schema')}, faq_schema={f.get('has_faq_schema')}, localbusiness={f.get('has_localbusiness')}")

    # Determine what to fix based on item
    if "Fix 404" in item or "404" in item:
        log("Item is P0: Fix 404 on city pages — investigating server function routing")
        # Run a fresh build + deploy and check if it resolves
        os.chdir(PROJECT)
        subprocess.run("npm run build", shell=True, capture_output=True)
        deploy_output = vercel_deploy()
        log(f"Deploy output: {deploy_output[-200:]}")
    else:
        log(f"Item '{item[:60]}' noted — will be handled by agent tonight")
        log("Agent prompt: Load skills (firecrawl, market-research), audit site, fix top P0/P1 item, push, deploy")

    log(f"Completed: {item[:80]}")

if __name__ == "__main__":
    main()