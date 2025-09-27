import formidable from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "File parsing error" });

    try {
      const file = files.file;
      if (!file) return res.status(400).json({ error: "No file uploaded" });

      let text = "";

      if (file.mimetype === "application/pdf") {
        const buffer = await fs.promises.readFile(file.filepath);
        const pdf = await pdfParse(buffer);
        text = pdf.text;
      } else if (file.mimetype.includes("wordprocessingml")) {
        const buffer = await fs.promises.readFile(file.filepath);
        const doc = await mammoth.extractRawText({ buffer });
        text = doc.value;
      } else {
        return res.status(400).json({ error: "Unsupported file type" });
      }

      const nameMatch = text.match(/Name[:\-]?\s*(.+)/i);
      const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
      const phoneMatch = text.match(/(\+?\d{1,4}[\s-])?(?:\d{10}|\d{3}[-\s]\d{3}[-\s]\d{4})/);

      res.json({
        text,
        fields: {
          name: nameMatch ? nameMatch[1] : null,
          email: emailMatch ? emailMatch[0] : null,
          phone: phoneMatch ? phoneMatch[0] : null
        }
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
}
