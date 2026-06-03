'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/data';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('ai-tools');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }
    setSaving(true);
    setError('');

    const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;

    const post = {
      slug,
      title,
      description: description || content.substring(0, 160).replace(/\n/g, ' '),
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      author: 'Cortex Team',
      date: new Date().toISOString().split('T')[0],
      readTime,
      featured: false,
      trending: false,
      image: '',
      content,
    };

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (res.ok) {
        router.push('/dashboard/posts');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save post');
      }
    } catch {
      setError('Failed to save post');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">New Post</h1>
          <p className="text-neutral-400 mt-1">Create a new blog post</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => router.back()} className="px-5 py-2.5 rounded-xl bg-white/5 text-neutral-300 text-sm hover:bg-white/10 transition">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition disabled:opacity-40">
            {saving ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
      )}

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-neutral-300 text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your blog post title"
            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-neutral-300 text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A brief description of the post (used for SEO and previews)"
            rows={2}
            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30 resize-none"
          />
        </div>

        {/* Category & Tags */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-300 text-sm font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-white/30"
            >
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-neutral-300 text-sm font-medium mb-2">
              Tags <span className="text-neutral-500 font-normal">(comma separated)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="ai, tools, productivity"
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
            />
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-neutral-300 text-sm font-medium mb-2">Thumbnail URL</label>
          <input
            type="text"
            placeholder="/thumbnails/your-image.png or https://..."
            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
          />
          <p className="text-neutral-500 text-xs mt-1">Place image in public/thumbnails/ and reference as /thumbnails/filename.png</p>
        </div>

        {/* Content */}
        <div>
          <label className="block text-neutral-300 text-sm font-medium mb-2">Content <span className="text-neutral-500 font-normal">(Markdown supported)</span></label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog post content here..."
            rows={20}
            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30 font-mono text-sm resize-y"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
          <button onClick={() => router.back()} className="px-5 py-2.5 rounded-xl bg-white/5 text-neutral-300 text-sm hover:bg-white/10 transition">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition disabled:opacity-40">
            {saving ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
