import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Fugaz_One, Inter } from "next/font/google";  

const fugazOne = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Welcome to my portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased ${fugazOne.className} ${inter.className}`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
