import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return Response.json({ error: "No prompt provided" }, { status: 400 })
    }

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: `You are an expert prompt engineer. Your task is to improve and enhance prompts to make them more effective, clear, and structured.

When given a prompt:
1. Analyze its current effectiveness
2. Improve clarity and specificity
3. Add structure and best practices
4. Ensure it's actionable and comprehensive
5. Make it suitable for AI models

Return ONLY the improved prompt without any explanation or preamble.`,
      prompt: `Please improve this prompt: ${prompt}`,
    })

    return Response.json({ improved: text })
  } catch (error) {
    console.error("Error improving prompt:", error)
    return Response.json({ error: "Failed to improve prompt" }, { status: 500 })
  }
}
