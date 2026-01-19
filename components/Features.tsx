"use client";

import { motion } from "framer-motion";
import { Mail, Gift, BarChart3, Palette, Share2, Zap } from "lucide-react";

const features = [
  {
    icon: Mail,
    title: "Email Capture",
    description:
      "Collect emails with beautiful, high-converting signup forms. Export to Mailchimp, ConvertKit, or CSV anytime.",
  },
  {
    icon: Gift,
    title: "Referral Rewards",
    description:
      "Turn signups into promoters. Reward users who refer friends with early access, discounts, or exclusive perks.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track signups, referrals, and conversion rates. See where your traffic comes from and optimize.",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description:
      "Match your brand perfectly. Custom colors, fonts, logos, and domains. No Waitly branding on paid plans.",
  },
  {
    icon: Share2,
    title: "Social Sharing",
    description:
      "Built-in social sharing buttons and unique referral links. Make it easy for users to spread the word.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "Go live in under 5 minutes. No coding required. Just add your copy, customize, and share your link.",
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
            Everything you need to launch
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Powerful features to build hype, capture leads, and create viral
            growth before your product is even ready.
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
