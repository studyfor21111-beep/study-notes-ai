# 🎓 StudyAI – AI Study Notes Generator

> Transform any PDF into beautiful study notes, flashcards, MCQs, and quizzes in seconds. Powered by Google Gemini AI. Free forever.

![StudyAI](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-blue?logo=google)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 📄 **Drag & Drop PDF Upload** – Supports PDFs up to 10MB
- 📝 **AI Study Notes** – Key points + organized sections
- 🃏 **Flip Flashcards** – Interactive 3D flip animation
- ❓ **MCQs with Explanations** – Click to reveal answers
- 🧠 **Interactive Quiz Mode** – Scored quiz with result screen
- 🌙 **Dark Mode** – Saved to localStorage
- 📱 **Fully Responsive** – Mobile, tablet, desktop
- ⚡ **Rate Limiting** – 5 requests per IP per minute
- 🔒 **No Login Required** – Zero friction
- 📥 **Download Results** – Export as .txt file
- 📋 **Copy Any Section** – One-click clipboard copy
- 💸 **Adsterra Monetization** – 6 ad placements integrated

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/study-notes-ai.git
cd study-notes-ai
npm install
```

### 2. Add Gemini API Key

Create `.env.local` in the project root:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your key:

```
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

**Get a free Gemini API key at:** https://aistudio.google.com/app/apikey  
(It's free — no credit card needed!)

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy on Vercel

### Option A: One-Click Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/study-notes-ai)

### Option B: Manual Deploy

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/study-notes-ai.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo

3. Add environment variable in Vercel:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your Gemini API key

4. Click **Deploy** 🎉

---

## 🔑 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | — | Your Google Gemini API key |
| `NEXT_PUBLIC_MAX_FILE_SIZE_MB` | No | `10` | Max upload file size in MB |
| `MAX_PDF_PAGES` | No | `50` | Max pages to extract from PDF |
| `RATE_LIMIT_MAX` | No | `5` | Max requests per IP per minute |

---

## 📁 Project Structure

```
study-notes-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.js       # Main API endpoint
│   │   ├── globals.css            # Global styles
│   │   ├── layout.js              # Root layout + SEO metadata
│   │   ├── page.js                # Main page
│   │   └── sitemap.js             # SEO sitemap
│   ├── components/
│   │   ├── ads/
│   │   │   ├── TopBannerAd.jsx    # 468x60 banner under navbar
│   │   │   ├── SidebarAd.jsx      # 300x250 sidebar (desktop)
│   │   │   ├── InContentAd.jsx    # Native banner between sections
│   │   │   ├── FooterBannerAd.jsx # 468x60 footer banner
│   │   │   ├── MobileStickyAd.jsx # 320x50 mobile sticky
│   │   │   └── SocialBarAd.jsx    # Social bar (global)
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── HowItWorksSection.jsx
│   │   │   ├── FAQSection.jsx
│   │   │   ├── NotesSection.jsx
│   │   │   ├── FlashcardsSection.jsx
│   │   │   ├── MCQSection.jsx
│   │   │   ├── QuizSection.jsx
│   │   │   └── ResultsPanel.jsx   # Tabs + download
│   │   └── ui/
│   │       ├── Navbar.jsx
│   │       ├── Footer.jsx
│   │       ├── UploadZone.jsx
│   │       ├── LoadingSpinner.jsx
│   │       └── CopyButton.jsx
│   └── lib/
│       ├── gemini.js              # Gemini AI integration
│       └── rateLimit.js           # In-memory rate limiter
├── public/
│   ├── robots.txt
│   └── site.webmanifest
├── .env.local.example
├── .gitignore
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## ⚙️ Customization Guide

### 📏 Change Upload File Size Limit

In `.env.local`:
```
NEXT_PUBLIC_MAX_FILE_SIZE_MB=20
```

Also update Vercel's function body size. In `next.config.js`, the API routes accept any body size by default in App Router.

### 🔢 Change Rate Limiting

In `.env.local`:
```
RATE_LIMIT_MAX=10
```

For production with multiple servers, replace `src/lib/rateLimit.js` with Upstash Redis:
```bash
npm install @upstash/ratelimit @upstash/redis
```

### 📄 Change Max PDF Pages

In `.env.local`:
```
MAX_PDF_PAGES=30
```

### 🎨 Edit Ad Positions

| Ad Component | Location | How to Move |
|---|---|---|
| `TopBannerAd` | Under navbar in `page.js` | Move the `<TopBannerAd />` tag |
| `SidebarAd` | Next to upload area | Adjust flex layout in `page.js` |
| `InContentAd` | Between result tabs in `ResultsPanel.jsx` | Move `<InContentAd />` tags |
| `FooterBannerAd` | Top of footer | Edit `Footer.jsx` |
| `MobileStickyAd` | Bottom fixed on mobile | Always at bottom, CSS controlled |
| `SocialBarAd` | Global (layout.js) | Loads via Adsterra's own positioning |

To **hide** an ad on certain pages, simply remove the component from that page's JSX.

To **add a new ad**, create a new component in `src/components/ads/` following the same pattern.

### 🎨 Change Colors

In `tailwind.config.js`, update the `ink` color palette. The primary brand color is `#3d5cff`.

To change the gradient in text/buttons, search for `#3d5cff` and `#10c97b` in `globals.css`.

---

## 🧪 Testing Locally

1. Get a free Gemini API key from https://aistudio.google.com/app/apikey
2. Add it to `.env.local`
3. Run `npm run dev`
4. Upload any text-based PDF
5. Wait ~20 seconds for AI generation

**Good test PDFs:**
- Download any Wikipedia article as PDF
- Use a textbook chapter PDF
- Any lecture notes PDF

---

## 🐛 Troubleshooting

| Problem | Solution |
|---|---|
| "GEMINI_API_KEY is not configured" | Add key to `.env.local` and restart dev server |
| "Could not read PDF" | Use a text-based PDF, not scanned |
| "Too many requests" | Wait 1 minute (rate limited to 5/min per IP) |
| "AI returned invalid response" | Try again; occasionally Gemini returns malformed JSON |
| Ads not showing | Ads may be blocked by your browser's ad blocker |
| Build error on Vercel | Ensure `GEMINI_API_KEY` env var is set in Vercel dashboard |

---

## 📊 Performance Notes

- First load: < 2s (static HTML + CSS)
- AI generation: 15–30 seconds (Gemini API)
- Ads: lazy loaded, don't block initial render
- No database needed
- No user data stored

---

## 📜 License

MIT License – free for personal and commercial use.

---

## 🙏 Built With

- [Next.js 14](https://nextjs.org/) – React framework
- [Tailwind CSS](https://tailwindcss.com/) – Utility CSS
- [Google Gemini AI](https://ai.google.dev/) – AI generation
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) – PDF text extraction
- [Adsterra](https://adsterra.com/) – Ad monetization
- [Lucide React](https://lucide.dev/) – Icons
