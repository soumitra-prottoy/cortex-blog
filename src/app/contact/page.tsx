export const metadata = {
  title: 'Contact — Cortex',
  description: 'Get in touch with the Cortex team.',
};

export default function ContactPage() {
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
              Have a question, suggestion, or feedback? We'd love to hear from you.
            </p>
            <a
              href="mailto:hello@cortex-blog.com"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              hello@cortex-blog.com
            </a>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Business & Partnerships</h2>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              Interested in collaborating or advertising? Let's talk.
            </p>
            <a
              href="mailto:partners@cortex-blog.com"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              partners@cortex-blog.com
            </a>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:col-span-2">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Suggest a Tool</h2>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              Know an AI tool we should review or include in our directory? Send us the name
              and we'll check it out.
            </p>
            <a
              href="mailto:tools@cortex-blog.com"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              tools@cortex-blog.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
