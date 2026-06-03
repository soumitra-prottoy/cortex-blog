'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import NeuralBackground from './NeuralBackground';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Canvas neural background */}
      <NeuralBackground />

      {/* Gradient mesh orbs */}
      <div className="gradient-mesh">
        <div
          className="orb animate-glow-breathe"
          style={{
            width: '50vw',
            height: '50vw',
            top: '-10%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(100,60,220,0.12) 0%, transparent 70%)',
            opacity: 0.6,
            filter: 'blur(80px)',
          }}
        />
        <div
          className="orb animate-glow-breathe"
          style={{
            width: '40vw',
            height: '40vw',
            bottom: '-5%',
            right: '-8%',
            background: 'radial-gradient(circle, rgba(60,100,220,0.1) 0%, transparent 70%)',
            opacity: 0.5,
            filter: 'blur(80px)',
            animationDelay: '4s',
          }}
        />
        <div
          className="orb animate-float-slow"
          style={{
            width: '30vw',
            height: '30vw',
            top: '40%',
            right: '15%',
            background: 'radial-gradient(circle, rgba(120,80,200,0.08) 0%, transparent 70%)',
            opacity: 0.4,
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              <Sparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
              <span>Your neural network for AI knowledge</span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl dark:text-white leading-[1.1]"
          >
            Start Smarter{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient">with AI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500 sm:text-xl dark:text-neutral-400"
          >
            Honest guides, tool comparisons, and practical tutorials for AI tools,
            agents, and automation. No hype. No fluff. Just what works.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/blog"
              className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-neutral-900 px-8 text-sm font-semibold text-white shadow-lg shadow-neutral-900/25 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-900/30 hover:scale-[1.02] dark:bg-white dark:text-neutral-900 dark:shadow-white/20 dark:hover:shadow-white/30"
            >
              <span>Start Reading</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
            <Link
              href="/roadmaps"
              className="glass-card inline-flex h-14 items-center justify-center rounded-2xl px-8 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:scale-[1.02] dark:text-neutral-200"
            >
              Explore Roadmaps
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats — glassmorphism cards */}
        <motion.div
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            { value: '10', label: 'Articles' },
            { value: '8', label: 'AI Tools' },
            { value: '4', label: 'Roadmaps' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl px-4 py-6 sm:px-6"
            >
              <div className="text-2xl font-bold text-neutral-900 sm:text-3xl dark:text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium text-neutral-500 sm:text-sm dark:text-neutral-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
