'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, CheckCircle } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch { /* silent */ }
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(ellipse, rgba(100,60,220,0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
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
              className="mt-8 glass-card rounded-2xl p-6"
            >
              <CheckCircle className="mx-auto h-8 w-8 text-emerald-500" />
              <p className="mt-3 text-lg font-semibold text-neutral-900 dark:text-white">
                You are subscribed!
              </p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Check your inbox for a confirmation email.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="glass-card w-full sm:flex-1 h-12 rounded-xl px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:text-white dark:placeholder:text-neutral-500"
              />
              <button
                type="submit"
                className="group relative w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] dark:bg-white dark:text-neutral-900 dark:shadow-white/20 overflow-hidden"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-500">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
