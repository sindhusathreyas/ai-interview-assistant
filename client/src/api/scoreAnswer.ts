export async function scoreAnswer(question: string, answer: string, difficulty: string) {
  const res = await fetch("/api/score-answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer, difficulty }),
  });
  return res.json();
}

