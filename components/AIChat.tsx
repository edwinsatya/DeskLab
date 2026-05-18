"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, MessageSquare, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting to my Bali servers. Please try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-125 bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-teal-500 flex items-center justify-between">
              <div className="flex items-center gap-2 text-black">
                <Bot size={20} strokeWidth={2.5} />
                <span className="font-extrabold uppercase tracking-tight text-sm">DeskLab AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="cursor-pointer text-black/60 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar"
            >
              {messages.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 opacity-40 py-10">
                  <Bot size={40} />
                  <p className="text-xs font-bold uppercase tracking-widest">Ask me anything about your Bali setup!</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-teal-500 text-black font-medium rounded-tr-none"
                        : "bg-zinc-800 text-zinc-200 rounded-tl-none border border-white/5"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 size={16} className="animate-spin text-teal-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-zinc-900/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="w-full bg-zinc-800 border border-white/5 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-hidden focus:border-teal-500/50 text-white transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-teal-500 hover:text-teal-400 disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all ${
          isOpen ? "bg-zinc-800 text-white rotate-90" : "bg-teal-500 text-black"
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};
