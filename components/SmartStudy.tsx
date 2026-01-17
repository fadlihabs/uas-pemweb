import React, { useState } from "react";

const SmartStudy: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, "🧑 " + input]);
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8080/smart-campus-api/gemini.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        }
      );

      const data = await res.json();

      if (data.status === "OK") {
        setMessages((prev) => [...prev, "🤖 " + data.reply]);
      } else {
        setMessages((prev) => [...prev, "⚠️ " + data.message]);
      }
    } catch {
      setMessages((prev) => [...prev, "❌ Koneksi ke AI gagal"]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">🤖 AI Smart Study Chat</h2>

      <div className="h-80 overflow-y-auto border rounded-xl p-4 mb-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="text-sm">{m}</div>
        ))}
        {loading && <p className="text-gray-400">AI mengetik...</p>}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2"
          placeholder="Tanya apa saja tentang belajar..."
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 rounded-lg"
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default SmartStudy;
