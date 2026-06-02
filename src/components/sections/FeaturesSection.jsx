const features = [
  {
    icon: '📝',
    title: 'Smart Study Notes',
    description:
      'Get concise, structured notes with key points and section summaries. Perfect for last-minute revision.',
    color: '#3d5cff',
    bg: 'rgba(61, 92, 255, 0.08)',
  },
  {
    icon: '🃏',
    title: 'Interactive Flashcards',
    description:
      'Flip-animated flashcards for active recall. Perfect Anki-style spaced repetition preparation.',
    color: '#10c97b',
    bg: 'rgba(16, 201, 123, 0.08)',
  },
  {
    icon: '❓',
    title: 'Multiple Choice Questions',
    description:
      'Practice with AI-generated MCQs that cover all key concepts with detailed explanations.',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.08)',
  },
  {
    icon: '🧠',
    title: 'Interactive Quiz Mode',
    description:
      'Test yourself with a scored quiz. Track your performance and identify weak areas instantly.',
    color: '#f43f5e',
    bg: 'rgba(244, 63, 94, 0.08)',
  },
  {
    icon: '⚡',
    title: 'Instant Generation',
    description:
      'Powered by Google Gemini AI. Get comprehensive study materials in under 30 seconds.',
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.08)',
  },
  {
    icon: '📱',
    title: 'Mobile Friendly',
    description:
      'Study anywhere on any device. Fully responsive design that works perfectly on phones and tablets.',
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.08)',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="section-gap">
      <div className="container-app">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold px-4 py-2 rounded-full mb-4 inline-block"
            style={{
              background: 'rgba(61, 92, 255, 0.08)',
              border: '1px solid rgba(61, 92, 255, 0.2)',
              color: '#3d5cff',
            }}
          >
            Features
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold mt-4 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Everything You Need to{' '}
            <span className="gradient-text">Study Smarter</span>
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            One PDF upload. Four powerful study tools. Zero effort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="card p-6 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl transition-transform group-hover:scale-110"
                style={{ background: f.bg }}
              >
                {f.icon}
              </div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ fontFamily: 'var(--font-display)', color: f.color }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
