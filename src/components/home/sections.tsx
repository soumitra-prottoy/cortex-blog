'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, TrendingUp, Wrench, BookOpen, GraduationCap, GitCompare, Cpu, Zap, PenTool, Code, Search } from 'lucide-react';

const categoryGradients: Record<string, string> = {
  'ai-tools': 'from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900',
  'tutorials': 'from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900',
  'beginner-guides': 'from-amber-50 to-orange-100 dark:from-amber-950 dark:to-orange-900',
  'comparisons': 'from-purple-50 to-violet-100 dark:from-purple-950 dark:to-violet-900',
  'local-ai': 'from-cyan-50 to-sky-100 dark:from-cyan-950 dark:to-sky-900',
  'automation': 'from-rose-50 to-pink-100 dark:from-rose-950 dark:to-pink-900',
  'blogging-with-ai': 'from-fuchsia-50 to-purple-100 dark:from-fuchsia-950 dark:to-purple-900',
  'open-source': 'from-lime-50 to-green-100 dark:from-lime-950 dark:to-green-900',
};

const categoryIcons: Record<string, React.ReactNode> = {
  'ai-tools': <Wrench className="h-8 w-8" />,
  'tutorials': <BookOpen className="h-8 w-8" />,
  'beginner-guides': <GraduationCap className="h-8 w-8" />,
  'comparisons': <GitCompare className="h-8 w-8" />,
  'local-ai': <Cpu className="h-8 w-8" />,
  'automation': <Zap className="h-8 w-8" />,
  'blogging-with-ai': <PenTool className="h-8 w-8" />,
  'open-source': <Code className="h-8 w-8" />,
};
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { blogPosts } from '@/data';
import type { BlogPost } from '@/types';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <motion.article variants={fadeInUp}>
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-2xl border border-neutral-100 bg-white overflow-hidden transition-all duration-300 hover:border-neutral-200 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
      >
        {/* Image placeholder */}
        <div className={`relative overflow-hidden bg-gradient-to-br ${categoryGradients[post.category] || 'from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900'} ${featured ? 'h-56' : 'h-44'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-neutral-400/40 dark:text-neutral-500/40">
              {categoryIcons[post.category] || <BookOpen className="h-8 w-8" />}
            </div>
          </div>
          {post.trending && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">
                <TrendingUp className="mr-1 h-3 w-3" />
                Trending
              </Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3">
            <Badge variant="neutral" className="bg-neutral-100 text-neutral-600 border-0 dark:bg-neutral-800 dark:text-neutral-400">
              {post.category.replace('-', ' ')}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <h3 className={`mt-3 font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 ${featured ? 'text-xl' : 'text-lg'}`}>
            {post.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-2 dark:text-neutral-400">
            {post.description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
            <span>{post.author}</span>
            <span>&middot;</span>
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function FeaturedPostsSection() {
  const featured = blogPosts.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="bg-neutral-50 py-20 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          {...fadeInUp}
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Featured Articles
            </h2>
            <p className="mt-2 text-lg text-neutral-500 dark:text-neutral-400">
              Hand-picked reads to get you started
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-200 dark:text-neutral-400 dark:hover:text-white"
          >
            View all posts
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((post, i) => (
            <PostCard key={post.slug} post={post} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function RecentPostsSection() {
  const recent = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <section className="bg-white py-20 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          {...fadeInUp}
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Latest Posts
            </h2>
            <p className="mt-2 text-lg text-neutral-500 dark:text-neutral-400">
              Fresh content, updated regularly
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-200 dark:text-neutral-400 dark:hover:text-white"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
