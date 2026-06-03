'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, TrendingUp, Wrench, BookOpen, GraduationCap, GitCompare, Cpu, Zap, PenTool, Code } from 'lucide-react';

const categoryGradients: Record<string, string> = {
  'ai-tools': 'from-blue-500/20 to-indigo-500/20 dark:from-blue-500/10 dark:to-indigo-500/10',
  'tutorials': 'from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10',
  'beginner-guides': 'from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10',
  'comparisons': 'from-purple-500/20 to-violet-500/20 dark:from-purple-500/10 dark:to-violet-500/10',
  'local-ai': 'from-cyan-500/20 to-sky-500/20 dark:from-cyan-500/10 dark:to-sky-500/10',
  'automation': 'from-rose-500/20 to-pink-500/20 dark:from-rose-500/10 dark:to-pink-500/10',
  'blogging-with-ai': 'from-fuchsia-500/20 to-purple-500/20 dark:from-fuchsia-500/10 dark:to-purple-500/10',
  'open-source': 'from-lime-500/20 to-green-500/20 dark:from-lime-500/10 dark:to-green-500/10',
};

const categoryIcons: Record<string, React.ReactNode> = {
  'ai-tools': <Wrench className="h-7 w-7" />,
  'tutorials': <BookOpen className="h-7 w-7" />,
  'beginner-guides': <GraduationCap className="h-7 w-7" />,
  'comparisons': <GitCompare className="h-7 w-7" />,
  'local-ai': <Cpu className="h-7 w-7" />,
  'automation': <Zap className="h-7 w-7" />,
  'blogging-with-ai': <PenTool className="h-7 w-7" />,
  'open-source': <Code className="h-7 w-7" />,
};

import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { blogPosts, categories } from '@/data';
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
        className="group glass-card hover-glow block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-indigo-500/5 hover:scale-[1.01]"
      >
        {/* Thumbnail */}
        <div className={`relative overflow-hidden ${featured ? 'h-56' : 'h-44'}`}>
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${categoryGradients[post.category] || 'from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900'}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-neutral-400/40 dark:text-neutral-500/40">
                  {categoryIcons[post.category] || <BookOpen className="h-7 w-7" />}
                </div>
              </div>
            </div>
          )}
          {post.trending && (
            <div className="absolute top-4 left-4">
              <Badge className="glass bg-amber-50/90 text-amber-700 border-amber-200/50 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800/50">
                <TrendingUp className="mr-1 h-3 w-3" />
                Trending
              </Badge>
            </div>
          )}
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium capitalize text-neutral-600 dark:bg-white/5 dark:text-neutral-400">
              {post.category.replace(/-/g, ' ')}
            </span>
            <span className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <h3 className={`mt-3 font-semibold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-white transition-colors duration-200 ${featured ? 'text-xl' : 'text-lg'}`}>
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
    <section className="relative py-24 sm:py-32">
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
    <section className="relative py-24 sm:py-32">
      {/* Subtle section divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

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
