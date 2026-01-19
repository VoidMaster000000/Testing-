import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Subscription",
  description:
    "Add a new subscription to track. Choose from popular services like Netflix, Spotify, Disney+ or add a custom subscription.",
  openGraph: {
    title: "Add Subscription | SubTrackr",
    description:
      "Add a new subscription to track. Choose from popular services or add a custom subscription.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AddLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
