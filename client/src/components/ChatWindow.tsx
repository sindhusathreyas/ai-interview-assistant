import { useState } from "react";
import { generateQuestion } from "../api/generateQuestion";
import { scoreAnswer } from "../api/scoreAnswer";

export default function ChatWindow() {
  const [question, setQuestion] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState<any[]>([]);

  async function nextQuestion() {
    const q = await generateQuestion("easy");
    setQuestion(q);
  }

  async function submitAnswer() {
    const scored = await scoreAnswer(question.question, answer, question.difficulty);
    setHistory([...history, { question, answer, scored }]);
    setAnswer(""); setQuestion(null);
  }

  return (
    <div>
      {!question && <button onClick={nextQuestion}>Start Question</button>}
      {question && (
        <div>
          <p>{question.question}</p>
          <input value={answer} onChange={(e) => setAnswer(e.target.value)} />
          <button onClick={submitAnswer}>Submit</button>
        </div>
      )}
      <h3>History</h3>
      {history.map((h, i) => (
        <div key={i}>
          <p>Q: {h.question.question}</p>
          <p>A: {h.answer}</p>
          <p>Score: {h.scored.score}</p>
        </div>
      ))}
    </div>
  );
}
