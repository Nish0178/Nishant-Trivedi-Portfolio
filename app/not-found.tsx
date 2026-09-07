import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-page)] text-[var(--text-primary)] px-6 transition-colors duration-300">
      <div className="text-center max-w-lg">
        {/* Glitch-style 404 */}
        <h1 className="text-[8rem] sm:text-[12rem] font-display font-bold leading-none tracking-tighter text-gold-gradient select-none">
          404
        </h1>

        <div className="aura-divider my-6" />

        <p className="text-sm font-mono text-[var(--text-muted)] tracking-wider mb-8 uppercase">
          Page not found — this route doesn&apos;t exist
        </p>

        <Link
          href="/"
          className="btn-gold inline-flex items-center gap-2 px-8 py-3 rounded-full font-mono text-xs font-semibold tracking-wider hover:brightness-110 transition-all shadow-md"
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}
