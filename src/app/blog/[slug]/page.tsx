import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostContent from './BlogPostContent';
import Link from 'next/link';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const runtime = 'nodejs';

export async function generateStaticParams() {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const dbId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID;
    if (!projectId) return [{ slug: 'welcome-to-nepacalc' }]; // Fallback slug

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${dbId || '(default)'}/documents/posts?pageSize=100`;
    const res = await fetch(url);
    if (!res.ok) return [{ slug: 'welcome-to-nepacalc' }];

    const data = await res.json();
    if (!data.documents) return [{ slug: 'welcome-to-nepacalc' }];

    return data.documents
      .filter((d: any) => d.fields?.status?.stringValue === 'published')
      .map((d: any) => ({
        slug: d.fields.slug?.stringValue || '',
      }))
      .filter((p: any) => p.slug !== '');
  } catch (e) {
    console.error('Error generating static params for blog:', e);
    return [{ slug: 'welcome-to-nepacalc' }];
  }
}

async function getPostData(slug: string) {
  // --- EVERGREEN OVERRIDE FOR IT FREELANCER TAX GUIDE ---
  if (slug === 'nepal-it-freelancer-tax-guide') {
    return {
      post: {
        title: "Nepal IT Freelancer Tax Guide: 5% Final Withholding & Slabs",
        metaTitle: "Nepal IT Freelancer Tax Guide: 5% Final Withholding & Slabs",
        metaDesc: "Maximize your take-home pay with the 5% tax rule for IT exports in Nepal. Learn about startup exemptions, SSF, and official IRD tax slabs for the current fiscal year.",
        slug: "nepal-it-freelancer-tax-guide",
        excerpt: "Maximize your take-home pay with the 5% tax rule for IT exports in Nepal. Learn about startup exemptions, SSF, and official IRD tax slabs for the current fiscal year.",
        content: `## Nepal IT Freelancer & Remote Work Tax Guide (Current Fiscal Year)

According to the most recent budget announcement and IRD guidelines, individuals providing IT-based services to entities outside Nepal are eligible for a flat **5% final withholding tax** on foreign currency earnings received through formal banking channels. This is one of the most beneficial tax provisions for the growing tech sector in Nepal.

### What is the tax rate for IT exporters in Nepal?
Individuals providing IT-based services to entities outside Nepal are eligible for a flat 5% final withholding tax on foreign currency earnings received through formal banking channels.

### Do I need to file a tax return if I pay the 5% withholding tax?
For most freelancers, the 5% withholding is considered a 'Final Tax.' However, it is recommended to maintain records of your bank-generated tax certificates for compliance and future financial verifications.

### Are there tax holidays for tech startups in Nepal?
Yes, the government currently provides income tax exemptions for startups with an annual turnover below the defined threshold (NPR 10 Crore) for the first five years of operation.

[calc:nepal-income-tax]

### The "Latest" Hook for Compliance
Under the latest Finance Act, freelancers should ensure their earnings are coded correctly by their banks as "IT Services" to qualify for the 5% rate rather than the standard 15% consultancy TDS. Maintain dynamic links to your **Income Tax Calculator** to stay updated with live budget shifts.`,
        category: "Taxation",
        date: new Date().toISOString(),
        relatedCalcs: ["nepal-income-tax", "nepal-salary"],
        ogImage: "https://nepacalc.com/images/blog/freelancer-tax.jpg",
        author: "NepaCal Finance Team",
        imageTop: "https://nepacalc.com/images/blog/freelancer-tax-top.jpg",
        imageMiddle: "https://nepacalc.com/images/blog/freelancer-tax-mid.jpg",
        imageBottom: "https://nepacalc.com/images/blog/freelancer-tax-bot.jpg",
      },
      related: []
    };
  }

  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const dbId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID;
    if (!projectId) return null;

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${dbId || '(default)'}/documents/posts`;
    const res = await fetch(url + '?pageSize=100');
    
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.documents) return null;

    let targetDoc = null;
    let allPublished = [];

    // Find the requested post and all published posts
    for (const d of data.documents) {
      const f = d.fields;
      if (f?.status?.stringValue === 'published') {
        const parsed = {
          title: f.title?.stringValue || '',
          slug: f.slug?.stringValue || '',
          excerpt: f.excerpt?.stringValue || '',
          content: f.content?.stringValue || '',
          category: f.category?.stringValue || '',
          date: f.date?.stringValue || new Date().toISOString(),
          relatedCalcs: f.relatedCalcs?.arrayValue?.values?.map((v: any) => v.stringValue) || [],
          ogImage: f.ogImage?.stringValue || '',
          author: f.author?.stringValue || 'NEPACALC',
          imageTop: f.imageTop?.stringValue || '',
          imageMiddle: f.imageMiddle?.stringValue || '',
          imageBottom: f.imageBottom?.stringValue || '',
        };
        allPublished.push(parsed);
        if (parsed.slug === slug) {
          targetDoc = parsed;
        }
      }
    }

    if (!targetDoc) return null;

    // Filter related posts (same category, excluding current)
    const related = allPublished
      .filter(p => p.slug !== slug && p.category === targetDoc.category)
      .slice(0, 2);

    return { post: targetDoc, related };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const data = await getPostData(params.slug);
  if (!data?.post) return { title: 'Not Found' };

  const page = data.post;
  return {
    title: page.metaTitle || page.title,
    description: page.metaDesc || page.excerpt,
    keywords: page.focusKeyword || 'Nepal Tax, IT Freelancer, 5% Tax, IRD Nepal',
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDesc || page.excerpt,
      url: `https://nepacalc.com/blog/${page.slug}`,
      siteName: 'NEPACALC',
      type: 'article',
      ...(page.ogImage ? { images: [{ url: page.ogImage }] } : {}),
    },
    alternates: {
      canonical: `https://nepacalc.com/blog/${page.slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const data = await getPostData(params.slug);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📄</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Post not found</h1>
          <Link href="/blog" className="text-blue-600 hover:underline">← Back to blog</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://nepacalc.com/blog" },
              { "@type": "ListItem", "position": 3, "name": data.post.title, "item": `https://nepacalc.com/blog/${data.post.slug}` }
            ]
          }),
        }}
      />
      {/* BlogPosting & FAQ Schema Graph for Global Search Dominance */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                "headline": data.post.title,
                "description": data.post.metaDesc || data.post.excerpt || data.post.content.substring(0, 160),
                "image": [
                  data.post.imageTop,
                  data.post.imageMiddle,
                  data.post.imageBottom
                ].filter(Boolean),
                "datePublished": data.post.date,
                "author": {
                  "@type": "Person",
                  "name": data.post.author || "NEPACALC Research"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "NEPACALC",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://nepacalc.com/logo.png"
                  }
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://nepacalc.com/blog/${data.post.slug}`
                }
              },
              ...(data.post.content.includes('###') ? [{
                "@type": "FAQPage",
                "mainEntity": [...data.post.content.matchAll(/^### (.+\?)\n([\s\S]+?)(?=\n###|\n##|$)/gm)].map(m => ({
                  "@type": "Question",
                  "name": m[1],
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": m[2].trim().replace(/[*#`]/g, '').substring(0, 600)
                  }
                }))
              }] : [])
            ]
          }),
        }}
      />
      <BlogPostContent post={data.post} related={data.related} />
    </>
  );
}
