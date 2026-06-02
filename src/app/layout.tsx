import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cortex.vercel.app'),
  title: {
    default: 'Cortex — Start Smarter with AI',
    template: '%s | Cortex',
  },
  description: 'Your neural network for AI knowledge. Honest guides, tool comparisons, tutorials, and automation workflows for AI beginners. No hype, no fluff.',
  keywords: ['AI tools', 'AI for beginners', 'AI tutorials', 'AI agents', 'open source AI', 'automation', 'local AI', 'AI comparisons', 'beginner AI guide', 'free AI tools', 'ChatGPT', 'Claude', 'AI productivity'],
  authors: [{ name: 'Cortex' }],
  creator: 'Cortex',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Cortex',
    title: 'Cortex — Start Smarter with AI',
    description: 'Your neural network for AI knowledge. Tools, tutorials, and insights for AI beginners.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cortex — Start Smarter with AI',
    description: 'Your neural network for AI knowledge.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-white font-sans text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
