import { blogPosts } from '@/data';
import type { BlogPost } from '@/types';

// This file is used by the cron job to generate new blog posts
// It runs every Tuesday at 9:00 AM

const topics = [
  { category: 'ai-tools', title: 'Top 10 AI Tools for Students in 2025', description: 'The best free and affordable AI tools that help students study smarter, write better, and save time.' },
  { category: 'beginner-guides', title: 'How to Use ChatGPT for Learning Anything', description: 'A practical guide to using ChatGPT as your personal tutor — from math to languages to coding.' },
  { category: 'comparisons', title: 'ChatGPT vs Claude vs Gemini: The Ultimate Comparison', description: 'We tested all three major AI assistants on real tasks. Here is which one wins for each use case.' },
  { category: 'automation', title: '5 AI Automations Every Small Business Needs', description: 'Practical AI workflows that save small business owners 10+ hours per week without any coding.' },
  { category: 'ai-tools', title: 'Best AI Image Generators Compared: Free and Paid', description: 'A hands-on comparison of Midjourney, DALL-E, Stable Diffusion, and more — with real examples.' },
  { category: 'tutorials', title: 'How to Build a Chatbot with No Code', description: 'Step-by-step tutorial to build and deploy your own AI chatbot using free tools — no programming required.' },
  { category: 'local-ai', title: 'Running AI on a Budget: Best Models for Low-End PCs', description: 'You do not need an expensive GPU to run AI. Here are the best models that run on any computer.' },
  { category: 'open-source', title: 'Open Source AI Projects You Should Be Following', description: 'The most exciting open-source AI projects that could change everything — and how to contribute.' },
  { category: 'beginner-guides', title: 'AI Safety: What Beginners Need to Know', description: 'Understanding AI limitations, biases, and risks — and how to use AI responsibly.' },
  { category: 'automation', title: 'How to Automate Your Social Media with AI', description: 'Create a week of social media content in 30 minutes using AI tools and scheduling platforms.' },
  { category: 'ai-tools', title: 'Best AI Coding Assistants for Beginners', description: 'GitHub Copilot, Cursor, Replit AI, and more — which coding assistant should you start with?' },
  { category: 'tutorials', title: 'How to Fine-Tune an AI Model on Your Own Data', description: 'A beginner-friendly guide to customizing AI models for your specific needs without a PhD.' },
  { category: 'comparisons', title: 'Free AI Tools vs Paid: Is It Worth Upgrading?', description: 'We compare free and paid tiers of popular AI tools to help you decide where to spend your money.' },
  { category: 'local-ai', title: 'Complete Guide to Ollama: Run Any AI Model Locally', description: 'From installation to running your first model — everything you need to know about Ollama.' },
  { category: 'open-source', title: 'How to Contribute to Open Source AI as a Beginner', description: 'You do not need to be a coding expert to contribute. Here is how to get started with open-source AI.' },
  { category: 'beginner-guides', title: 'Understanding Large Language Models: A Non-Technical Guide', description: 'What are LLMs, how do they work, and why do they matter? Explained without the jargon.' },
  { category: 'automation', title: 'AI-Powered Email Management: Never Dread Your Inbox Again', description: 'Set up AI to sort, prioritize, and draft responses to your emails automatically.' },
  { category: 'ai-tools', title: 'Best AI Tools for Content Creators in 2025', description: 'From writing to video editing to thumbnail creation — the AI tools every creator needs.' },
  { category: 'tutorials', title: 'How to Build an AI Agent from Scratch', description: 'A step-by-step tutorial to build your first AI agent that can browse the web and complete tasks.' },
  { category: 'comparisons', title: 'Local AI vs Cloud AI: Which Should You Use?', description: 'Privacy, cost, performance, and convenience — we break down the tradeoffs of local vs cloud AI.' },
];

export function getNextTopic(): { category: string; title: string; description: string } {
  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  return topics[weekNumber % topics.length];
}

export function generateWeeklyPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  const now = new Date();

  for (let i = 0; i < 4; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    const topicIndex = (Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) + i) % topics.length;
    const topic = topics[topicIndex];

    posts.push({
      slug: topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      title: topic.title,
      description: topic.description,
      category: topic.category,
      tags: ['weekly', topic.category],
      author: 'Cortex Team',
      date: date.toISOString().split('T')[0],
      readTime: '8 min read',
      featured: i === 0,
      trending: i < 2,
      content: generateContent(topic.title, topic.category),
    });
  }

  return posts;
}

function generateContent(title: string, category: string): string {
  // This would generate full blog content
  // In production, this would call an AI API to generate the content
  return `This is a placeholder for: ${title}\n\nFull content will be generated automatically each week.`;
}
