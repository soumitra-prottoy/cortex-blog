import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-neutral-200 dark:text-neutral-800">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white">
        Page not found
      </h2>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </Link>
        <Link href="/blog">
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Browse Blog
          </Button>
        </Link>
      </div>
    </div>
  );
}
