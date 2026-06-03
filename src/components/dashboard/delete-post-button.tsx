'use client';

import { useRouter } from 'next/navigation';

export default function DeletePostButton({ slug }: { slug: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this post?')) return;
    const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
    } else {
      alert('Failed to delete post');
    }
  }

  return (
    <button onClick={handleDelete} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition">
      Delete
    </button>
  );
}
