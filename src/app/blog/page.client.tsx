'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Clock, TrendingUp, Wrench, BookOpen, GraduationCap, GitCompare, Cpu, Zap, PenTool, Code } from 'lucide-react';

const catGradients: Record<string, string> = {
  'ai-tools': 'from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900',
  'tutorials': 'from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900',
  'beginner-guides': 'from-amber-50 to-orange-100 dark:from-amber-950 dark:to-orange-900',
  'comparisons': 'from-purple-50 to-violet-100 dark:from-purple-950 dark:to-violet-900',
  'local-ai': 'from-cyan-50 to-sky-100 dark:from-cyan-950 dark:to-sky-900',
  'automation': 'from-rose-50 to-pink-100 dark:from-rose-950 dark:to-pink-900',
  'blogging-with-ai': 'from-fuchsia-50 to-purple-100 dark:from-fuchsia-950 dark:to-purple-900',
  'open-source': 'from-lime-50 to-green-100 dark:from-lime-950 dark:to-green-900',
};

const catIcons: Record<string, React.ReactNode> = {
  'ai-tools': <Wrench className="h-7 w-7" />,
  'tutorials': <BookOpen className="h-7 w-7" />,
  'beginner-guides': <GraduationCap className="h-7 w-7" />,
  'comparisons': <GitCompare className="h-7 w-7" />,
  'local-ai': <Cpu className="h-7 w-7" />,
  'automation': <Zap className="h-7 w-7" />,
  'blogging-with-ai': <PenTool className="h-7 w-7" />,
  'open-source': <Code className="h-7 w-7" />,
};
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { blogPosts, categories } from '@/data';
import type { BlogPost } from '@/types';

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-neutral-100 bg-white overflow-hidden transition-all duration-300 hover:border-neutral-200 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
    >
      <div className="relative h-44 overflow-hidden">
          {post.image ? (
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${catGradients[post.category] || 'from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900'}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-neutral-400/40 dark:text-neutral-500/40">
                  {catIcons[post.category] || <BookOpen className="h-7 w-7" />}
                </div>
              </div>
            </div>
          )}
          {post.trending && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">
              <TrendingUp className="mr-1 h-3 w-3" />
              Trending
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium capitalize text-neutral-500 dark:text-neutral-400">
            {post.category.replace(/-/g, ' ')}
          </span>
          <span className="text-neutral-300 dark:text-neutral-600">&middot;</span>
          <span className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>

        <h3 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-white transition-colors duration-200">
          {post.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500 line-clamp-2 dark:text-neutral-400">
          {post.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
          <span>{post.author}</span>
          <span>&middot;</span>
          <span>{formatDate(post.date)}</span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPageClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    if (activeCategory !== 'all') {
      posts = posts.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-white dark:bg-neutral-950">
      {/* Header */}
      <section className="border-b border-neutral-100 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Blog
          </h1>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            Guides, tutorials, and comparisons for AI tools and workflows.
          </p>

          {/* Search */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setActiveCategory('all')}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.slug}
                variant={activeCategory === cat.slug ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setActiveCategory(cat.slug)}
                className="capitalize"
              >
                {cat.slug.replace(/-/g, ' ')}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              No articles found. Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
