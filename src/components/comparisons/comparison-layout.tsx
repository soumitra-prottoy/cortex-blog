import { Comparison } from '@/types';
import ComparisonCard from '@/components/comparisons/comparison-card';

interface ComparisonLayoutProps {
  comparisons: Comparison[];
}

export default function ComparisonLayout({ comparisons }: ComparisonLayoutProps) {
  return (
    <div className="bg-white dark:bg-neutral-950">
      {/* Header */}
      <section className="border-b border-neutral-100 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            AI Comparisons
          </h1>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            Head-to-head comparisons to help you choose the right AI tools.
          </p>
        </div>
      </section>

      {/* Comparisons Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {comparisons.map((comp) => (
            <ComparisonCard key={comp.slug} comparison={comp} />
          ))}
        </div>
      </section>
    </div>
  );
}
