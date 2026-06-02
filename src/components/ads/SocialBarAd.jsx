'use client'
import Script from 'next/script'

/**
 * Social Bar Ad - loads globally across the site
 * Positioned fixed at the bottom by Adsterra's script
 */
export function SocialBarAd() {
  return (
    <Script
      src="https://pl29614670.effectivecpmnetwork.com/be/22/ee/be22eebe29858113cd0fca81d604e586.js"
      strategy="lazyOnload"
      onError={(e) => console.log('Ad script failed to load', e)}
    />
  )
}
