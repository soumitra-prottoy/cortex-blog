#!/usr/bin/env python3
"""
Cortex Blog Thumbnail Generator
Generates designed PNG thumbnails for blog posts using Pillow.
Can run on GitHub Actions (ubuntu-latest has Python + Pillow available).
"""

from PIL import Image, ImageDraw, ImageFont
import math, os, sys, random

W, H = 1200, 630

# Color palettes for different categories
PALETTES = {
    'ai-tools':      ((26, 26, 46), (80, 40, 160)),
    'comparisons':   ((15, 23, 42), (51, 65, 85)),
    'local-ai':      ((26, 26, 26), (40, 60, 80)),
    'beginner-guides': ((10, 26, 10), (20, 60, 30)),
    'automation':    ((27, 10, 46), (60, 20, 100)),
    'open-source':   ((10, 22, 40), (20, 50, 100)),
    'tutorials':     ((10, 10, 10), (20, 20, 30)),
    'blogging-with-ai': ((26, 5, 32), (60, 20, 80)),
}

# Emoji accents per category
CATEGORY_EMOJI = {
    'ai-tools': '⚡🤖🛠️💡',
    'comparisons': '⚖️🔍📊🏆',
    'local-ai': '🖥️⚙️🔧💻',
    'beginner-guides': '🎓📚🚀✨',
    'automation': '⚡🔄📊🤖',
    'open-source': '🌐🔓💡🛠️',
    'tutorials': '📝💻🔨✅',
    'blogging-with-ai': '✍️🎨📱🎬',
}

def get_font(size, bold=False):
    """Try to load a font on Ubuntu (GitHub Actions) or macOS."""
    candidates = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
        '/System/Library/Fonts/SFNS.ttf',
        '/System/Library/Fonts/Helvetica.ttc',
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                pass
    return ImageFont.load_default()

def draw_gradient(img, color1, color2):
    """Draw diagonal gradient."""
    draw = ImageDraw.Draw(img)
    for x in range(W):
        t = x / W
        r = int(color1[0] + (color2[0] - color1[0]) * t)
        g = int(color1[1] + (color2[1] - color1[1]) * t)
        b = int(color1[2] + (color2[2] - color1[2]) * t)
        draw.line([(x, 0), (x, H)], fill=(r, g, b))
    return img

def draw_decorative_elements(draw, seed=42):
    """Draw neural network-like decorative elements."""
    random.seed(seed)
    nodes = [(random.randint(30, W-30), random.randint(30, H-30)) for _ in range(18)]
    for i, (x1, y1) in enumerate(nodes):
        for j, (x2, y2) in enumerate(nodes):
            if i < j and math.sqrt((x2-x1)**2 + (y2-y1)**2) < 280:
                draw.line([(x1, y1), (x2, y2)], fill=(255, 255, 255), width=1)
    for x, y in nodes:
        r = random.randint(2, 5)
        draw.ellipse([x-r, y-r, x+r, y+r], fill=(255, 255, 255))

def draw_emoji_scatter(draw, category, title_seed=42):
    """Draw category-appropriate emoji accents."""
    random.seed(title_seed)
    emoji_font = get_font(48)
    emojis = CATEGORY_EMOJI.get(category, '💡✨🚀')
    positions = [(random.randint(80, W-80), random.randint(80, H-80)) for _ in range(6)]
    for i, (ex, ey) in enumerate(positions):
        e = emojis[i % len(emojis)]
        draw.text((ex-24, ey-28), e, font=emoji_font)

def wrap_text(text, font, max_width):
    words = text.split()
    lines, current = [], ""
    for word in words:
        test = f"{current} {word}".strip()
        if font.getbbox(test)[2] - font.getbbox(test)[0] <= max_width:
            current = test
        else:
            if current: lines.append(current)
            current = word
    if current: lines.append(current)
    return lines

def center_text(draw, y, text, font, fill, shadow=True):
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    x = (W - tw) // 2
    if shadow:
        draw.text((x+2, y+2), text, font=font, fill=(0, 0, 0))
    draw.text((x, y), text, font=font, fill=fill)

def draw_text_block(draw, y, lines, font, fill, line_gap=8, shadow=True):
    for line in lines:
        bbox = font.getbbox(line)
        tw = bbox[2] - bbox[0]
        x = (W - tw) // 2
        if shadow:
            draw.text((x+2, y+2), line, font=font, fill=(0, 0, 0))
        draw.text((x, y), line, font=font, fill=fill)
        y += bbox[3] - bbox[1] + line_gap
    return y

