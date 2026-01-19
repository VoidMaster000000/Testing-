"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Rocket } from "lucide-react";
import { createWaitlist, getWaitlist } from "@/lib/waitlist";

export default function CreateWaitlist() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    // Auto-generate slug from name
    const generatedSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 30);
    setSlug(generatedSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!name.trim()) {
      setError("Please enter a waitlist name");
      setIsLoading(false);
      return;
    }

    if (!slug.trim()) {
      setError("Please enter a URL slug");
      setIsLoading(false);
      return;
    }

    // Check if slug is already taken
    const existing = getWaitlist(slug);
    if (existing) {
      setError("This URL is already taken. Please choose another.");
      setIsLoading(false);
      return;
    }

    // Create waitlist
    const waitlist = createWaitlist(name, description, slug);

    // Redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-text-primary">
            Waitly
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-royal-garnet/10 flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-royal-garnet" />
            </div>
            <h1 className="text-3xl font-semibold text-text-primary mb-2">
              Create Your Waitlist
            </h1>
            <p className="text-text-secondary">
              Set up your waitlist page in seconds
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Waitlist Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Waitlist Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="My Awesome Product"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-royal-garnet/40 focus:ring-2 focus:ring-royal-garnet/10 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Be the first to know when we launch..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-royal-garnet/40 focus:ring-2 focus:ring-royal-garnet/10 transition-all resize-none"
              />
            </div>

            {/* URL Slug */}
            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                URL Slug *
              </label>
              <div className="flex items-center">
                <span className="px-4 py-3 bg-cashmere-light/50 border border-r-0 border-border rounded-l-xl text-text-secondary text-sm">
                  waitly.com/w/
                </span>
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) =>
                    setSlug(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, "")
                        .slice(0, 30)
                    )
                  }
                  placeholder="my-product"
                  className="flex-1 px-4 py-3 rounded-r-xl bg-background border border-border text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-royal-garnet/40 focus:ring-2 focus:ring-royal-garnet/10 transition-all"
                />
              </div>
              <p className="mt-2 text-xs text-text-secondary">
                This will be your public waitlist URL
              </p>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 bg-royal-garnet text-white font-medium rounded-full hover:bg-royal-garnet-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating..." : "Create Waitlist"}
            </motion.button>
          </form>

          {/* Preview */}
          {name && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 p-6 bg-cashmere-light/30 rounded-2xl border border-border"
            >
              <p className="text-xs text-text-secondary mb-3">Preview</p>
              <h3 className="text-lg font-medium text-text-primary mb-1">
                {name}
              </h3>
              {description && (
                <p className="text-sm text-text-secondary">{description}</p>
              )}
              {slug && (
                <p className="mt-3 text-xs text-royal-garnet">
                  {window.location.origin}/w/{slug}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
