import React from 'react';
import { JsonLd } from './JsonLd';

type FAQItem = {
  question: string;
  answer: string;
};

export function PillarFAQ({ faqs, title = "Frequently Asked Questions", disableSchema = false }: { faqs: FAQItem[], title?: string, disableSchema?: boolean }) {
  return (
    <div className="mt-16 pt-12 border-t border-[#dadce0]">
      {!disableSchema && <JsonLd type="faq" faqs={faqs} />}
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

