import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero';
import { FeaturedPostsSection, RecentPostsSection } from '@/components/home/sections';
import RoadmapsSection from '@/components/home/roadmaps';
import { NewsletterSection } from '@/components/home/newsletter';

export const metadata: Metadata = {
  title: 'Learn AI, Build with AI, Stay Ahead',
  description: 'Honest guides, tool comparisons, and practical tutorials for AI tools, agents, and automation. No hype. No fluff. Just what works.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPostsSection />
      <RecentPostsSection />
      <RoadmapsSection />
      <NewsletterSection />
    </>
  );
}
