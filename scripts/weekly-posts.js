/**
 * Cortex Weekly Blog Generator
 * 
 * Generates 4 blog posts per week with REAL researched content using AI.
 * Runs via GitHub Actions on a schedule — works even when your Mac is off.
 * 
 * Environment variables needed:
 *   GITHUB_TOKEN - GitHub personal access token with repo access
 *   GITHUB_REPO - owner/repo format (e.g., soumitra-prottoy/cortex-blog)
 *   OPENROUTER_API_KEY - OpenRouter API key for AI content generation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'soumitra-prottoy/cortex-blog';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
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
  { category: 'ai-tools', title: 'Best AI Tools for Cybersecurity in 2025', description: 'AI-powered security tools that help detect threats, automate responses, and protect your data.', tags: ['cybersecurity', 'ai-tools', 'security'] },
  { category: 'tutorials', title: 'How to Create AI-Generated Art for Your Brand', description: 'A complete workflow for creating consistent, on-brand visual content using AI image generators.', tags: ['art', 'branding', 'image-generation'] },
  { category: 'comparisons', title: 'Notion AI vs Obsidian AI vs Logseq: Which Note-Taking App Wins?', description: 'We compare the AI features of the most popular note-taking apps to find the best one for thinkers.', tags: ['note-taking', 'comparison', 'productivity'] },
  { category: 'local-ai', title: 'How to Run AI on Raspberry Pi and Edge Devices', description: 'Yes, you can run real AI on a $75 computer. Here is how to set it up.', tags: ['raspberry-pi', 'edge-ai', 'local-ai'] },
  { category: 'beginner-guides', title: 'AI for Job Seekers: How to Use AI to Land Your Dream Job', description: 'From resume optimization to interview prep — how AI can give you an edge in your job search.', tags: ['jobs', 'career', 'ai'] },
  { category: 'automation', title: 'How to Automate Data Entry with AI', description: 'Stop manually copying data between spreadsheets. Here is how to set up AI-powered data pipelines.', tags: ['data-entry', 'automation', 'spreadsheets'] },
  { category: 'ai-tools', title: 'Best AI Voice Generators and Cloning Tools in 2025', description: 'ElevenLabs, PlayHT, and more — which AI voice tool sounds most natural and offers the best value?', tags: ['voice', 'audio', 'ai-tools'] },
  { category: 'tutorials', title: 'How to Build a RAG System for Your Own Documents', description: 'Create an AI that can answer questions about your own files using Retrieval-Augmented Generation.', tags: ['rag', 'tutorial', 'llm'] },
  { category: 'open-source', title: 'The Best Open Source Alternatives to ChatGPT', description: 'You do not need OpenAI to have a great AI chat. Here are the best open-source chatbots you can self-host.', tags: ['open-source', 'chatgpt', 'self-hosted'] },
  { category: 'comparisons', title: 'Cursor vs GitHub Copilot vs Codeium: Best AI Code Editor in 2025', description: 'We tested the top AI coding tools on real projects. Here is which one actually helps you code faster.', tags: ['coding', 'comparison', 'ai-tools'] },
  { category: 'beginner-guides', title: 'How to Start a Career in AI Without a CS Degree', description: 'You do not need a computer science degree to work in AI. Here is your roadmap from zero to hired.', tags: ['career', 'ai', 'beginners'] },
  { category: 'ai-tools', title: 'Best AI Tools for Video Editing in 2025', description: 'From auto-captioning to AI-powered cuts — the tools that are changing video production forever.', tags: ['video', 'editing', 'ai-tools'] },
  { category: 'tutorials', title: 'How to Use AI for Market Research', description: 'Leverage AI tools to analyze competitors, find trends, and make data-driven business decisions.', tags: ['market-research', 'business', 'ai'] },
  { category: 'automation', title: 'How to Build an AI-Powered Newsletter', description: 'Automate content curation, writing, and sending of a weekly newsletter using AI tools.', tags: ['newsletter', 'automation', 'content'] },
  { category: 'local-ai', title: 'Best Quantized Models: Run 70B Parameter AI on a Laptop', description: 'GGUF, GPTQ, and AWQ quantization explained — and which models give the best quality at the smallest size.', tags: ['quantization', 'local-ai', 'gguf'] },
];

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

function escapeTS(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '');
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

async function generateRealContent(title, category, tags) {
  if (!OPENROUTER_API_KEY) {
    console.log('No OPENROUTER_API_KEY — using template content');
    return generateTemplateContent(title, category, tags);
  }

  const prompt = `You are writing a blog post for Cortex (cortex-blog-sigma.vercel.app), an AI knowledge blog for beginners.

Write a comprehensive, well-researched blog post titled: "${title}"

Category: ${category}
Tags: ${tags.join(', ')}

Rules:
- Write in a clear, engaging style for beginners
- Include REAL tool names, REAL pricing (check current prices), REAL URLs
- Use **bold** for section headers (NOT ## headings)
- Use bullet points where appropriate
- Include specific, actionable advice — no fluff or vague statements
- Include actual numbers, statistics, and comparisons where relevant
- Write 1500-2500 words
- End with a clear conclusion and next steps
- Do NOT include a title heading (the title is added separately)
- Start directly with the introduction paragraph

Write the post now:`;

  try {
    const body = JSON.stringify({
      model: 'google/gemini-2.0-flash-exp-free',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const res = await httpsRequest('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, body);

    const data = JSON.parse(res.body);
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    }
    
    if (data.error) {
      console.error('OpenRouter error:', JSON.stringify(data.error));
    }
    
    console.log('Falling back to template content');
    return generateTemplateContent(title, category, tags);
  } catch (err) {
    console.error('Content generation error:', err.message);
    return generateTemplateContent(title, category, tags);
  }
}

function generateTemplateContent(title) {
  return `${title}

The AI landscape in 2025 offers more powerful and accessible tools than ever before. Whether you are just getting started or looking to optimize your workflow, understanding the right tools and approaches can save you countless hours.

**Why This Matters**

Artificial intelligence is no longer a luxury reserved for tech companies. Free and affordable tools now give everyone access to capabilities that were unimaginable just a few years ago. The key is knowing which tools to use and how to use them effectively.

**Getting Started**

The best way to learn is by doing. Pick one tool that addresses your most pressing need, use it daily for a week, and gradually expand your toolkit as you become more comfortable.

**Key Takeaways**

- Start with free tools before investing in paid options
- Focus on one tool at a time to avoid overwhelm
- Practice regularly to build proficiency
- Join communities to learn from others

The future of work involves AI collaboration. Start building these skills today to stay ahead of the curve.`;
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
    
    console.log(`Generating content for: ${topic.title}...`);
    const content = await generateRealContent(topic.title, topic.category, topic.tags);
    
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
      content,
    });
    
    console.log(`  Content generated (${content.length} chars)`);
  }
  
  if (posts.length === 0) {
    console.log('No new posts to add.');
    return;
  }
  
  // Build post entries for index.ts — content stored as escaped string
  const postEntries = posts.map(p => {
    const escTitle = p.title.replace(/'/g, "\\'");
    const escDesc = p.description.replace(/'/g, "\\'");
    const escContent = escapeTS(p.content);
    return `  {
    slug: '${p.slug}',
    title: '${escTitle}',
    description: '${escDesc}',
    category: '${p.category}',
    tags: [${p.tags.map(t => `'${t}'`).join(', ')}],
    author: '${p.author}',
    date: '${p.date}',
    readTime: '${p.readTime}',
    featured: ${p.featured},
    trending: ${p.trending},
    content: \`${escContent}\`
  }`;
  });
  
  // Insert after "export const blogPosts: BlogPost[] = ["
  const insertMarker = 'export const blogPosts: BlogPost[] = [\n';
  const idx = dataContent.indexOf(insertMarker);
  if (idx === -1) {
    console.error('ERROR: Could not find insertion point in data file');
    process.exit(1);
  }
  
  const insertPos = idx + insertMarker.length;
  dataContent = dataContent.slice(0, insertPos) + postEntries.join(',\n') + ',\n' + dataContent.slice(insertPos);
  
  fs.writeFileSync(dataFile, dataContent);
  
  // Commit and push
  console.log('Committing...');
  execSync(`cd ${WORK_DIR} && git config user.email "cortex@bot.local" && git config user.name "Cortex Bot"`);
  execSync(`cd ${WORK_DIR} && git add -A && git commit -m "Weekly blog posts: ${posts.map(p => p.slug).join(', ')}"`);
  execSync(`cd ${WORK_DIR} && git push origin main`);
  
  console.log(`\nSuccessfully pushed ${posts.length} new posts!`);
  console.log('Vercel will auto-deploy in ~2 minutes.');
  console.log('\nPosts:');
  posts.forEach(p => console.log(`  - ${p.title} (${p.slug})`));
}

run().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
