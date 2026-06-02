'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, GraduationCap, GitCompare, Cpu, Zap, Code, PenTool, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data';

const categoryIcons: Record<string, React.ReactNode> = {
  Wrench: <BookOpen className="h-5 w-5" />,
  BookOpen: <BookOpen className="h-5 w-5" />,
  GraduationCap: <GraduationCap className="h-5 w-5" />,
  GitCompare: <GitCompare className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  PenTool: <PenTool className="h-5 w-5" />,
  Code: <Code className="h-5 w-5" />,
};

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function NeuralBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Neural network nodes */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="neural" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Connections */}
            <line x1="40" y1="40" x2="100" y2="20" stroke="currentColor" strokeWidth="0.5" />
            <line x1="100" y1="20" x2="160" y2="60" stroke="currentColor" strokeWidth="0.5" />
            <line x1="40" y1="40" x2="60" y2="100" stroke="currentColor" strokeWidth="0.5" />
            <line x1="100" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="0.5" />
            <line x1="60" y1="100" x2="140" y2="100" stroke="currentColor" strokeWidth="0.5" />
            <line x1="140" y1="100" x2="160" y2="60" stroke="currentColor" strokeWidth="0.5" />
            <line x1="60" y1="100" x2="100" y2="150" stroke="currentColor" strokeWidth="0.5" />
            <line x1="140" y1="100" x2="100" y2="150" stroke="currentColor" strokeWidth="0.5" />
            <line x1="100" y1="150" x2="160" y2="60" stroke="currentColor" strokeWidth="0.3" />
            {/* Primary nodes */}
            <circle cx="40" cy="40" r="4" fill="currentColor" />
            <circle cx="100" cy="20" r="5" fill="currentColor" />
            <circle cx="160" cy="60" r="4" fill="currentColor" />
            <circle cx="60" cy="100" r="4" fill="currentColor" />
            <circle cx="140" cy="100" r="4" fill="currentColor" />
            <circle cx="100" cy="150" r="5" fill="currentColor" />
            <circle cx="80" cy="80" r="3" fill="currentColor" />
            <circle cx="120" cy="70" r="3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural)" />
      </svg>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/3 rounded-full blur-3xl" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-neutral-950">
      <NeuralBackground />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <Badge className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">
              <Sparkles className="h-3.5 w-3.5" />
              Your neural network for AI knowledge
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            Start Smarter with AI
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg leading-relaxed text-neutral-500 sm:text-xl dark:text-neutral-400"
          >
            Honest guides, tool comparisons, and practical tutorials for AI tools, agents, and automation. No hype. No fluff. Just what works.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/blog">
              <button className="w-full sm:w-auto h-12 px-8 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all duration-200 inline-flex items-center justify-center gap-2">
                Start Reading
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/roadmaps">
              <button className="w-full sm:w-auto h-12 px-8 rounded-xl border border-neutral-200 bg-transparent text-neutral-900 text-sm font-medium hover:bg-neutral-50 transition-all duration-200 inline-flex items-center justify-center dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800">
                Explore Roadmaps
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mx-auto mt-20 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="grid grid-cols-3 gap-8 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-8 dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">50+</div>
              <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">30+</div>
              <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">10K+</div>
              <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Readers</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FeaturedPostsSection() {
  const featured = categories.filter(c => c.slug !== 'ai-tools').slice(0, 6);

  return (
    <section className="bg-white py-20 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Explore Topics
          </h2>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            Everything you need to start smarter with AI
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          {featured.map((cat) => (
            <motion.div key={cat.slug} variants={fadeInUp}>
              <Link
                href={`/blog?category=${cat.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-neutral-100 bg-white p-6 transition-all duration-200 hover:border-neutral-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-colors duration-200 group-hover:bg-neutral-900 group-hover:text-white dark:bg-neutral-800 dark:text-neutral-400 dark:group-hover:bg-white dark:group-hover:text-neutral-900">
                  {categoryIcons[cat.icon]}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {cat.description}
                  </p>
                  <span className="mt-2 inline-block text-xs font-medium text-neutral-400 dark:text-neutral-500">
                    {cat.postCount} articles
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
