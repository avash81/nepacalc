'use client';

import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
  theme?: 'light' | 'dark';
  containerId: string;
}

export default function TradingViewWidget({ symbol, theme = 'light', containerId }: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Clear previous children to prevent duplicate widgets on re-render
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": symbol,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": theme,
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "hide_top_toolbar": true,
      "hide_legend": true,
      "save_image": false,
      "container_id": containerId
    });

    const currentContainer = container.current;
    if (currentContainer) {
      currentContainer.appendChild(script);
    }

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [symbol, theme, containerId]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div id={containerId} style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
}
