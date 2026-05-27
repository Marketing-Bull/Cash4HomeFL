#!/usr/bin/env python3
"""
Cash4HomeFL — Image Generation Script

Generates AI images for the Cash4HomeFL website using OpenAI's DALL-E 3 API.
Saves images to /public/images/[category]/ and writes a manifest.

Usage:
    python scripts/generate-site-images.py homepage
    python scripts/generate-site-images.py city west-palm-beach
    python scripts/generate-site-images.py county palm-beach-county
    python scripts/generate-site-images.py situation foreclosure
    python scripts/generate-site-images.py blog selling-inherited-house-florida
    python scripts/generate-site-images.py all          # generate everything in manifest

Requirements:
    OPENAI_API_KEY env var, or have user provide key interactively.

Install deps:
    pip install openai pillow requests
"""

import argparse
import base64
import json
import os
import sys
import textwrap
from datetime import datetime
from pathlib import Path

# ── API Setup ────────────────────────────────────────────────────────────────

def get_openai_client():
    """Return OpenAI client, prompting user if key not found."""
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("ERROR: OPENAI_API_KEY not set.")
        print("  Set it with:  export OPENAI_API_KEY=sk-...")
        print("  Or pass --api-key on the command line.")
        sys.exit(1)
    try:
        from openai import OpenAI
        return OpenAI(api_key=api_key)
    except ImportError:
        print("ERROR: openai package not installed.")
        print("  Install with:  pip install openai")
        sys.exit(1)


def generate_image(client, prompt: str, output_path: Path, size: str = "1024x1024") -> bool:
    """Generate one image via DALL-E 3 and save to output_path. Returns True on success."""
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size=size,
            quality="standard",
            n=1,
        )
        image_url = response.data[0].url

        # Download and save
        import requests
        img_data = requests.get(image_url, timeout=60)
        img_data.raise_for_status()
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_bytes(img_data.content)
        print(f"  ✓ Saved: {output_path}")
        return True

    except Exception as e:
        print(f"  ✗ Failed: {e}")
        return False


# ── Image Prompts ──────────────────────────────────────────────────────────

