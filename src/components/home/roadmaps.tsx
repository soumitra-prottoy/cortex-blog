'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { roadmaps } from '@/data';
import RoadmapCard from '@/components/home/roadmap-card';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function RoadmapsSection() {
  return (
    <section className="relative py-24 sm:py-32">
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center" {...fadeInUp}>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Beginner Roadmaps
          </h2>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            Structured learning paths to guide your AI journey
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map((roadmap, i) => (
            <motion.div
              key={roadmap.slug}
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <RoadmapCard roadmap={roadmap} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-200 dark:text-neutral-400 dark:hover:text-white"
          >
            View all roadmaps
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
