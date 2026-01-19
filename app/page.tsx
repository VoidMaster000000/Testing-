import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Features from "@/components/Features";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
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
