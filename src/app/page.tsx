import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero';
import { FeaturedPostsSection, RecentPostsSection } from '@/components/home/sections';
import RoadmapsSection from '@/components/home/roadmaps';
import { NewsletterSection } from '@/components/home/newsletter';
import { blogPosts, categories } from '@/data';

export const metadata: Metadata = {
  title: 'Learn AI, Build with AI, Stay Ahead',
  description: 'Honest guides, tool comparisons, and practical tutorials for AI tools, agents, and automation. No hype. No fluff. Just what works.',
  openGraph: {
    title: 'Cortex — Start Smarter with AI',
    description: 'Honest guides, tool comparisons, and practical tutorials for AI tools, agents, and automation.',
    type: 'website',
    images: [{ url: '/thumbnails/best-free-ai-tools-2025.png', width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  // JSON-LD for website
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cortex',
    url: 'https://cortex-blog-sigma.vercel.app',
    description: 'Your neural network for AI knowledge. Honest guides, tool comparisons, tutorials, and automation workflows for AI beginners.',
    publisher: {
      '@type': 'Organization',
      name: 'Cortex',
      url: 'https://cortex-blog-sigma.vercel.app',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://cortex-blog-sigma.vercel.app/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  // JSON-LD for organization
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cortex',
    url: 'https://cortex-blog-sigma.vercel.app',
    logo: 'https://cortex-blog-sigma.vercel.app/favicon.ico',
    description: 'Your neural network for AI knowledge. Tools, tutorials, and insights for AI beginners.',
    sameAs: [
      'https://twitter.com/cortex_blog',
    ],
  };

  const categoryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Blog Categories',
    itemListElement: categories.map((cat, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: cat.name,
      url: `https://cortex-blog-sigma.vercel.app/blog?category=${cat.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />
      <HeroSection postCount={blogPosts.length} />
      <FeaturedPostsSection />
      <RecentPostsSection />
      <RoadmapsSection />
      <NewsletterSection />
    </>
  );
}
