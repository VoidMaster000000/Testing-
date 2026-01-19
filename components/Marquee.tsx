"use client";

import { motion } from "framer-motion";

const stats = [
  "50,000+ waitlist signups collected",
  "2,000+ successful launches",
  "98% customer satisfaction",
  "150+ countries reached",
  "10M+ referral links shared",
  "500K+ emails captured monthly",
];

export default function Marquee() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-12 bg-cashmere-light/30 border-y border-border overflow-hidden"
    >
      {/* Marquee container */}
      <div className="relative">
        {/* Gradient masks for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cashmere-light/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cashmere-light/30 to-transparent z-10 pointer-events-none" />

        {/* Scrolling content */}
        <div className="flex animate-marquee">
          {/* First set */}
          {stats.map((stat, index) => (
            <div
              key={`a-${index}`}
              className="flex-shrink-0 px-8 flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-royal-garnet" />
              <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
                {stat}
              </span>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {stats.map((stat, index) => (
            <div
              key={`b-${index}`}
              className="flex-shrink-0 px-8 flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-royal-garnet" />
              <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
                {stat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
