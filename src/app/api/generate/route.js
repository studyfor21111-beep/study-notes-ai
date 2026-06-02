import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'
import { generateStudyMaterials } from '@/lib/gemini'

// Max file size: 10MB
const MAX_FILE_SIZE = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || '10') * 1024 * 1024

export async function POST(request) {
  // Get client IP for rate limiting
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'

  // Rate limiting check
  const { allowed, remaining, retryAfter } = rateLimit(ip)
  if (!allowed) {
    return NextResponse.json(
      {
        error: `Too many requests. Please wait ${retryAfter} seconds before trying again.`,
        retryAfter,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(retryAfter) },
      }
    )
  }

  try {
    // Parse multipart form data
    const formData = await request.formData()
    const file = formData.get('pdf')

    // Validate file exists
    if (!file) {
      return NextResponse.json({ error: 'No PDF file provided.' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF file.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File too large. Maximum size is ${process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || 10}MB.`,
        },
        { status: 400 }
      )
    }

    // Convert file to buffer for pdf-parse
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Dynamically import pdf-parse (avoids issues with Next.js edge runtime)
    let pdfText = ''
    try {
      const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default
      const maxPages = parseInt(process.env.MAX_PDF_PAGES || '50')

      const pdfData = await pdfParse(buffer, {
        max: maxPages, // Limit pages processed
      })

      pdfText = pdfData.text?.trim() || ''
    } catch (pdfErr) {
      console.error('PDF parse error:', pdfErr)
      return NextResponse.json(
        {
          error:
            'Could not read PDF. The file may be scanned, password-protected, or corrupted. Please try a text-based PDF.',
        },
        { status: 422 }
      )
    }

    // Validate extracted text
    if (!pdfText || pdfText.length < 50) {
      return NextResponse.json(
        {
          error:
            'PDF appears to be empty or contains only images/scanned text. Please upload a text-based PDF.',
        },
        { status: 422 }
      )
    }

    // Generate study materials with Gemini
    const studyMaterials = await generateStudyMaterials(pdfText)

    return NextResponse.json(
      {
        success: true,
        data: studyMaterials,
        meta: {
          pagesExtracted: pdfText.length,
          remaining,
        },
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(remaining),
        },
      }
    )
  } catch (err) {
    console.error('Generate API error:', err)

    // Handle Gemini quota errors
    if (err.message?.includes('quota') || err.message?.includes('429')) {
      return NextResponse.json(
        {
          error:
            'AI service is temporarily busy. Please wait a moment and try again.',
        },
        { status: 503 }
      )
    }

    // Handle missing API key
    if (err.message?.includes('GEMINI_API_KEY')) {
      return NextResponse.json(
        {
          error: 'AI service is not configured. Please contact support.',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        error: err.message || 'Something went wrong. Please try again.',
      },
      { status: 500 }
    )
  }
}

// Increase body size limit for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}
