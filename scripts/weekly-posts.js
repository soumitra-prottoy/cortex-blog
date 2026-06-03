/**
 * Cortex Weekly Blog Generator
 * 
 * This script generates 4 blog posts per week and pushes them to GitHub.
 * Designed to run on Render.com free cron service (or any cron platform).
 * 
 * Environment variables needed:
 *   GITHUB_TOKEN - GitHub personal access token with repo access
 *   GITHUB_REPO - owner/repo format (e.g., soumitra-prottoy/cortex-blog)
 *   OPENAI_API_KEY - (optional) for AI-generated content
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'soumitra-prottoy/cortex-blog';
const WORK_DIR = '/tmp/cortex-blog';

const topics = [
  { category: 'ai-tools', title: 'Top 10 AI Tools for Students in 2025', description: 'The best free and affordable AI tools that help students study smarter, write better, and save time.', tags: ['students', 'ai-tools', 'productivity'] },
  { category: 'beginner-guides', title: 'How to Use ChatGPT for Learning Anything', description: 'A practical guide to using ChatGPT as your personal tutor — from math to languages to coding.', tags: ['chatgpt', 'learning', 'tutorial'] },
  { category: 'comparisons', title: 'ChatGPT vs Claude vs Gemini: The Ultimate Comparison', description: 'We tested all three major AI assistants on real tasks. Here is which one wins for each use case.', tags: ['comparison', 'chatgpt', 'claude', 'gemini'] },
  { category: 'automation', title: '5 AI Automations Every Small Business Needs', description: 'Practical AI workflows that save small business owners 10+ hours per week without any coding.', tags: ['automation', 'business', 'productivity'] },
  { category: 'ai-tools', title: 'Best AI Image Generators Compared: Free and Paid', description: 'A hands-on comparison of Midjourney, DALL-E, Stable Diffusion, and more — with real examples.', tags: ['image-generation', 'comparison', 'ai-tools'] },
  { category: 'tutorials', title: 'How to Build a Chatbot with No Code', description: 'Step-by-step tutorial to build and deploy your own AI chatbot using free tools — no programming required.', tags: ['chatbot', 'no-code', 'tutorial'] },
  { category: 'local-ai', title: 'Running AI on a Budget: Best Models for Low-End PCs', description: 'You do not need an expensive GPU to run AI. Here are the best models that run on any computer.', tags: ['local-ai', 'budget', 'hardware'] },
  { category: 'open-source', title: 'Open Source AI Projects You Should Be Following', description: 'The most exciting open-source AI projects that could change everything — and how to contribute.', tags: ['open-source', 'ai', 'community'] },
  { category: 'beginner-guides', title: 'AI Safety: What Beginners Need to Know', description: 'Understanding AI limitations, biases, and risks — and how to use AI responsibly.', tags: ['ai-safety', 'beginners', 'ethics'] },
  { category: 'automation', title: 'How to Automate Your Social Media with AI', description: 'Create a week of social media content in 30 minutes using AI tools and scheduling platforms.', tags: ['social-media', 'automation', 'content'] },
  { category: 'ai-tools', title: 'Best AI Coding Assistants for Beginners', description: 'GitHub Copilot, Cursor, Replit AI, and more — which coding assistant should you start with?', tags: ['coding', 'ai-tools', 'beginners'] },
  { category: 'tutorials', title: 'How to Fine-Tune an AI Model on Your Own Data', description: 'A beginner-friendly guide to customizing AI models for your specific needs without a PhD.', tags: ['fine-tuning', 'llm', 'tutorial'] },
  { category: 'comparisons', title: 'Free AI Tools vs Paid: Is It Worth Upgrading?', description: 'We compare free and paid tiers of popular AI tools to help you decide where to spend your money.', tags: ['comparison', 'pricing', 'ai-tools'] },
  { category: 'local-ai', title: 'Complete Guide to Ollama: Run Any AI Model Locally', description: 'From installation to running your first model — everything you need to know about Ollama.', tags: ['ollama', 'local-ai', 'tutorial'] },
  { category: 'open-source', title: 'How to Contribute to Open Source AI as a Beginner', description: 'You do not need to be a coding expert to contribute. Here is how to get started with open-source AI.', tags: ['open-source', 'contribution', 'beginners'] },
  { category: 'beginner-guides', title: 'Understanding Large Language Models: A Non-Technical Guide', description: 'What are LLMs, how do they work, and why do they matter? Explained without the jargon.', tags: ['llm', 'beginners', 'explained'] },
  { category: 'automation', title: 'AI-Powered Email Management: Never Dread Your Inbox Again', description: 'Set up AI to sort, prioritize, and draft responses to your emails automatically.', tags: ['email', 'automation', 'productivity'] },
  { category: 'ai-tools', title: 'Best AI Tools for Content Creators in 2025', description: 'From writing to video editing to thumbnail creation — the AI tools every creator needs.', tags: ['content-creation', 'ai-tools', 'creators'] },
  { category: 'tutorials', title: 'How to Build an AI Agent from Scratch', description: 'A step-by-step tutorial to build your first AI agent that can browse the web and complete tasks.', tags: ['ai-agents', 'tutorial', 'automation'] },
  { category: 'comparisons', title: 'Local AI vs Cloud AI: Which Should You Use?', description: 'Privacy, cost, performance, and convenience — we break down the tradeoffs of local vs cloud AI.', tags: ['local-ai', 'cloud', 'comparison'] },
  { category: 'ai-tools', title: 'Best AI Writing Tools for Blogging in 2025', description: 'From Jasper to Writesonic to ChatGPT — which AI writing tool actually produces the best blog content?', tags: ['writing', 'blogging', 'ai-tools'] },
  { category: 'tutorials', title: 'How to Use AI to Learn Programming Faster', description: 'Practical strategies for using AI coding assistants to accelerate your programming education.', tags: ['programming', 'learning', 'ai'] },
  { category: 'beginner-guides', title: 'AI Glossary: Every Term You Need to Know', description: 'A comprehensive but simple guide to every AI term — from AGI to zero-shot learning.', tags: ['glossary', 'beginners', 'reference'] },
  { category: 'automation', title: 'How to Build a Personal AI Assistant', description: 'Create your own AI assistant that manages your calendar, emails, and tasks — all with free tools.', tags: ['personal-assistant', 'automation', 'tutorial'] },
];

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

function generateContent(title, category, tags) {
  return `${title}

This is an auto-generated weekly post for Cortex.

Category: ${category}
Tags: ${tags.join(', ')}

---

## Introduction

The AI landscape is evolving faster than ever. In this week's post, we explore ${title.toLowerCase()} and what it means for you.

## Key Points

- AI tools are becoming more accessible every week
- You don't need technical skills to benefit from AI
- The best approach is to start small and build up

## Getting Started

The easiest way to get started is to pick one tool and use it daily for a week. You'll be surprised how quickly it becomes part of your workflow.

## Conclusion

AI is here to stay. The question isn't whether to use it, but how to use it effectively.

---

*This post was auto-generated by Cortex Weekly Bot. For more articles, visit [Cortex](https://cortex-blog-sigma.vercel.app).*
`;
}

function generateThumbnailSVG(slug, title, categoryIndex) {
  const colors = [
    ['#3B82F6', '#8B5CF6'], ['#8B5CF6', '#EC4899'], ['#10B981', '#06B6D4'],
    ['#F59E0B', '#EF4444'], ['#6366F1', '#8B5CF6'], ['#14B8A6', '#3B82F6'],
    ['#F97316', '#F59E0B'], ['#0EA5E9', '#6366F1'], ['#EC4899', '#F43F5E'],
    ['#84CC16', '#22C55E'], ['#3B82F6', '#6366F1'], ['#8B5CF6', '#A855F7'],
  ];
  const [c1, c2] = colors[categoryIndex % colors.length];
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg_${slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c1}"/>
      <stop offset="100%" style="stop-color:${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg_${slug})"/>
  <circle cx="100" cy="100" r="200" fill="white" opacity="0.05"/>
  <circle cx="1100" cy="500" r="250" fill="white" opacity="0.05"/>
  <text x="600" y="280" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="700" fill="white">${title.substring(0, 35)}${title.length > 35 ? '...' : ''}</text>
  <text x="600" y="340" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="white" opacity="0.8">Cortex — Start Smarter with AI</text>
</svg>`;
}

async function httpsRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function githubAPI(method, path, data) {
  const body = JSON.stringify(data);
  const res = await httpsRequest(`https://api.github.com${path}`, {
    method,
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Cortex-Bot',
      'Content-Length': Buffer.byteLength(body),
    },
  }, body);
  return JSON.parse(res.body);
}

async function run() {
  console.log('=== Cortex Weekly Blog Generator ===');
  console.log(`Time: ${new Date().toISOString()}`);

  if (!GITHUB_TOKEN) {
    console.error('ERROR: GITHUB_TOKEN not set');
    process.exit(1);
  }

  // Clone repo
  console.log('Cloning repo...');
  try { execSync(`rm -rf ${WORK_DIR}`); } catch {}
  execSync(`git clone https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git ${WORK_DIR}`, { stdio: 'pipe' });
  
  const dataDir = path.join(WORK_DIR, 'src', 'data');
  const thumbDir = path.join(WORK_DIR, 'public', 'thumbnails');
  
  // Read existing data
  const dataFile = path.join(dataDir, 'index.ts');
  let dataContent = fs.readFileSync(dataFile, 'utf-8');
  
  // Get existing slugs
  const existingSlugs = [...dataContent.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
  
  // Generate 4 posts for this week
  const weekNum = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const posts = [];
  
  for (let i = 0; i < 4; i++) {
    const topicIndex = (weekNum * 4 + i) % topics.length;
    const topic = topics[topicIndex];
    const slug = slugify(topic.title);
    
    if (existingSlugs.includes(slug)) {
      console.log(`Skipping duplicate: ${slug}`);
      continue;
    }
    
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    posts.push({
      slug,
      title: topic.title,
      description: topic.description,
      category: topic.category,
      tags: topic.tags,
      author: 'Cortex Team',
      date: dateStr,
      readTime: '8 min read',
      featured: i === 0,
      trending: i < 2,
      content: generateContent(topic.title, topic.category, topic.tags),
    });
    
    // Generate thumbnail
    const svg = generateThumbnailSVG(slug, topic.title, topicIndex);
    fs.writeFileSync(path.join(thumbDir, `${slug}.svg`), svg);
    
    console.log(`Generated: ${slug}`);
  }
  
  if (posts.length === 0) {
    console.log('No new posts to add.');
    return;
  }
  
  // Insert posts into data file
  const postEntries = posts.map(p => `  {
    slug: '${p.slug}',
    image: '/thumbnails/${p.slug}.svg',
    title: '${p.title.replace(/'/g, "\\'")}',
    description: '${p.description.replace(/'/g, "\\'")}',
    category: '${p.category}',
    tags: [${p.tags.map(t => `'${t}'`).join(', ')}],
    author: '${p.author}',
    date: '${p.date}',
    readTime: '${p.readTime}',
    featured: ${p.featured},
    trending: ${p.trending},
    content: \`${p.content.replace(/`/g, '\\`')}\`
  }`).join(',\n');
  
  // Insert after "export const blogPosts: BlogPost[] = ["
  const insertMarker = 'export const blogPosts: BlogPost[] = [\n';
  const idx = dataContent.indexOf(insertMarker);
  if (idx === -1) {
    console.error('ERROR: Could not find insertion point in data file');
    process.exit(1);
  }
  
  const insertPos = idx + insertMarker.length;
  dataContent = dataContent.slice(0, insertPos) + postEntries + ',\n' + dataContent.slice(insertPos);
  
  fs.writeFileSync(dataFile, dataContent);
  
  // Commit and push
  console.log('Committing...');
  execSync(`cd ${WORK_DIR} && git config user.email "cortex@bot.local" && git config user.name "Cortex Bot"`);
  execSync(`cd ${WORK_DIR} && git add -A && git commit -m "Weekly blog posts: ${posts.map(p => p.slug).join(', ')}"`);
  execSync(`cd ${WORK_DIR} && git push origin main`);
  
  console.log(`Successfully pushed ${posts.length} new posts!`);
  console.log('Vercel will auto-deploy in ~2 minutes.');
}

run().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
