import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Cortex',
  description: 'Privacy policy for Cortex blog.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <section className="border-b border-neutral-100 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2>Overview</h2>
          <p>
            Cortex ("we", "us", "our") is committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, and safeguard information when you visit
            our website at cortex-blog-sigma.vercel.app.
          </p>

          <h2>Information We Collect</h2>
          <h3>Analytics</h3>
          <p>
            We use Google Analytics 4 (GA4) to understand how visitors use our site. This
            collects anonymized data such as:
          </p>
          <ul>
            <li>Pages viewed and time spent on each page</li>
            <li>Browser type, device, and screen size</li>
            <li>Approximate geographic location (country/region level)</li>
            <li>Referral source (how you found our site)</li>
          </ul>
          <p>This data is aggregated and cannot be used to identify individual visitors.</p>

          <h3>Newsletter</h3>
          <p>
            If you subscribe to our newsletter via Resend, we collect your email address.
            You can unsubscribe at any time by clicking the unsubscribe link in any email.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website uses cookies for analytics and functionality. You can disable cookies
            through your browser settings, though some features may not work as expected.
          </p>

          <h2>Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>Vercel</strong> — Hosting and deployment</li>
            <li><strong>Google Analytics</strong> — Website analytics</li>
            <li><strong>Resend</strong> — Newsletter email delivery</li>
            <li><strong>GitHub</strong> — Code repository and CI/CD</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your information. Our site
            is served over HTTPS, and we do not store sensitive personal data on our servers.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to any personal data we hold about you</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of analytics tracking</li>
            <li>Unsubscribe from our newsletter at any time</li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on
            this page with an updated date.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this Privacy Policy? Email us at{' '}
            <Link href="mailto:privacy@cortex-blog.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              privacy@cortex-blog.com
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
