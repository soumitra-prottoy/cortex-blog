'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Moon, Sun, Brain } from 'lucide-react';

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/tools', label: 'Tools' },
  { href: '/comparisons', label: 'Comparisons' },
  { href: '/roadmaps', label: 'Roadmaps' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header
      className={`static w-full transition-all duration-300 border-b border-neutral-200/50 dark:border-white/5`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 transition-all duration-200 group-hover:scale-105 shadow-sm shadow-neutral-900/20 dark:shadow-white/20">
            <Brain className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
            Cortex
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>

          <button
            onClick={toggleDark}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="/newsletter"
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-800 transition-all duration-200 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 shadow-sm shadow-neutral-900/10 dark:shadow-white/10"
          >
            Subscribe
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden glass-strong border-t border-neutral-200/50 dark:border-white/5 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 transition-all duration-200 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/newsletter"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex h-11 items-center justify-center rounded-xl bg-neutral-900 text-sm font-medium text-white hover:bg-neutral-800 transition-all duration-200 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                Subscribe to Newsletter
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
