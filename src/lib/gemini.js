export async function generateStudyMaterials(pdfText) {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing")
  }

  const trimmedText = pdfText.slice(0, 12000)

  const prompt = `
You are an expert AI study assistant.

Analyze the educational content carefully and generate HIGH QUALITY study material.

CONTENT:
"""
${trimmedText}
"""

RETURN ONLY VALID JSON.

{
  "subject": "Subject Name",
  "summary": "2-3 line summary",

  "notes": {
    "title": "Study Notes",

    "keyPoints": [
      "Point 1",
      "Point 2",
      "Point 3",
      "Point 4",
      "Point 5",
      "Point 6",
      "Point 7",
      "Point 8"
    ],

    "sections": [
      {
        "heading": "Heading",
        "content": "Detailed explanation"
      },
      {
        "heading": "Heading",
        "content": "Detailed explanation"
      },
      {
        "heading": "Heading",
        "content": "Detailed explanation"
      },
      {
        "heading": "Heading",
        "content": "Detailed explanation"
      }
    ]
  },

  "flashcards": [
    {
      "id": 1,
      "front": "Question",
      "back": "Answer"
    },
    {
      "id": 2,
      "front": "Question",
      "back": "Answer"
    },
    {
      "id": 3,
      "front": "Question",
      "back": "Answer"
    },
    {
      "id": 4,
      "front": "Question",
      "back": "Answer"
    },
    {
      "id": 5,
      "front": "Question",
      "back": "Answer"
    },
    {
      "id": 6,
      "front": "Question",
      "back": "Answer"
    },
    {
      "id": 7,
      "front": "Question",
      "back": "Answer"
    },
    {
      "id": 8,
      "front": "Question",
      "back": "Answer"
    },
    {
      "id": 9,
      "front": "Question",
      "back": "Answer"
    },
    {
      "id": 10,
      "front": "Question",
      "back": "Answer"
    }
  ],

  "mcqs": [
    {
      "id": 1,
      "question": "Question?",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "Explanation"
    }
  ],

  "quiz": [
    {
      "id": 1,
      "question": "Hard Question?",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 1,
      "explanation": "Explanation",
      "difficulty": "medium"
    }
  ]
}
`

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
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

    if (!response.ok) {
      const errText = await response.text()
      console.log("GROQ ERROR:", errText)
      throw new Error("Groq API request failed")
    }

    const data = await response.json()

    const text = data?.choices?.[0]?.message?.content

    if (!text) {
      throw new Error("Empty AI response")
    }

    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    return JSON.parse(clean)
  } catch (err) {
    console.error("AI ERROR:", err)
    throw new Error("AI failed to generate study materials")
  }
}