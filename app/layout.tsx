import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nishanttrivedi.dev"),
  title: "Nishant Trivedi — Software Engineer & Builder",
  description:
    "Personal engineering portfolio and digital identity of Nishant Trivedi — Full-Stack Developer, AI Engineer, Open Source Contributor, and Problem Solver. Explore production case studies, delivered products, and algorithmic depth.",
  keywords: [
    "Nishant Trivedi",
    "Software Engineer",
    "Full-Stack Developer",
    "LaunchPilot AI",
    "Astrospacious",
    "MERN Stack",
    "Next.js",
    "TypeScript",
    "Java",
    "Google Gemini",
    "Open Source Contributor",
    "LeetCode",
    "AKTU Lucknow",
  ],
  authors: [{ name: "Nishant Trivedi", url: "https://www.linkedin.com/in/nishant-trivedi-363ba3249" }],
  icons: {
    icon: "/images/nt-emblem.png",
    apple: "/images/nt-emblem.png",
  },
  openGraph: {
    title: "Nishant Trivedi — Software Engineer",
    description:
      "Crafting resilient systems and intelligent digital products — from first interaction to production.",
    url: "https://nishanttrivedi.dev",
    siteName: "Nishant Trivedi Portfolio",
    images: [
      {
        url: "/images/nt-banner-logo.png",
        width: 1024,
        height: 328,
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
      "Full-stack engineering, AI product architecture, delivered products, and problem solving.",
    images: ["/images/nt-banner-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#070707] text-[#EDE9E1] antialiased selection:bg-[#D5B878] selection:text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
