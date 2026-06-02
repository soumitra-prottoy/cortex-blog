import os

os.makedirs('/Users/soumitradebprottoy/ai-blog/public/thumbnails', exist_ok=True)

thumbnails = [
    {'slug': 'best-free-ai-tools-2025', 'title': '15 Best Free AI Tools', 'colors': ['#3B82F6', '#8B5CF6'], 'emoji': '🛠️'},
    {'slug': 'claude-vs-gemini-comparison', 'title': 'Claude vs Gemini', 'colors': ['#8B5CF6', '#EC4899'], 'emoji': '⚖️'},
    {'slug': 'ollama-vs-lm-studio-local-ai', 'title': 'Ollama vs LM Studio', 'colors': ['#06B6D4', '#3B82F6'], 'emoji': '💻'},
    {'slug': 'getting-started-with-ai-agents', 'title': 'AI Agents Guide', 'colors': ['#10B981', '#3B82F6'], 'emoji': '🤖'},
    {'slug': 'ai-automation-workflows-guide', 'title': '10 AI Automations', 'colors': ['#F59E0B', '#EF4444'], 'emoji': '⚡'},
    {'slug': 'open-source-ai-models-guide', 'title': 'Open Source AI', 'colors': ['#10B981', '#06B6D4'], 'emoji': '🔓'},
    {'slug': 'hermes-vs-openmanus-ai-agents', 'title': 'Hermes vs OpenManus', 'colors': ['#6366F1', '#8B5CF6'], 'emoji': '🔄'},
    {'slug': 'build-ai-blog-nextjs', 'title': 'Build AI Blog', 'colors': ['#3B82F6', '#10B981'], 'emoji': '📝'},
    {'slug': 'ai-for-content-creators', 'title': 'AI for Creators', 'colors': ['#EC4899', '#F59E0B'], 'emoji': '🎨'},
    {'slug': 'beginner-roadmap-learn-ai', 'title': 'Learn AI Roadmap', 'colors': ['#F59E0B', '#10B981'], 'emoji': '🗺️'},
]

def make_svg(t):
    c1, c2 = t['colors']
    title = t['title']
    emoji = t['emoji']
    # Short title for display
    short = title.split(':')[0].strip() if ':' in title else title
    if len(short) > 20:
        short = short[:18] + '...'

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg_{t['slug']}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{c1}"/>
      <stop offset="100%" style="stop-color:{c2}"/>
    </linearGradient>
    <pattern id="dots_{t['slug']}" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1.5" fill="white" opacity="0.15"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg_{t['slug']})"/>
  <rect width="1200" height="630" fill="url(#dots_{t['slug']})"/>
  <!-- Decorative circles -->
  <circle cx="100" cy="100" r="200" fill="white" opacity="0.05"/>
  <circle cx="1100" cy="500" r="250" fill="white" opacity="0.05"/>
  <circle cx="600" cy="315" r="150" fill="white" opacity="0.03"/>
  <!-- Neural network pattern -->
  <g opacity="0.08">
    <line x1="100" y1="200" x2="300" y2="150" stroke="white" stroke-width="2"/>
    <line x1="300" y1="150" x2="500" y2="250" stroke="white" stroke-width="2"/>
    <line x1="100" y1="200" x2="200" y2="350" stroke="white" stroke-width="2"/>
    <line x1="200" y1="350" x2="500" y2="250" stroke="white" stroke-width="2"/>
    <circle cx="100" cy="200" r="8" fill="white"/>
    <circle cx="300" cy="150" r="10" fill="white"/>
    <circle cx="500" cy="250" r="8" fill="white"/>
    <circle cx="200" cy="350" r="8" fill="white"/>
    <line x1="700" y1="100" x2="900" y2="180" stroke="white" stroke-width="2"/>
    <line x1="900" y1="180" x2="1050" y2="120" stroke="white" stroke-width="2"/>
    <line x1="700" y1="100" x2="750" y2="250" stroke="white" stroke-width="2"/>
    <circle cx="700" cy="100" r="8" fill="white"/>
    <circle cx="900" cy="180" r="10" fill="white"/>
    <circle cx="1050" cy="120" r="8" fill="white"/>
    <circle cx="750" cy="250" r="8" fill="white"/>
  </g>
  <!-- Emoji -->
  <text x="600" y="260" text-anchor="middle" font-size="72">{emoji}</text>
  <!-- Title -->
  <text x="600" y="360" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="42" font-weight="700" fill="white">{short}</text>
  <!-- Subtitle -->
  <text x="600" y="400" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="20" fill="white" opacity="0.8">Cortex — Start Smarter with AI</text>
</svg>'''

for t in thumbnails:
    svg = make_svg(t)
    path = f"/Users/soumitradebprottoy/ai-blog/public/thumbnails/{t['slug']}.svg"
    with open(path, 'w') as f:
        f.write(svg)
    print(f"Created: {t['slug']}.svg — {t['emoji']} {t['title']}")

print(f"\nDone. {len(thumbnails)} thumbnails created in public/thumbnails/")
