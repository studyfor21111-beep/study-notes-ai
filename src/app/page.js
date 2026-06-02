'use client'
import { useState } from 'react'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { UploadZone } from '@/components/ui/UploadZone'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ResultsPanel } from '@/components/sections/ResultsPanel'
import { TopBannerAd } from '@/components/ads/TopBannerAd'
import { SidebarAd } from '@/components/ads/SidebarAd'
import { MobileStickyAd } from '@/components/ads/MobileStickyAd'
import { AlertCircle } from 'lucide-react'

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  const handleUpload = async (file) => {
    setLoading(true)
    setError('')
    setResults(null)

    const formData = new FormData()
    formData.append('pdf', file)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Failed to generate study materials.')
      }

      setResults(json.data)

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResults(null)
    setError('')
    setLoading(false)
    setTimeout(() => {
      document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      <Navbar />

      {/* Top Banner Ad under navbar */}
      <TopBannerAd />

      <main>
        {/* Hero */}
        {!results && !loading && <HeroSection />}

        {/* Upload Section */}
        <section
          id="upload"
          className="section-gap"
          style={{ background: results || loading ? 'var(--bg-primary)' : 'var(--bg-secondary)' }}
        >
          <div className="container-app">
            {!results && !loading && (
              <div className="text-center mb-10">
                <h2
                  className="text-3xl sm:text-4xl font-extrabold mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Upload Your PDF
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Drop your PDF below and let AI do the hard work
                </p>
              </div>
            )}

            {/* Layout: upload zone + sidebar ad */}
            <div className="flex gap-8 justify-center items-start">
              <div className="flex-1 max-w-xl">
                {/* Loading state */}
                {loading && <LoadingSpinner />}

                {/* Upload form */}
                {!loading && !results && (
                  <>
                    <UploadZone onUpload={handleUpload} loading={loading} />

                    {/* Error */}
                    {error && (
                      <div
                        className="flex items-start gap-3 p-4 rounded-xl mt-4 text-sm"
                        style={{ background: 'rgba(244, 63, 94, 0.08)', color: '#f43f5e' }}
                      >
                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>Error: </strong>{error}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Results */}
                {results && !loading && (
                  <div id="results">
                    <ResultsPanel data={results} onReset={handleReset} />
                  </div>
                )}
              </div>

              {/* Sidebar ad - desktop only */}
              {!loading && (
                <div className="ad-sidebar flex-shrink-0 hidden lg:block">
                  <SidebarAd />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Rest of landing page - hide when results shown */}
        {!results && !loading && (
          <>
            <FeaturesSection />
            <HowItWorksSection />
            <FAQSection />

            {/* Final CTA section */}
            <section className="section-gap" style={{ background: 'var(--bg-secondary)' }}>
              <div className="container-app text-center">
                <div
                  className="max-w-2xl mx-auto card p-12"
                  style={{
                    background: 'linear-gradient(135deg, rgba(61,92,255,0.08), rgba(16,201,123,0.08))',
                    border: '1px solid rgba(61, 92, 255, 0.2)',
                  }}
                >
                  <div className="text-5xl mb-4">🎓</div>
                  <h2
                    className="text-3xl sm:text-4xl font-extrabold mb-4"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Start Studying Smarter{' '}
                    <span className="gradient-text">Today</span>
                  </h2>
                  <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Join 50,000+ students who study smarter with AI-generated notes, flashcards, and quizzes.
                  </p>
                  <a href="#upload" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
                    ✨ Generate Study Notes — It's Free!
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />

      {/* Mobile sticky ad */}
      <MobileStickyAd />
    </>
  )
}
