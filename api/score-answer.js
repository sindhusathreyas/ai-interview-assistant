import client from "./utils/openai-client.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { question, answer, difficulty } = req.body;

    const prompt = `
    Evaluate candidate answer.
    Q: ${question}
    A: ${answer}
    Difficulty: ${difficulty}

    Return ONLY JSON:
    {
      "score": 0-10,
      "breakdown": { "correctness":0-5, "completeness":0-3, "clarity":0-2 },
      "feedback": "string"
    }`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: prompt }],
    });

    res.json(JSON.parse(completion.choices[0].message.content));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
