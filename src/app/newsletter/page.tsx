import type { Metadata } from 'next';
import NewsletterClient from './page.client';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Subscribe to the AIBlog newsletter for the latest AI tools, tutorials, and comparisons.',
};

export default function NewsletterPage() {
  return <NewsletterClient />;
}
