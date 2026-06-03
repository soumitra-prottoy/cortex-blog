import { blogPosts, tools, comparisons, roadmaps } from '@/data';

const BASE_URL = 'https://cortex-blog-sigma.vercel.app';

export default function sitemap() {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/comparisons`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/roadmaps`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const blogPages = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const comparisonPages = comparisons.map((comp) => ({
    url: `${BASE_URL}/comparisons/${comp.slug}`,
    lastModified: new Date(comp.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const roadmapPages = roadmaps.map((roadmap) => ({
    url: `${BASE_URL}/roadmaps/${roadmap.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...comparisonPages, ...roadmapPages];
}
