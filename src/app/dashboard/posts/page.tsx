import { requireAuth } from '@/lib/auth';
import { blogPosts, categories } from '@/data';
import Link from 'next/link';
import DeletePostButton from '@/components/dashboard/delete-post-button';

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  await requireAuth();
  const params = await searchParams;
  const posts = blogPosts;
  const editSlug = params.edit;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Posts</h1>
          <p className="text-neutral-400 mt-1">{posts.length} total posts</p>
        </div>
        <Link href="/dashboard/posts/new" className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition">
          + New Post
        </Link>
      </div>

      {/* Posts Table */}
      <div className="bg-neutral-900 rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-neutral-400 text-sm font-medium px-6 py-4">Post</th>
                <th className="text-left text-neutral-400 text-sm font-medium px-6 py-4">Category</th>
                <th className="text-left text-neutral-400 text-sm font-medium px-6 py-4">Date</th>
                <th className="text-left text-neutral-400 text-sm font-medium px-6 py-4">Status</th>
                <th className="text-right text-neutral-400 text-sm font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const cat = categories.find(c => c.slug === post.category);
                return (
                  <tr key={post.slug} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {post.image && (
                          <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                            <img src={post.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <div className="text-white text-sm font-medium">{post.title}</div>
                          <div className="text-neutral-500 text-xs mt-0.5">{post.readTime}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-neutral-300 text-sm">{cat?.name || post.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-neutral-400 text-sm">{post.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        {post.featured && <span className="px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-400 text-xs">Featured</span>}
                        {post.trending && <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-xs">Trending</span>}
                        {!post.featured && !post.trending && <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 text-xs">Published</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/blog/${post.slug}`} target="_blank" className="px-3 py-1.5 rounded-lg bg-white/5 text-neutral-300 text-xs hover:bg-white/10 transition">
                          View
                        </Link>
                        <Link href={`/dashboard/posts?edit=${post.slug}`} className="px-3 py-1.5 rounded-lg bg-white/5 text-neutral-300 text-xs hover:bg-white/10 transition">
                          Edit
                        </Link>
                        <DeletePostButton slug={post.slug} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
