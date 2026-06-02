'use client';

import { useState, useEffect } from 'react';
import { List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function parseHeadings(content: string): TocItem[] {
  const lines = content.split('\n');
  const headings: TocItem[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)/);
    const h3Match = line.match(/^###\s+(.+)/);

    if (h2Match) {
      headings.push({
        id: slugify(h2Match[1]),
        text: h2Match[1],
        level: 2,
      });
    } else if (h3Match) {
      headings.push({
        id: slugify(h3Match[1]),
        text: h3Match[1],
        level: 3,
      });
    }
  }

  return headings;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  const headings = parseHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24">
      <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
          <List className="h-4 w-4" />
          Table of Contents
        </div>

        <nav className="mt-4 space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                'block rounded-lg px-3 py-2 text-sm transition-all duration-200',
                heading.level === 3 ? 'pl-6' : '',
                activeId === heading.id
                  ? 'bg-white text-neutral-900 font-medium shadow-sm dark:bg-neutral-800 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              )}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(heading.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
