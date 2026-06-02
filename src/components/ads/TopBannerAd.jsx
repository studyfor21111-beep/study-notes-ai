'use client'
import { useEffect, useRef } from 'react'
import Script from 'next/script'

/**
 * Top Banner Ad - 468x60
 * Place under navbar
 */
export function TopBannerAd() {
  const loaded = useRef(false)

  return (
    <div
      className="ad-container w-full py-2"
      style={{ minHeight: '68px', background: 'transparent' }}
      aria-label="Advertisement"
    >
      <div style={{ width: 468, maxWidth: '100%' }}>
        <Script
          id="top-banner-ad-options"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.atOptions_top = {
                'key' : '3489ac5bf8b770aa4c7b77f866cb4af1',
                'format' : 'iframe',
                'height' : 60,
                'width' : 468,
                'params' : {}
              };
            `,
          }}
        />
        <Script
          src="https://www.highperformanceformat.com/3489ac5bf8b770aa4c7b77f866cb4af1/invoke.js"
          strategy="lazyOnload"
          id="top-banner-ad-script"
        />
      </div>
    </div>
  )
}
