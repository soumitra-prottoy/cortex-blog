'use client';

interface StatsBarProps {
  pageviews: number;
  visitors: number;
  avgSession: string;
  bounceRate: string;
  revenue: number;
}

export default function StatsBar({ pageviews, visitors, avgSession, bounceRate, revenue }: StatsBarProps) {
  const stats = [
    { label: 'Total Pageviews', value: pageviews.toLocaleString(), change: '+12.5%', up: true },
    { label: 'Unique Visitors', value: visitors.toLocaleString(), change: '+8.3%', up: true },
    { label: 'Avg Session', value: avgSession, change: '+0.4m', up: true },
    { label: 'Bounce Rate', value: bounceRate, change: '-3.2%', up: true },
    { label: 'Total Revenue', value: `$${revenue.toFixed(2)}`, change: '+23%', up: true },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-2">{stat.label}</div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className={`text-xs font-medium ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
            {stat.change} vs last week
          </div>
        </div>
      ))}
    </div>
  );
}
