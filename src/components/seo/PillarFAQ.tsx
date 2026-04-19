import React from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

export function PillarFAQ({ faqs, title = "Frequently Asked Questions" }: { faqs: FAQItem[], title?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="mt-16 pt-12 border-t border-[#dadce0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 className="text-[13px] font-black tracking-widest text-[#202124] mb-6 uppercase">{title}</h2>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
            <h3 className="text-[14px] font-bold text-[#1a73e8] mb-1">{faq.question}</h3>
            <p className="text-[13px] text-[#5f6368] leading-relaxed font-medium">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
