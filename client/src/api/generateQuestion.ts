export async function generateQuestion(difficulty: string) {
  const res = await fetch("/api/generate-question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ difficulty }),
  });
  return res.json();
}
