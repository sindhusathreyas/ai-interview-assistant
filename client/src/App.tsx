import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import IntervieweePage from "./pages/IntervieweePage";
import InterviewerPage from "./pages/InterviewerPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/interview">Interviewee</Link> | <Link to="/dashboard">Interviewer</Link>
      </nav>
      <Routes>
        <Route path="/interview" element={<IntervieweePage />} />
        <Route path="/dashboard" element={<InterviewerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

