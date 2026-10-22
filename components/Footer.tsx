import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 px-4 lg:px-8 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-teal-500 rounded-md flex items-center justify-center font-bold text-black italic text-xs">D</div>
            <span className="font-bold tracking-tight">Desk<span className="text-teal-500">Lab</span></span>
          </Link>
          <p className="text-xs text-zinc-500">Workspace rentals for the Bali nomad community.</p>
        </div>
        <nav className="flex items-center gap-6 text-sm text-zinc-400">
          <Link href="/builder" className="hover:text-white transition-colors">Builder</Link>
          <Link href="/how-it-works" className="hover:text-white transition-colors">How it works</Link>
        </nav>
        <p className="text-zinc-600 text-xs font-medium tracking-widest uppercase">©{new Date().getFullYear()} DeskLab Bali. All rights reserved.</p>
      </div>
    </footer>
  )
}
