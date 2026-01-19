"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useSearchParams } from "next/navigation";
import { Check, Share2, Copy, Linkedin } from "lucide-react";
import { getWaitlist, addSubscriber, type Waitlist, type Subscriber } from "@/lib/waitlist";
import Link from "next/link";

export default function WaitlistPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const refCode = searchParams.get("ref");

  const [waitlist, setWaitlist] = useState<Waitlist | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const wl = getWaitlist(slug);
    setWaitlist(wl);
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim()) {
      setError("Please enter your email");
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      setIsLoading(false);
      return;
    }

    const result = addSubscriber(slug, email, refCode);

    if (!result.success) {
      setError(result.error || "Something went wrong");
      setIsLoading(false);
      return;
    }

    setSubscriber(result.subscriber || null);
    setSuccess(true);
    setIsLoading(false);
  };

  const getReferralLink = () => {
    if (!subscriber) return "";
    return `${window.location.origin}/w/${slug}?ref=${subscriber.referralCode}`;
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(getReferralLink());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnX = () => {
    const text = `I just joined the waitlist for ${waitlist?.name}! Join me:`;
    const url = getReferralLink();
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    const url = getReferralLink();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  if (!waitlist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Waitlist not found
          </h1>
          <p className="text-text-secondary mb-6">
            This waitlist doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/"
            className="text-royal-garnet hover:underline"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cashmere-light/30 to-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {!success ? (
          <div className="bg-background rounded-3xl border border-border p-8 shadow-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-text-primary mb-2">
                {waitlist.name}
              </h1>
              {waitlist.description && (
                <p className="text-text-secondary">{waitlist.description}</p>
              )}
            </div>

            {/* Signup count */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-cashmere border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm text-text-secondary">
                {waitlist.subscribers.length > 0
                  ? `${waitlist.subscribers.length} people on the waitlist`
                  : "Be the first to join!"}
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 rounded-full bg-background border border-border text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-royal-garnet/40 focus:ring-2 focus:ring-royal-garnet/10 transition-all"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-royal-garnet text-white font-medium rounded-full hover:bg-royal-garnet-dark transition-colors disabled:opacity-50"
              >
                {isLoading ? "Joining..." : "Join the Waitlist"}
              </motion.button>
            </form>

            {refCode && (
              <p className="mt-4 text-center text-sm text-text-secondary">
                You were referred by a friend!
              </p>
            )}

            {/* Powered by */}
            <p className="mt-8 text-center text-xs text-text-secondary">
              Powered by{" "}
              <Link href="/" className="text-royal-garnet hover:underline">
                Waitly
              </Link>
            </p>
          </div>
        ) : (
          <div className="bg-background rounded-3xl border border-border p-8 shadow-lg text-center">
            {/* Success state */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-8 h-8 text-green-600" />
            </motion.div>

            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              You&apos;re on the list!
            </h2>
            <p className="text-text-secondary mb-2">
              You&apos;re #{subscriber?.position} on the waitlist.
            </p>

            {/* Referral section */}
            <div className="mt-8 p-6 bg-cashmere-light/30 rounded-2xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Share2 className="w-5 h-5 text-royal-garnet" />
                <h3 className="font-medium text-text-primary">
                  Move up the list!
                </h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Share your unique link and move up for every friend who joins.
              </p>

              {/* Referral link */}
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  readOnly
                  value={getReferralLink()}
                  className="flex-1 px-4 py-2 text-sm bg-background border border-border rounded-full text-text-primary"
                />
                <button
                  onClick={copyReferralLink}
                  className="p-2 bg-royal-garnet text-white rounded-full hover:bg-royal-garnet-dark transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Social share buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={shareOnX}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm rounded-full hover:opacity-90 transition-opacity"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Post
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white text-sm rounded-full hover:opacity-90 transition-opacity"
                >
                  <Linkedin className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {subscriber && subscriber.referralCount > 0 && (
              <p className="mt-4 text-sm text-royal-garnet">
                You&apos;ve referred {subscriber.referralCount} friend
                {subscriber.referralCount > 1 ? "s" : ""}!
              </p>
            )}

            {/* Powered by */}
            <p className="mt-8 text-xs text-text-secondary">
              Powered by{" "}
              <Link href="/" className="text-royal-garnet hover:underline">
                Waitly
              </Link>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
