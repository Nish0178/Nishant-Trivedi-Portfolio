import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0b0d13",
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
    icon: "/images/nt-logo-raw.png",
    apple: "/images/nt-logo-raw.png",
  },
  openGraph: {
    title: "Nishant Trivedi — Software Engineer",
    description:
      "Software engineer building products, systems, and AI-powered experiences.",
    url: "https://nishanttrivedi.dev",
    siteName: "Nishant Trivedi",
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
      "Software engineer building products, systems, and AI-powered experiences.",
    images: ["/images/nt-banner-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Reenie+Beanie&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#08090d] text-[#e2e8f0] antialiased min-h-screen selection:bg-[#f59e0b] selection:text-[#090a0f]">
        {children}
      </body>
    </html>
  );
}
