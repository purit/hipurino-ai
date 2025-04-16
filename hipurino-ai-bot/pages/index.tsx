// /pages/index.tsx
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "คุณคือผู้ช่วยฝ่ายขาย HIPURINO พูดแบบมืออาชีพ เป็นกันเอง ไม่ขายยัดเยียด" },
          ...updatedMessages,
        ],
      }),
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "ตอบกลับไม่ได้ 😢";

    setMessages([...updatedMessages, { role: "assistant", content: reply }]);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 600, margin: "auto" }}>
      <h2>🤖 HIPURINO AI Assistant</h2>
      <div style={{ marginBottom: 20 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <b>{m.role === "user" ? "คุณ" : "บอท"}:</b> {m.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="พิมพ์คำถามของคุณ..."
        style={{ width: "80%", padding: 10, marginRight: 5 }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 20px" }}>ส่ง</button>
    </div>
  );
}
