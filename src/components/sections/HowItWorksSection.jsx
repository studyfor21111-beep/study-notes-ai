const steps = [
  {
    number: '01',
    title: 'Upload Your PDF',
    description:
      'Drag & drop any PDF — textbook chapters, lecture slides, research papers, or study guides.',
    icon: '📤',
  },
  {
    number: '02',
    title: 'AI Processes & Analyzes',
    description:
      'Google Gemini AI reads your content and extracts all key concepts, definitions, and topics.',
    icon: '🤖',
  },
  {
    number: '03',
    title: 'Get Your Study Kit',
    description:
      'Instantly receive organized notes, flip flashcards, practice MCQs, and a scored quiz.',
    icon: '🎓',
  },
  {
    number: '04',
    title: 'Download & Share',
    description:
      'Copy any section or download all materials as a text file to study offline or share with friends.',
    icon: '📥',
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="section-gap"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="container-app">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold px-4 py-2 rounded-full mb-4 inline-block"
            style={{
              background: 'rgba(16, 201, 123, 0.08)',
              border: '1px solid rgba(16, 201, 123, 0.2)',
              color: '#10c97b',
            }}
          >
            How It Works
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold mt-4 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ready in <span className="gradient-text">4 Simple Steps</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            No account needed. No credit card. Just instant AI-powered study materials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line on desktop */}
          <div
            className="hidden lg:block absolute top-8 left-1/4 right-1/4 h-px opacity-30"
            style={{ background: 'linear-gradient(90deg, #3d5cff, #10c97b)' }}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div key={i} className="card p-6 text-center relative">
              {/* Step number */}
              <div
                className="text-xs font-bold px-2 py-1 rounded-lg mb-4 inline-block"
                style={{
                  background: 'rgba(61, 92, 255, 0.08)',
                  color: '#3d5cff',
                  fontFamily: 'var(--font-display)',
                }}
              >
                STEP {step.number}
              </div>

              <div className="text-4xl mb-4">{step.icon}</div>

              <h3
                className="font-bold text-lg mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