PROMPTS = {

    # ── Homepage ──────────────────────────────────────────────────────────
    "homepage-hero": {
        "prompt": (
            "A beautiful single-family home in Palm Beach County Florida, golden hour warm light, "
            "professional real estate photography, lush palm trees in the yard, clean well-maintained exterior, "
            "magazine-quality, ultra-realistic, no text, no people, shot from a slight angle"
        ),
        "size": "1792x1024",
        "desc": "Homepage hero — South Florida home exterior, golden hour",
    },
    "homepage-how-it-works": {
        "prompt": (
            "Clean minimalist infographic on pure white background showing 3 steps: "
            "Step 1: House icon with document — 'Tell us about your property'. "
            "Step 2: House icon with dollar sign — 'Receive your cash offer'. "
            "Step 3: House icon with handshake — 'Close on your timeline'. "
            "Each step has a small numbered circle in brand blue #1D4ED8. "
            "Clean sans-serif text labels. Flat vector illustration style. No photographs."
        ),
        "size": "1024x1024",
        "desc": "How it works — 3-step process infographic",
    },
    "homepage-comparison": {
        "prompt": (
            "Two-panel flat vector illustration on white background. "
            "Left panel: a house with a 'For Sale' sign, a long winding arrow labeled '60–90+ days', "
            "icons showing a crossed-out dollar sign (commissions), crossed-out paint brush (repairs), "
            "crossed-out calendar (timeline). "
            "Right panel: the same house with a handshake icon and a short arrow labeled '7–30 days', "
            "single large checkmark labeled 'No repairs · No fees · No commission'. "
            "Bold brand blue #1D4ED8 used for accents. Clean, modern, professional. No photographs."
        ),
        "size": "1024x512",
        "desc": "Cash sale vs. traditional listing comparison graphic",
    },
    "homepage-stats": {
        "prompt": (
            "Bold typographic poster on pure white background. "
            "Large text 'We Buy Houses Cash' in weight 800 sans-serif, dark navy color. "
            "Below: 'Serving Palm Beach County + Broward County Florida' in regular weight. "
            "In the background: subtle silhouette of palm trees and a house outline in very light gray. "
            "Clean, minimal, print-quality. No photographs. No actual people."
        ),
        "size": "1024x512",
        "desc": "Brand stats poster — 'We Buy Houses Cash'",
    },

    # ── City Pages ──────────────────────────────────────────────────────────
    "city-hero": {
        "prompt": (
            "Aerial view of a Florida city neighborhood at golden hour, residential houses, "
            "palm trees, clean suburban streets, intracoastal waterway visible, "
            "warm South Florida light, ultra-realistic drone photography style. No text. No people."
        ),
        "size": "1792x1024",
        "desc": "City page hero — aerial neighborhood view",
    },
    "city-before-after": {
        "prompt": (
            "Split screen: left half shows a dated Florida home with overgrown yard, peeling exterior paint, "
            "broken window, deferred maintenance visible — right half shows the exact same home fully "
            "renovated with fresh paint, clean landscaping, new roof. "
            "Clean white vertical divider line in center. Photo-realistic. No text."
        ),
        "size": "1024x512",
        "desc": "Before/after split — as-is purchase illustration",
    },
    "city-situation": {
        "prompt": (
            "Editorial-style photograph of a Florida rental property with a tenant moving out, "
            "cardboard boxes on the front porch, warm South Florida afternoon light, "
            "suburban neighborhood with palm trees, realistic photography, candid and natural. No text."
        ),
        "size": "1024x768",
        "desc": "Rental property situation — tenant moving out",
    },
    "city-stats": {
        "prompt": (
            "Bold typographic graphic: large number '21' in weight 800 sans-serif, brand blue #1D4ED8. "
            "Below: 'Days to Close' in regular weight dark navy. "
            "Small house icon to the right of the number. "
            "Clean white background, minimal, print-quality poster style. No photographs."
        ),
        "size": "1024x512",
        "desc": "Stats graphic — 21 days to close",
    },
    "city-map": {
        "prompt": (
            "Clean flat vector map of Palm Beach County Florida, cities marked with small blue dots "
            "labeled West Palm Beach, Boca Raton, Boynton Beach, Delray Beach, Lake Worth. "
            "Waterways shown in very light blue. Atlantic Ocean on the east edge. "
            "Brand blue #1D4ED8 used for dots and labels. White background. Minimalist style. No text labels other than city names."
        ),
        "size": "1024x1024",
        "desc": "Palm Beach County service area map",
    },

    # ── County Pages ──────────────────────────────────────────────────────
    "county-aerial": {
        "prompt": (
            "Aerial photograph of Palm Beach County and Broward County Florida coastline from above, "
            "showing residential neighborhoods, Intracoastal Waterway, Atlantic Ocean on the right, "
            "downtown high-rises in the distance, golden hour warm light, ultra-realistic. No text. No people."
        ),
        "size": "1792x1024",
        "desc": "County aerial — Palm Beach + Broward from above",
    },
    "county-map": {
        "prompt": (
            "Clean flat vector map of Palm Beach County and Broward County Florida. "
            "Major cities marked with brand blue dots labeled West Palm Beach, Boca Raton, Fort Lauderdale, "
            "Hollywood, Coral Springs, Pembroke Pines. "
            "Waterways in light blue, ocean on east. "
            "Brand blue #1D4ED8 for highlights. White background. Minimalist. No street names."
        ),
        "size": "1024x1024",
        "desc": "Service area map — PBC + Broward vector",
    },
    "county-stats": {
        "prompt": (
            "Bold typographic poster on white background. "
            "Large number '150+' in weight 800 sans-serif, brand blue #1D4ED8. "
            "Below: 'Deals Closed in South Florida' in regular dark navy. "
            "Small house outline icon in light gray behind the number. "
            "Clean minimal style. No photographs."
        ),
        "size": "1024x512",
        "desc": "County stats — deals closed number graphic",
    },
    "county-why-local": {
        "prompt": (
            "Split panel illustration: left side shows a generic faceless corporation building "
            "with 'Out of State' text below — right side shows a warm handshake between a local "
            "Florida buyer and a smiling homeowner, palm trees in background, "
            "with text 'Local Buyer · Local Knowledge · Local Close' below. "
            "Clean flat vector, brand blue accents, white background. No photographs."
        ),
        "size": "1024x512",
        "desc": "Why local matters — local vs. faceless buyer comparison",
    },

    # ── Situation Pages ──────────────────────────────────────────────────
    "situation-hero-foreclosure": {
        "prompt": (
            "A South Florida suburban home with a notice of default sign partially visible in the yard, "
            "late afternoon warm light, realistic photography, slightly overcast sky suggesting worry, "
            "but the house itself is otherwise well-maintained. No text. No people."
        ),
        "size": "1792x1024",
        "desc": "Foreclosure hero — distressed home with notice",
    },
    "situation-hero-damaged": {
        "prompt": (
            "A Florida home showing visible storm damage — partial roof damage, boarded window, "
            "scattered debris in yard, warm South Florida light, realistic photography. "
            "The damage is clear but not sensationalized. No text. No people."
        ),
        "size": "1792x1024",
        "desc": "Damaged home hero — storm/fire/mold damage",
    },
    "situation-hero-probate": {
        "prompt": (
            "A dignified Florida home with a 'For Sale by Owner' sign, afternoon light, "
            "clean suburban neighborhood, palm trees, tasteful and respectful, not dramatic. "
            "Suggesting an estate sale situation. No text. No people."
        ),
        "size": "1792x1024",
        "desc": "Probate hero — estate home exterior",
    },
    "situation-hero-divorce": {
        "prompt": (
            "A Florida marital home exterior, clean and well-maintained but showing signs of an empty nest — "
            "two cars in driveway, warm afternoon light, suburban neighborhood, "
            "photography that suggests transition without being dramatic. No text. No people."
        ),
        "size": "1792x1024",
        "desc": "Divorce hero — marital home in transition",
    },
    "situation-hero-rental": {
        "prompt": (
            "A Florida investment property with a tenant moving out — cardboard boxes on the porch, "
            "a moving truck in the street, warm afternoon light, realistic candid photography. "
            "Property is a dated but solid single-family home. No text. No people."
        ),
        "size": "1792x1024",
        "desc": "Rental hero — tenant-occupied property",
    },
    "situation-before-after-damaged": {
        "prompt": (
            "Split screen: left shows a storm-damaged Florida home with partial roof damage and boarded windows — "
            "right shows the same home after a clean cash purchase, ready for renovation, "
            "clean and cleared. White divider line. Photo-realistic. No text."
        ),
        "size": "1024x512",
        "desc": "Damaged home before/after split",
    },
    "situation-skip-repairs": {
        "prompt": (
            "Minimalist illustration: a Florida house icon with a large red X over a paint roller and hammer, "
            "text below reads 'Skip the Repairs'. "
            "Clean white background, brand blue #1D4ED8 for the house icon, red for the X. "
            "Flat vector style, no photographs."
        ),
        "size": "1024x512",
        "desc": "Skip repairs illustration — as-is sale",
    },
    "situation-stop-foreclosure": {
        "prompt": (
            "Bold typographic poster: text 'Stop Foreclosure' in weight 800 sans-serif, dark navy, "
            "with a small house icon and a shield graphic. "
            "Subtext 'Sell your Florida home before it's too late' in regular weight. "
            "Clean white background, brand blue #1D4ED8 for the shield icon. Minimal print style. No photographs."
        ),
        "size": "1024x512",
        "desc": "Stop foreclosure — urgency stats graphic",
    },

    # ── FAQ ──────────────────────────────────────────────────────────────
    "faq-header": {
        "prompt": (
            "Clean minimal illustration on white background: a simple line drawing of a house outline "
            "with a question mark inside it, surrounded by 4 small icons — calendar, dollar sign, "
            "handshake, and house key — all in brand blue #1D4ED8. "
            "Flat vector, minimalist. No photographs."
        ),
        "size": "1024x512",
        "desc": "FAQ header illustration — house with question mark",
    },
    "faq-no-fees": {
        "prompt": (
            "Minimalist icon set on white background: a house icon with a large green checkmark beside it, "
            "surrounded by small crossed-out icons for: commission percentage, repair bill, staging cost, "
            "closing costs. All in flat vector, muted professional colors with green for the check. "
            "Brand blue #1D4ED8 accents. No photographs."
        ),
        "size": "1024x512",
        "desc": "FAQ trust illustration — no fees, no commissions",
    },

    # ── Reviews ───────────────────────────────────────────────────────────
    "reviews-header": {
        "prompt": (
            "A clean collage-style layout on white background: 4 circular photo frames arranged in a row, "
            "each containing a diverse smiling person (ages 30s–60s, diverse ethnicities), "
            "warm natural lighting, no text inside frames. "
            "Below each circle: a 5-pointed gold star. "
            "Subtle palm tree silhouettes in very light gray in the background. "
            "Clean, professional, trustworthy feel. No actual text. Ultra-realistic portraits."
        ),
        "size": "1024x512",
        "desc": "Reviews header — seller photo collage with stars",
    },
    "reviews-map": {
        "prompt": (
            "Clean flat vector map of Palm Beach County and Broward County Florida. "
            "Pins marked at: West Palm Beach, Boca Raton, Boynton Beach, Delray Beach, "
            "Fort Lauderdale, Hollywood, Coral Springs. "
            "Pins are in brand blue #1D4ED8. White background. Minimalist. City names in small gray text. No other text."
        ),
        "size": "1024x1024",
        "desc": "Reviews page — cities map with seller pins",
    },
    "reviews-verified-badge": {
        "prompt": (
            "A clean verified review badge: large star icon in gold/yellow, below it text "
            "'Verified Seller Reviews' in bold sans-serif, all on a white rounded rectangle "
            "with a subtle brand blue #1D4ED8 border. Flat vector. No photographs. 2D only."
        ),
        "size": "512x512",
        "desc": "Verified reviews badge — star + text",
    },

    # ── Blog ─────────────────────────────────────────────────────────────
    "blog-seller-story": {
        "prompt": (
            "Editorial photograph: a diverse woman in her 40s holding a set of new house keys and "
            "an envelope with a check visible, smiling confidently, standing in front of a "
            "clean well-maintained Florida home, warm afternoon light, candid but professional. No text."
        ),
        "size": "1024x768",
        "desc": "Blog seller story — keys and offer letter",
    },
    "blog-inherited-house": {
        "prompt": (
            "Editorial photograph: a person going through a cardboard box of old family photographs "
            "in an inherited Florida living room with afternoon light streaming through curtained windows, "
            "sentimental but not sad, warm tones, realistic photography. No text. No people other than the subject."
        ),
        "size": "1024x768",
        "desc": "Blog inherited house — going through family photos",
    },

    # ── Contact ─────────────────────────────────────────────────────────
    "contact-header": {
        "prompt": (
            "Warm editorial photograph of a clean well-maintained South Florida suburban neighborhood, "
            "golden hour light, palm trees and suburban homes, inviting and trustworthy feel, "
            "professional real estate photography. No text. No people."
        ),
        "size": "1792x1024",
        "desc": "Contact page header — welcoming FL neighborhood",
    },
    "contact-cta-graphic": {
        "prompt": (
            "Clean flat vector illustration: a phone icon and an email icon side by side, "
            "below them display text '(561) 220-9399' and 'hello@cash4homefl.com' in clean sans-serif. "
            "Small house icon above the phone. "
            "Brand blue #1D4ED8 for icons and text. White background. Minimalist. No photographs."
        ),
        "size": "1024x512",
        "desc": "Contact CTA — phone and email graphic",
    },
    "contact-service-map": {
        "prompt": (
            "Clean flat vector map focused on Palm Beach County and Broward County Florida. "
            "The two counties are filled with brand blue #1D4ED8 at low opacity (0.15) "
            "with a solid brand blue border. Cities shown as small dots. "
            "A large brand blue checkmark in the center of the map. "
            "Text below map reads 'Proudly Serving Palm Beach + Broward Counties'. "
            "White background. Minimalist. Clean."
        ),
        "size": "1024x768",
        "desc": "Contact service area map — PBC + Broward highlighted",
    },
}


