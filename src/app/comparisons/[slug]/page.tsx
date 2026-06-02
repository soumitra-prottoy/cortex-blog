import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, X, Star, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { comparisons } from '@/data';

interface ComparisonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: ComparisonPageProps) {
  const { slug } = await params;
  const comp = comparisons.find((c) => c.slug === slug);
  if (!comp) return { title: 'Comparison Not Found' };

  return {
    title: `${comp.title} — Full Comparison`,
    description: comp.subtitle,
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : star - 0.5 <= rating
              ? 'fill-amber-400/50 text-amber-400'
              : 'text-neutral-200 dark:text-neutral-700'
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-semibold text-neutral-900 dark:text-white">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { slug } = await params;
  const comp = comparisons.find((c) => c.slug === slug);

  if (!comp) notFound();

  return (
    <div className="bg-white dark:bg-neutral-950">
      {/* Header */}
      <section className="border-b border-neutral-100 bg-neutral-50 py-12 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/comparisons"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-200 dark:text-neutral-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            All Comparisons
          </Link>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            {comp.title}
          </h1>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            {comp.subtitle}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {comp.tags.map((tag) => (
              <Badge key={tag} className="capitalize bg-neutral-100 text-neutral-600 border-0 dark:bg-neutral-800 dark:text-neutral-400">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Item A */}
          <div className="rounded-2xl border border-neutral-100 bg-white p-7 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-100 text-xl font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                {comp.itemA.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {comp.itemA.name}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {comp.itemA.tagline}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <StarRating rating={comp.itemA.rating} />
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Pros
              </h4>
              <ul className="mt-2 space-y-2">
                {comp.itemA.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-red-500 dark:text-red-400">
                Cons
              </h4>
              <ul className="mt-2 space-y-2">
                {comp.itemA.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 rounded-xl bg-neutral-50 p-4 dark:bg-neutral-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Best For
              </div>
              <p className="mt-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {comp.itemA.bestFor}
              </p>
            </div>
          </div>

          {/* Item B */}
          <div className="rounded-2xl border border-neutral-100 bg-white p-7 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-100 text-xl font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                {comp.itemB.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {comp.itemB.name}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {comp.itemB.tagline}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <StarRating rating={comp.itemB.rating} />
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Pros
              </h4>
              <ul className="mt-2 space-y-2">
                {comp.itemB.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-red-500 dark:text-red-400">
                Cons
              </h4>
              <ul className="mt-2 space-y-2">
                {comp.itemB.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 rounded-xl bg-neutral-50 p-4 dark:bg-neutral-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Best For
              </div>
              <p className="mt-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {comp.itemB.bestFor}
              </p>
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-7 dark:border-blue-900 dark:bg-blue-950/50">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">
              The Verdict
            </h3>
          </div>
          <p className="mt-3 text-base leading-relaxed text-blue-800 dark:text-blue-200">
            {comp.verdict}
          </p>
        </div>
      </section>
    </div>
  );
}
