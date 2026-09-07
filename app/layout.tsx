import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#07080c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nishanttrivedi.dev"),
  title: "Nishant Trivedi — Software Engineer & Systems Builder",
  description:
    "Software engineer building products, systems, and AI-powered experiences. Based in Lucknow, India.",
  keywords: [
    "Nishant Trivedi",
    "Software Engineer",
    "Full-Stack Developer",
    "LaunchPilot AI",
    "TodoPro",
    "Astrospacious",
    "Next.js",
    "TypeScript",
    "Java",
    "Google Gemini",
    "LeetCode",
    "AKTU Lucknow",
  ],
  authors: [{ name: "Nishant Trivedi", url: "https://www.linkedin.com/in/nishant-trivedi-363ba3249" }],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/images/icon-logo.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Nishant Trivedi — Software Engineer",
    description:
      "Software engineer building products, systems, and AI-powered experiences.",
    url: "https://nishanttrivedi.dev",
    siteName: "Nishant Trivedi",
    images: [
      {
        url: "/images/navbar-logo-dark.png",
        width: 1670,
        height: 292,
        alt: "Nishant Trivedi — Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nishant Trivedi — Software Engineer",
    description:
      "Software engineer building products, systems, and AI-powered experiences.",
    images: ["/images/navbar-logo-dark.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        {/* Prevent Flash of Unstyled Content (FOUC) by resolving theme before initial paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('nt_portfolio_theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var th=t?t:(d?'dark':'light');var cl=document.documentElement.classList;if(th==='dark'){cl.add('dark');cl.remove('light');document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.colorScheme='dark';}else{cl.add('light');cl.remove('dark');document.documentElement.setAttribute('data-theme','light');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-[var(--bg-page)] text-[var(--text-primary)] antialiased min-h-screen selection:bg-[#f59e0b] selection:text-[#090a0f] overflow-x-clip max-w-full transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
