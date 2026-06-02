'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ExternalLink, Check, X, Star, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { tools } from '@/data';
import type { Tool } from '@/types';

const toolCategories = [
  { slug: 'all', label: 'All Tools' },
  { slug: 'ai-assistants', label: 'AI Assistants' },
  { slug: 'local-ai', label: 'Local AI' },
  { slug: 'image-generation', label: 'Image Generation' },
  { slug: 'development', label: 'Development' },
  { slug: 'productivity', label: 'Productivity' },
  { slug: 'audio', label: 'Audio' },
  { slug: 'search', label: 'Search' },
];

const pricingFilters = [
  { slug: 'all', label: 'All' },
  { slug: 'free', label: 'Free' },
  { slug: 'freemium', label: 'Freemium' },
  { slug: 'paid', label: 'Paid' },
];

function PricingBadge({ pricing }: { pricing: Tool['pricing'] }) {
  const styles = {
    free: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
    freemium: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
    paid: 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700',
  };

  return (
    <Badge className={styles[pricing]}>
      {pricing === 'free' ? 'Free' : pricing === 'freemium' ? 'Freemium' : 'Paid'}
    </Badge>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="group rounded-2xl border border-neutral-100 bg-white p-6 transition-all duration-300 hover:border-neutral-200 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-lg font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            {tool.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              {tool.name}
            </h3>
            <div className="mt-1">
              <PricingBadge pricing={tool.pricing} />
            </div>
          </div>
        </div>
        <a
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200 dark:hover:text-white dark:hover:bg-neutral-800"
          aria-label={`Visit ${tool.name}`}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        {tool.description}
      </p>

      {tool.priceNote && (
        <p className="mt-2 text-xs font-medium text-neutral-400 dark:text-neutral-500">
          {tool.priceNote}
        </p>
      )}

      {/* Use Cases */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tool.useCases.map((uc) => (
          <span
            key={uc}
            className="rounded-md bg-neutral-50 px-2 py-1 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
          >
            {uc}
          </span>
        ))}
      </div>

      {/* Pros & Cons */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Pros
          </h4>
          <ul className="mt-2 space-y-1">
            {tool.pros.slice(0, 3).map((pro) => (
              <li key={pro} className="flex items-start gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-red-500 dark:text-red-400">
            Cons
          </h4>
          <ul className="mt-2 space-y-1">
            {tool.cons.slice(0, 3).map((con) => (
              <li key={con} className="flex items-start gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                <X className="mt-0.5 h-3 w-3 shrink-0 text-red-400" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePricing, setActivePricing] = useState('all');

  const filteredTools = useMemo(() => {
    let result = tools;

    if (activeCategory !== 'all') {
      result = result.filter((t) => t.category === activeCategory);
    }

    if (activePricing !== 'all') {
      result = result.filter((t) => t.pricing === activePricing);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.useCases.some((uc) => uc.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCategory, activePricing, searchQuery]);

  return (
    <div className="bg-white dark:bg-neutral-950">
      {/* Header */}
      <section className="border-b border-neutral-100 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            AI Tool Directory
          </h1>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            Curated collection of the best AI tools. Compare features, pricing, and use cases.
          </p>

          {/* Search */}
          <div className="mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Category
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {toolCategories.map((cat) => (
                  <Button
                    key={cat.slug}
                    variant={activeCategory === cat.slug ? 'default' : 'secondary'}
                    size="sm"
                    onClick={() => setActiveCategory(cat.slug)}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Pricing
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {pricingFilters.map((f) => (
                  <Button
                    key={f.slug}
                    variant={activePricing === f.slug ? 'default' : 'secondary'}
                    size="sm"
                    onClick={() => setActivePricing(f.slug)}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-neutral-400 dark:text-neutral-500">
          Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
        </p>

        {filteredTools.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              No tools found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
