'use client'
import Script from 'next/script'

/**
 * Mobile Sticky Ad - 320x50
 * Only visible on mobile via CSS
 */
export function MobileStickyAd() {
  return (
    <div className="ad-mobile-sticky" aria-label="Advertisement">
      <Script
        id="mobile-sticky-ad-options"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.atOptions_mobile = {
              'key' : '45257f29a19a6920059854a3a1fb5749',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          `,
        }}
      />
      <Script
        src="https://www.highperformanceformat.com/45257f29a19a6920059854a3a1fb5749/invoke.js"
        strategy="lazyOnload"
        id="mobile-sticky-ad-script"
      />
    </div>
  )
}
