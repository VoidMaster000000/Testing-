import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-semibold text-text-primary">Waitly</span>
            <p className="text-sm text-text-secondary">
              Build hype before you launch.
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
              href="#pricing"
              className="text-sm text-text-secondary hover:text-royal-garnet transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-sm text-text-secondary hover:text-royal-garnet transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-text-secondary hover:text-royal-garnet transition-colors"
            >
              Terms
            </a>
          </div>
          <p className="text-sm text-text-secondary">
            © 2025 Waitly. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
