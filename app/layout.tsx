import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Fugaz_One, Inter } from "next/font/google";

const fugazOne = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fugaz",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shafin | Full-Stack Developer",
  description: "Full-stack developer specializing in modern web applications with Next.js, React, and TypeScript. Building clean, accessible, and user-centered digital experiences with advanced animations and interactive UI. Based in Dhaka, Bangladesh.",
  keywords: [
    "Full-Stack Developer",
    "Shafin",
    "Tafsirul Islam",
    "tafsirul islam shafin",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "UI/UX Developer",
    "Software Engineer",
    "Web Development",
    "Dhaka Bangladesh",
    "Modern Web Applications",
    "Interactive Portfolio",
    "E-commerce Development",
    "Real Estate Web Solutions",
    "AI-Powered Tools",
    "Responsive Design",
    "GSAP Animations",
    "Framer Motion",
    "Tailwind CSS",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "REST API",
    "Python",
    "C++",
    "Flutter",
    "Dart",
  ],
  authors: [{ name: "Shafin" }],
  creator: "Shafin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shafin.dev",
    title: "Shafin | Full-Stack Developer",
    description: "Full-stack developer specializing in modern web applications with Next.js, React, and TypeScript. Creating seamless digital experiences with advanced animations and interactive UI.",
    siteName: "Shafin's Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Shafin - Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shafin | Full-Stack Developer",
    description: "Full-stack developer specializing in modern web applications with Next.js, React, and TypeScript. Creating seamless digital experiences through end-to-end development.",
    images: ["/logo.png"],
    creator: "@shafin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: [
      { url: "/fevicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/fevicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/fevicon/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/fevicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/fevicon/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/fevicon/android-chrome-512x512.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${fugazOne.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
