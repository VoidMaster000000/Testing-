"use client";

import { motion } from "framer-motion";
import { Zap, Shield, LayoutGrid } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built for speed. Every interaction feels instant, keeping your team in flow.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Enterprise-grade security with end-to-end encryption and SOC 2 compliance.",
  },
  {
    icon: LayoutGrid,
    title: "Flexible Layouts",
    description:
      "Customize your workspace. Drag, drop, and arrange everything your way.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-4">
            Everything you need
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Powerful features that help your team work smarter, not harder.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-8 rounded-2xl bg-surface/50 border border-border hover:border-text-secondary/20 transition-colors duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-text-primary mb-6 group-hover:border-text-secondary/30 transition-colors duration-300">
                <feature.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-medium text-text-primary mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
