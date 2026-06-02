'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewsletterClient() {
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
    <div className="bg-white dark:bg-neutral-950">
      <section className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            <Mail className="h-7 w-7" />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Subscribe to AIBlog
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
            Get the latest AI tools, tutorials, comparisons, and automation guides delivered to your inbox. No spam, ever.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 dark:border-emerald-800 dark:bg-emerald-950"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
                  You are subscribed!
                </h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Check your inbox for a confirmation email.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="mt-10"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full sm:flex-1 h-12"
              />
              <Button type="submit" size="lg" className="w-full sm:w-auto h-12">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-100 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="font-semibold text-neutral-900 dark:text-white">
                What you will get
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  'Weekly AI tool reviews and comparisons',
                  'Step-by-step tutorials for beginners',
                  'Exclusive automation workflows',
                  'Early access to new content',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Sparkles className="h-4 w-4 shrink-0 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
              Join 10,000+ readers. Unsubscribe anytime. We respect your privacy.
            </p>
          </motion.form>
        )}
      </section>
    </div>
  );
}
