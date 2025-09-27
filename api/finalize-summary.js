import client from "./utils/openai-client.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { candidateName, perQuestionScores } = req.body;

    const prompt = `
    Candidate: ${candidateName}
    Results: ${JSON.stringify(perQuestionScores)}

    Return ONLY JSON:
    {
      "final_score": 0-100,
      "summary": "2-3 sentences",
      "recommendation": "hire|hold|reject"
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
