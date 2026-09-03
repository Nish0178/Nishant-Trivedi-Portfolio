import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nishant Trivedi — Software Engineer",
  description: "The personal portfolio of Nishant Trivedi — software engineer, builder, and problem solver.",
  metadataBase: new URL("https://nishanttrivedi.dev"),
  openGraph: {
    title: "Nishant Trivedi — Software Engineer",
    description: "Software engineer, builder, and problem solver.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
