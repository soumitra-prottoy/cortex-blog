'use client';

import Link from 'next/link';
import { ArrowRight, Clock, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Zap, PenTool, Cpu, Code } from 'lucide-react';
import type { Roadmap } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  PenTool: <PenTool className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  Code: <Code className="h-5 w-5" />,
};

const difficultyColors: Record<string, string> = {
  beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  intermediate: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  advanced: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
};

export default function RoadmapCard({ roadmap }: { roadmap: Roadmap }) {
  return (
    <Link
      href={`/roadmaps/${roadmap.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-neutral-100 bg-white p-7 transition-all duration-300 hover:border-neutral-200 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-colors duration-200 group-hover:bg-neutral-900 group-hover:text-white dark:bg-neutral-800 dark:text-neutral-400 dark:group-hover:bg-white dark:group-hover:text-neutral-900">
          {iconMap[roadmap.icon]}
        </div>
        <Badge className={difficultyColors[roadmap.difficulty]}>
          {roadmap.difficulty}
        </Badge>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        {roadmap.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        {roadmap.description}
      </p>

      <div className="mt-5 space-y-2">
        {roadmap.steps.slice(0, 3).map((step, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              {i + 1}
            </span>
            <span className="truncate">{step.title}</span>
          </div>
        ))}
        {roadmap.steps.length > 3 && (
          <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              +
            </span>
            <span>{roadmap.steps.length - 3} more steps</span>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
        <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 dark:text-neutral-500">
          <Clock className="h-3.5 w-3.5" />
          {roadmap.duration}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-neutral-500 group-hover:text-neutral-900 transition-colors duration-200 dark:text-neutral-400 dark:group-hover:text-white">
          Start learning
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
