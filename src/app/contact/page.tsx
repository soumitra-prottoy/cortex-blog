import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Contact — Cortex',
  description: 'Get in touch with the Cortex team.',
};

async function submitForm(formData: FormData) {
  'use server';
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const topic = formData.get('topic') as string;
  const message = formData.get('message') as string;

  console.log('Contact form:', { name, email, topic, message });
  // TODO: send email via Resend/SendGrid
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <section className="border-b border-neutral-100 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Contact
          </h1>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            Get in touch with the Cortex team.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">General Inquiries</h2>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              Have a question, suggestion, or feedback? Fill out the form.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Business & Partnerships</h2>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              Interested in collaborating or advertising? Let's talk.
            </p>
          </div>
        </div>

        <div className="mt-12">
          {searchParams.sent === '1' && (
            <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300">
              ✓ Message sent successfully! We'll get back to you soon.
            </div>
          )}

          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Send us a message</h2>
            <form action={submitForm} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Topic</label>
                <select
                  id="topic"
                  name="topic"
                  className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                >
                  <option value="general">General Inquiry</option>
                  <option value="business">Business & Partnerships</option>
                  <option value="tool-suggestion">Suggest a Tool</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
