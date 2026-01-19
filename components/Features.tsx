"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Bell,
  PieChart,
  Scissors,
  Calendar,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Track Everything",
    description:
      "Add all your subscriptions in seconds. Netflix, Spotify, gym, software - we've got 20+ popular services pre-loaded with cancel links.",
  },
  {
    icon: Bell,
    title: "Never Forget Renewals",
    description:
      "Get alerts before your subscriptions renew. No more surprise charges. Know exactly when each payment is coming.",
  },
  {
    icon: PieChart,
    title: "See Your Spending",
    description:
      "Visualize where your money goes. Monthly, yearly, by category. Finally understand your true subscription costs.",
  },
  {
    icon: Scissors,
    title: "One-Click Cancel Links",
    description:
      "Direct links to cancel pages for popular services. No more hunting through settings. Cancel in seconds, not minutes.",
  },
  {
    icon: Calendar,
    title: "Upcoming View",
    description:
      "See what's due this week at a glance. Plan ahead and decide what stays and what goes before you're charged.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your data stays on your device. No account needed. No bank connections. Just simple, private subscription tracking.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
            Everything you need to save money
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Simple tools to track, manage, and cancel subscriptions you don&apos;t need.
            No complexity. No bank connections. Just clarity.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-8 rounded-2xl bg-cashmere-light/20 border border-border hover:border-royal-garnet/20 transition-colors duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-royal-garnet mb-6 group-hover:border-royal-garnet/30 group-hover:bg-royal-garnet/5 transition-colors duration-300">
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
