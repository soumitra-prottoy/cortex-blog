import Link from 'next/link';

export const metadata = {
  title: 'About — Cortex',
  description: 'Learn about Cortex — your neural network for AI knowledge.',
};

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <section className="border-b border-neutral-100 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            About Cortex
          </h1>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            Your neural network for AI knowledge.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2>What is Cortex?</h2>
          <p>
            Cortex is an AI knowledge blog dedicated to helping beginners and professionals
            navigate the rapidly evolving world of artificial intelligence. We provide honest
            guides, detailed tool comparisons, and practical tutorials — no hype, no fluff,
            just what works.
          </p>

          <h2>Our Mission</h2>
          <p>
            We believe AI tools should be accessible to everyone, not just tech experts.
            Our mission is to demystify AI by providing clear, researched, and actionable
            content that helps you start smarter with AI.
          </p>

          <h2>What We Cover</h2>
          <ul>
            <li><strong>AI Tools</strong> — Honest reviews and comparisons of the best AI tools available</li>
            <li><strong>Tutorials</strong> — Step-by-step guides to master AI tools and workflows</li>
            <li><strong>Comparisons</strong> — Head-to-head comparisons so you can pick the right tool</li>
            <li><strong>Automation</strong> — Practical workflows that save you hours every week</li>
            <li><strong>Local AI</strong> — Run AI models on your own hardware for privacy and control</li>
            <li><strong>Open Source</strong> — The best open-source AI models and how to use them</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            Have a question, suggestion, or want to collaborate? Reach out to us at{' '}
            <Link href="mailto:hello@cortex-blog.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              hello@cortex-blog.com
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
