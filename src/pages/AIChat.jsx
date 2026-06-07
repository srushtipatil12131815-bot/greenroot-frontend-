import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaMicrophone, FaLeaf, FaSpinner, FaGlobe } from "react-icons/fa";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "mr", label: "मराठी" },
];

const suggestions = [
  "How to prevent wheat rust disease?",
  "गेहूं की फसल में कीट नियंत्रण कैसे करें?",
  "PM-KISAN scheme साठी अर्ज कसा करायचा?",
  "Best crop to grow in monsoon season?",
  "Soil preparation tips for tomato farming",
];

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "🌿 Namaste! I'm your GreenRoot AI farming assistant. Ask me anything about crops, diseases, weather, or government schemes — in Hindi, Marathi, or English!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [listening, setListening] = useState(false);
  const bottomRef = useRef();
  const recognitionRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/chat`, {
        message: userText,
        language,
      });
      setMessages((prev) => [...prev, { role: "assistant", text: res.data.reply }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        text: "Sorry, I couldn't connect right now. Please check your internet and try again.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser. Try Chrome.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
          <FaRobot className="text-3xl text-blue-600" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-3">AI Farming Assistant</h1>
        <p className="text-gray-500 text-lg">Ask anything about farming in your language</p>
      </div>

      {/* Language Selector */}
      <div className="flex items-center gap-2 justify-center mb-6">
        <FaGlobe className="text-gray-400" />
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              language === lang.code
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Chat Box */}
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        {/* Messages */}
        <div className="h-[420px] overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <FaLeaf className="text-green-600 text-xs" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                <FaLeaf className="text-green-600 text-xs" />
              </div>
              <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-none">
                <FaSpinner className="animate-spin text-green-500" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="px-6 pb-3 flex gap-2 overflow-x-auto">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              className="flex-shrink-0 text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-full hover:bg-green-100 transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-100 p-4 flex gap-3 items-center">
          <button
            onClick={handleVoice}
            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              listening ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            <FaMicrophone />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={
              language === "hi" ? "अपना सवाल यहाँ लिखें..." :
              language === "mr" ? "तुमचा प्रश्न इथे लिहा..." :
              "Ask your farming question..."
            }
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400 focus:bg-white transition-all"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-xl flex items-center justify-center hover:bg-green-700 transition-all disabled:opacity-50"
          >
            <FaPaperPlane className="text-sm" />
          </button>
        </div>
      </div>

      {/* Info box */}
      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-blue-700">
        <p className="font-medium mb-1">💡 You can ask about:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
          {["Crop diseases", "Best fertilizers", "Govt. schemes", "Sowing seasons", "Pest control", "Soil health", "Market prices", "Weather tips"].map((t, i) => (
            <span key={i} className="bg-white border border-blue-200 px-3 py-1 rounded-full text-center">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
