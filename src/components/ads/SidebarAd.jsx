'use client'
import Script from 'next/script'

/**
 * Sidebar Ad - 300x250
 * Hidden on mobile via CSS (.ad-sidebar)
 */
export function SidebarAd() {
  return (
    <div
      className="ad-sidebar ad-container"
      style={{ width: 300, minHeight: 250 }}
      aria-label="Advertisement"
    >
      <Script
        id="sidebar-ad-options"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.atOptions_sidebar = {
              'key' : '5480ecd74cbb498452aec2224198c3e4',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
          `,
        }}
      />
      <Script
        src="https://www.highperformanceformat.com/5480ecd74cbb498452aec2224198c3e4/invoke.js"
        strategy="lazyOnload"
        id="sidebar-ad-script"
      />
    </div>
  )
}
