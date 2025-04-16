// /pages/api/chat.ts
export default async function handler(req, res) {
  const { messages } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-pro-1.5",
      messages,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
