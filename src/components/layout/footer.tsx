import Link from 'next/link';
import { Brain, Rss, Code2 } from 'lucide-react';

const footerLinks = {
  content: [
    { href: '/blog', label: 'All Posts' },
    { href: '/blog?category=tutorials', label: 'Tutorials' },
    { href: '/blog?category=beginner-guides', label: 'Beginner Guides' },
    { href: '/blog?category=comparisons', label: 'Comparisons' },
  ],
  tools: [
    { href: '/tools', label: 'Tool Directory' },
    { href: '/tools?category=ai-assistants', label: 'AI Assistants' },
    { href: '/tools?category=local-ai', label: 'Local AI' },
    { href: '/tools?category=image-generation', label: 'Image Generation' },
  ],
  learn: [
    { href: '/roadmaps', label: 'Roadmaps' },
    { href: '/comparisons', label: 'Comparisons' },
    { href: '/blog?category=automation', label: 'Automation' },
    { href: '/blog?category=open-source', label: 'Open Source' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-neutral-200/50 dark:border-white/5">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white transition-transform duration-200 group-hover:scale-105 dark:bg-white dark:text-neutral-900">
                <Brain className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                Cortex
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              Your neural network for AI knowledge. Tools, tutorials, and insights to start smarter with AI.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="glass-card flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-900 transition-all duration-200 dark:hover:text-white" aria-label="Twitter">
                <Code2 className="h-4 w-4" />
              </a>
              <a href="/rss.xml" className="glass-card flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-900 transition-all duration-200 dark:hover:text-white" aria-label="RSS">
                <Rss className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Content</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.content.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-200 dark:text-neutral-400 dark:hover:text-white hover:translate-x-0.5 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Tools</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-200 dark:text-neutral-400 dark:hover:text-white hover:translate-x-0.5 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Learn</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-200 dark:text-neutral-400 dark:hover:text-white hover:translate-x-0.5 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Company</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-200 dark:text-neutral-400 dark:hover:text-white hover:translate-x-0.5 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200/50 pt-8 dark:border-white/5">
          <p className="text-center text-sm text-neutral-400 dark:text-neutral-500">
            &copy; {new Date().getFullYear()} Cortex. All rights reserved. Built with Next.js and deployed on Vercel.
          </p>
        </div>
      </div>
    </footer>
  );
}
