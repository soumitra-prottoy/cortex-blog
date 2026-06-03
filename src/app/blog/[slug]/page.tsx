import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowLeft, TrendingUp, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { NewsletterSection } from '@/components/home/newsletter';
import { blogPosts } from '@/data';
import BlogPostContent from '@/components/blog/post-content';
import RelatedPosts from '@/components/blog/related-posts';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Cortex`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
    alternates: {
      canonical: `https://cortex-blog-sigma.vercel.app/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    )
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Organization',
      name: 'Cortex',
      url: 'https://cortex-blog-sigma.vercel.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cortex',
      url: 'https://cortex-blog-sigma.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cortex-blog-sigma.vercel.app/favicon.ico',
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cortex-blog-sigma.vercel.app/blog/${slug}`,
    },
    ...(post.image && {
      image: {
        '@type': 'ImageObject',
        url: `https://cortex-blog-sigma.vercel.app${post.image}`,
        width: 1200,
        height: 630,
      },
    }),
    keywords: post.tags.join(', '),
    articleSection: post.category.replace(/-/g, ' '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cortex-blog-sigma.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://cortex-blog-sigma.vercel.app/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://cortex-blog-sigma.vercel.app/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="bg-white dark:bg-neutral-950">
        {post.image && (
          <div className="w-full h-64 sm:h-80 overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" width="1200" height="630" />
          </div>
        )}
        <section className="border-b border-neutral-100 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-200 dark:text-neutral-400 dark:hover:text-white">
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to Blog
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge className="capitalize bg-neutral-100 text-neutral-600 border-0 dark:bg-neutral-800 dark:text-neutral-400">
                {post.category.replace(/-/g, ' ')}
              </Badge>
              {post.trending && (
                <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Trending
                </Badge>
              )}
              <span className="flex items-center gap-1 text-sm text-neutral-400 dark:text-neutral-500">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.75rem] leading-tight dark:text-white">
              {post.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
              {post.description}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-neutral-400 dark:text-neutral-500">
                <span className="font-medium text-neutral-600 dark:text-neutral-300">{post.author}</span>
                <span>&middot;</span>
                <span>{formatDate(post.date)}</span>
              </div>
              <button className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors duration-200 dark:hover:text-neutral-300">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog?category=${tag}`} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500 hover:bg-neutral-200 transition-colors dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700">
                  #{tag.replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <BlogPostContent content={post.content} />
        </div>

        {relatedPosts.length > 0 && (
          <section className="border-t border-neutral-100 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </section>
        )}

        <NewsletterSection />
      </article>
    </>
  );
}
