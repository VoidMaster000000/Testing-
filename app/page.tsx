import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Features from "@/components/Features";
import CTA from "@/components/CTA";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SubTrackr",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Track all your subscriptions in one place. Get renewal reminders, see spending analytics, and never waste money on forgotten subscriptions again.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
  },
  featureList: [
    "Subscription tracking",
    "Renewal reminders",
    "Spending analytics",
    "Category breakdown",
    "Quick cancel links",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <CTA />
      </main>
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-semibold text-text-primary">SubTrackr</span>
            <p className="text-sm text-text-secondary">
              Stop wasting money on forgotten subscriptions.
            </p>
          </div>
          <div className="flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-text-secondary hover:text-royal-garnet transition-colors"
            >
              Features
            </a>
            <a
              href="/dashboard"
              className="text-sm text-text-secondary hover:text-royal-garnet transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-sm text-text-secondary hover:text-royal-garnet transition-colors"
            >
              Privacy
            </a>
          </div>
          <p className="text-sm text-text-secondary">
            © 2026 SubTrackr. Free forever.
          </p>
        </div>
      </footer>
    </>
  );
}
