'use client'
import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'
import { Layers, RotateCcw } from 'lucide-react'

function FlipCard({ card, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flip-card h-48`}
      onClick={() => setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      aria-label={`Flashcard ${index + 1}. Click to ${flipped ? 'show question' : 'reveal answer'}`}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
    >
      <div className={`flip-card-inner h-full ${flipped ? 'flipped' : ''}`} style={{ height: '192px' }}>
        {/* Front */}
        <div
          className="flip-card-front card"
          style={{ background: 'var(--bg-card)', flexDirection: 'column', gap: '12px' }}
        >
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full absolute top-3 right-3"
            style={{ background: 'rgba(61, 92, 255, 0.1)', color: '#3d5cff' }}
          >
            Q
          </span>
          <p
            className="text-center text-sm font-medium leading-relaxed"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {card.front}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Click to reveal answer
          </p>
        </div>

        {/* Back */}
        <div
          className="flip-card-back"
          style={{
            background: 'linear-gradient(135deg, rgba(61,92,255,0.08), rgba(16,201,123,0.08))',
            border: '1px solid rgba(61, 92, 255, 0.2)',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full absolute top-3 right-3"
            style={{ background: 'rgba(16, 201, 123, 0.1)', color: '#10c97b' }}
          >
            A
          </span>
          <p
            className="text-center text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {card.back}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FlashcardsSection({ flashcards }) {
  const textContent = flashcards
    .map((c, i) => `Q${i + 1}: ${c.front}\nA${i + 1}: ${c.back}`)
    .join('\n\n')

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(16, 201, 123, 0.1)' }}
          >
            <Layers size={20} style={{ color: '#10c97b' }} />
          </div>
          <div>
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Flashcards
            </h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {flashcards.length} cards · Click each to flip
            </p>
          </div>
        </div>
        <CopyButton text={textContent} label="Copy All" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {flashcards.map((card, i) => (
          <FlipCard key={card.id || i} card={card} index={i} />
        ))}
      </div>

      <p
        className="text-center text-xs mt-4"
        style={{ color: 'var(--text-muted)' }}
      >
        💡 Tip: Click any card to flip between question and answer
      </p>
    </div>
  )
}
