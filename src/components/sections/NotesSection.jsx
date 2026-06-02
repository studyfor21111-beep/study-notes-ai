'use client'
import { CopyButton } from '@/components/ui/CopyButton'
import { BookOpen, Lightbulb } from 'lucide-react'

export function NotesSection({ notes, subject }) {
  const textContent = [
    `📚 Study Notes: ${subject}`,
    '',
    '🎯 Key Points:',
    ...(notes.keyPoints || []).map((p, i) => `${i + 1}. ${p}`),
    '',
    ...(notes.sections || []).flatMap((s) => [
      `## ${s.heading}`,
      s.content,
      '',
    ]),
  ].join('\n')

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(61, 92, 255, 0.1)' }}
          >
            <BookOpen size={20} style={{ color: '#3d5cff' }} />
          </div>
          <div>
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Study Notes
            </h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {subject}
            </p>
          </div>
        </div>
        <CopyButton text={textContent} label="Copy Notes" />
      </div>

      {/* Key Points */}
      {notes.keyPoints && notes.keyPoints.length > 0 && (
        <div className="card p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={16} style={{ color: '#f59e0b' }} />
            <h3
              className="font-bold"
              style={{ fontFamily: 'var(--font-display)', color: '#f59e0b' }}
            >
              Key Points
            </h3>
          </div>
          <ul className="space-y-2">
            {notes.keyPoints.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                  style={{ background: 'rgba(61, 92, 255, 0.1)', color: '#3d5cff' }}
                >
                  {i + 1}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(notes.sections || []).map((section, i) => (
          <div key={i} className="card p-5">
            <h3
              className="font-bold mb-3 text-sm"
              style={{ fontFamily: 'var(--font-display)', color: '#3d5cff' }}
            >
              {section.heading}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
