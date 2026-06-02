'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Is StudyAI completely free?',
    a: 'Yes! StudyAI is 100% free to use. No subscription, no credit card, no hidden fees. Just upload your PDF and get instant study materials.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No signup required! You can start generating study materials immediately without creating any account or providing any personal information.',
  },
  {
    q: 'What types of PDFs work best?',
    a: 'StudyAI works best with text-based PDFs like textbooks, lecture notes, research papers, and study guides. Scanned PDFs or image-only PDFs may not work as the AI needs readable text.',
  },
  {
    q: 'What is the maximum file size?',
    a: 'You can upload PDF files up to 10MB in size. For very large documents, we recommend uploading specific chapters rather than entire textbooks for better results.',
  },
  {
    q: 'How long does it take to generate study materials?',
    a: 'Most PDFs are processed within 15–30 seconds depending on the length and complexity of the content. You\'ll see a loading animation while AI works.',
  },
  {
    q: 'Can I download my study notes?',
    a: 'Yes! You can copy any section with the copy button, or download all generated materials as a text file using the download button at the top of your results.',
  },
  {
    q: 'Is my PDF data private?',
    a: 'Your PDF content is sent to Google\'s Gemini AI API to generate study materials. We don\'t store your PDFs or generated content on our servers after processing.',
  },
  {
    q: 'Which subjects does StudyAI support?',
    a: 'StudyAI works with any subject — Biology, Chemistry, Physics, History, Economics, Law, Mathematics, Computer Science, Literature, and more. Any text-based PDF works!',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="card overflow-hidden"
      style={{ cursor: 'pointer' }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-5 gap-4">
        <h3 className="font-semibold text-sm sm:text-base" style={{ fontFamily: 'var(--font-display)' }}>
          {q}
        </h3>
        <ChevronDown
          size={18}
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            color: '#3d5cff',
          }}
        />
      </div>
      <div
        style={{
          maxHeight: open ? '200px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <p
          className="px-5 pb-5 text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {a}
        </p>
      </div>
    </div>
  )
}

export function FAQSection() {
  return (
    <section id="faq" className="section-gap">
      <div className="container-app">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold px-4 py-2 rounded-full mb-4 inline-block"
            style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              color: '#f59e0b',
            }}
          >
            FAQ
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold mt-4 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Got questions? We have answers.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>

        {/* CTA after FAQ */}
        <div className="text-center mt-14">
          <p className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Ready to study smarter?
          </p>
          <a href="#upload" className="btn-primary inline-flex items-center gap-2">
            ✨ Try StudyAI Free Now
          </a>
        </div>
      </div>
    </section>
  )
}
