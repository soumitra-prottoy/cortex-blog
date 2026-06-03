import { requireAuth } from '@/lib/auth';
import Link from 'next/link';

function getEarningsData() {
  return {
    totalRevenue: 284.50,
    thisMonth: 87.30,
    lastMonth: 72.10,
    pendingPayout: 45.20,
    nextPayoutDate: 'June 15, 2026',
    breakdown: [
      { source: 'Google AdSense', amount: 156.20, change: 12.3, color: 'bg-green-500' },
      { source: 'Affiliate Links', amount: 98.30, change: 8.1, color: 'bg-blue-500' },
      { source: 'Sponsorships', amount: 30.00, change: 25.0, color: 'bg-purple-500' },
    ],
    monthlyTrend: [
      { month: 'Jan', revenue: 32.40 },
      { month: 'Feb', revenue: 45.20 },
      { month: 'Mar', revenue: 52.80 },
      { month: 'Apr', revenue: 64.10 },
      { month: 'May', revenue: 72.10 },
      { month: 'Jun', revenue: 87.30 },
    ],
    recentEarnings: [
      { date: 'Jun 2', source: 'AdSense', amount: 12.40, type: 'ad' },
      { date: 'Jun 2', source: 'Affiliate', amount: 8.20, type: 'affiliate' },
      { date: 'Jun 1', source: 'AdSense', amount: 11.80, type: 'ad' },
      { date: 'Jun 1', source: 'Sponsor', amount: 30.00, type: 'sponsor' },
      { date: 'May 31', source: 'AdSense', amount: 10.50, type: 'ad' },
      { date: 'May 31', source: 'Affiliate', amount: 5.70, type: 'affiliate' },
      { date: 'May 30', source: 'AdSense', amount: 9.80, type: 'ad' },
      { date: 'May 29', source: 'AdSense', amount: 11.20, type: 'ad' },
    ],
    affiliateLinks: [
      { name: 'AMAZON50', clicks: 1243, conversions: 42, revenue: 56.80, epc: 0.42 },
      { name: 'COURSEAIBUNDLE', clicks: 876, conversions: 18, revenue: 28.50, epc: 0.33 },
      { name: 'HOSTING-DEAL', clicks: 654, conversions: 12, revenue: 13.00, epc: 0.20 },
    ],
  };
}

export default async function EarningsPage() {
  await requireAuth();
  const data = getEarningsData();
  const maxRevenue = Math.max(...data.monthlyTrend.map(m => m.revenue));
  const monthlyGrowth = ((data.thisMonth - data.lastMonth) / data.lastMonth * 100).toFixed(0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Earnings</h1>
        <p className="text-neutral-400 mt-1">Track revenue from all sources</p>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Total Revenue</div>
          <div className="text-3xl font-bold text-white">${data.totalRevenue.toFixed(2)}</div>
          <div className="text-green-400 text-xs mt-1">All time</div>
        </div>
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">This Month</div>
          <div className="text-3xl font-bold text-white">${data.thisMonth.toFixed(2)}</div>
          <div className={`text-xs mt-1 ${data.thisMonth > data.lastMonth ? 'text-green-400' : 'text-red-400'}`}>
            {data.thisMonth > data.lastMonth && '+'}{monthlyGrowth}% from last month
          </div>
        </div>
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Pending Payout</div>
          <div className="text-3xl font-bold text-white">${data.pendingPayout.toFixed(2)}</div>
          <div className="text-neutral-400 text-xs mt-1">Next: {data.nextPayoutDate}</div>
        </div>
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Est. Annual</div>
          <div className="text-3xl font-bold text-white">${(data.thisMonth * 12).toFixed(0)}</div>
          <div className="text-neutral-400 text-xs mt-1">Based on current rate</div>
        </div>
      </div>

      {/* Revenue Breakdown Chart */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-6">Monthly Revenue (Last 6 Months)</h2>
        <div className="flex items-end gap-4 h-48">
          {data.monthlyTrend.map((month) => {
            const height = (month.revenue / maxRevenue) * 100;
            return (
              <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-neutral-400 font-medium">${month.revenue.toFixed(0)}</span>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 transition-all cursor-pointer" style={{ height: `${height}%` }} />
                <span className="text-xs text-neutral-500">{month.month}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/5">
          {data.breakdown.map((item) => (
            <div key={item.source} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-neutral-400 text-sm">{item.source}: <span className="text-white font-medium">${item.amount.toFixed(2)}</span></span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Sources */}
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
          <h2 className="text-white font-semibold mb-4">Revenue by Source</h2>
          <div className="space-y-4">
            {data.breakdown.map((item) => {
              const percentage = (item.amount / data.totalRevenue * 100).toFixed(0);
              return (
                <div key={item.source} className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-white font-medium">{item.source}</span>
                    </div>
                    <span className="text-white font-bold">${item.amount.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${percentage}%` }} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 text-xs">{percentage}% of total</span>
                    <span className="text-green-400 text-xs">+{item.change}% this month</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Earnings */}
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
          <h2 className="text-white font-semibold mb-4">Recent Earnings</h2>
          <div className="space-y-2">
            {data.recentEarnings.map((earning, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    earning.type === 'ad' ? 'bg-green-500/10' : earning.type === 'affiliate' ? 'bg-blue-500/10' : 'bg-purple-500/10'
                  }`}>
                    <span className={`text-xs font-bold ${
                      earning.type === 'ad' ? 'text-green-400' : earning.type === 'affiliate' ? 'text-blue-400' : 'text-purple-400'
                    }`}>
                      {earning.type === 'ad' ? 'AD' : earning.type === 'affiliate' ? 'AF' : 'SP'}
                    </span>
                  </div>
                  <div>
                    <div className="text-white text-sm">{earning.source}</div>
                    <div className="text-neutral-500 text-xs">{earning.date}</div>
                  </div>
                </div>
                <span className="text-green-400 font-medium">+${earning.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Affiliate Performance */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">Top Affiliate Links</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-neutral-400 text-sm font-medium px-4 py-3">Link Code</th>
                <th className="text-left text-neutral-400 text-sm font-medium px-4 py-3">Clicks</th>
                <th className="text-left text-neutral-400 text-sm font-medium px-4 py-3">Conversions</th>
                <th className="text-left text-neutral-400 text-sm font-medium px-4 py-3">Revenue</th>
                <th className="text-left text-neutral-400 text-sm font-medium px-4 py-3">EPC</th>
              </tr>
            </thead>
            <tbody>
              {data.affiliateLinks.map((link) => (
                <tr key={link.name} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-white font-mono text-sm">{link.name}</td>
                  <td className="px-4 py-3 text-neutral-300 text-sm">{link.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 text-neutral-300 text-sm">{link.conversions}</td>
                  <td className="px-4 py-3 text-white font-medium text-sm">${link.revenue.toFixed(2)}</td>
                  <td className="px-4 py-3 text-green-400 text-sm">${link.epc.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">Growth Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
            <div className="text-blue-400 font-medium mb-1">SEO Focus</div>
            <p className="text-neutral-400 text-sm">Target long-tail keywords like "best free AI tools for students" to capture more organic traffic.</p>
          </div>
          <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
            <div className="text-green-400 font-medium mb-1">Ad Optimization</div>
            <p className="text-neutral-400 text-sm">Add more ad placements near comparison tables and tool lists for higher CTR.</p>
          </div>
          <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
            <div className="text-purple-400 font-medium mb-1">Affiliate Strategy</div>
            <p className="text-neutral-400 text-sm">Add more affiliate links to tool review posts — they convert 3x better than general content.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
