import { BookOpen, Heart, Github } from 'lucide-react'
import { FooterBannerAd } from '@/components/ads/FooterBannerAd'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
      {/* Footer Banner Ad */}
      <FooterBannerAd />

      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #3d5cff, #10c97b)' }}
              >
                <BookOpen size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                Study<span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              Transform any PDF into beautiful study notes, flashcards, MCQs, and quizzes
              in seconds. Powered by Gemini AI. Free forever.
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Made with <Heart size={11} className="inline text-red-400" /> for students worldwide
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="font-semibold text-sm mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['#features', '#how-it-works', '#faq', '#upload'].map((href) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => (e.target.style.color = '#3d5cff')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                  >
                    {href.replace('#', '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4
              className="font-semibold text-sm mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Works For
            </h4>
            <ul className="space-y-2">
              {['Biology', 'History', 'Physics', 'Economics', 'Chemistry', 'Law'].map((s) => (
                <li key={s}>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {currentYear} StudyAI. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Free AI Study Tool — No Login Required
          </p>
        </div>
      </div>
    </footer>
  )
}
