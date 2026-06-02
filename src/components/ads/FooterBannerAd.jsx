'use client'
import Script from 'next/script'

/**
 * Footer Banner Ad - 468x60
 */
export function FooterBannerAd() {
  return (
    <div className="ad-container w-full py-4" aria-label="Advertisement">
      <Script
        id="footer-ad-options"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.atOptions_footer = {
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
        id="footer-ad-script-banner"
      />
    </div>
  )
}
