export function LoadingSpinner({ message = 'Generating your study materials...' }) {
  const steps = [
    '📄 Extracting PDF content',
    '🧠 Analyzing with Gemini AI',
    '📝 Creating study notes',
    '🃏 Building flashcards',
    '❓ Generating MCQs & Quiz',
  ]

  return (
    <div className="flex flex-col items-center justify-center py-20 px-8">
      {/* Animated orb */}
      <div className="relative w-24 h-24 mb-8">
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: 'rgba(61, 92, 255, 0.2)' }}
        />
        <div
          className="absolute inset-2 rounded-full animate-ping"
          style={{ background: 'rgba(16, 201, 123, 0.2)', animationDelay: '0.3s' }}
        />
        <div
          className="absolute inset-4 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #3d5cff, #10c97b)' }}
        >
          <span className="text-2xl">✨</span>
        </div>
      </div>

      {/* Loading dots */}
      <div className="flex gap-2 mb-6">
        <div className="loading-dot" />
        <div className="loading-dot" />
        <div className="loading-dot" />
      </div>

      <h3
        className="text-xl font-bold mb-2 text-center"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {message}
      </h3>
      <p className="text-sm mb-8 text-center" style={{ color: 'var(--text-secondary)' }}>
        This usually takes 15–30 seconds
      </p>

      {/* Steps */}
      <div className="w-full max-w-sm space-y-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-sm animate-fade-in"
            style={{
              color: 'var(--text-secondary)',
              animationDelay: `${i * 0.6}s`,
              opacity: 0,
            }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(61, 92, 255, 0.15)' }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: '#3d5cff' }} />
            </div>
            {step}
          </div>
        ))}
      </div>
    </div>
  )
}
