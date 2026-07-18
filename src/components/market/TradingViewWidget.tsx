'use client';

import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
  theme?: 'light' | 'dark';
  containerId: string;
  /** 1=Candlestick, 3=Area/Line (default), 2=Line */
  chartStyle?: '1' | '2' | '3';
  interval?: string;
}

export default function TradingViewWidget({
  symbol,
  theme = 'light',
  containerId,
  chartStyle = '3',
  interval = 'D',
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval,
      timezone: 'Etc/UTC',
      theme,
      style: chartStyle,
      locale: 'en',
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_side_toolbar: true,
      hide_legend: false,
      withdateranges: true,
      allow_symbol_change: false,
      save_image: false,
      details: false,
      hotlist: false,
      calendar: false,
      container_id: containerId,
    });

    const currentContainer = container.current;
    if (currentContainer) currentContainer.appendChild(script);

    return () => {
      if (currentContainer) currentContainer.innerHTML = '';
    };
  }, [symbol, theme, containerId, chartStyle, interval]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: '100%', width: '100%' }}>
      <div id={containerId} style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
}
