import { Zap, Shield, Clock, Star } from 'lucide-react'

const stats = [
  { value: '50K+', label: 'Students', icon: '👩‍🎓' },
  { value: '200K+', label: 'PDFs Processed', icon: '📄' },
  { value: '4.9★', label: 'Rating', icon: '⭐' },
  { value: 'Free', label: 'Forever', icon: '🎉' },
]

const badges = [
  { icon: <Zap size={14} />, text: 'Instant AI Notes' },
  { icon: <Shield size={14} />, text: 'No Login Required' },
  { icon: <Clock size={14} />, text: 'Results in 30s' },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-30 dark:opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(61,92,255,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute top-1/3 left-0 w-64 h-64 rounded-full opacity-20 dark:opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(16,201,123,0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="container-app section-gap relative z-10 text-center">
        {/* Badges row */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {badges.map((b, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(61, 92, 255, 0.08)',
                border: '1px solid rgba(61, 92, 255, 0.2)',
                color: '#3d5cff',
              }}
            >
              {b.icon}
              {b.text}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Turn Any PDF Into{' '}
          <span className="gradient-text">Perfect Study Notes</span>
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">in Seconds</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Upload your textbook, lecture notes, or study guide — get instant AI-generated{' '}
          <strong>notes, flashcards, MCQs, and quizzes</strong>. No signup. No credit card. Completely free.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a href="#upload" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
            <span>✨</span>
            Generate Study Notes Free
          </a>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 text-base px-8 py-4 rounded-xl font-semibold transition-all"
            style={{
              border: '2px solid var(--border)',
              color: 'var(--text-primary)',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#3d5cff'
              e.currentTarget.style.color = '#3d5cff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
          >
            See how it works →
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {stats.map((s, i) => (
            <div
              key={i}
              className="card p-4 text-center"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--font-display)', color: '#3d5cff' }}
              >
                {s.value}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
