import Anthropic from '@anthropic-ai/sdk'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const {
    fullName, company, industry, location,
    whatYouDo, whoYouHelp, biggestAchievement,
    whyYouStarted, whatMakesDifferent, futureGoals,
    tone
  } = req.body

  const toneInstructions = {
    professional: 'Write in an authoritative, credible, third-person journalistic tone. Use precise language and industry-appropriate terminology. Focus on credentials, results, and expertise.',
    luxury: 'Write in an elevated, prestigious tone that evokes exclusivity and sophistication. Use refined language that positions the subject as a premium, sought-after authority in their space.',
    inspirational: 'Write in a warm, human, story-driven tone. Emphasize transformation, mission, and emotional connection. Make the reader feel the journey.',
  }

  const prompt = `You are a senior PR journalist writing a high-authority feature article for a major business publication. 

Write a compelling 600-750 word PR article about the following person, using ONLY the information provided. Write in third person.

TONE: ${toneInstructions[tone] || toneInstructions.professional}

SUBJECT INFORMATION:
- Name: ${fullName}
- Company: ${company}
- Industry: ${industry}
- Location: ${location}
- What they do: ${whatYouDo}
- Who they help: ${whoYouHelp}
- Biggest achievement: ${biggestAchievement}
- Why they started: ${whyYouStarted}
- What makes them different: ${whatMakesDifferent}
- Future goals: ${futureGoals || 'Not specified'}

REQUIREMENTS:
1. Start with a powerful, engaging hook (not the person's name)
2. Weave their story naturally — not a list of facts
3. Include 1-2 powerful direct quotes (fabricated in their voice based on their answers)
4. End with a forward-looking, memorable closing paragraph
5. The article should feel like it belongs in Forbes, Entrepreneur, or Inc. Magazine

OUTPUT FORMAT — respond with ONLY valid JSON, no markdown, no code blocks:
{
  "headline": "The compelling article headline here",
  "body": "The full article body here, with paragraphs separated by double newlines (\\n\\n)"
}

Do not include any text outside the JSON object.`

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const raw = message.content[0].text.trim()
    // Strip markdown code fences if present
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim()
    const parsed = JSON.parse(cleaned)

    if (!parsed.headline || !parsed.body) {
      throw new Error('Invalid article format returned')
    }

    res.status(200).json(parsed)
  } catch (err) {
    console.error('Article generation error:', err)
    res.status(500).json({ error: 'Failed to generate article. Please try again.' })
  }
}
