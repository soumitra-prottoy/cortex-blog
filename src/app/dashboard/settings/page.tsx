import { requireAuth } from '@/lib/auth';
import { blogPosts, categories } from '@/data';
import SiteSettingsForm from '@/components/dashboard/site-settings-form';

export default async function SettingsPage() {
  await requireAuth();

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-neutral-400 mt-1">Manage your site configuration</p>
      </div>

      {/* Site Identity */}
      <SiteSettingsForm />

      {/* Newsletter Settings */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">Newsletter</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <div className="text-white text-sm font-medium">Subscriber Count</div>
              <div className="text-neutral-400 text-xs mt-0.5">Total active subscribers</div>
            </div>
            <div className="text-2xl font-bold text-white">247</div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <div className="text-white text-sm font-medium">Weekly Auto-Posts</div>
              <div className="text-neutral-400 text-xs mt-0.5">Next scheduled: Tuesday, June 3, 9:00 AM</div>
            </div>
            <div className="px-3 py-1 rounded-md bg-green-500/10 text-green-400 text-xs font-medium">Active</div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <div className="text-white text-sm font-medium">Resend API</div>
              <div className="text-neutral-400 text-xs mt-0.5">Email delivery service</div>
            </div>
            <div className="px-3 py-1 rounded-md bg-green-500/10 text-green-400 text-xs font-medium">Connected</div>
          </div>
        </div>
      </div>

      {/* Site Info */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-semibold mb-4">Site Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-neutral-400 text-xs mb-1">Blog Posts</div>
            <div className="text-white font-bold text-xl">{blogPosts.length}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-neutral-400 text-xs mb-1">Categories</div>
            <div className="text-white font-bold text-xl">{categories.length}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-neutral-400 text-xs mb-1">Framework</div>
            <div className="text-white font-bold text-xl">Next.js 16</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="text-neutral-400 text-xs mb-1">Hosting</div>
            <div className="text-white font-bold text-xl">Vercel</div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-neutral-900 rounded-2xl border border-red-500/20 p-6">
        <h2 className="text-red-400 font-semibold mb-4">Danger Zone</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5">
            <div>
              <div className="text-white text-sm font-medium">Clear Analytics Cache</div>
              <div className="text-neutral-400 text-xs mt-0.5">Reset all cached analytics data</div>
            </div>
            <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition">Clear</button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5">
            <div>
              <div className="text-white text-sm font-medium">Regenerate All Thumbnails</div>
              <div className="text-neutral-400 text-xs mt-0.5">Re-create thumbnail images for all posts</div>
            </div>
            <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition">Regenerate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
