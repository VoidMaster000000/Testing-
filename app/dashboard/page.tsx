"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Plus,
  Users,
  Share2,
  TrendingUp,
  ExternalLink,
  Trash2,
  Copy,
  Check,
} from "lucide-react";
import {
  getWaitlists,
  deleteWaitlist,
  getWaitlistStats,
  type Waitlist,
} from "@/lib/waitlist";

export default function Dashboard() {
  const [waitlists, setWaitlists] = useState<Waitlist[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setWaitlists(getWaitlists());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this waitlist?")) {
      deleteWaitlist(id);
      setWaitlists(getWaitlists());
    }
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/w/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(slug);
    setTimeout(() => setCopiedId(null), 2000);
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
            href="/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-royal-garnet text-white text-sm font-medium rounded-full hover:bg-royal-garnet-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Waitlist
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-semibold text-text-primary mb-2">
            Your Waitlists
          </h1>
          <p className="text-text-secondary mb-8">
            Manage your waitlist pages and track signups
          </p>

          {waitlists.length === 0 ? (
            <div className="text-center py-20 bg-cashmere-light/20 rounded-2xl border border-border">
              <div className="w-16 h-16 rounded-full bg-royal-garnet/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-royal-garnet" />
              </div>
              <h2 className="text-xl font-medium text-text-primary mb-2">
                No waitlists yet
              </h2>
              <p className="text-text-secondary mb-6">
                Create your first waitlist to start collecting signups
              </p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-royal-garnet text-white font-medium rounded-full hover:bg-royal-garnet-dark transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Waitlist
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {waitlists.map((waitlist) => {
                const stats = getWaitlistStats(waitlist.id);
                return (
                  <motion.div
                    key={waitlist.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-background rounded-2xl border border-border hover:border-royal-garnet/20 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-medium text-text-primary mb-1">
                          {waitlist.name}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {waitlist.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyLink(waitlist.slug)}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border rounded-full hover:border-royal-garnet/30 transition-colors"
                        >
                          {copiedId === waitlist.slug ? (
                            <>
                              <Check className="w-4 h-4 text-green-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy Link
                            </>
                          )}
                        </button>
                        <Link
                          href={`/w/${waitlist.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border rounded-full hover:border-royal-garnet/30 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(waitlist.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-border rounded-full hover:border-red-200 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-cashmere-light/30 rounded-xl">
                        <div className="flex items-center gap-2 text-text-secondary mb-1">
                          <Users className="w-4 h-4" />
                          <span className="text-xs">Total Signups</span>
                        </div>
                        <p className="text-2xl font-semibold text-text-primary">
                          {stats?.totalSubscribers || 0}
                        </p>
                      </div>
                      <div className="p-4 bg-cashmere-light/30 rounded-xl">
                        <div className="flex items-center gap-2 text-text-secondary mb-1">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-xs">Today</span>
                        </div>
                        <p className="text-2xl font-semibold text-text-primary">
                          {stats?.todaySignups || 0}
                        </p>
                      </div>
                      <div className="p-4 bg-cashmere-light/30 rounded-xl">
                        <div className="flex items-center gap-2 text-text-secondary mb-1">
                          <Share2 className="w-4 h-4" />
                          <span className="text-xs">Referrals</span>
                        </div>
                        <p className="text-2xl font-semibold text-text-primary">
                          {stats?.referralSignups || 0}
                        </p>
                      </div>
                      <div className="p-4 bg-cashmere-light/30 rounded-xl">
                        <div className="flex items-center gap-2 text-text-secondary mb-1">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-xs">Referral Rate</span>
                        </div>
                        <p className="text-2xl font-semibold text-text-primary">
                          {stats?.referralRate || 0}%
                        </p>
                      </div>
                    </div>

                    {/* Subscriber list preview */}
                    {waitlist.subscribers.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-border">
                        <h4 className="text-sm font-medium text-text-primary mb-3">
                          Recent Signups
                        </h4>
                        <div className="space-y-2">
                          {waitlist.subscribers.slice(-5).reverse().map((sub) => (
                            <div
                              key={sub.id}
                              className="flex items-center justify-between text-sm py-2 px-3 bg-cashmere-light/20 rounded-lg"
                            >
                              <span className="text-text-primary">
                                {sub.email}
                              </span>
                              <div className="flex items-center gap-4 text-text-secondary">
                                <span>#{sub.position}</span>
                                {sub.referralCount > 0 && (
                                  <span className="text-royal-garnet">
                                    {sub.referralCount} referrals
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
