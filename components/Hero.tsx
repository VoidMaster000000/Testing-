"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 50,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 1,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const headlineText = "Stop wasting money.";

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-32 relative overflow-hidden">
      {/* Subtle gradient background with cashmere tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-cashmere-light/30 to-background pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-royal-garnet/10 border border-royal-garnet/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-royal-garnet animate-pulse" />
          <span className="text-sm text-royal-garnet font-medium">
            The average person wastes $200/year on forgotten subscriptions
          </span>
        </motion.div>

        {/* Headline with GSAP word animation */}
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-text-primary mb-8"
          style={{ perspective: "1000px" }}
        >
          {headlineText.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="char inline-block"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char}
                </span>
              ))}
              {wordIndex < headlineText.split(" ").length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 opacity-0"
        >
          Track all your subscriptions in one place. Get reminders before
          renewals. Cancel the ones you forgot about. Save money effortlessly.
        </p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="/add"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-royal-garnet text-white text-base font-medium rounded-full hover:bg-royal-garnet-dark transition-colors duration-200"
          >
            Start Tracking Free
          </motion.a>
          <motion.a
            href="/dashboard"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-transparent text-royal-garnet text-base font-medium rounded-full border border-royal-garnet/30 hover:bg-cashmere-light/30 transition-colors duration-200"
          >
            View Dashboard
          </motion.a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-8"
        >
          <p className="text-sm text-text-secondary mb-4">
            Free forever · No credit card · Works offline
          </p>
          <div className="flex items-center justify-center gap-6 text-text-secondary">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">20+ services</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Renewal alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Cancel links</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
