import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import { AccessibilityBar } from "@/components/AccessibilityBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StadiumAI - GenAI Matchday Operations Assistant",
  description: "Enhancing stadium operations and the overall tournament experience for fans, organizers, volunteers, and venue staff using Generative AI during the FIFA World Cup 2026.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  manifest: "/manifest.json",
  icons: {
    icon: "/file.svg",
    apple: "/window.svg",
  },
  openGraph: {
    type: "website",
    title: "StadiumAI - GenAI Matchday Operations Assistant",
    description: "Generative AI assistant optimizing FIFA World Cup 2026 Matchday Venue Operations, Accessibility, and Fan Experience.",
    siteName: "StadiumAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "StadiumAI - GenAI Matchday Operations Assistant",
    description: "Generative AI assistant optimizing FIFA World Cup 2026 Matchday Venue Operations, Accessibility, and Fan Experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AccessibilityProvider>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <div id="main-content" className="contents">
            {children}
          </div>
          <AccessibilityBar />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
