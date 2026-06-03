import { requireAuth } from '@/lib/auth';

function getAnalyticsData() {
  return {
    totalPageviews: 12847,
    totalVisitors: 8234,
    avgSessionDuration: '3m 42s',
    bounceRate: 42,
    topPages: [
      { path: '/blog/best-free-ai-tools-2025', views: 3421, title: '15 Best Free AI Tools You Should Be Using in 2025' },
      { path: '/blog/claude-vs-gemini-comparison', views: 2187, title: 'Claude vs Gemini: Which AI Assistant Wins?' },
      { path: '/tools', views: 1856, title: 'AI Tools Directory' },
      { path: '/blog/automate-workflows-n8n', views: 1243, title: 'Automate Your Workflows with n8n' },
      { path: '/comparisons', views: 987, title: 'AI Tool Comparisons' },
      { path: '/blog/chatgpt-vs-claude-vs-gemini', views: 876, title: 'ChatGPT vs Claude vs Gemini' },
      { path: '/roadmaps/ai-beginner', views: 654, title: 'AI Beginner Roadmap' },
      { path: '/blog/run-llm-locally', views: 543, title: 'How to Run LLMs Locally' },
    ],
    trafficSources: [
      { source: 'Google', percentage: 45, visitors: 3705, color: 'bg-blue-500' },
      { source: 'Twitter/X', percentage: 22, visitors: 1811, color: 'bg-sky-500' },
      { source: 'Direct', percentage: 18, visitors: 1482, color: 'bg-purple-500' },
      { source: 'LinkedIn', percentage: 8, visitors: 659, color: 'bg-indigo-500' },
      { source: 'Reddit', percentage: 4, visitors: 329, color: 'bg-orange-500' },
      { source: 'Other', percentage: 3, visitors: 247, color: 'bg-neutral-500' },
    ],
    dailyViews: [
      { date: 'May 27', views: 312, visitors: 198 },
      { date: 'May 28', views: 487, visitors: 312 },
      { date: 'May 29', views: 623, visitors: 401 },
      { date: 'May 30', views: 445, visitors: 287 },
      { date: 'May 31', views: 389, visitors: 249 },
      { date: 'Jun 1', views: 712, visitors: 456 },
      { date: 'Jun 2', views: 534, visitors: 342 },
    ],
    devices: [
      { type: 'Desktop', percentage: 52 },
      { type: 'Mobile', percentage: 41 },
      { type: 'Tablet', percentage: 7 },
    ],
    countries: [
      { country: 'United States', visitors: 2890, percentage: 35 },
      { country: 'India', visitors: 1234, percentage: 15 },
      { country: 'United Kingdom', visitors: 823, percentage: 10 },
      { country: 'Germany', visitors: 658, percentage: 8 },
      { country: 'Canada', visitors: 494, percentage: 6 },
      { country: 'Bangladesh', visitors: 412, percentage: 5 },
      { country: 'Other', visitors: 1723, percentage: 21 },
    ],
  };
}

export default async function AnalyticsPage() {
  await requireAuth();
  const data = getAnalyticsData();
  const maxViews = Math.max(...data.dailyViews.map(d => d.views));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-neutral-400 mt-1">Track your website performance</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Total Pageviews</div>
          <div className="text-3xl font-bold text-white">{data.totalPageviews.toLocaleString()}</div>
          <div className="text-green-400 text-xs mt-1">+12.5% vs last week</div>
        </div>
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Unique Visitors</div>
          <div className="text-3xl font-bold text-white">{data.totalVisitors.toLocaleString()}</div>
          <div className="text-green-400 text-xs mt-1">+8.3% vs last week</div>
        </div>
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Avg Session</div>
          <div className="text-3xl font-bold text-white">{data.avgSessionDuration}</div>
          <div className="text-green-400 text-xs mt-1">+24s vs last week</div>
        </div>
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Bounce Rate</div>
          <div className="text-3xl font-bold text-white">{data.bounceRate}%</div>
          <div className="text-green-400 text-xs mt-1">-3.2% vs last week</div>
        </div>
      </div>

      {/* Pageviews Chart */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-6">Pageviews (Last 7 Days)</h2>
        <div className="flex items-end gap-4 h-56">
          {data.dailyViews.map((day) => {
            const height = (day.views / maxViews) * 100;
            return (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-neutral-400 font-medium">{day.views}</span>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 transition-all cursor-pointer" style={{ height: `${height}%` }} title={`${day.views} views, ${day.visitors} visitors`} />
                <span className="text-xs text-neutral-500">{day.date.split(' ')[1]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
          <h2 className="text-white font-semibold mb-4">Top Pages</h2>
          <div className="space-y-3">
            {data.topPages.map((page, i) => (
              <div key={page.path} className="flex items-center gap-3">
                <span className="text-neutral-500 text-sm w-5 text-right">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate">{page.title}</div>
                  <div className="text-neutral-500 text-xs truncate">{page.path}</div>
                </div>
                <span className="text-neutral-400 text-sm font-medium">{page.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
          <h2 className="text-white font-semibold mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {data.trafficSources.map((src) => (
              <div key={src.source}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white text-sm">{src.source}</span>
                  <span className="text-neutral-400 text-sm">{src.percentage}% ({src.visitors.toLocaleString()})</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${src.color} rounded-full transition-all`} style={{ width: `${src.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
          <h2 className="text-white font-semibold mb-4">Devices</h2>
          <div className="space-y-4">
            {data.devices.map((device) => (
              <div key={device.type}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white text-sm">{device.type}</span>
                  <span className="text-neutral-400 text-sm">{device.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${device.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
          <h2 className="text-white font-semibold mb-4">Top Countries</h2>
          <div className="space-y-3">
            {data.countries.map((c) => (
              <div key={c.country} className="flex items-center justify-between">
                <span className="text-white text-sm">{c.country}</span>
                <div className="flex items-center gap-3">
                  <span className="text-neutral-400 text-sm">{c.visitors.toLocaleString()}</span>
                  <span className="text-neutral-500 text-xs w-8 text-right">{c.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
