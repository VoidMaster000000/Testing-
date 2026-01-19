"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline characters
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 50,
            rotateX: -90
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

      // Animate tagline
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 1
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const headlineText = "Simplify your workflow.";

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-32 relative overflow-hidden">
      {/* Subtle gradient background with cashmere tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-cashmere-light/30 to-background pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
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
          Built for teams who value clarity and efficiency.
          Stop juggling tools and start focusing on what matters.
        </p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-royal-garnet text-white text-base font-medium rounded-full hover:bg-royal-garnet-dark transition-colors duration-200"
          >
            Start Free Trial
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-transparent text-royal-garnet text-base font-medium rounded-full border border-royal-garnet/30 hover:bg-cashmere-light/30 transition-colors duration-200"
          >
            Watch Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
