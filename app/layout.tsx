import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Waitly | Build Viral Waitlist Pages",
  description:
    "Create beautiful waitlist pages in minutes. Capture emails, reward referrals, and build anticipation before you launch. Free plan available.",
  keywords: [
    "waitlist",
    "launch page",
    "email capture",
    "referral marketing",
    "pre-launch",
    "viral waitlist",
  ],
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
