import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View and manage all your subscriptions in one place. Track spending, see upcoming renewals, and get insights into your subscription costs.",
  openGraph: {
    title: "Dashboard | SubTrackr",
    description:
      "View and manage all your subscriptions in one place. Track spending and see upcoming renewals.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
