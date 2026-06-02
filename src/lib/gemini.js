export async function generateStudyMaterials(pdfText) {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing")
  }

  const trimmedText = pdfText.slice(0, 6000)

  const prompt = `
Create study material from the given text.

Return ONLY valid JSON.

Include:
- subject
- summary
- notes
- flashcards
- mcqs
- quiz

Generate:
- 10 flashcards
- 10 MCQs
- 10 quiz questions

Text:
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
              content:
                "You are a JSON-only API. Always return valid JSON only.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0.3,

          response_format: {
            type: "json_object",
          },

          max_tokens: 2000,
        }),
      }
    )

    // RAW RESPONSE
    const rawText = await response.text()

    console.log("RAW RESPONSE:", rawText)

    // Convert response to JSON
    const data = JSON.parse(rawText)

    // Handle API errors
    if (data.error) {
      console.log("GROQ API ERROR:", data.error)
      throw new Error(data.error.message || "Groq API failed")
    }

    // Extract AI content
    const content = data?.choices?.[0]?.message?.content

    if (!content) {
      throw new Error("No AI content returned")
    }

    console.log("AI CONTENT:", content)

    // Parse final JSON
    return JSON.parse(content)
  } catch (err) {
    console.error("FULL AI ERROR:", err)
    throw new Error("AI failed to generate study materials")
  }
}