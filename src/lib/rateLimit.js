/**
 * Simple in-memory rate limiter.
 * Resets per IP per minute window.
 * In production, use Redis (Upstash) for distributed rate limiting.
 */

const requests = new Map()

const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX || '5')
const WINDOW_MS = 60 * 1000 // 1 minute

export function rateLimit(ip) {
  const now = Date.now()
  const key = ip || 'anonymous'

  if (!requests.has(key)) {
    requests.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  const record = requests.get(key)

  // Reset window if expired
  if (now > record.resetAt) {
    record.count = 1
    record.resetAt = now + WINDOW_MS
    requests.set(key, record)
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  // Check limit
  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000)
    return { allowed: false, remaining: 0, retryAfter }
  }

  record.count++
  requests.set(key, record)
  return { allowed: true, remaining: MAX_REQUESTS - record.count }
}

// Cleanup old entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of requests.entries()) {
      if (now > record.resetAt + WINDOW_MS) {
        requests.delete(key)
      }
    }
  }, 5 * 60 * 1000)
}
