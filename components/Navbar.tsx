"use client";

import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 lg:px-8 py-4 lg:py-6 bg-linear-to-b from-black/80 to-transparent backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-7 h-7 lg:w-8 lg:h-8 bg-teal-500 rounded-lg flex items-center justify-center font-bold text-black italic text-sm lg:text-base group-hover:scale-110 transition-transform">D</div>
        <span className="text-lg lg:text-xl font-bold tracking-tight">Desk<span className="text-teal-500">Lab</span></span>
      </Link>
      <div className="flex items-center gap-4 lg:gap-6">
        <Link href="/builder" className="hidden sm:block text-xs lg:text-sm font-medium text-zinc-400 hover:text-white transition-colors">Builder</Link>
        <button className="px-4 py-2 lg:px-5 lg:py-2.5 bg-white text-black text-[10px] lg:text-sm font-bold rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300 uppercase lg:normal-case tracking-wider lg:tracking-normal">
          Sign In
        </button>
      </div>
    </nav>
  );
};
