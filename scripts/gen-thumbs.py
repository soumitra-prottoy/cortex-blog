from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os
import math

os.makedirs('/Users/soumitradebprottoy/ai-blog/public/thumbnails', exist_ok=True)

# Blog post data: slug, title, emoji, gradient colors
posts = [
    ('best-free-ai-tools-2025', '15 Best Free AI Tools', '🛠️', '#3B82F6', '#8B5CF6'),
    ('claude-vs-gemini-comparison', 'Claude vs Gemini', '⚖️', '#8B5CF6', '#EC4899'),
    ('ollama-vs-lm-studio-local-ai', 'Ollama vs LM Studio', '💻', '#06B6D4', '#3B82F6'),
    ('getting-started-with-ai-agents', 'AI Agents Guide', '🤖', '#10B981', '#3B82F6'),
    ('ai-automation-workflows-guide', '10 AI Automations', '⚡', '#F59E0B', '#EF4444'),
    ('open-source-ai-models-guide', 'Open Source AI', '🔓', '#10B981', '#06B6D4'),
    ('hermes-vs-openmanus-ai-agents', 'Hermes vs OpenManus', '🔄', '#6366F1', '#8B5CF6'),
    ('build-ai-blog-nextjs', 'Build AI Blog', '📝', '#3B82F6', '#10B981'),
    ('ai-for-content-creators', 'AI for Creators', '🎨', '#EC4899', '#F59E0B'),
    ('beginner-roadmap-learn-ai', 'Learn AI Roadmap', '🗺️', '#F59E0B', '#10B981'),
]

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def create_thumbnail(slug, title, emoji, color1, color2):
    W, H = 1200, 630
    img = Image.new('RGB', (W, H))
    draw = ImageDraw.Draw(img)
    
    # Gradient background
    c1 = hex_to_rgb(color1)
    c2 = hex_to_rgb(color2)
    for y in range(H):
        t = y / H
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
    
    # Neural network pattern (subtle dots and lines)
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    
    # Draw neural nodes
    nodes = [
        (150, 120), (350, 80), (550, 160), (250, 280), (450, 300), (650, 200),
        (800, 100), (950, 180), (1050, 120), (750, 350), (900, 400), (1000, 300),
        (200, 450), (400, 500), (600, 420), (800, 520), (1000, 480), (1100, 550),
        (100, 550), (300, 350), (500, 550), (700, 250), (900, 550), (1100, 200),
    ]
    
    # Draw connections first
    connections = [
        (0, 1), (1, 2), (0, 3), (3, 4), (2, 5), (4, 5), (1, 4),
        (6, 7), (7, 8), (6, 9), (9, 10), (8, 10), (7, 10),
        (11, 12), (12, 13), (13, 14), (14, 15), (11, 15),
        (16, 17), (17, 18), (18, 19), (19, 20), (20, 21), (21, 22), (22, 23),
        (0, 16), (3, 11), (5, 13), (10, 15), (8, 23),
    ]
    for i, j in connections:
        if i < len(nodes) and j < len(nodes):
            od.line([nodes[i], nodes[j]], fill=(255, 255, 255, 20), width=2)
    
    # Draw nodes
    for i, (x, y) in enumerate(nodes):
        r = 6 if i % 3 == 0 else 4
        od.ellipse([x-r, y-r, x+r, y+r], fill=(255, 255, 255, 40))
    
    # Decorative large circles
    od.ellipse([-100, -100, 300, 300], fill=(255, 255, 255, 15))
    od.ellipse([900, 350, 1300, 750], fill=(255, 255, 255, 12))
    od.ellipse([500, 200, 700, 400], fill=(255, 255, 255, 8))
    
    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(img)
    
    # Try to load a nice font, fall back to default
    try:
        font_path = '/System/Library/Fonts/Helvetica.ttc'
        title_font = ImageFont.truetype(font_path, 48)
        sub_font = ImageFont.truetype(font_path, 24)
        emoji_font = ImageFont.truetype('/System/Library/Fonts/Apple Color Emoji.ttc', 80)
    except:
        try:
            font_path = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
            title_font = ImageFont.truetype(font_path, 48)
            sub_font = ImageFont.truetype(font_path, 24)
            emoji_font = ImageFont.truetype(font_path, 80)
        except:
            title_font = ImageFont.load_default()
            sub_font = ImageFont.load_default()
            emoji_font = ImageFont.load_default()
    
    # Draw emoji
    try:
        draw.text((W//2 - 50, 160), emoji, font=emoji_font, fill='white')
    except:
        pass
    
    # Draw title (centered, wrapped if needed)
    words = title.split()
    lines = []
    current_line = ''
    for word in words:
        test = current_line + ' ' + word if current_line else word
        bbox = draw.textbbox((0, 0), test, font=title_font)
        if bbox[2] - bbox[0] > W - 100:
            if current_line:
                lines.append(current_line)
            current_line = word
        else:
            current_line = test
    if current_line:
        lines.append(current_line)
    
    y_start = 280
    for i, line in enumerate(lines):
        bbox = draw.textbbox((0, 0), line, font=title_font)
        tw = bbox[2] - bbox[0]
        draw.text(((W - tw) // 2, y_start + i * 60), line, font=title_font, fill='white')
    
    # Draw subtitle
    sub = 'Cortex — Start Smarter with AI'
    bbox = draw.textbbox((0, 0), sub, font=sub_font)
    tw = bbox[2] - bbox[0]
    draw.text(((W - tw) // 2, y_start + len(lines) * 60 + 20), sub, font=sub_font, fill=(255, 255, 255, 180))
    
    # Save as PNG
    path = f'/Users/soumitradebprottoy/ai-blog/public/thumbnails/{slug}.png'
    img.save(path, 'PNG', quality=95)
    print(f'Created: {slug}.png ({W}x{H})')
    return path

for slug, title, emoji, c1, c2 in posts:
    create_thumbnail(slug, title, emoji, c1, c2)

print(f'\nDone. {len(posts)} thumbnails created.')
