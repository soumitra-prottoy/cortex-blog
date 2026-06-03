import { requireAuth } from '@/lib/auth';
import { blogPosts } from '@/data';

export default async function AnalyticsPage() {
  await requireAuth();
  const posts = blogPosts;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-neutral-400 mt-1">Track your website performance</p>
      </div>

      {/* Honest State */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-8 text-center">
        <div className="text-4xl mb-4">A</div>
        <h2 className="text-white text-xl font-semibold mb-2">No Analytics Connected</h2>
        <p className="text-neutral-400 max-w-md mx-auto mb-6">
          Connect an analytics provider to see real visitor data — pageviews, traffic sources, top pages, devices, and more.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="https://vercel.com/analytics" target="_blank" rel="noopener" className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition">
            Enable Vercel Analytics
          </a>
          <a href="https://analytics.google.com" target="_blank" rel="noopener" className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-sm hover:bg-white/20 transition">
            Setup Google Analytics
          </a>
          <a href="https://plausible.io" target="_blank" rel="noopener" className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-sm hover:bg-white/20 transition">
            Setup Plausible
          </a>
        </div>
      </div>

      {/* What you will see */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">What you will see here</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">Pageviews</div>
            <div className="text-neutral-400 text-sm">Daily and weekly pageview trends</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">Visitors</div>
            <div className="text-neutral-400 text-sm">Unique visitors and returning users</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">Top Pages</div>
            <div className="text-neutral-400 text-sm">Which posts get the most traffic</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">Traffic Sources</div>
            <div className="text-neutral-400 text-sm">Google, Twitter, Direct, etc.</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">Devices</div>
            <div className="text-neutral-400 text-sm">Desktop vs Mobile vs Tablet</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">Countries</div>
            <div className="text-neutral-400 text-sm">Where your visitors are from</div>
          </div>
        </div>
      </div>

      {/* Content you have */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">Your Content</h2>
        <div className="space-y-3">
          {posts.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} target="_blank" className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition">
              {post.image && (
                <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                  <img src={post.image} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{post.title}</div>
                <div className="text-neutral-500 text-xs mt-0.5">{post.date}  {post.readTime}</div>
              </div>
              <span className="text-neutral-500 text-xs">Analytics coming</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
