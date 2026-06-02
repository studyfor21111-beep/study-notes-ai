export async function generateStudyMaterials(pdfText, mcqCount = 10, quizCount = 10) {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured")
  }

  const trimmedText = pdfText.slice(0, 12000)

  // 🔥 MASTER PROMPT (IMPROVED + STRICT JSON + MORE CONTROL)
  const prompt = `
You are an expert AI study assistant.

Your task is to convert the given content into HIGH QUALITY structured study material.

VERY IMPORTANT RULES:
- Return ONLY valid JSON (no markdown, no explanation, no backticks)
- Do NOT include any text before or after JSON
- If you fail, output must still be valid JSON
- Content must be strictly based on the input text

USER REQUIREMENTS:
- MCQs: ${mcqCount}
- Quiz Questions: ${quizCount}

CONTENT:
"""
${trimmedText}
"""

OUTPUT FORMAT (STRICT):
{
  "subject": "short topic name",
  "summary": "2-3 line explanation of the topic",
  "notes": {
    "title": "Study Notes",
    "keyPoints": [
      "point 1",
      "point 2",
      "point 3",
      "point 4",
      "point 5",
      "point 6",
      "point 7",
      "point 8"
    ],
    "sections": [
      {
        "heading": "Section 1",
        "content": "Detailed explanation in 3-5 lines"
      },
      {
        "heading": "Section 2",
        "content": "Detailed explanation in 3-5 lines"
      },
      {
        "heading": "Section 3",
        "content": "Detailed explanation in 3-5 lines"
      }
    ]
  },

  "flashcards": [
    {
      "id": 1,
      "front": "term or question",
      "back": "answer explanation"
    },
    {
      "id": 2,
      "front": "term or question",
      "back": "answer explanation"
    },
    {
      "id": 3,
      "front": "term or question",
      "back": "answer explanation"
    },
    {
      "id": 4,
      "front": "term or question",
      "back": "answer explanation"
    },
    {
      "id": 5,
      "front": "term or question",
      "back": "answer explanation"
    }
  ],

  "mcqs": Array.from({length: ${mcqCount}}).map((_, i) => ({
    "id": i + 1,
    "question": "MCQ question " + (i + 1),
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "explanation": "Why this answer is correct"
  })),

  "quiz": Array.from({length: ${quizCount}}).map((_, i) => ({
    "id": i + 1,
    "question": "Quiz question " + (i + 1),
    "options": ["A", "B", "C", "D"],
    "correctIndex": 1,
    "explanation": "Detailed explanation",
    "difficulty": "medium"
  }))
}

RULES:
- MCQs must be REAL questions from content (not dummy text)
- Quiz must be slightly harder than MCQs
- Options must be meaningful, not "A B C D"
- correctIndex must vary (0–3)
- Keep answers accurate from text
`

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    }
  )

  // 🔥 IMPORTANT: CHECK RESPONSE FIRST
  if (!response.ok) {
    const errorText = await response.text()
    console.error("Groq API Error:", errorText)
    throw new Error("Groq API failed: " + response.status)
  }

  const data = await response.json()

  const text = data?.choices?.[0]?.message?.content

  if (!text) {
    console.error("Empty Groq response:", data)
    throw new Error("Groq returned empty response")
  }

  try {
    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    return JSON.parse(clean)
  } catch (err) {
    console.error("Groq JSON parse error:", text)
    throw new Error("AI returned invalid JSON")
  }
}