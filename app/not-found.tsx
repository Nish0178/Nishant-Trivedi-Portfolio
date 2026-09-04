import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-[#f0ece4] px-6">
      <div className="text-center max-w-lg">
        {/* Glitch-style 404 */}
        <h1 className="text-[8rem] sm:text-[12rem] font-display font-bold leading-none tracking-tighter text-gradient-gold select-none">
          404
        </h1>

        <div className="gradient-divider my-6" />

        <p className="text-sm font-mono text-[#6b6862] tracking-wider mb-8 uppercase">
          Page not found — this route doesn&apos;t exist
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#c9a84c] text-[#050505] font-mono text-xs font-semibold tracking-wider hover:bg-[#dfc06a] transition-all glow-gold"
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}
