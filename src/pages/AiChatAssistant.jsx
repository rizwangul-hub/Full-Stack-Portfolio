import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, MessageSquare, Bot, User } from "lucide-react";
import API from "../api/api";
import toast from "react-hot-toast";

export default function AiChatAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your SmartPrep Study Buddy. Ask me to explain a concept, solve a math problem, or suggest key study topics!",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setSending(true);

    try {
      // Map history for the backend
      const history = messages.slice(1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await API.post("/students/chat", {
        message: userMessage,
        history,
      });

      if (res.data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: res.data.reply }]);
      }
    } catch (err) {
      toast.error("Could not reach your Study Buddy.");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I had trouble connecting. Let's try again!" },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-white transition-colors duration-300">
      <div className="w-full max-w-3xl h-[600px] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
        
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                Study Buddy AI
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              </h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">SmartPrep Companion</p>
            </div>
          </div>
        </div>

        {/* MESSAGES VIEW */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, idx) => {
            const isUser = m.role === "user";
            return (
              <div
                key={idx}
                className={`flex gap-3 max-w-[80%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isUser ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 border"
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-indigo-500" />}
                </div>

                <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                  isUser
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none"
                }`}>
                  {m.content}
                </div>
              </div>
            );
          })}
          
          {sending && (
            <div className="flex gap-3 max-w-[80%] mr-auto items-center">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border flex items-center justify-center">
                <Bot className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl rounded-tl-none flex items-center gap-1">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* INPUT FORM */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your Study Buddy... (e.g. 'What is mitochondria?', 'Explain F = ma')"
            className="flex-1 px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none"
          />
          
          <button
            type="submit"
            disabled={!input.trim() || sending}
            className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 active:scale-95 transition disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
}
