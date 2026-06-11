import { NextResponse } from 'next/server';
import { blogPosts } from '@/data';

export async function GET() {
  const posts = blogPosts.map(p => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    readTime: p.readTime,
    image: p.image,
    featured: p.featured,
    trending: p.trending,
    category: p.category,
  }));

  return NextResponse.json({ posts, total: posts.length });
}
