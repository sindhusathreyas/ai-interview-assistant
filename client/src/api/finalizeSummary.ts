export async function finalizeSummary(candidateName: string, perQuestionScores: any[]) {
  const res = await fetch("/api/finalize-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidateName, perQuestionScores }),
  });
  return res.json();
}
