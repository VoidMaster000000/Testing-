"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Plus,
  CreditCard,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Trash2,
  ExternalLink,
  Bell,
  PieChart,
  DollarSign,
  Clock,
} from "lucide-react";
import {
  getSubscriptions,
  deleteSubscription,
  getTotalMonthlySpend,
  getTotalYearlySpend,
  getSpendByCategory,
  getUpcomingRenewals,
  getDaysUntilRenewal,
  formatCurrency,
  type Subscription,
} from "@/lib/subscriptions";

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "insights">("all");

  useEffect(() => {
    setSubscriptions(getSubscriptions());
    setIsLoading(false);
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from tracking?`)) {
      deleteSubscription(id);
      setSubscriptions(getSubscriptions());
    }
  };

  const monthlySpend = getTotalMonthlySpend(subscriptions);
  const yearlySpend = getTotalYearlySpend(subscriptions);
  const upcomingRenewals = getUpcomingRenewals(subscriptions, 7);
  const spendByCategory = getSpendByCategory(subscriptions);

  const sortedCategories = Object.entries(spendByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-text-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-text-primary">
            SubTrackr
          </Link>
          <Link
            href="/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-royal-garnet text-white text-sm font-medium rounded-full hover:bg-royal-garnet-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Subscription
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-background rounded-2xl border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-royal-garnet/10 rounded-xl">
                <DollarSign className="w-5 h-5 text-royal-garnet" />
              </div>
              <span className="text-sm text-text-secondary">Monthly</span>
            </div>
            <p className="text-3xl font-semibold text-text-primary">
              {formatCurrency(monthlySpend)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-background rounded-2xl border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cashmere/30 rounded-xl">
                <TrendingUp className="w-5 h-5 text-royal-garnet" />
              </div>
              <span className="text-sm text-text-secondary">Yearly</span>
            </div>
            <p className="text-3xl font-semibold text-text-primary">
              {formatCurrency(yearlySpend)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-background rounded-2xl border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cashmere/30 rounded-xl">
                <CreditCard className="w-5 h-5 text-royal-garnet" />
              </div>
              <span className="text-sm text-text-secondary">Active</span>
            </div>
            <p className="text-3xl font-semibold text-text-primary">
              {subscriptions.length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-background rounded-2xl border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 rounded-xl">
                <Bell className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm text-text-secondary">Due Soon</span>
            </div>
            <p className="text-3xl font-semibold text-text-primary">
              {upcomingRenewals.length}
            </p>
          </motion.div>
        </div>

        {/* Upcoming Renewals Alert */}
        {upcomingRenewals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-medium text-amber-800">
                {upcomingRenewals.length} renewal{upcomingRenewals.length > 1 ? "s" : ""} in the next 7 days
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {upcomingRenewals.map((sub) => (
                <span
                  key={sub.id}
                  className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full"
                >
                  {sub.name} - {getDaysUntilRenewal(sub.nextBillingDate)} days
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "all", label: "All Subscriptions", icon: CreditCard },
            { id: "upcoming", label: "Upcoming", icon: Calendar },
            { id: "insights", label: "Insights", icon: PieChart },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-royal-garnet text-white"
                  : "bg-cashmere-light/30 text-text-secondary hover:text-text-primary"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "all" && (
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {subscriptions.length === 0 ? (
                <div className="text-center py-20 bg-cashmere-light/20 rounded-2xl border border-border">
                  <div className="w-16 h-16 rounded-full bg-royal-garnet/10 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-royal-garnet" />
                  </div>
                  <h2 className="text-xl font-medium text-text-primary mb-2">
                    No subscriptions yet
                  </h2>
                  <p className="text-text-secondary mb-6">
                    Start tracking your subscriptions to see your spending
                  </p>
                  <Link
                    href="/add"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-royal-garnet text-white font-medium rounded-full hover:bg-royal-garnet-dark transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Your First Subscription
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {subscriptions.map((sub, index) => {
                    const daysUntil = getDaysUntilRenewal(sub.nextBillingDate);
                    const isUrgent = daysUntil <= 3;

                    return (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-5 bg-background rounded-2xl border border-border hover:border-royal-garnet/20 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg"
                              style={{ backgroundColor: sub.color || "#7B2D42" }}
                            >
                              {sub.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-medium text-text-primary">
                                {sub.name}
                              </h3>
                              <div className="flex items-center gap-3 text-sm text-text-secondary">
                                <span className="px-2 py-0.5 bg-cashmere-light/50 rounded-full text-xs">
                                  {sub.category}
                                </span>
                                <span>{sub.billingCycle}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-lg font-semibold text-text-primary">
                                {formatCurrency(sub.price)}
                              </p>
                              <p
                                className={`text-sm ${
                                  isUrgent ? "text-amber-600 font-medium" : "text-text-secondary"
                                }`}
                              >
                                <Clock className="w-3 h-3 inline mr-1" />
                                {daysUntil <= 0
                                  ? "Due today"
                                  : daysUntil === 1
                                  ? "Due tomorrow"
                                  : `${daysUntil} days`}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              {sub.cancelUrl && (
                                <a
                                  href={sub.cancelUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 text-text-secondary hover:text-royal-garnet hover:bg-cashmere-light/30 rounded-lg transition-colors"
                                  title="Cancel subscription"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                              <button
                                onClick={() => handleDelete(sub.id, sub.name)}
                                className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Remove from tracking"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "upcoming" && (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {upcomingRenewals.length === 0 ? (
                <div className="text-center py-16 bg-cashmere-light/20 rounded-2xl border border-border">
                  <Calendar className="w-12 h-12 text-royal-garnet mx-auto mb-4" />
                  <h2 className="text-lg font-medium text-text-primary mb-2">
                    No upcoming renewals
                  </h2>
                  <p className="text-text-secondary">
                    You&apos;re all clear for the next 7 days
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {upcomingRenewals.map((sub, index) => {
                    const daysUntil = getDaysUntilRenewal(sub.nextBillingDate);

                    return (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-5 bg-background rounded-2xl border border-amber-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg"
                              style={{ backgroundColor: sub.color || "#7B2D42" }}
                            >
                              {sub.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-medium text-text-primary">
                                {sub.name}
                              </h3>
                              <p className="text-sm text-text-secondary">
                                Renews on{" "}
                                {new Date(sub.nextBillingDate).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-lg font-semibold text-text-primary">
                                {formatCurrency(sub.price)}
                              </p>
                              <p className="text-sm text-amber-600 font-medium">
                                {daysUntil === 0
                                  ? "Today"
                                  : daysUntil === 1
                                  ? "Tomorrow"
                                  : `In ${daysUntil} days`}
                              </p>
                            </div>
                            {sub.cancelUrl && (
                              <a
                                href={sub.cancelUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-full hover:bg-red-100 transition-colors"
                              >
                                Cancel
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "insights" && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid gap-6"
            >
              {/* Spending by Category */}
              <div className="p-6 bg-background rounded-2xl border border-border">
                <h3 className="text-lg font-medium text-text-primary mb-4">
                  Spending by Category
                </h3>
                {sortedCategories.length === 0 ? (
                  <p className="text-text-secondary text-sm">
                    Add subscriptions to see category breakdown
                  </p>
                ) : (
                  <div className="space-y-4">
                    {sortedCategories.map(([category, amount]) => {
                      const percentage = (amount / monthlySpend) * 100;

                      return (
                        <div key={category}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-text-primary">
                              {category}
                            </span>
                            <span className="text-sm font-medium text-text-primary">
                              {formatCurrency(amount)}/mo
                            </span>
                          </div>
                          <div className="h-2 bg-cashmere-light/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="h-full bg-royal-garnet rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-cashmere-light/20 rounded-2xl border border-border">
                  <h3 className="text-lg font-medium text-text-primary mb-4">
                    Annual Impact
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Total yearly spend</span>
                      <span className="font-semibold text-text-primary">
                        {formatCurrency(yearlySpend)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Average per subscription</span>
                      <span className="font-semibold text-text-primary">
                        {subscriptions.length > 0
                          ? formatCurrency(monthlySpend / subscriptions.length)
                          : "$0.00"}
                        /mo
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Most expensive</span>
                      <span className="font-semibold text-text-primary">
                        {subscriptions.length > 0
                          ? subscriptions.reduce((max, sub) =>
                              sub.price > max.price ? sub : max
                            ).name
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-royal-garnet/5 rounded-2xl border border-royal-garnet/20">
                  <h3 className="text-lg font-medium text-text-primary mb-4">
                    Potential Savings
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Cancel just one subscription you don&apos;t use and save up to:
                  </p>
                  <p className="text-3xl font-bold text-royal-garnet">
                    {subscriptions.length > 0
                      ? formatCurrency(
                          subscriptions.reduce((max, sub) =>
                            sub.price > max.price ? sub : max
                          ).price * 12
                        )
                      : "$0.00"}
                    <span className="text-base font-normal text-text-secondary">
                      /year
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
