'use client'
import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'
import { HelpCircle, ChevronDown } from 'lucide-react'

function MCQCard({ question, index }) {
  const [revealed, setRevealed] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleSelect = (i) => {
    if (revealed) return
    setSelected(i)
    setRevealed(true)
  }

  const isCorrect = (i) => i === question.correctIndex
  const isWrong = (i) => revealed && i === selected && !isCorrect(i)

  return (
    <div className="card p-5">
      <div className="flex items-start gap-3 mb-4">
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
          style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontFamily: 'var(--font-display)' }}
        >
          {index + 1}
        </span>
        <p className="font-medium text-sm leading-relaxed">{question.question}</p>
      </div>

      <div className="space-y-2 mb-4">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={revealed}
            className={`quiz-option ${
              revealed && isCorrect(i)
                ? 'correct'
                : isWrong(i)
                ? 'wrong'
                : ''
            }`}
          >
            <span className="font-bold mr-2" style={{ fontFamily: 'var(--font-display)' }}>
              {String.fromCharCode(65 + i)}.
            </span>
            {option}
            {revealed && isCorrect(i) && <span className="ml-2">✓</span>}
            {isWrong(i) && <span className="ml-2">✗</span>}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {revealed && question.explanation && (
        <div
          className="p-3 rounded-xl text-sm answer-reveal"
          style={{
            background: 'rgba(16, 201, 123, 0.08)',
            border: '1px solid rgba(16, 201, 123, 0.15)',
            color: 'var(--text-secondary)',
          }}
        >
          <span className="font-semibold" style={{ color: '#10c97b' }}>
            💡 Explanation:{' '}
          </span>
          {question.explanation}
        </div>
      )}

      {!revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="text-xs flex items-center gap-1 mt-2 transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#3d5cff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ChevronDown size={12} />
          Reveal answer
        </button>
      )}
    </div>
  )
}

export function MCQSection({ mcqs }) {
  const textContent = mcqs
    .map(
      (q, i) =>
        `Q${i + 1}: ${q.question}\n${q.options.map((o, j) => `  ${String.fromCharCode(65 + j)}. ${o}`).join('\n')}\nAnswer: ${String.fromCharCode(65 + q.correctIndex)}\nExplanation: ${q.explanation || ''}`
    )
    .join('\n\n')

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(245, 158, 11, 0.1)' }}
          >
            <HelpCircle size={20} style={{ color: '#f59e0b' }} />
          </div>
          <div>
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Multiple Choice Questions
            </h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {mcqs.length} questions · Click options to check answers
            </p>
          </div>
        </div>
        <CopyButton text={textContent} label="Copy MCQs" />
      </div>

      <div className="space-y-4">
        {mcqs.map((mcq, i) => (
          <MCQCard key={mcq.id || i} question={mcq} index={i} />
        ))}
      </div>
    </div>
  )
}
