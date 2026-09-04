import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070707] text-[#EDE9E1] px-4 font-mono text-center">
      <h1 className="text-6xl font-bold text-[#D5B878] mb-4">404</h1>
      <p className="text-sm text-[#A3A09A] mb-8">PAGE NOT FOUND // SYSTEM 001</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-lg bg-[#D5B878] text-black text-xs font-bold tracking-wider hover:bg-[#E5C378] transition-colors"
      >
        RETURN HOME
      </Link>
    </div>
  );
}
