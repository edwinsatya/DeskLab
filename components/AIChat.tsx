"use client";

import { PRODUCTS } from "@/constants";
import { useStore } from "@/store/useStore";
import { Product } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Check, MessageSquare, Plus, Send, Sparkles, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What's the best setup for video calls?",
  "Build me a complete setup under $150/mo",
  "Which chair is best for long coding days?",
];

const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Catalog products the assistant mentioned by name, in catalog order. */
const findMentionedProducts = (content: string) => {
  const haystack = normalize(content);
  return PRODUCTS.filter((product) => haystack.includes(normalize(product.name)));
};

/** Renders **bold**, *italic* and `code` without trusting HTML. */
const renderInline = (text: string): ReactNode[] =>
  text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i} className="rounded bg-black/40 px-1 text-[12px] text-teal-300">{part.slice(1, -1)}</code>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    return <Fragment key={i}>{part}</Fragment>;
  });

const FormattedMessage = ({ content }: { content: string }) => {
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushList = () => {
    if (!list) return;
    const Tag = list.ordered ? "ol" : "ul";
    blocks.push(
      <Tag key={blocks.length} className={`flex flex-col gap-1 pl-4 ${list.ordered ? "list-decimal" : "list-disc"} marker:text-teal-400`}>
        {list.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
      </Tag>
    );
    list = null;
  };

  for (const raw of content.split("\n")) {
    const line = raw.trim();
    const bullet = line.match(/^[-*•]\s+(.*)/);
    const numbered = line.match(/^\d+[.)]\s+(.*)/);
    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (list && list.ordered !== ordered) flushList();
      list ??= { ordered, items: [] };
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }
    flushList();
    if (!line) continue;
    const heading = line.match(/^#{1,6}\s+(.*)/);
    blocks.push(
      <p key={blocks.length} className={heading ? "font-semibold text-white" : undefined}>
        {renderInline(heading ? heading[1] : line)}
      </p>
    );
  }
  flushList();

  return <div className="flex flex-col gap-2">{blocks}</div>;
};

const ProductChips = ({ products }: { products: Product[] }) => {
  const selections = useStore((s) => s.selections);
  const selectProduct = useStore((s) => s.selectProduct);
  const setActiveTab = useStore((s) => s.setActiveTab);
  const setIsRented = useStore((s) => s.setIsRented);
  const pathname = usePathname();
  const router = useRouter();

  if (products.length === 0) return null;

  const add = (product: Product) => {
    selectProduct(product);
    setActiveTab(product.category);
    setIsRented(false);
    if (pathname !== "/builder") router.push("/builder");
  };

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {products.map((product) => {
        const inSetup = selections[product.category]?.id === product.id;
        return (
          <button
            key={product.id}
            onClick={() => add(product)}
            disabled={inSetup}
            className="cursor-pointer flex items-center gap-1 rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-300 hover:bg-teal-500/20 transition-colors disabled:cursor-default disabled:border-white/10 disabled:bg-white/5 disabled:text-zinc-400"
          >
            {inSetup ? <Check size={11} strokeWidth={3} /> : <Plus size={11} strokeWidth={3} />}
            {inSetup ? `${product.name} in setup` : `Add ${product.name}`}
          </button>
        );
      })}
    </div>
  );
};

export const AIChat = () => {
  const isOpen = useStore((s) => s.isChatOpen);
  const setIsOpen = useStore((s) => s.setChatOpen);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const isRented = useStore((s) => s.isRented);
  // On the builder: sit above the mobile checkout bar; on desktop the preview toolbar opens chat instead.
  const onBuilder = pathname === "/builder" && !isRented;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, setIsOpen]);

  const handleSend = async (text = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { selections, rentalMonths } = useStore.getState();
      const setup = Object.values(selections)
        .filter((item): item is Product => item !== null)
        .map((item) => `${item.name} (${item.category}, $${item.price}/mo)`);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          setup,
          rentalMonths,
        }),
      });

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (!response.ok || !content) throw new Error(data?.error?.message ?? data?.error ?? "Empty response");

      setMessages((prev) => [...prev, { role: "assistant", content }]);
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
    <div className={`fixed right-4 sm:right-6 z-50 transition-[bottom] duration-300 ${onBuilder ? "bottom-24 lg:bottom-6" : "bottom-6"}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="DeskLab AI chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className={`absolute right-0 ${onBuilder ? "bottom-16 lg:bottom-0" : "bottom-16"} w-[calc(100vw-2rem)] sm:w-96 h-[min(32rem,calc(100dvh-10rem))] origin-bottom-right bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl shadow-black/60 flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-teal-500 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-black">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10">
                  <Bot size={20} strokeWidth={2.5} />
                </div>
                <div className="leading-tight">
                  <span className="block font-extrabold tracking-tight text-sm">DeskLab AI</span>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-black/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-900" /> Workspace consultant
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="cursor-pointer text-black/60 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
              {messages.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400">
                    <Sparkles size={26} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Need help picking?</p>
                    <p className="mt-1 text-xs text-zinc-400">I know the whole catalog and your current setup.</p>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSend(suggestion)}
                        className="cursor-pointer rounded-xl border border-white/10 bg-zinc-800/60 px-3 py-2.5 text-left text-xs text-zinc-300 hover:border-teal-500/40 hover:text-white transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[88%]">
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-teal-500 text-black font-medium rounded-tr-md"
                          : "bg-zinc-800 text-zinc-200 rounded-tl-md border border-white/5"
                      }`}
                    >
                      {msg.role === "user" ? msg.content : <FormattedMessage content={msg.content} />}
                    </div>
                    {msg.role === "assistant" && <ProductChips products={findMentionedProducts(msg.content)} />}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start" aria-label="DeskLab AI is typing">
                  <div className="flex gap-1 bg-zinc-800 px-4 py-3.5 rounded-2xl rounded-tl-md border border-white/5">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-teal-400"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-white/5 bg-zinc-900/50"
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  disabled={isLoading}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isLoading ? "Thinking..." : "Ask about chairs, desks, budgets..."}
                  className="w-full bg-zinc-800 border border-white/5 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-hidden focus:border-teal-500/50 text-white placeholder:text-zinc-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={isLoading || !input.trim()}
                  className="cursor-pointer absolute right-1.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500 text-black hover:bg-teal-400 disabled:bg-transparent disabled:text-zinc-600 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close DeskLab AI" : "Chat with DeskLab AI"}
        aria-expanded={isOpen}
        className={`cursor-pointer w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-black/40 transition-colors ${
          isOpen ? "bg-zinc-800 text-white" : "bg-teal-500 text-black"
        } ${onBuilder ? "lg:hidden" : ""}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
