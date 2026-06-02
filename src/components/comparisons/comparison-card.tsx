import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Comparison } from '@/types';

interface ComparisonCardProps {
  comparison: Comparison;
}

export default function ComparisonCard({ comparison }: ComparisonCardProps) {
  return (
    <Link
      href={`/comparisons/${comparison.slug}`}
      className="group rounded-2xl border border-neutral-100 bg-white p-7 transition-all duration-300 hover:border-neutral-200 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
    >
      <Badge className="capitalize bg-neutral-100 text-neutral-600 border-0 dark:bg-neutral-800 dark:text-neutral-400">
        {comparison.category.replace(/-/g, ' ')}
      </Badge>

      <h3 className="mt-4 text-xl font-bold text-neutral-900 dark:text-white">
        {comparison.title}
      </h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        {comparison.subtitle}
      </p>

      <div className="mt-5 flex items-center gap-4">
        <div className="flex-1 rounded-xl bg-neutral-50 p-4 text-center dark:bg-neutral-800">
          <div className="text-lg font-bold text-neutral-900 dark:text-white">
            {comparison.itemA.name}
          </div>
          <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {comparison.itemA.tagline}
          </div>
        </div>
        <div className="text-sm font-bold text-neutral-300 dark:text-neutral-600">
          VS
        </div>
        <div className="flex-1 rounded-xl bg-neutral-50 p-4 text-center dark:bg-neutral-800">
          <div className="text-lg font-bold text-neutral-900 dark:text-white">
            {comparison.itemB.name}
          </div>
          <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {comparison.itemB.tagline}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-neutral-500 group-hover:text-neutral-900 transition-colors duration-200 dark:text-neutral-400 dark:group-hover:text-white">
        Read comparison
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
