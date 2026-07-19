import type { Metadata } from "next";
import { Archivo, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "agentic-skills — context files an agent should have anyway",
  description:
    "Six Claude / Cursor-compatible skills that write the context files a project should have anyway: a changelog of what shipped, a decision log of why, a handoff for where you left off. All Markdown. No code.",
  metadataBase: new URL("https://github.com/vidhunnan/agentic-skills"),
  openGraph: {
    title: "agentic-skills",
    description:
      "The skills that write the briefing an agent needs. A changelog, a decision log, a handoff — all Markdown, no code.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${newsreader.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
