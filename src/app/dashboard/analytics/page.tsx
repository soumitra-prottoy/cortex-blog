import { requireAuth } from '@/lib/auth';
import { blogPosts } from '@/data';
import { GA_MEASUREMENT_ID } from '@/lib/ga';

export default async function AnalyticsPage() {
  await requireAuth();
  const posts = blogPosts;
  const gaId = GA_MEASUREMENT_ID;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-neutral-400 mt-1">Track your website performance</p>
      </div>

      {/* GA Connected */}
      <div className="bg-neutral-900 rounded-2xl border border-green-500/20 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-green-400 font-medium">Google Analytics Connected</span>
        </div>
        <p className="text-neutral-400 text-sm">
          Measurement ID: <code className="text-neutral-300 bg-white/5 px-2 py-0.5 rounded">{gaId}</code>
        </p>
      </div>

      {/* Realtime Notice */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-2">Real-time data is being collected</h2>
        <p className="text-neutral-400 text-sm mb-4">
          Google Analytics is now tracking all visitors to Cortex. Data will start appearing in your GA4 dashboard within 24-48 hours. For real-time stats, check your Google Analytics console directly.
        </p>
        <a
          href={`https://analytics.google.com/analytics/web/#/p${gaId.replace('G-', '')}/reports/realtimeoverview`}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition"
        >
          Open Google Analytics Dashboard
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      {/* What you will see in GA */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">What you will see in Google Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">Realtime</div>
            <div className="text-neutral-400 text-sm">Active users right now, pages being viewed</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">Engagement</div>
            <div className="text-neutral-400 text-sm">Sessions, session duration, pages per session</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">Acquisition</div>
            <div className="text-neutral-400 text-sm">Where visitors come from — Google, Twitter, Direct</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">Demographics</div>
            <div className="text-neutral-400 text-sm">Countries, devices, browsers</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">Pages & Screens</div>
            <div className="text-neutral-400 text-sm">Which posts get the most views</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">Events</div>
            <div className="text-neutral-400 text-sm">Newsletter signups, outbound link clicks</div>
          </div>
        </div>
      </div>

      {/* Your Content */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">Your Content ({posts.length} posts)</h2>
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
              <span className="text-green-400 text-xs">Tracking</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
