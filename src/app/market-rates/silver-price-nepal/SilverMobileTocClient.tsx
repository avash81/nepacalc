'use client';

import React from 'react';

const tocGroups = [
  {
    items: [
      { id: 'todays-silver-price', label: "Today's Silver Price" },
      { id: 'silver-calculator', label: 'Quick Silver Valuation Calculator' },
      { id: 'silver-price-history', label: 'Silver Price History in Nepal' },
      { id: 'silver-units-nepal', label: 'Silver Units Used in Nepal' },
      { id: 'silver-purity-standards', label: 'Silver Purity Standards' },
      { id: 'why-prices-change', label: 'Why Silver Prices Change in Nepal' },
      { id: 'common-uses-silver-nepal', label: 'Common Uses of Silver in Nepal' },
      { id: 'silver-as-investment', label: 'Silver as an Investment' },
      { id: 'gold-vs-silver-prices', label: 'Gold vs Silver Prices' },
      { id: 'buying-silver-nepal', label: 'Buying Silver in Nepal' },
      { id: 'selling-silver-nepal', label: 'Selling Silver in Nepal' },
      { id: 'silver-jewellery-pricing', label: 'Silver Jewellery Pricing' },
      { id: 'silver-coins-bullion', label: 'Silver Coins and Bullion' },
      { id: 'how-often-updated', label: 'How Often Are Silver Prices Updated?' },
      { id: 'who-uses-silver-price-data', label: 'Who Uses Silver Price Data?' },
      { id: 'why-silver-prices-matter', label: 'Why Silver Prices Matter' },
      { id: 'silver-metrics', label: 'Frequently Monitored Silver Metrics' },
      { id: 'faq', label: 'Frequently Asked Questions' },
      { id: 'related-tools', label: 'Related Calculators' },
    ]
  }
];

export default function SilverMobileTocClient() {
  let counter = 0;
  const totalItems = tocGroups.reduce((s, g) => s + g.items.length, 0);
  return (
    <div className="nb-toc-mobile lg:hidden mb-6">
      <details id="silver-mobile-toc">
        <summary>On this page — {totalItems} sections</summary>
        <ol>
          {tocGroups.map((group, gi) => (
            <React.Fragment key={gi}>
              {gi > 0 && <div className="nb-toc-divider" />}
              {group.items.map((item) => {
                counter++;
                const numStr = counter.toString().padStart(2, '0');
                return (
                  <li key={item.id}>
                    <a
                      href={"#" + item.id}
                      onClick={() => {
                        const d = document.getElementById('silver-mobile-toc') as HTMLDetailsElement | null;
                        if (d) d.open = false;
                      }}
                    >
                      <span className="nb-toc-num">{numStr}</span>
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </React.Fragment>
          ))}
        </ol>
      </details>
    </div>
  );
}