# ── Manifest ────────────────────────────────────────────────────────────────

MANIFEST = {
    "homepage": {
        "images": ["homepage-hero", "homepage-how-it-works", "homepage-comparison", "homepage-stats"],
    },
    "city": {
        "images": ["city-hero", "city-before-after", "city-situation", "city-stats", "city-map"],
    },
    "county": {
        "images": ["county-aerial", "county-map", "county-stats", "county-why-local"],
    },
    "situation": {
        "images": [
            "situation-hero-foreclosure",
            "situation-hero-damaged",
            "situation-hero-probate",
            "situation-hero-divorce",
            "situation-hero-rental",
            "situation-before-after-damaged",
            "situation-skip-repairs",
            "situation-stop-foreclosure",
        ],
    },
    "faq": {
        "images": ["faq-header", "faq-no-fees"],
    },
    "reviews": {
        "images": ["reviews-header", "reviews-map", "reviews-verified-badge"],
    },
    "blog": {
        "images": ["blog-seller-story", "blog-inherited-house"],
    },
    "contact": {
        "images": ["contact-header", "contact-cta-graphic", "contact-service-map"],
    },
}


# ── Output path resolver ─────────────────────────────────────────────────────

def resolve_output(name: str, category: str, base: Path) -> Path:
    """Return Path for an image named `name` in `category`."""
    slug_map = {
        "homepage": "homepage",
        "city": "city",
        "county": "county",
        "situation": "situation",
        "faq": "faq",
        "reviews": "reviews",
        "blog": "blog",
        "contact": "contact",
    }
    subdir = slug_map.get(category, category)
    return base / "public" / "images" / subdir / f"{name}.png"