def draw_badge(draw, x, y, text, font, text_color=(255,255,255)):
    bbox = font.getbbox(text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pad_x, pad_y = 14, 6
    draw.rounded_rectangle([x, y, x+tw+pad_x*2, y+th+pad_y*2], radius=16, fill=(255,255,255))
    draw.text((x+pad_x, y+3), text, font=font, fill=text_color)

def generate_thumbnail(slug, title, category, output_dir):
    """Generate a designed thumbnail for a blog post."""
    color1, color2 = PALETTES.get(category, ((26, 26, 46), (60, 40, 120)))
    
    img = Image.new('RGB', (W, H), color1)
    draw_gradient(img, color1, color2)
    draw = ImageDraw.Draw(img)
    
    # Decorative elements
    draw_decorative_elements(draw, seed=hash(slug) % 10000)
    draw_emoji_scatter(draw, category, title_seed=hash(title) % 10000)
    
    # Category badge
    badge_font = get_font(14, bold=True)
    badge_text = category.replace('-', ' ').title()
    bx, by = W // 2 - 60, 50
    draw_badge(draw, bx, by, badge_text, badge_font, text_color=color1)
    
    # Title (wrapped)
    title_font = get_font(48, bold=True)
    max_title_width = W - 120
    lines = wrap_text(title, title_font, max_title_width)
    
    # Calculate vertical centering
    line_height = 56
    total_height = len(lines) * line_height
    start_y = (H - total_height) // 2 + 20
    
    draw_text_block(draw, start_y, lines, title_font, (255, 255, 255))
    
    # Bottom accent bar
    accent_colors = {
        'ai-tools': (120, 80, 255), 'comparisons': (255, 200, 100),
        'local-ai': (80, 180, 255), 'beginner-guides': (80, 200, 80),
        'automation': (200, 160, 255), 'open-source': (100, 255, 150),
        'tutorials': (200, 200, 255), 'blogging-with-ai': (200, 140, 255),
    }
    accent = accent_colors.get(category, (120, 80, 255))
    draw.rectangle([0, H-4, W, H], fill=accent)
    
    # Save
    out_path = os.path.join(output_dir, f"{slug}.png")
    img.save(out_path, optimize=True)
    print(f"  Generated: {out_path}")
    return out_path

if __name__ == '__main__':
    if len(sys.argv) < 5:
        print("Usage: python3 gen_thumbnails.py <slug> <title> <category> <output_dir>")
        print("   or: python3 gen_thumbnails.py --all <output_dir>  (regenerate all)")
        sys.exit(1)
    
    output_dir = sys.argv[-1]
    os.makedirs(output_dir, exist_ok=True)
    
    if sys.argv[1] == '--all':
        # Regenerate for all known posts
        posts = [
            ('best-free-ai-tools-2025', '15 Best Free AI Tools You Should Be Using in 2025', 'ai-tools'),
            ('claude-vs-gemini-comparison', 'Claude vs Gemini: Which AI Assistant Is Right for You?', 'comparisons'),
            ('ollama-vs-lm-studio-local-ai', 'Ollama vs LM Studio: The Best Way to Run AI Locally', 'local-ai'),
            ('getting-started-with-ai-agents', "Getting Started with AI Agents: A Beginner's Guide", 'beginner-guides'),
            ('ai-automation-workflows-guide', '10 AI Automation Workflows That Save Hours Every Week', 'automation'),
            ('open-source-ai-models-guide', 'The Complete Guide to Open-Source AI Models in 2025', 'open-source'),
            ('hermes-vs-openmanus-ai-agents', 'Hermes vs OpenManus: Which Open-Source AI Agent Wins?', 'comparisons'),
            ('build-ai-blog-nextjs', 'How to Build an AI-Powered Blog with Next.js and Vercel', 'tutorials'),
            ('ai-for-content-creators', 'How AI Is Transforming Content Creation in 2025', 'blogging-with-ai'),
            ('beginner-roadmap-learn-ai', "The Complete Beginner's Roadmap to Learning AI in 2025", 'beginner-guides'),
        ]
        for slug, title, cat in posts:
            generate_thumbnail(slug, title, cat, output_dir)
        print(f"\nGenerated {len(posts)} thumbnails in {output_dir}")
    else:
        slug, title, category = sys.argv[1], sys.argv[2], sys.argv[3]
        generate_thumbnail(slug, title, category, output_dir)
