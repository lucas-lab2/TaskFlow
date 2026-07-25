import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Handcrafted Haven — Discover Unique Handmade Treasures",
  description:
    "A curated marketplace connecting talented artisans with conscious consumers. Discover unique handcrafted pottery, jewelry, textiles, and woodwork — each piece tells a story.",
  keywords: [
    "handcrafted",
    "artisan",
    "marketplace",
    "handmade",
    "pottery",
    "jewelry",
    "textiles",
    "woodwork",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