# ── CLI ─────────────────────────────────────────────────────────────────────

def cmd_generate(category: str, specific: str | None, api_key: str | None) -> None:
    if api_key:
        os.environ["OPENAI_API_KEY"] = api_key

    client = get_openai_client()
    base = Path(__file__).parent.parent.resolve()

    if category == "all":
        targets = [(k, v["images"]) for k, v in MANIFEST.items()]
    else:
        if category not in MANIFEST:
            print(f"Unknown category: {category}")
            print(f"Available: {', '.join(MANIFEST.keys())}")
            sys.exit(1)
        images = MANIFEST[category]["images"]
        targets = [(category, images)]

    results = []
    for cat, image_keys in targets:
        print(f"\n[{cat.upper()}]")
        for key in image_keys:
            if key not in PROMPTS:
                print(f"  ! No prompt defined for '{key}' — skipping")
                continue
            info = PROMPTS[key]
            out_path = resolve_output(key, cat, base)
            print(f"  Generating: {info['desc']}")
            success = generate_image(client, info["prompt"], out_path, info.get("size", "1024x1024"))
            results.append({"key": key, "category": cat, "path": str(out_path), "success": success})

    # Write manifest
    manifest_path = base / "public" / "images" / "manifest.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)

    existing = {}
    if manifest_path.exists():
        existing = json.loads(manifest_path.read_text())

    for r in results:
        if r["success"]:
            existing.setdefault(r["category"], {})[r["key"]] = {
                "path": r["path"],
                "generated_at": datetime.now().isoformat(),
            }

    manifest_path.write_text(json.dumps(existing, indent=2))
    print(f"\nManifest written: {manifest_path}")

    # Summary
    passed = sum(1 for r in results if r["success"])
    failed = sum(1 for r in results if not r["success"])
    print(f"\nDone: {passed} succeeded, {failed} failed.")


