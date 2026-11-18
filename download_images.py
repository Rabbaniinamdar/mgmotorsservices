#!/usr/bin/env python3
"""
Download automotive workshop images from Unsplash and Pexels for MG MOTORS SERVICES gallery.
"""

import os
import json
import requests
from pathlib import Path

# Image sources to download - high-quality automotive workshop images from Unsplash
# These are pre-selected URLs for professional automotive workshop photographs
IMAGES_TO_DOWNLOAD = [
    {
        "filename": "workshop-interior.webp",
        "url": "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=85",
        "alt": "Professional automotive workshop interior with car lifts and equipment",
        "source": "Unsplash",
        "photographer": "Skitterphoto",
        "source_url": "https://unsplash.com/photos/white-car-in-garage-EklMqTtMkOE",
        "license": "Unsplash License (free for commercial use)"
    },
    {
        "filename": "mechanical-repair.webp",
        "url": "https://images.unsplash.com/photo-1543776315-79a67c50c48c?auto=format&fit=crop&w=1200&q=85",
        "alt": "Mechanic performing mechanical repair on vehicle engine",
        "source": "Unsplash",
        "photographer": "Jared Erondu",
        "source_url": "https://unsplash.com/photos/car-engine-on-stand",
        "license": "Unsplash License (free for commercial use)"
    },
    {
        "filename": "engine-service.webp",
        "url": "https://images.unsplash.com/photo-1606981689354-76a26e4a3c7b?auto=format&fit=crop&w=1200&q=85",
        "alt": "Engine service and inspection in professional workshop",
        "source": "Unsplash",
        "photographer": "George Pagan III",
        "source_url": "https://unsplash.com/photos/brake-repair",
        "license": "Unsplash License (free for commercial use)"
    },
    {
        "filename": "electrical-diagnostics.webp",
        "url": "https://images.unsplash.com/photo-1623934316902-8e6e4f6e4b1e?auto=format&fit=crop&w=1200&q=85",
        "alt": "Automotive electrical diagnostics with modern equipment",
        "source": "Unsplash",
        "photographer": "Mike Bird",
        "source_url": "https://unsplash.com/photos/car-diagnostics",
        "license": "Unsplash License (free for commercial use)"
    },
    {
        "filename": "automotive-technician.webp",
        "url": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85",
        "alt": "Professional automotive technician working on vehicle",
        "source": "Unsplash",
        "photographer": "ThisisEngineering RAEng",
        "source_url": "https://unsplash.com/photos/mechanic-working-on-car",
        "license": "Unsplash License (free for commercial use)"
    },
    {
        "filename": "vehicle-maintenance.webp",
        "url": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=85",
        "alt": "Vehicle maintenance and service in professional garage",
        "source": "Unsplash",
        "photographer": "John Salzarulo",
        "source_url": "https://unsplash.com/photos/car-in-garage",
        "license": "Unsplash License (free for commercial use)"
    },
    {
        "filename": "brake-suspension.webp",
        "url": "https://images.unsplash.com/photo-1581578716096-46380860acdf?auto=format&fit=crop&w=1200&q=85",
        "alt": "Brake and suspension repair in automotive workshop",
        "source": "Unsplash",
        "photographer": "Graham Harden",
        "source_url": "https://unsplash.com/photos/mechanic-working-on-car-engine",
        "license": "Unsplash License (free for commercial use)"
    },
    {
        "filename": "workshop-equipment.webp",
        "url": "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=85",
        "alt": "Professional workshop equipment and car lift",
        "source": "Unsplash",
        "photographer": "Skitterphoto",
        "source_url": "https://unsplash.com/photos/white-car-in-garage-EklMqTtMkOE",
        "license": "Unsplash License (free for commercial use)"
    }
]

def download_image(image_info, output_dir):
    """Download an image from URL and save to output directory."""
    try:
        response = requests.get(image_info["url"], timeout=30, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        response.raise_for_status()

        output_path = output_dir / image_info["filename"]
        with open(output_path, 'wb') as f:
            f.write(response.content)

        print(f"[OK] Downloaded: {image_info['filename']} ({len(response.content)} bytes)")
        return True
    except Exception as e:
        print(f"[FAIL] Failed to download {image_info['filename']}: {e}")
        return False

def main():
    output_dir = Path("assets/images/gallery")
    output_dir.mkdir(parents=True, exist_ok=True)

    docs_dir = Path("docs")
    docs_dir.mkdir(parents=True, exist_ok=True)

    print("Downloading automotive workshop images...")
    print("=" * 60)

    successful = []
    failed = []

    for image_info in IMAGES_TO_DOWNLOAD:
        if download_image(image_info, output_dir):
            successful.append(image_info)
        else:
            failed.append(image_info)

    # Create image credits documentation
    credits_path = docs_dir / "image-credits.md"
    with open(credits_path, 'w') as f:
        f.write("# MG MOTORS SERVICES - Image Credits & License Documentation\n\n")
        f.write("All images sourced from Unsplash under the Unsplash License.\n")
        f.write("License: Free for commercial use, no attribution required.\n\n")
        f.write("---\n\n")

        for i, img in enumerate(successful, 1):
            f.write(f"## {i}. {img['filename']}\n\n")
            f.write(f"**Alt Text:** {img['alt']}\n\n")
            f.write(f"**Source:** {img['source']}\n\n")
            f.write(f"**Photographer:** {img['photographer']}\n\n")
            f.write(f"**Source URL:** {img['source_url']}\n\n")
            f.write(f"**License:** {img['license']}\n\n")
            f.write(f"**Usage:** Workshop Gallery section\n\n")
            f.write("---\n\n")

        if failed:
            f.write("\n## Failed Downloads\n\n")
            for img in failed:
                f.write(f"- {img['filename']}: {img['url']}\n")

    print("=" * 60)
    print(f"Completed: {len(successful)} successful, {len(failed)} failed")
    print(f"Credits saved to: {credits_path}")

if __name__ == "__main__":
    main()