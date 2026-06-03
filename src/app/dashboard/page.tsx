import { cookies } from 'next/headers';
import { blogPosts, tools, comparisons, roadmaps } from '@/data';
import Link from 'next/link';
import StatsBar from '@/components/dashboard/stats-bar';

// Simulated analytics data (replace with real data from Vercel Analytics or Plausible)
function getAnalyticsData() {
  // In production, you'd fetch from your analytics API
  const totalPageviews = 12847;
  const totalVisitors = 8234;
  const avgSessionDuration = '3m 42s';
  const bounceRate = '42%';
  const topPages = [
    { path: '/blog/best-free-ai-tools-2025', views: 3421 },
    { path: '/blog/claude-vs-gemini-comparison', views: 2187 },
    { path: '/tools', views: 1856 },
    { path: '/blog/automate-workflows-n8n', views: 1243 },
    { path: '/comparisons', views: 987 },
  ];
  const trafficSources = [
    { source: 'Google', percentage: 45, visitors: 3705 },
    { source: 'Twitter/X', percentage: 22, visitors: 1811 },
    { source: 'Direct', percentage: 18, visitors: 1482 },
    { source: 'LinkedIn', percentage: 8, visitors: 659 },
    { source: 'Other', percentage: 7, visitors: 576 },
  ];
  // Last 7 days of pageviews
  const last7Days = [
    { date: 'May 27', views: 312 },
    { date: 'May 28', views: 487 },
    { date: 'May 29', views: 623 },
    { date: 'May 30', views: 445 },
    { date: 'May 31', views: 389 },
    { date: 'Jun 1', views: 712 },
    { date: 'Jun 2', views: 534 },
  ];
  return { totalPageviews, totalVisitors, avgSessionDuration, bounceRate, topPages, trafficSources, last7Days };
}

function getEarningsData() {
  // In production, integrate with Google AdSense, affiliate APIs, etc.
  return {
    totalRevenue: 284.50,
    thisMonth: 87.30,
    lastMonth: 72.10,
    adRevenue: 156.20,
    affiliateRevenue: 98.30,
    sponsorships: 30.00,
    breakdown: [
      { source: 'Google AdSense', amount: 156.20, change: '+12%' },
      { source: 'Affiliate Links', amount: 98.30, change: '+8%' },
      { source: 'Sponsorships', amount: 30.00, change: '+25%' },
    ],
    recentEarnings: [
      { date: 'Jun 2', source: 'AdSense', amount: 12.40 },
      { date: 'Jun 2', source: 'Affiliate', amount: 8.20 },
      { date: 'Jun 1', source: 'AdSense', amount: 11.80 },
      { date: 'Jun 1', source: 'Sponsor', amount: 30.00 },
      { date: 'May 31', source: 'AdSense', amount: 10.50 },
    ],
  };
}

export default async function DashboardHomePage() {
  const analytics = getAnalyticsData();
  const earnings = getEarningsData();
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

      {/* Stats Bar */}
      <StatsBar
        pageviews={analytics.totalPageviews}
        visitors={analytics.totalVisitors}
        avgSession={analytics.avgSessionDuration}
        bounceRate={analytics.bounceRate}
        revenue={earnings.totalRevenue}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-neutral-900 rounded-2xl border border-white/5 p-6">
          <h2 className="text-white font-semibold mb-6">Pageviews (Last 7 Days)</h2>
          <div className="flex items-end gap-3 h-48">
            {analytics.last7Days.map((day) => {
              const maxViews = Math.max(...analytics.last7Days.map(d => d.views));
              const height = (day.views / maxViews) * 100;
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-neutral-400">{day.views}</span>
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all hover:from-blue-500 hover:to-blue-300" style={{ height: `${height}%` }} />
                  <span className="text-xs text-neutral-500">{day.date.split(' ')[1]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
          <h2 className="text-white font-semibold mb-4">Revenue</h2>
          <div className="text-3xl font-bold text-white mb-1">${earnings.totalRevenue.toFixed(2)}</div>
          <div className="text-sm text-green-400 mb-6">{earnings.thisMonth > earnings.lastMonth && '+'}{((earnings.thisMonth - earnings.lastMonth) / earnings.lastMonth * 100).toFixed(0)}% from last month</div>
          <div className="space-y-3">
            {earnings.breakdown.map((item) => (
              <div key={item.source} className="flex items-center justify-between">
                <span className="text-neutral-400 text-sm">{item.source}</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-sm">${item.amount.toFixed(2)}</span>
                  <span className={`text-xs ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
          <h2 className="text-white font-semibold mb-4">Top Pages</h2>
          <div className="space-y-3">
            {analytics.topPages.map((page, i) => (
              <div key={page.path} className="flex items-center gap-4">
                <span className="text-neutral-500 text-sm w-4">{i + 1}</span>
                <span className="text-white text-sm flex-1 truncate">{page.path}</span>
                <span className="text-neutral-400 text-sm">{page.views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
          <h2 className="text-white font-semibold mb-4">Traffic Sources</h2>
          <div className="space-y-3">
            {analytics.trafficSources.map((src) => (
              <div key={src.source}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm">{src.source}</span>
                  <span className="text-neutral-400 text-sm">{src.percentage}% ({src.visitors.toLocaleString()})</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${src.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Overview & Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Stats */}
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
          <h2 className="text-white font-semibold mb-4">Content</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-neutral-400">Blog Posts</span>
              <span className="text-white font-medium">{posts.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Tools</span>
              <span className="text-white font-medium">{tools.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Comparisons</span>
              <span className="text-white font-medium">{comparisons.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Roadmaps</span>
              <span className="text-white font-medium">{roadmaps.length}</span>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="lg:col-span-2 bg-neutral-900 rounded-2xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Recent Posts</h2>
            <Link href="/dashboard/posts" className="text-blue-400 text-sm hover:text-blue-300">View all</Link>
          </div>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/dashboard/posts?edit=${post.slug}`} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition">
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
      </div>

      {/* Quick Actions */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/dashboard/posts/new" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition text-center">
            <div className="text-2xl mb-2">📝</div>
            <div className="text-white text-sm font-medium">Write Post</div>
          </Link>
          <Link href="/dashboard/posts" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition text-center">
            <div className="text-2xl mb-2">📄</div>
            <div className="text-white text-sm font-medium">Manage Posts</div>
          </Link>
          <Link href="/dashboard/analytics" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-white text-sm font-medium">View Analytics</div>
          </Link>
          <Link href="/dashboard/settings" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition text-center">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="text-white text-sm font-medium">Settings</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
