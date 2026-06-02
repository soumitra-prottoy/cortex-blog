'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-white py-20 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            <Mail className="h-6 w-6" />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Stay in the loop
          </h2>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            Get the latest AI tools, tutorials, and comparisons delivered to your inbox. No spam, unsubscribe anytime.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-950"
            >
              <p className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
                You are subscribed!
              </p>
              <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                Check your inbox for a confirmation email.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full sm:flex-1"
              />
              <Button type="submit" className="w-full sm:w-auto">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-500">
            Join 10,000+ readers. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
