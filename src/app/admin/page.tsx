'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { FileText, Globe, PlusCircle, ArrowUpRight, Edit3, Eye } from 'lucide-react';
import Link from 'next/link';
import { getDb, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { getFirebaseAuth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
  const router = useRouter();

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (auth) setUser(auth.currentUser);

    const fetchData = async () => {
      try {
        const db = getDb();
        if (!db) return;
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('date', 'desc'), limit(8));
        const snap = await getDocs(q);
        setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        const allSnap = await getDocs(postsRef);
        const total = allSnap.size;
        const published = allSnap.docs.filter(d => d.data().status === 'published').length;
        setStats({ total, published, drafts: total - published });
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'posts');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    const auth = getFirebaseAuth();
    if (auth) { await signOut(auth); router.replace('/admin/login'); }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto pb-16 font-sans">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Dashboard</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              {user?.email || 'Admin'} · NepaCalc.com
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-2 bg-[#1a73e8] hover:bg-blue-700 text-[#202124] text-[13px] font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              New post
            </Link>
            <button
              onClick={handleLogout}
              className="text-[13px] text-gray-500 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total posts', value: stats.total, icon: FileText, color: 'text-blue-600' },
            { label: 'Published', value: stats.published, icon: Globe, color: 'text-green-600' },
            { label: 'Drafts', value: stats.drafts, icon: Edit3, color: 'text-orange-500' },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <div className={`w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center ${s.color}`}>
                <s.icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[22px] font-semibold text-gray-900 leading-none">{s.value}</div>
                <div className="text-[12px] text-gray-500 mt-1">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'All posts', href: '/admin/posts' },
            { label: 'SEO pages', href: '/admin/seo-pages' },
            { label: 'New post', href: '/admin/posts/new' },
            { label: 'View site', href: '/', target: '_blank' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.target}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm flex items-center justify-between"
            >
              {link.label}
              <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
            </Link>
          ))}
        </div>

        {/* Recent posts table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-[15px] font-semibold text-gray-800">Recent posts</h2>
            <Link href="/admin/posts" className="text-[13px] text-blue-600 hover:underline">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="w-5 h-5 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto" />
            </div>
          ) : posts.length === 0 ? (
            <div className="py-16 text-center">
              <FileText className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-[13px] text-gray-400">No posts yet. Create your first post.</p>
              <Link href="/admin/posts/new" className="mt-4 inline-block text-[13px] text-blue-600 hover:underline">
                Create post →
              </Link>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="text-[14px] font-medium text-gray-900 leading-snug line-clamp-1 max-w-xs group-hover:text-blue-600 transition-colors">
                        {p.title || '(Untitled)'}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">/{p.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[12px] text-gray-500 capitalize">{p.category || ', '}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${
                        p.status === 'published'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-orange-50 text-orange-700 border border-orange-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'published' ? 'bg-green-500' : 'bg-orange-500'}`} />
                        {p.status || 'draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[12px] text-gray-400">
                      {p.date ? new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ', '}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/blog/${p.slug}`}
                          target="_blank"
                          className="text-[12px] text-gray-400 hover:text-gray-700 flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </Link>
                        <Link
                          href={`/admin/posts/${p.id}`}
                          className="text-[12px] text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}

