"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Animated background with cashmere gradient */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-cashmere-light/40 via-background to-cashmere/20"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary mb-6">
          Ready to build hype?
        </h2>
        <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
          Join thousands of founders using Waitly to launch their products with
          a bang. Start free, no credit card required.
        </p>

        {/* Email signup form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-5 py-4 rounded-full bg-background border border-border text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-royal-garnet/40 focus:ring-2 focus:ring-royal-garnet/10 transition-all duration-200"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-4 bg-royal-garnet text-white text-base font-medium rounded-full hover:bg-royal-garnet-dark transition-colors duration-200 whitespace-nowrap"
          >
            Get Started
          </motion.button>
        </motion.div>

        <p className="mt-6 text-sm text-text-secondary">
          Free plan includes 100 signups · Upgrade anytime
        </p>
      </div>
    </section>
  );
}
