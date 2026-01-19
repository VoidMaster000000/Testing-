"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Search, Check } from "lucide-react";
import {
  addSubscription,
  popularServices,
  categories,
  getNextBillingDate,
  type Subscription,
} from "@/lib/subscriptions";

export default function AddSubscription() {
  const router = useRouter();
  const [step, setStep] = useState<"select" | "custom">("select");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<Partial<Subscription> | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState<Subscription["billingCycle"]>("monthly");
  const [category, setCategory] = useState("Other");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [cancelUrl, setCancelUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredServices = popularServices.filter((service) =>
    service.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectService = (service: Partial<Subscription>) => {
    setSelectedService(service);
    setName(service.name || "");
    setPrice(service.price?.toString() || "");
    setBillingCycle(service.billingCycle || "monthly");
    setCategory(service.category || "Other");
    setCancelUrl(service.cancelUrl || "");
    setStep("custom");
  };

  const handleCustom = () => {
    setSelectedService(null);
    setName("");
    setPrice("");
    setBillingCycle("monthly");
    setCategory("Other");
    setCancelUrl("");
    setStep("custom");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name.trim()) {
      setError("Please enter a subscription name");
      setIsLoading(false);
      return;
    }

    if (!price || parseFloat(price) <= 0) {
      setError("Please enter a valid price");
      setIsLoading(false);
      return;
    }

    const nextBillingDate = getNextBillingDate(startDate, billingCycle);

    addSubscription({
      name: name.trim(),
      price: parseFloat(price),
      billingCycle,
      category,
      startDate,
      nextBillingDate,
      cancelUrl: cancelUrl.trim() || undefined,
      notes: notes.trim() || undefined,
      color: selectedService?.color,
      logo: selectedService?.logo,
    });

    setTimeout(() => {
      router.push("/dashboard");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-text-primary">
            SubTrackr
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

      <main className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-royal-garnet/10 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-royal-garnet" />
            </div>
            <h1 className="text-3xl font-semibold text-text-primary mb-2">
              Add Subscription
            </h1>
            <p className="text-text-secondary">
              {step === "select"
                ? "Choose from popular services or add a custom subscription"
                : "Enter subscription details"}
            </p>
          </div>

          {step === "select" ? (
            <div>
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Netflix, Spotify, Adobe..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-royal-garnet/40 focus:ring-2 focus:ring-royal-garnet/10 transition-all"
                />
              </div>

              {/* Popular Services Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {filteredServices.slice(0, 12).map((service) => (
                  <motion.button
                    key={service.name}
                    onClick={() => handleSelectService(service)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-background rounded-xl border border-border hover:border-royal-garnet/30 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {service.logo ? (
                        <img
                          src={service.logo}
                          alt={service.name}
                          className="w-10 h-10 rounded-lg object-contain bg-white p-1"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold ${service.logo ? 'hidden' : ''}`}
                        style={{ backgroundColor: service.color || "#7B2D42" }}
                      >
                        {service.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary text-sm">
                          {service.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          ${service.price}/mo
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Custom Option */}
              <motion.button
                onClick={handleCustom}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full p-4 bg-cashmere-light/30 rounded-xl border border-border hover:border-royal-garnet/30 transition-colors"
              >
                <p className="font-medium text-text-primary">
                  + Add Custom Subscription
                </p>
                <p className="text-sm text-text-secondary">
                  Track any other recurring payment
                </p>
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Badge */}
              {selectedService && (
                <div className="flex items-center gap-3 p-4 bg-cashmere-light/30 rounded-xl">
                  {selectedService.logo ? (
                    <img
                      src={selectedService.logo}
                      alt={selectedService.name}
                      className="w-12 h-12 rounded-xl object-contain bg-white p-1.5"
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg"
                      style={{ backgroundColor: selectedService.color || "#7B2D42" }}
                    >
                      {selectedService.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-text-primary">
                      {selectedService.name}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {selectedService.category}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("select")}
                    className="ml-auto text-sm text-royal-garnet hover:underline"
                  >
                    Change
                  </button>
                </div>
              )}

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Subscription Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Netflix, Gym Membership"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-royal-garnet/40 focus:ring-2 focus:ring-royal-garnet/10 transition-all"
                />
              </div>

              {/* Price and Billing Cycle */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">
                      $
                    </span>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="9.99"
                      step="0.01"
                      min="0"
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-background border border-border text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-royal-garnet/40 focus:ring-2 focus:ring-royal-garnet/10 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="cycle"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Billing Cycle
                  </label>
                  <select
                    id="cycle"
                    value={billingCycle}
                    onChange={(e) =>
                      setBillingCycle(e.target.value as Subscription["billingCycle"])
                    }
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary focus:outline-none focus:border-royal-garnet/40 focus:ring-2 focus:ring-royal-garnet/10 transition-all"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary focus:outline-none focus:border-royal-garnet/40 focus:ring-2 focus:ring-royal-garnet/10 transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  First Billing Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary focus:outline-none focus:border-royal-garnet/40 focus:ring-2 focus:ring-royal-garnet/10 transition-all"
                />
                <p className="mt-1 text-xs text-text-secondary">
                  We&apos;ll calculate your next billing date from this
                </p>
              </div>

              {/* Cancel URL */}
              <div>
                <label
                  htmlFor="cancelUrl"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Cancellation Link (optional)
                </label>
                <input
                  type="url"
                  id="cancelUrl"
                  value={cancelUrl}
                  onChange={(e) => setCancelUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-royal-garnet/40 focus:ring-2 focus:ring-royal-garnet/10 transition-all"
                />
                <p className="mt-1 text-xs text-text-secondary">
                  Direct link to cancel this subscription (we&apos;ll provide it for popular services)
                </p>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Notes (optional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-royal-garnet/40 focus:ring-2 focus:ring-royal-garnet/10 transition-all resize-none"
                />
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("select")}
                  className="flex-1 py-4 bg-cashmere-light/50 text-text-primary font-medium rounded-full hover:bg-cashmere-light transition-colors"
                >
                  Back
                </button>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex-1 py-4 bg-royal-garnet text-white font-medium rounded-full hover:bg-royal-garnet-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    "Adding..."
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Add Subscription
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </main>
    </div>
  );
}
