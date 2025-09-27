import { useState } from "react";
import { extractResume } from "../api/extractResume";

export default function ResumeUploader({ onDone }: { onDone: () => void }) {
  const [file, setFile] = useState<File | null>(null);

  async function handleUpload() {
    if (!file) return;
    const res = await extractResume(file);
    console.log("Resume parsed:", res);
    onDone();
  }

  return (
    <div>
      <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} disabled={!file}>Upload</button>
    </div>
  );
}
