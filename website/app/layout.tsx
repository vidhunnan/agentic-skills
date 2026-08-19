import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { TOTAL_SKILLS_WORD } from "@/components/lib/skills";
import "./globals.css";

// One family, variable — the whole weight range in a single file.
// Geist Mono has no italic; nothing in this design uses one.
// Chosen over IBM Plex Mono and a zero-webfont system stack — see design ADR 0008.
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE_URL = "https://agentic-skills.vidhunnan.design";
const TITLE = "agentic-skills — the context your agent doesn't have";
// Counts come from the data, not from prose — see TOTAL_SKILLS in lib/skills.
const DESCRIPTION = `${TOTAL_SKILLS_WORD.charAt(0).toUpperCase()}${TOTAL_SKILLS_WORD.slice(1)} skills for Claude Code that write your project's context: what shipped, why you chose it, what you tried and killed. Taken from git, your files and your answers — and where nobody remembers why, they say so. All Markdown.`;
const OG_DESCRIPTION =
  "Skills that write your project's context — what shipped, why you chose it, what you tried and killed. Taken from git, your files and your answers, and where nobody remembers why, they say so.";
const OG_IMAGE_ALT =
  "agentic-skills — skills that write the context an agent doesn't have.";

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
    "design decisions",
    "design system documentation",
    "design rationale",
    "design docs",
    "exploration log",
    "design brief",
    "Claude plugin",
    "plugin marketplace",
  ],
  authors: [{ name: "Vidhunnan Murugan", url: "https://vidhunnan.design" }],
  creator: "Vidhunnan Murugan",
  publisher: "Vidhunnan Murugan",
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
    <html lang="en" className={geistMono.variable}>
      <body>{children}</body>
    </html>
  );
}
