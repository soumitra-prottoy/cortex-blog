import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cortex-blog-sigma.vercel.app'),
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
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
        {/* TODO: Add Google Search Console verification meta tag here */}
        {/* <meta name="google-site-verification" content="YOUR_CODE_HERE" /> */}
        <GoogleAnalytics />
      </head>
      <body className="flex flex-col font-sans text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
