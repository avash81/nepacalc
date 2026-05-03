/**
 * @fileoverview Blog Index Page ,  Reverted to Old Structure
 *
 * Fetches all published blog posts from Firestore.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { fetchFirestoreCollection } from '@/lib/firestore-rest';

export const metadata: Metadata = {
  title: 'Blog & Financial Guides | NepaCalc',
  description: 'Expert tips on Nepal income tax, salary planning, and professional calculator tutorials.',
  alternates: { canonical: 'https://nepacalc.com/blog/' },
  robots: { index: false, follow: false },
};

export default async function BlogIndexPage() {
  let posts: any[] = [];
  try {
    posts = await fetchFirestoreCollection('posts');
  } catch (error) {
    console.error('Firestore fetch error:', error);
  }

  const publishedPosts = (posts || [])
    .filter((p: any) => p && p.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Blog & <span className="text-blue-600">Guides</span>
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Stay informed with the latest financial updates and expert guides for Nepal.
          </p>
        </header>

        {publishedPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}/`}
                className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-6 transition-all hover:shadow-lg hover:border-blue-300"
              >
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {post.category || 'Post'}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 mb-3 leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between text-[11px] text-gray-400 font-medium">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
