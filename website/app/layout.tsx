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

const SITE_URL = "https://agentic-skills.vidhunnan.design";
const TITLE = "agentic-skills — context files an agent should have anyway";
const DESCRIPTION =
  "Six Claude / Cursor-compatible skills that write the context files a project should have anyway: a changelog of what shipped, a decision log of why, a handoff for where you left off. All Markdown. No code.";
const OG_DESCRIPTION =
  "The skills that write the briefing an agent needs. A changelog of what shipped, a decision log of why, a handoff for where you left off — all Markdown, no code.";
const OG_IMAGE_ALT =
  "agentic-skills — the skills that write the briefing an agent needs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "agentic-skills",
  keywords: [
    "Claude skills",
    "Claude Code",
    "Cursor",
    "agent context",
    "AI agents",
    "changelog",
    "decision log",
    "ADR",
    "handoff",
    "Markdown",
    "agentic-skills",
  ],
  creator: "vidhunnan",
  publisher: "vidhunnan",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "agentic-skills",
    title: "agentic-skills",
    description: OG_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "agentic-skills",
    description: OG_DESCRIPTION,
    images: [{ url: "/og.png", alt: OG_IMAGE_ALT }],
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
