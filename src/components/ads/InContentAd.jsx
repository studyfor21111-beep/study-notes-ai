'use client'
import Script from 'next/script'

let nativeAdCount = 0

/**
 * Native Banner Ad - between content sections
 * Uses Adsterra's native banner format
 */
export function InContentAd({ id = 'default' }) {
  const uniqueId = `native-ad-${id}`

  return (
    <div className="ad-container w-full my-6" aria-label="Advertisement">
      <div id={`container-599d167b6694cd6c99473d4fd6c16d8d-${id}`} />
      <Script
        src="https://pl29614669.effectivecpmnetwork.com/599d167b6694cd6c99473d4fd6c16d8d/invoke.js"
        strategy="lazyOnload"
        id={uniqueId}
        data-cfasync="false"
      />
    </div>
  )
}
