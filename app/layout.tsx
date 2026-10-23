import "./atollingo-return.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raajje Explorers — Social Studies for Grades 1–6",
  description: "Atollingo Social Studies: short lessons, map, timeline and sorting quizzes about Maldivian culture, islands, history and citizenship.",
  applicationName: "Raajje Explorers",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Raajje Explorers" },
  icons: { icon: [{ url: "/browser-icon-v2.png", type: "image/png" }], shortcut: "/browser-icon-v2.png", apple: "/assets/icon-192.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#086d75",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><div role="navigation" className="atollingo-return" aria-label="Learning hub"><a href="https://atollingo.com/"><span className="atollingo-return-icon" aria-hidden="true">🏝️</span><span>Back to Atollingo</span><span aria-hidden="true">↗</span></a></div>{children}</body>
    </html>
  );
}
