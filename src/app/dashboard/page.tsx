import { blogPosts, tools, comparisons, roadmaps } from '@/data';
import Link from 'next/link';

export default async function DashboardHomePage() {
  const posts = blogPosts;
  const recentPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-neutral-400 mt-1">Here is how Cortex is performing</p>
        </div>
        <Link href="/dashboard/posts/new" className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition">
          + New Post
        </Link>
      </div>

      {/* Real Stats Only */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Blog Posts</div>
          <div className="text-3xl font-bold text-white">{posts.length}</div>
        </div>
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Tools Listed</div>
          <div className="text-3xl font-bold text-white">{tools.length}</div>
        </div>
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Comparisons</div>
          <div className="text-3xl font-bold text-white">{comparisons.length}</div>
        </div>
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Roadmaps</div>
          <div className="text-3xl font-bold text-white">{roadmaps.length}</div>
        </div>
      </div>

      {/* Revenue - Honest */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">Revenue</h2>
        <div className="text-3xl font-bold text-white mb-1">$0.00</div>
        <p className="text-neutral-500 text-sm">
          No revenue yet. Connect Google AdSense or affiliate programs to start tracking earnings here.
        </p>
      </div>

      {/* Analytics - Honest */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">Analytics</h2>
        <div className="text-neutral-500 text-sm">
          No analytics data yet. Connect Vercel Analytics, Google Analytics, or Plausible to see real visitor data here.
        </div>
        <div className="mt-4 flex gap-3">
          <a href="https://vercel.com/analytics" target="_blank" rel="noopener" className="px-4 py-2 rounded-lg bg-white/5 text-neutral-300 text-sm hover:bg-white/10 transition">
            Setup Vercel Analytics
          </a>
          <a href="https://analytics.google.com" target="_blank" rel="noopener" className="px-4 py-2 rounded-lg bg-white/5 text-neutral-300 text-sm hover:bg-white/10 transition">
            Setup Google Analytics
          </a>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Recent Posts</h2>
          <Link href="/dashboard/posts" className="text-blue-400 text-sm hover:text-blue-300">View all</Link>
        </div>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} target="_blank" className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition">
              {post.image && (
                <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                  <img src={post.image} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{post.title}</div>
                <div className="text-neutral-500 text-xs mt-0.5">{post.date}  {post.readTime}</div>
              </div>
              <div className="flex gap-2">
                {post.featured && <span className="px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-400 text-xs">Featured</span>}
                {post.trending && <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-xs">Trending</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/dashboard/posts/new" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition text-center">
            <div className="text-2xl mb-2">+</div>
            <div className="text-white text-sm font-medium">Write Post</div>
          </Link>
          <Link href="/dashboard/posts" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition text-center">
            <div className="text-2xl mb-2">P</div>
            <div className="text-white text-sm font-medium">Manage Posts</div>
          </Link>
          <Link href="/dashboard/analytics" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition text-center">
            <div className="text-2xl mb-2">A</div>
            <div className="text-white text-sm font-medium">Analytics</div>
          </Link>
          <Link href="/dashboard/settings" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition text-center">
            <div className="text-2xl mb-2">S</div>
            <div className="text-white text-sm font-medium">Settings</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
