"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveLink(href);

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Get target position
      const targetPosition = targetElement.offsetTop - 80; // Account for navbar height

      // Animate scroll with GSAP
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetPosition, autoKill: false },
        ease: "power3.inOut",
      });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-text-primary">
          Streamline
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
              {/* Animated underline */}
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-text-primary rounded-full"
                initial={{ width: 0 }}
                variants={{
                  hover: { width: "100%" },
                }}
                animate={activeLink === link.href ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 bg-accent text-background text-sm font-medium rounded-full hover:bg-text-primary transition-colors duration-200"
        >
          Get Started
        </motion.button>
      </div>
    </motion.nav>
  );
}
