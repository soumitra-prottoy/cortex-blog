export const metadata = {
  title: 'Terms of Service — Cortex',
  description: 'Terms of service for Cortex blog.',
};

export default function TermsPage() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <section className="border-b border-neutral-100 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using Cortex ("the Website"), you accept and agree to be bound
            by the terms and provisions of this agreement.
          </p>

          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily view the materials on Cortex for personal,
            non-commercial use only. This is the grant of a license, not a transfer of title.
          </p>
          <p>You may not:</p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for commercial purposes</li>
            <li>Attempt to reverse engineer any software on the Website</li>
            <li>Remove any copyright or proprietary notations</li>
          </ul>

          <h2>Disclaimer</h2>
          <p>
            The materials on Cortex are provided on an "as is" basis. We make no warranties,
            expressed or implied, and hereby disclaim all warranties including, without
            limitation, implied warranties of merchantability, fitness for a particular
            purpose, or non-infringement.
          </p>
          <p>
            Tool prices, features, and availability mentioned in our articles may change.
            Always verify current information on the official tool websites before making
            purchasing decisions.
          </p>

          <h2>Accuracy of Content</h2>
          <p>
            We strive to provide accurate and up-to-date information, but we cannot guarantee
            that all content is completely accurate or current. AI tools and pricing change
            frequently. Use our content as a starting point for your own research.
          </p>

          <h2>Affiliate Links</h2>
          <p>
            Some links on our website may be affiliate links. If you click through and make
            a purchase, we may earn a small commission at no extra cost to you. This does not
            affect our reviews or recommendations.
          </p>

          <h2>Limitations</h2>
          <p>
            In no event shall Cortex or its suppliers be liable for any damages arising out
            of the use or inability to use the materials on the Website.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with
            applicable laws, and you irrevocably submit to the exclusive jurisdiction of
            the courts in that location.
          </p>
        </div>
      </section>
    </div>
  );
}
