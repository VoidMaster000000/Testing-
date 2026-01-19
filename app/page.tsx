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
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            2025 Streamline. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
