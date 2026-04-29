import type { Metadata } from "next";
import { Newsreader, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Editorial display — Newsreader italic
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
  variable: "--font-newsreader",
  display: "swap",
});

// UI default — Bricolage Grotesque
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-bricolage",
  display: "swap",
});

// Labels — JetBrains Mono
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iriska.AI — The Mediterranean, well-chosen",
  description:
    "AI-powered B2B procurement platform for HoReCa. Source premium Mediterranean wine, jamon, cheeses, and olive oil with precision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${bricolage.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans bg-linen text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
