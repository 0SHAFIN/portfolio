import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./hero-world.css";
import "./chapters.css";
import "./journey.css";
import "./story-motion.css";
import "./responsive.css";

const display = localFont({
  src: "../../public/fonts/climate-crisis.woff2",
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: [
    {
      path: "../../public/fonts/jost-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/jost-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
const mono = localFont({
  src: "../../public/fonts/space-mono.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.tafsirulshafin.me",
  ),
  title: "Shafin — Code. Create. Explore.",
  description:
    "Step into the world of Tafsirul Shafin, a full-stack developer in Dhaka building thoughtful, accessible web experiences with Next.js, React, and TypeScript.",
  openGraph: {
    title: "Shafin — Code. Create. Explore.",
    description:
      "Big ideas. Built with code. Explore the projects and journey of full-stack developer Tafsirul Shafin.",
    images: [
      {
        url: "/art/adventure-valley.webp",
        width: 1536,
        height: 1024,
        alt: "Shafin's original pixel art adventure valley",
      },
    ],
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
