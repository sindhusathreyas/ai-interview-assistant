import { useState } from "react";
import ResumeUploader from "../components/ResumeUploader";
import ChatWindow from "../components/ChatWindow";

export default function IntervieweePage() {
  const [ready, setReady] = useState(false);
  return <div>{!ready ? <ResumeUploader onDone={() => setReady(true)} /> : <ChatWindow />}</div>;
}

