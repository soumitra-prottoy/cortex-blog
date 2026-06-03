import { requireAuth } from '@/lib/auth';

export default async function EarningsPage() {
  await requireAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Earnings</h1>
        <p className="text-neutral-400 mt-1">Track revenue from all sources</p>
      </div>

      {/* Current Revenue - Honest */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Total Revenue</div>
          <div className="text-3xl font-bold text-white">$0.00</div>
        </div>
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">This Month</div>
          <div className="text-3xl font-bold text-white">$0.00</div>
        </div>
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Pending Payout</div>
          <div className="text-3xl font-bold text-white">$0.00</div>
        </div>
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
          <div className="text-neutral-400 text-sm mb-1">Estimated Annual</div>
          <div className="text-3xl font-bold text-white">$0</div>
        </div>
      </div>

      {/* Honest State */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-8 text-center">
        <div className="text-4xl mb-4">E</div>
        <h2 className="text-white text-xl font-semibold mb-2">No Revenue Sources Connected</h2>
        <p className="text-neutral-400 max-w-md mx-auto mb-6">
          Connect monetization platforms to track earnings. Your revenue will show up here in real-time.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="https://adsense.google.com" target="_blank" rel="noopener" className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition">
            Setup Google AdSense
          </a>
          <a href="https://affiliate-program.amazon.com" target="_blank" rel="noopener" className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-sm hover:bg-white/20 transition">
            Amazon Associates
          </a>
        </div>
      </div>

      {/* Revenue Sources */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">Potential Revenue Sources</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <div className="text-white text-sm font-medium">Google AdSense</div>
              <div className="text-neutral-500 text-xs mt-0.5">Display ads on your blog posts</div>
            </div>
            <span className="px-3 py-1 rounded-md bg-yellow-500/10 text-yellow-400 text-xs font-medium">Not Connected</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <div className="text-white text-sm font-medium">Affiliate Links</div>
              <div className="text-neutral-500 text-xs mt-0.5">Earn commission on tool recommendations</div>
            </div>
            <span className="px-3 py-1 rounded-md bg-yellow-500/10 text-yellow-400 text-xs font-medium">Not Connected</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <div className="text-white text-sm font-medium">Sponsorships</div>
              <div className="text-neutral-500 text-xs mt-0.5">Partner with AI tool companies for paid posts</div>
            </div>
            <span className="px-3 py-1 rounded-md bg-yellow-500/10 text-yellow-400 text-xs font-medium">Not Connected</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <div className="text-white text-sm font-medium">Newsletter Sponsorships</div>
              <div className="text-neutral-500 text-xs mt-0.5">Monetize your 247 subscribers</div>
            </div>
            <span className="px-3 py-1 rounded-md bg-yellow-500/10 text-yellow-400 text-xs font-medium">Not Connected</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">How to Start Earning</h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">1. Apply to Google AdSense</div>
            <p className="text-neutral-400 text-sm">Minimum requirement: original content and some traffic. Your blog already qualifies. Go to adsense.google.com to apply.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">2. Add Affiliate Links</div>
            <p className="text-neutral-400 text-sm">Join Amazon Associates and affiliate programs for AI tools you recommend (many have affiliate programs like Coursera, Udemy, hosting companies).</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-white font-medium mb-1">3. Reach Out for Sponsorships</div>
            <p className="text-neutral-400 text-sm">Once you have steady traffic, AI tool companies will pay $50-500 per sponsored post. Start with smaller tools.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