def cmd_list() -> None:
    """List all available image prompts."""
    print("Available image generation targets:\n")
    for cat, data in MANIFEST.items():
        print(f"  [{cat}]")
        for key in data["images"]:
            if key in PROMPTS:
                print(f"    {key}: {PROMPTS[key]['desc']}")
            else:
                print(f"    {key}: (no prompt defined)")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Cash4HomeFL image generator — DALL-E 3",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent("""
          Examples:
            python scripts/generate-site-images.py homepage
            python scripts/generate-site-images.py city west-palm-beach
            python scripts/generate-site-images.py situation foreclosure
            python scripts/generate-site-images.py all
            python scripts/generate-site-images.py --list
        """),
    )
    parser.add_argument(
        "category",
        nargs="?",
        help="Category to generate: homepage, city, county, situation, faq, reviews, blog, contact, all",
    )
    parser.add_argument("specific", nargs="?",
                        help="Optional: city slug, situation slug, or blog slug (used in output paths)")
    parser.add_argument("--api-key", help="OpenAI API key (or set OPENAI_API_KEY env var)")
    parser.add_argument("--list", "-l", action="store_true",
                        help="List all available image targets and exit")

    args = parser.parse_args()

    if args.list or (not args.category):
        cmd_list()
        return

    cmd_generate(args.category, args.specific, args.api_key)


if __name__ == "__main__":
    main()
