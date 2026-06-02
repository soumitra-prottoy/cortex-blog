import Link from 'next/link';
import { Suspense } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BlogPageClient from './page.client';

export const metadata = {
  title: 'Blog — AI Tools, Tutorials & Comparisons',
  description: 'Guides, tutorials, and comparisons for AI tools and workflows.',
};

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogPageSkeleton />}>
      <BlogPageClient />
    </Suspense>
  );
}

function BlogPageSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <section className="border-b border-neutral-100 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-10 w-48 rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
          <div className="mt-3 h-6 w-96 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
          ))}
        </div>
      </section>
    </div>
  );
}
