import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: 'black',
}

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//Enhanced metadata for TS Arina
export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL!),
  title: "TS Arina | Your TypeScript Playground",
  description:
    "Welcome to TS Arina, the best online typescript playground where developers can write, run, and test TypeScript and JavaScript code. Experiment with code snippets and see real-time results.",
  keywords:
    "TypeScript, JavaScript, Playground, Online Code Editor, TS Playground, Run TypeScript Online, Test TypeScript Code",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "TS Arina | Your TypeScript Playground",
    description:
      "Welcome to TS Arina, where developers write, run, and test TypeScript and JavaScript code.",
    url: process.env.BASE_URL,
    siteName: "TS Arina",
  },
  authors: [{ name: "Akshit Lakhanpal", url: "https://github.com/akshitworkspace" }],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TS Arina",
  url: process.env.BASE_URL,
  description: "TS Arina is an online playground for TypeScript and JavaScript developers to write, run, and test code snippets in real-time.",
  author: {
    "@type": "Person",
    name: "Akshit Lakhanpal",
    url: "https://github.com/akshitworkspace"
  },
  applicationCategory: "Developer Tools",
  operatingSystem: "Windows, macOS, Linux",
  softwareVersion: "1.0",
  keywords: "TypeScript, JavaScript, Playground, Online Code Editor, TS Playground, Run TypeScript Online, Test TypeScript Code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
