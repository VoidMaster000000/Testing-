"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for testing the waters",
    features: [
      "1 waitlist page",
      "Up to 100 signups",
      "Basic analytics",
      "Email notifications",
      "Waitly branding",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious launches",
    features: [
      "Unlimited waitlist pages",
      "Unlimited signups",
      "Advanced analytics",
      "Referral system",
      "Custom branding",
      "Custom domain",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Business",
    price: "$49",
    period: "per month",
    description: "For teams and agencies",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "API access",
      "Webhooks",
      "White-label solution",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 bg-cashmere-light/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Start free, upgrade when you&apos;re ready. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative p-8 rounded-2xl border transition-colors duration-300 ${
                plan.popular
                  ? "bg-background border-royal-garnet shadow-lg scale-105"
                  : "bg-background border-border hover:border-royal-garnet/20"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-royal-garnet text-white text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-lg font-medium text-text-primary mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-semibold text-text-primary">
                  {plan.price}
                </span>
                <span className="text-text-secondary ml-2">/{plan.period}</span>
              </div>

              {/* Description */}
              <p className="text-text-secondary mb-6">{plan.description}</p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-full font-medium transition-colors duration-200 mb-8 ${
                  plan.popular
                    ? "bg-royal-garnet text-white hover:bg-royal-garnet-dark"
                    : "bg-cashmere-light/50 text-text-primary hover:bg-cashmere-light"
                }`}
              >
                {plan.cta}
              </motion.button>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-3 text-sm text-text-secondary"
                  >
                    <Check className="w-4 h-4 text-royal-garnet flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
