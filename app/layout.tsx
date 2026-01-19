import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://subtrackr.app"),
  title: {
    default: "SubTrackr | Track & Manage All Your Subscriptions",
    template: "%s | SubTrackr",
  },
  description:
    "Stop wasting money on forgotten subscriptions. Track all your recurring payments, get renewal reminders, and see exactly where your money goes. Free subscription tracker.",
  keywords: [
    "subscription tracker",
    "subscription manager",
    "recurring payments",
    "cancel subscriptions",
    "track subscriptions",
    "monthly expenses",
    "subscription spending",
    "Netflix tracker",
    "Spotify tracker",
    "manage subscriptions",
    "subscription reminder",
    "billing tracker",
  ],
  authors: [{ name: "SubTrackr" }],
  creator: "SubTrackr",
  publisher: "SubTrackr",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://subtrackr.app",
    siteName: "SubTrackr",
    title: "SubTrackr | Track & Manage All Your Subscriptions",
    description:
      "Stop wasting money on forgotten subscriptions. Track all your recurring payments, get renewal reminders, and see exactly where your money goes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SubTrackr - Subscription Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SubTrackr | Track & Manage All Your Subscriptions",
    description:
      "Stop wasting money on forgotten subscriptions. Track all your recurring payments and get renewal reminders.",
    images: ["/og-image.png"],
    creator: "@subtrackr",
  },
  alternates: {
    canonical: "https://subtrackr.app",
  },
  category: "Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
