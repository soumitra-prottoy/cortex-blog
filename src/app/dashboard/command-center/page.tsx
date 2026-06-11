'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

/* ─── Types ─── */
interface StatusData {
  git: { status: string; lastCommit: string; unpushed: boolean };
  deployment: { lastDeploy: string };
  cronJobs: { name: string; schedule: string; status: string; nextRun: string }[];
  serverTime: string;
}

interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  image?: string;
  featured?: boolean;
  trending?: boolean;
  category: string;
}

/* ─── Main Component ─── */
export default function CommandCenterPage() {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionResult, setActionResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch status
  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/command-center/status');
      const data = await res.json();
      setStatus(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  // Fetch posts
  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(data => setPosts(data.posts || []))
      .catch(() => {});
  }, []);

  // Execute command
  async function executeAction(action: string, payload?: Record<string, string>) {
    setActionLoading(action);
    setActionResult(null);
    try {
      const res = await fetch('/api/command-center', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload }),
      });
      const data = await res.json();
      if (data.success) {
        setActionResult({ type: 'success', message: `${action} completed successfully` });
        fetchStatus();
      } else {
        setActionResult({ type: 'error', message: data.error || `${action} failed` });
      }
    } catch {
      setActionResult({ type: 'error', message: 'Connection failed' });
    } finally {
      setActionLoading(null);
      setTimeout(() => setActionResult(null), 5000);
    }
  }

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);

  return (
    <div className="space-y-6 pb-8">
      {/* ═══ TOP BAR ═══ */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Command Center
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            {' | '}
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 pl-10 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-white/20"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <Link
            href="/dashboard/posts/new"
            className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition"
          >
            + New Post
          </Link>
        </div>
      </div>

      {/* ═══ ACTION RESULT TOAST ═══ */}
      {actionResult && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium ${
          actionResult.type === 'success'
            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {actionResult.message}
        </div>
      )}

      {/* ═══ STATS ROW ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard label="Blog Posts" value={posts.length.toString()} sub="published" color="white" />
        <StatCard label="Revenue" value="$0.00" sub="no income yet" color="white" />
        <StatCard
          label="Git"
          value={status?.git?.status === 'clean' ? 'Clean' : status?.git?.status === 'dirty' ? 'Dirty' : '—'}
          sub={status?.git?.lastCommit?.split('(')[1]?.replace(')', '') || 'checking...'}
          color={status?.git?.status === 'clean' ? 'green' : status?.git?.status === 'dirty' ? 'yellow' : 'neutral'}
        />
        <StatCard
          label="Deploy"
          value={status?.deployment?.lastDeploy ? 'Live' : '—'}
          sub={status?.deployment?.lastDeploy ? 'Vercel' : 'checking...'}
          color="green"
        />
        <StatCard
          label="Cron Jobs"
          value={status?.cronJobs?.length.toString() || '0'}
          sub="scheduled tasks"
          color="blue"
        />
      </div>

      {/* ═══ MAIN GRID ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ─── LEFT COLUMN ─── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Quick Actions */}
          <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
            <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <ActionButton
                label="Write Post"
                icon="+"
                onClick={() => window.location.href = '/dashboard/posts/new'}
                loading={false}
              />
              <ActionButton
                label="Git Push"
                icon="G"
                onClick={() => executeAction('gitPush', { message: `Update ${new Date().toLocaleDateString()}` })}
                loading={actionLoading === 'gitPush'}
              />
              <ActionButton
                label="Deploy"
                icon="D"
                onClick={() => executeAction('deploy')}
                loading={actionLoading === 'deploy'}
              />
              <ActionButton
                label="Thumbnails"
                icon="T"
                onClick={() => executeAction('regenerateThumbnails')}
                loading={actionLoading === 'regenerateThumbnails'}
              />
            </div>
          </div>

          {/* Content Pipeline */}
          <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-sm uppercase tracking-wider">Content Pipeline</h2>
              <Link href="/dashboard/posts" className="text-neutral-400 text-xs hover:text-white transition">Manage All</Link>
            </div>
            {filteredPosts.length === 0 ? (
              <div className="text-neutral-500 text-sm py-8 text-center">
                {searchQuery ? 'No posts match your search' : 'No posts yet'}
              </div>
            ) : (
              <div className="space-y-2">
                {(searchQuery ? filteredPosts : recentPosts).map(post => (
                  <div key={post.slug} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition group">
                    {post.image ? (
                      <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                        <img src={post.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-neutral-500 text-xs">P</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{post.title}</div>
                      <div className="text-neutral-500 text-xs mt-0.5">{post.date}  {post.readTime}</div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="px-2 py-1 rounded-md bg-white/5 text-neutral-400 text-xs hover:text-white hover:bg-white/10 transition"
                      >
                        View
                      </a>
                      <Link
                        href={`/dashboard/posts/edit/${post.slug}`}
                        className="px-2 py-1 rounded-md bg-white/5 text-neutral-400 text-xs hover:text-white hover:bg-white/10 transition"
                      >
                        Edit
                      </Link>
                    </div>
                    <div className="flex gap-1.5">
                      {post.featured && <span className="px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 text-[10px]">Featured</span>}
                      {post.trending && <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px]">Trending</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Analytics + Earnings Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Analytics */}
            <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
              <h2 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Analytics</h2>
              <div className="text-center py-4">
                <div className="text-neutral-500 text-sm mb-3">No analytics connected</div>
                <div className="flex flex-wrap justify-center gap-2">
                  <a href="https://vercel.com/analytics" target="_blank" rel="noopener" className="px-3 py-1.5 rounded-lg bg-white/5 text-neutral-400 text-xs hover:bg-white/10 transition">Vercel</a>
                  <a href="https://analytics.google.com" target="_blank" rel="noopener" className="px-3 py-1.5 rounded-lg bg-white/5 text-neutral-400 text-xs hover:bg-white/10 transition">GA4</a>
                  <a href="https://plausible.io" target="_blank" rel="noopener" className="px-3 py-1.5 rounded-lg bg-white/5 text-neutral-400 text-xs hover:bg-white/10 transition">Plausible</a>
                </div>
              </div>
            </div>

            {/* Earnings */}
            <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
              <h2 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Earnings</h2>
              <div className="text-center py-4">
                <div className="text-3xl font-bold text-white mb-1">$0.00</div>
                <div className="text-neutral-500 text-sm mb-3">No revenue yet</div>
                <div className="flex flex-wrap justify-center gap-2">
                  <a href="https://adsense.google.com" target="_blank" rel="noopener" className="px-3 py-1.5 rounded-lg bg-white/5 text-neutral-400 text-xs hover:bg-white/10 transition">AdSense</a>
                  <a href="https://affiliate-program.amazon.com" target="_blank" rel="noopener" className="px-3 py-1.5 rounded-lg bg-white/5 text-neutral-400 text-xs hover:bg-white/10 transition">Amazon</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className="space-y-6">

          {/* System Status */}
          <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
            <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">System Status</h2>
            {loading ? (
              <div className="text-neutral-500 text-sm">Loading...</div>
            ) : (
              <div className="space-y-3">
                <StatusRow label="Site" value="Online" ok />
                <StatusRow label="Git" value={status?.git?.status === 'clean' ? 'Synced' : status?.git?.status === 'dirty' ? 'Uncommitted' : 'Unknown'} ok={status?.git?.status === 'clean'} />
                <StatusRow label="Deploy" value={status?.deployment?.lastDeploy ? 'Live' : 'Unknown'} ok={!!status?.deployment?.lastDeploy} />
                {status?.git?.unpushed && (
                  <div className="px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-400 text-xs">
                    Unpushed commits — run Git Push
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cron Jobs */}
          <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
            <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Scheduled Tasks</h2>
            {status?.cronJobs?.length ? (
              <div className="space-y-3">
                {status.cronJobs.map((job, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm font-medium">{job.name}</span>
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                    <div className="text-neutral-500 text-xs">{job.schedule}</div>
                    <div className="text-neutral-600 text-xs mt-1">
                      Next: {new Date(job.nextRun).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-neutral-500 text-sm">No scheduled tasks</div>
            )}
          </div>

          {/* Last Commit */}
          <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
            <h2 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Last Commit</h2>
            <div className="text-neutral-400 text-xs font-mono break-all">
              {status?.git?.lastCommit || 'Loading...'}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-neutral-900 rounded-2xl border border-white/5 p-5">
            <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h2>
            <div className="space-y-2">
              <QuickLink href="https://cortex-blog-sigma.vercel.app" label="Live Site" />
              <QuickLink href="https://github.com/soumitra-prottoy/cortex-blog" label="GitHub Repo" />
              <QuickLink href="https://vercel.com" label="Vercel Dashboard" />
              <QuickLink href="https://analytics.google.com" label="Google Analytics" />
              <QuickLink href="https://search.google.com/search-console" label="Search Console" />
              <QuickLink href="/dashboard/posts" label="Manage Posts" external={false} />
              <QuickLink href="/dashboard/settings" label="Settings" external={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const colorMap: Record<string, string> = {
    white: 'text-white',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    blue: 'text-blue-400',
    neutral: 'text-neutral-400',
  };
  return (
    <div className="bg-neutral-900 rounded-2xl border border-white/5 p-4">
      <div className="text-neutral-500 text-xs mb-1 uppercase tracking-wider">{label}</div>
      <div className={`text-2xl font-bold ${colorMap[color] || 'text-white'}`}>{value}</div>
      <div className="text-neutral-600 text-xs mt-0.5">{sub}</div>
    </div>
  );
}

function ActionButton({ label, icon, onClick, loading }: { label: string; icon: string; onClick: () => void; loading: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition text-center disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      <div className="text-xl mb-1.5 text-white group-hover:scale-110 transition-transform">
        {loading ? (
          <span className="inline-block animate-spin w-5 h-5 border-2 border-white/20 border-t-white rounded-full" />
        ) : icon}
      </div>
      <div className="text-white text-xs font-medium">{label}</div>
    </button>
  );
}

function StatusRow({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-neutral-400 text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-white text-sm">{value}</span>
        <span className={`w-2 h-2 rounded-full ${ok ? 'bg-green-400' : 'bg-yellow-400'}`} />
      </div>
    </div>
  );
}

function QuickLink({ href, label, external = true }: { href: string; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition group"
    >
      <span className="text-neutral-400 text-sm group-hover:text-white transition">{label}</span>
      <svg className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-400 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}
