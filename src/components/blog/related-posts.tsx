'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
        Related Articles
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-neutral-100 bg-white p-5 transition-all duration-300 hover:border-neutral-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
          >
            <Badge className="capitalize bg-neutral-100 text-neutral-600 border-0 dark:bg-neutral-800 dark:text-neutral-400">
              {post.category.replace(/-/g, ' ')}
            </Badge>

            <h3 className="mt-3 font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {post.title}
            </h3>

            <p className="mt-2 text-sm text-neutral-500 line-clamp-2 dark:text-neutral-400">
              {post.description}
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
              <Clock className="h-3 w-3" />
              <span>{post.readTime}</span>
              <span>&middot;</span>
              <span>{formatDate(post.date)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
