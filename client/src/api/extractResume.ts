export async function extractResume(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/extract-resume", { method: "POST", body: formData });
  return res.json();
}
