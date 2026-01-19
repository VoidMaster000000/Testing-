"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

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
          Start saving today.
        </h2>
        <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
          The average person wastes $200/year on forgotten subscriptions.
          Take control of your spending in under 2 minutes.
        </p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/add">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-royal-garnet text-white text-base font-medium rounded-full hover:bg-royal-garnet-dark transition-colors duration-200 whitespace-nowrap"
            >
              Add Your First Subscription
            </motion.button>
          </Link>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-transparent text-royal-garnet text-base font-medium rounded-full border border-royal-garnet/30 hover:bg-cashmere-light/30 transition-colors duration-200 whitespace-nowrap"
            >
              View Dashboard
            </motion.button>
          </Link>
        </motion.div>

        <p className="mt-6 text-sm text-text-secondary">
          100% free · No account needed · Your data stays private
        </p>
      </div>
    </section>
  );
}
