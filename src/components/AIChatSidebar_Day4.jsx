// Day 4
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, Sparkles, User } from 'lucide-react';


// Day 4 - updated: AI Chat Sidebar - now fully interactive
// Chatbot logic made interactive and integrated with Gemini API - done by rakshit
const AIChatSidebar = ({ policyData }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! 👋 I've finished analyzing your insurance policy. Ask me anything about your coverage, exclusions, waiting periods, or risks." }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (question) => {
    // Chatbot functionality logic - done by rakshit
    const text = typeof question === 'string' ? question : inputVal;
    if (!text.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInputVal('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_chatbotapikey || import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key missing on client");

      const sysContext = policyData
        ? `You are an expert insurance assistant. You MUST base your answers on this parsed policy JSON data: ${JSON.stringify(policyData)}. If the question is outside this scope, politely say you don't know or inform the user it isn't listed in the summary.`
        : `You are an expert insurance assistant. Answer the user's questions clearly.`;

      const promptText = sysContext + "\n\nUser Question: " + text;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I am unable to answer right now.";

      setMessages((prev) => [...prev, { role: 'ai', text: resultText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'ai', text: "Oops, an error occurred while checking your policy." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Sidebar Header */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 flex items-center gap-3 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 dark:text-slate-50 text-sm">PolicyInsight AI</h3>
          <p className="text-[11px] text-green-500 font-medium">● Online</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-medium whitespace-pre-wrap ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-md' : 'bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-white/5 rounded-tl-md'}`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-md text-sm leading-relaxed font-medium bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-white/5 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="px-4 pb-2 flex flex-wrap gap-2">
        {["What's covered?", "Is dental included?", "What are the risks?", "Explain co-payment"].map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            disabled={isLoading}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-4 pb-4 pt-2 border-t border-slate-100 dark:border-white/5 flex-shrink-0">
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
          <input
            type="text"
            className="flex-1 text-sm bg-transparent border-none outline-none text-slate-900 dark:text-slate-50 placeholder-slate-400 disabled:opacity-50"
            placeholder="Ask about your policy..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputVal.trim()}
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:bg-slate-300 dark:disabled:bg-slate-700 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatSidebar;
