import './globals.css'
import { SocialBarAd } from '@/components/ads/SocialBarAd'

export const metadata = {
  title: 'StudyAI – Instant AI Study Notes from PDF | Free AI Flashcards & MCQs',
  description:
    'Upload any PDF and instantly get AI-generated study notes, flashcards, MCQs, and quizzes. Free AI-powered study tool for students. No signup required.',
  keywords:
    'AI study notes, PDF to notes, AI flashcards, MCQ generator, quiz generator, study tool, free AI study helper',
  authors: [{ name: 'StudyAI' }],
  creator: 'StudyAI',
  publisher: 'StudyAI',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://studyai.vercel.app',
    siteName: 'StudyAI',
    title: 'StudyAI – Instant AI Study Notes from Any PDF',
    description:
      'Transform any PDF into beautiful study notes, flashcards, MCQs, and quizzes in seconds. Powered by Gemini AI. 100% free, no login required.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StudyAI – AI-Powered Study Notes Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudyAI – Instant AI Study Notes from PDF',
    description:
      'Upload any PDF and get AI-generated notes, flashcards & quizzes instantly. Free!',
    images: ['/og-image.png'],
    creator: '@studyai',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#08080f' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        {/* Social bar ad - loads globally */}
        <SocialBarAd />
        {children}
      </body>
    </html>
  )
}
