import client from "./utils/openai-client.js";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { difficulty } = req.body;

    const prompt = `
    Generate one ${difficulty} interview question for a Full Stack Developer role.
    Return ONLY JSON:
    {
      "id": "q-${uuidv4()}",
      "difficulty": "${difficulty}",
      "question": "string",
      "time_limit_seconds": 20,
      "expected_keywords": ["a","b"]
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
