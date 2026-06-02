import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Zap, PenTool, Cpu, Code } from 'lucide-react';
import { roadmaps } from '@/data';

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
  PenTool: <PenTool className="h-6 w-6" />,
  Cpu: <Cpu className="h-6 w-6" />,
  Code: <Code className="h-6 w-6" />,
};

const difficultyColors: Record<string, string> = {
  beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  intermediate: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  advanced: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
};

interface RoadmapPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return roadmaps.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: RoadmapPageProps) {
  const { slug } = await params;
  const roadmap = roadmaps.find((r) => r.slug === slug);
  if (!roadmap) return { title: 'Roadmap Not Found' };

  return {
    title: `${roadmap.title} — Learning Roadmap`,
    description: roadmap.description,
  };
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const { slug } = await params;
  const roadmap = roadmaps.find((r) => r.slug === slug);

  if (!roadmap) notFound();

  return (
    <div className="bg-white dark:bg-neutral-950">
      {/* Header */}
      <section className="border-b border-neutral-100 bg-neutral-50 py-12 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/roadmaps"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-200 dark:text-neutral-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            All Roadmaps
          </Link>

          <div className="mt-6 flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
              {iconMap[roadmap.icon]}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  {roadmap.title}
                </h1>
                <Badge className={difficultyColors[roadmap.difficulty]}>
                  {roadmap.difficulty}
                </Badge>
              </div>
              <p className="mt-2 text-lg text-neutral-500 dark:text-neutral-400">
                {roadmap.description}
              </p>
              <div className="mt-3 flex items-center gap-4 text-sm text-neutral-400 dark:text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {roadmap.duration}
                </span>
                <span>{roadmap.steps.length} steps</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {roadmap.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />

          <div className="space-y-8">
            {roadmap.steps.map((step, i) => (
              <div key={i} className="relative flex gap-6">
                {/* Timeline dot */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
                  <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 rounded-2xl border border-neutral-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {step.description}
                  </p>
                  {step.resources && step.resources.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Resources
                      </h4>
                      <ul className="mt-2 space-y-1">
                        {step.resources.map((resource, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                            <ChevronRight className="h-3 w-3" />
                            {resource}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-8 text-center dark:border-blue-900 dark:bg-blue-950/50">
          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
            Ready to start?
          </h3>
          <p className="mt-2 text-blue-700 dark:text-blue-300">
            Begin with Step 1 and work your way through. Take your time and practice each concept.
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200"
          >
            Explore Related Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
