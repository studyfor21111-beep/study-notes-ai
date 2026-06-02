'use client'
import { useState } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'
import { Trophy, RotateCcw, CheckCircle, XCircle } from 'lucide-react'

const DIFFICULTY_COLORS = {
  easy: { bg: 'rgba(16, 201, 123, 0.1)', text: '#10c97b' },
  medium: { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' },
  hard: { bg: 'rgba(244, 63, 94, 0.1)', text: '#f43f5e' },
}

export function QuizSection({ quiz }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({}) // { questionIndex: selectedOptionIndex }
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const question = quiz[currentQ]
  const totalQuestions = quiz.length
  const isAnswered = currentQ in answers

  const handleSelect = (optionIndex) => {
    if (isAnswered) return
    setSelectedOption(optionIndex)
    setAnswers((prev) => ({ ...prev, [currentQ]: optionIndex }))
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQ < totalQuestions - 1) {
      setCurrentQ(currentQ + 1)
      setSelectedOption(null)
      setShowExplanation(false)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentQ(0)
    setAnswers({})
    setSelectedOption(null)
    setShowExplanation(false)
    setShowResult(false)
  }

  const score = Object.entries(answers).filter(
    ([qIdx, aIdx]) => quiz[parseInt(qIdx)]?.correctIndex === aIdx
  ).length

  const scorePercent = Math.round((score / totalQuestions) * 100)

  const getScoreMessage = () => {
    if (scorePercent >= 90) return { text: 'Outstanding! 🏆', color: '#10c97b' }
    if (scorePercent >= 70) return { text: 'Great job! 🎉', color: '#3d5cff' }
    if (scorePercent >= 50) return { text: 'Good effort! 📚', color: '#f59e0b' }
    return { text: 'Keep studying! 💪', color: '#f43f5e' }
  }

  const textContent = quiz
    .map(
      (q, i) =>
        `Q${i + 1} [${q.difficulty?.toUpperCase() || 'MEDIUM'}]: ${q.question}\n${q.options.map((o, j) => `  ${String.fromCharCode(65 + j)}. ${o}`).join('\n')}\nAnswer: ${String.fromCharCode(65 + q.correctIndex)}\n${q.explanation ? `Explanation: ${q.explanation}` : ''}`
    )
    .join('\n\n')

  /* ============ RESULT SCREEN ============ */
  if (showResult) {
    const msg = getScoreMessage()
    return (
      <div className="animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(244, 63, 94, 0.1)' }}
            >
              <Trophy size={20} style={{ color: '#f43f5e' }} />
            </div>
            <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Quiz Results
            </h2>
          </div>
          <CopyButton text={textContent} label="Copy Quiz" />
        </div>

        {/* Score card */}
        <div
          className="card p-8 text-center mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(61,92,255,0.05), rgba(16,201,123,0.05))',
          }}
        >
          <div
            className="text-7xl font-extrabold mb-2"
            style={{ fontFamily: 'var(--font-display)', color: msg.color }}
          >
            {scorePercent}%
          </div>
          <p className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            {msg.text}
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            You got {score} out of {totalQuestions} questions correct
          </p>

          {/* Progress bar */}
          <div
            className="w-full max-w-xs mx-auto mt-6 rounded-full overflow-hidden"
            style={{ height: '8px', background: 'var(--bg-secondary)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${scorePercent}%`, background: msg.color }}
            />
          </div>
        </div>

        {/* Per-question review */}
        <div className="space-y-3 mb-6">
          {quiz.map((q, i) => {
            const userAnswer = answers[i]
            const correct = userAnswer === q.correctIndex
            return (
              <div
                key={i}
                className="card p-4 flex items-start gap-3"
              >
                {correct ? (
                  <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#10c97b' }} />
                ) : (
                  <XCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#f43f5e' }} />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium mb-1">{q.question}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Your answer:{' '}
                    <span style={{ color: correct ? '#10c97b' : '#f43f5e' }}>
                      {String.fromCharCode(65 + (userAnswer ?? 0))}. {q.options[userAnswer ?? 0]}
                    </span>
                    {!correct && (
                      <>
                        {' · '}Correct:{' '}
                        <span style={{ color: '#10c97b' }}>
                          {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={handleRestart}
          className="btn-primary flex items-center gap-2 mx-auto"
        >
          <RotateCcw size={16} />
          Retake Quiz
        </button>
      </div>
    )
  }

  /* ============ QUIZ SCREEN ============ */
  const difficulty = question.difficulty || 'medium'
  const diffColors = DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.medium

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(244, 63, 94, 0.1)' }}
          >
            <Trophy size={20} style={{ color: '#f43f5e' }} />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Quiz Mode
            </h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Question {currentQ + 1} of {totalQuestions}
            </p>
          </div>
        </div>
        <CopyButton text={textContent} label="Copy Quiz" />
      </div>

      {/* Progress bar */}
      <div
        className="w-full rounded-full mb-6 overflow-hidden"
        style={{ height: '6px', background: 'var(--bg-secondary)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${((currentQ + 1) / totalQuestions) * 100}%`,
            background: 'linear-gradient(90deg, #3d5cff, #10c97b)',
          }}
        />
      </div>

      <div className="card p-6">
        {/* Difficulty badge */}
        <span
          className="text-xs font-semibold px-2 py-1 rounded-full mb-4 inline-block capitalize"
          style={{ background: diffColors.bg, color: diffColors.text }}
        >
          {difficulty}
        </span>

        <p className="font-semibold text-lg mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-display)' }}>
          {question.question}
        </p>

        <div className="space-y-3 mb-4">
          {question.options.map((option, i) => {
            const answered = isAnswered
            const isCorrectOpt = i === question.correctIndex
            const isUserSelected = i === answers[currentQ]

            let className = 'quiz-option'
            if (answered && isCorrectOpt) className += ' correct'
            else if (answered && isUserSelected && !isCorrectOpt) className += ' wrong'

            return (
              <button
                key={i}
                className={className}
                onClick={() => handleSelect(i)}
                disabled={isAnswered}
              >
                <span className="font-bold mr-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {String.fromCharCode(65 + i)}.
                </span>
                {option}
                {answered && isCorrectOpt && <span className="ml-2 float-right">✓</span>}
                {answered && isUserSelected && !isCorrectOpt && <span className="ml-2 float-right">✗</span>}
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && question.explanation && (
          <div
            className="p-4 rounded-xl text-sm answer-reveal mb-4"
            style={{
              background: 'rgba(61, 92, 255, 0.06)',
              border: '1px solid rgba(61, 92, 255, 0.15)',
            }}
          >
            <span className="font-semibold" style={{ color: '#3d5cff' }}>💡 </span>
            <span style={{ color: 'var(--text-secondary)' }}>{question.explanation}</span>
          </div>
        )}

        {/* Next button */}
        {isAnswered && (
          <button
            onClick={handleNext}
            className="btn-primary w-full animate-fade-in"
          >
            {currentQ < totalQuestions - 1 ? 'Next Question →' : 'See Results 🏆'}
          </button>
        )}
      </div>
    </div>
  )
}
