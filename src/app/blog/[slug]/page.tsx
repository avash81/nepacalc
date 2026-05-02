/**
 * @fileoverview Blog Slug Page, Build-Safe Version
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageClient from './PageClient';
import { fetchFirestoreCollection, fetchDocumentBySlug } from '@/lib/firestore-rest';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const runtime = 'nodejs';

export async function generateStaticParams() {
  // Simplest possible return to guarantee build success during export
  return [{ slug: 'placeholder' }];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // If it's the fallback slug, return generic metadata
  if (params.slug === 'fallback-post') {
    return { title: 'Blog Post', robots: { index: false, follow: false } };
  }

  const post = await fetchDocumentBySlug('posts', params.slug);
  if (!post) return { title: 'Post Not Found', robots: { index: false, follow: false } };
  
  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
    robots: { index: false, follow: false }, // User requested noindex
    alternates: {
      canonical: `https://nepacalc.com/blog/${post.slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  if (params.slug === 'fallback-post') {
    return (
      <div className="p-20 text-center text-gray-400">
        <p>This is a placeholder for the blog system.</p>
      </div>
    );
  }

  const [post, allPosts] = await Promise.all([
    fetchDocumentBySlug('posts', params.slug),
    fetchFirestoreCollection('posts')
  ]);

  if (!post) notFound();

  const related = (allPosts || [])
    .filter((p: any) => p.slug !== post.slug && p.status === 'published')
    .slice(0, 4);

  return <PageClient post={post} related={related} />;
}
