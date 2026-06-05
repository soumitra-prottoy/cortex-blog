import type { Metadata } from 'next';
import RoadmapCard from '@/components/home/roadmap-card';
import { roadmaps as allRoadmaps } from '@/data';

export const metadata: Metadata = {
  title: 'Learning Roadmaps',
  description: 'Structured learning paths to guide your AI journey from beginner to advanced.',
};

export default function RoadmapsPage() {
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-neutral-950">
      {/* Header */}
      <section className="border-b border-neutral-100 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Learning Roadmaps
          </h1>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            Structured paths to guide your AI journey. Pick one and start today.
          </p>
        </div>
      </section>

      {/* Roadmaps Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allRoadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
          ))}
        </div>
      </section>
    </div>
  );
}
