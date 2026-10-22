"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/builder", label: "Builder" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuPath, setMenuPath] = useState<string | null>(null);
  // The menu closes itself whenever the route changes.
  const menuOpen = menuPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? "bg-[#0F0F10]/85 backdrop-blur-xl border-b border-white/5" : "bg-linear-to-b from-black/80 to-transparent backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 lg:px-8 py-4 lg:py-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 lg:w-8 lg:h-8 bg-teal-500 rounded-lg flex items-center justify-center font-bold text-black italic text-sm lg:text-base group-hover:scale-110 transition-transform">D</div>
          <span className="text-lg lg:text-xl font-bold tracking-tight">Desk<span className="text-teal-500">Lab</span></span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-8">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative hidden sm:block text-xs lg:text-sm font-medium transition-colors ${active ? "text-white" : "text-zinc-400 hover:text-white"}`}
              >
                {label}
                {active && <motion.span layoutId="nav-active" className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-teal-500" />}
              </Link>
            );
          })}
          <button className="cursor-pointer px-4 py-2 lg:px-5 lg:py-2.5 bg-white text-black text-[10px] lg:text-sm font-bold rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300 uppercase lg:normal-case tracking-wider lg:tracking-normal">
            Sign In
          </button>
          <button
            onClick={() => setMenuPath(menuOpen ? null : pathname)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="cursor-pointer sm:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-300"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-4">
              {[{ href: "/", label: "Home" }, ...LINKS].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuPath(null)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    pathname === href ? "bg-teal-500/10 text-teal-400" : "text-zinc-300 hover:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
