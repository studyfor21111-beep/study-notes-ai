'use client'
import { useState, useEffect } from 'react'
import { BookOpen, Moon, Sun, Menu, X, Zap } from 'lucide-react'

export function Navbar() {
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Read saved theme
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (saved === 'dark' || (!saved && prefersDark)) {
      setDark(true)
    }

    // Scroll detection
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav
      className={`navbar transition-all duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
      style={{ background: scrolled ? undefined : 'transparent', borderBottom: scrolled ? undefined : 'none' }}
    >
      <div className="container-app flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="StudyAI Home">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3d5cff, #10c97b)' }}
          >
            <BookOpen size={16} className="text-white" />
          </div>
          <span
            className="font-bold text-lg"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Study<span className="gradient-text">AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => (e.target.style.color = '#3d5cff')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
            }}
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* CTA */}
          <a
            href="#upload"
            className="hidden md:flex btn-primary items-center gap-2 text-sm"
            style={{ padding: '8px 18px' }}
          >
            <Zap size={14} />
            Try Free
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
        >
          <div className="container-app py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium py-2"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#upload"
              className="btn-primary flex items-center justify-center gap-2 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <Zap size={14} />
              Try Free Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
