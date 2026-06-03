'use client';

import { useState } from 'react';

export default function SiteSettingsForm() {
  const [siteName, setSiteName] = useState('Cortex');
  const [tagline, setTagline] = useState('Start Smarter with AI');
  const [description, setDescription] = useState('Your neural network for AI knowledge. Honest guides, tool comparisons, tutorials, and automation workflows for AI beginners.');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteName, tagline, description }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  return (
    <form onSubmit={handleSave} className="bg-neutral-900 rounded-2xl border border-white/5 p-6">
      <h2 className="text-white font-semibold mb-4">Site Identity</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-neutral-300 text-sm font-medium mb-2">Site Name</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
          />
        </div>
        <div>
          <label className="block text-neutral-300 text-sm font-medium mb-2">Tagline</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30"
          />
        </div>
        <div>
          <label className="block text-neutral-300 text-sm font-medium mb-2">Meta Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 resize-none"
          />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition disabled:opacity-40">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {saved && <span className="text-green-400 text-sm">Saved!</span>}
        </div>
      </div>
    </form>
  );
}
