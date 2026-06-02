export async function generateStudyMaterials(pdfText) {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY")
  }

  // SMALLER TEXT = MORE STABLE
  const trimmedText = pdfText.slice(0, 3000)

  const prompt = `
Create short study materials from this text.

Return ONLY valid JSON.

{
  "subject": "",
  "summary": "",
  "notes": {
    "title": "Study Notes",
    "keyPoints": [],
    "sections": []
  },
  "flashcards": [],
  "mcqs": [],
  "quiz": []
}

TEXT:
${trimmedText}
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
              role: "system",
              content: "Return only valid JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],

          response_format: {
            type: "json_object",
          },

          temperature: 0.2,
          max_tokens: 1200,
        }),
      }
    )

    const data = await response.json()

    console.log("GROQ:", data)

    if (data.error) {
      throw new Error(data.error.message)
    }

    const content = data?.choices?.[0]?.message?.content

    if (!content) {
      throw new Error("No content returned")
    }

    return JSON.parse(content)
  } catch (err) {
    console.error("AI ERROR:", err)
    throw new Error("AI failed to generate study materials")
  }
}