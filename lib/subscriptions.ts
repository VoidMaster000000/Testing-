// Subscription Tracker Data Model and Storage

export interface Subscription {
  id: string;
  name: string;
  price: number;
  billingCycle: "weekly" | "monthly" | "quarterly" | "yearly";
  category: string;
  nextBillingDate: string;
  startDate: string;
  logo?: string;
  color?: string;
  cancelUrl?: string;
  notes?: string;
  reminded: boolean;
}

export interface UserData {
  subscriptions: Subscription[];
  createdAt: string;
}

const STORAGE_KEY = "subtrackr_data";

// Popular subscription services with their details
// Using logo.dev API for brand logos: https://img.logo.dev/{domain}
export const popularServices: Partial<Subscription>[] = [
  { name: "Netflix", price: 15.49, billingCycle: "monthly", category: "Streaming", color: "#E50914", logo: "https://img.logo.dev/netflix.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://www.netflix.com/cancelplan" },
  { name: "Spotify", price: 10.99, billingCycle: "monthly", category: "Music", color: "#1DB954", logo: "https://img.logo.dev/spotify.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://www.spotify.com/account/subscription/" },
  { name: "Disney+", price: 13.99, billingCycle: "monthly", category: "Streaming", color: "#113CCF", logo: "https://img.logo.dev/disneyplus.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://www.disneyplus.com/account" },
  { name: "Amazon Prime", price: 14.99, billingCycle: "monthly", category: "Shopping", color: "#FF9900", logo: "https://img.logo.dev/amazon.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://www.amazon.com/manageprime" },
  { name: "YouTube Premium", price: 13.99, billingCycle: "monthly", category: "Streaming", color: "#FF0000", logo: "https://img.logo.dev/youtube.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://www.youtube.com/paid_memberships" },
  { name: "Apple Music", price: 10.99, billingCycle: "monthly", category: "Music", color: "#FA243C", logo: "https://img.logo.dev/apple.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://support.apple.com/en-us/HT202039" },
  { name: "HBO Max", price: 15.99, billingCycle: "monthly", category: "Streaming", color: "#000000", logo: "https://img.logo.dev/max.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://www.max.com/account" },
  { name: "Hulu", price: 7.99, billingCycle: "monthly", category: "Streaming", color: "#1CE783", logo: "https://img.logo.dev/hulu.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://secure.hulu.com/account" },
  { name: "Adobe Creative Cloud", price: 54.99, billingCycle: "monthly", category: "Software", color: "#FF0000", logo: "https://img.logo.dev/adobe.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://account.adobe.com/plans" },
  { name: "Microsoft 365", price: 9.99, billingCycle: "monthly", category: "Software", color: "#0078D4", logo: "https://img.logo.dev/microsoft.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://account.microsoft.com/services" },
  { name: "Notion", price: 10.00, billingCycle: "monthly", category: "Productivity", color: "#000000", logo: "https://img.logo.dev/notion.so?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://www.notion.so/my-account" },
  { name: "Slack", price: 8.75, billingCycle: "monthly", category: "Productivity", color: "#4A154B", logo: "https://img.logo.dev/slack.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://slack.com/account/settings" },
  { name: "Dropbox", price: 11.99, billingCycle: "monthly", category: "Storage", color: "#0061FF", logo: "https://img.logo.dev/dropbox.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://www.dropbox.com/account/plan" },
  { name: "iCloud+", price: 2.99, billingCycle: "monthly", category: "Storage", color: "#3693F3", logo: "https://img.logo.dev/icloud.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://support.apple.com/en-us/HT201318" },
  { name: "ChatGPT Plus", price: 20.00, billingCycle: "monthly", category: "AI Tools", color: "#10A37F", logo: "https://img.logo.dev/openai.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://chat.openai.com/settings/subscription" },
  { name: "Claude Pro", price: 20.00, billingCycle: "monthly", category: "AI Tools", color: "#D97757", logo: "https://img.logo.dev/anthropic.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://claude.ai/settings" },
  { name: "Gym Membership", price: 30.00, billingCycle: "monthly", category: "Health", color: "#FF6B6B" },
  { name: "NordVPN", price: 12.99, billingCycle: "monthly", category: "Security", color: "#4687FF", logo: "https://img.logo.dev/nordvpn.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://my.nordaccount.com/dashboard/nordvpn/" },
  { name: "Canva", price: 12.99, billingCycle: "monthly", category: "Design", color: "#00C4CC", logo: "https://img.logo.dev/canva.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://www.canva.com/settings/billing-and-teams" },
  { name: "Grammarly", price: 12.00, billingCycle: "monthly", category: "Productivity", color: "#15C39A", logo: "https://img.logo.dev/grammarly.com?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ", cancelUrl: "https://account.grammarly.com/subscription" },
];

export const categories = [
  "Streaming",
  "Music",
  "Shopping",
  "Software",
  "Productivity",
  "Storage",
  "AI Tools",
  "Health",
  "Security",
  "Design",
  "Gaming",
  "News",
  "Education",
  "Other"
];

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function getStorageData(): UserData {
  if (typeof window === "undefined") {
    return { subscriptions: [], createdAt: new Date().toISOString() };
  }

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const newData: UserData = {
      subscriptions: [],
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    return newData;
  }
  return JSON.parse(data);
}

function saveStorageData(data: UserData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getSubscriptions(): Subscription[] {
  return getStorageData().subscriptions;
}

export function addSubscription(sub: Omit<Subscription, "id" | "reminded">): Subscription {
  const data = getStorageData();
  const newSub: Subscription = {
    ...sub,
    id: generateId(),
    reminded: false,
  };
  data.subscriptions.push(newSub);
  saveStorageData(data);
  return newSub;
}

export function updateSubscription(id: string, updates: Partial<Subscription>): Subscription | null {
  const data = getStorageData();
  const index = data.subscriptions.findIndex((s) => s.id === id);
  if (index === -1) return null;

  data.subscriptions[index] = { ...data.subscriptions[index], ...updates };
  saveStorageData(data);
  return data.subscriptions[index];
}

export function deleteSubscription(id: string): boolean {
  const data = getStorageData();
  const index = data.subscriptions.findIndex((s) => s.id === id);
  if (index === -1) return false;

  data.subscriptions.splice(index, 1);
  saveStorageData(data);
  return true;
}

export function getSubscription(id: string): Subscription | null {
  const data = getStorageData();
  return data.subscriptions.find((s) => s.id === id) || null;
}

// Analytics functions
export function getTotalMonthlySpend(subscriptions: Subscription[]): number {
  return subscriptions.reduce((total, sub) => {
    switch (sub.billingCycle) {
      case "weekly": return total + sub.price * 4.33;
      case "monthly": return total + sub.price;
      case "quarterly": return total + sub.price / 3;
      case "yearly": return total + sub.price / 12;
      default: return total;
    }
  }, 0);
}

export function getTotalYearlySpend(subscriptions: Subscription[]): number {
  return subscriptions.reduce((total, sub) => {
    switch (sub.billingCycle) {
      case "weekly": return total + sub.price * 52;
      case "monthly": return total + sub.price * 12;
      case "quarterly": return total + sub.price * 4;
      case "yearly": return total + sub.price;
      default: return total;
    }
  }, 0);
}

export function getSpendByCategory(subscriptions: Subscription[]): Record<string, number> {
  const byCategory: Record<string, number> = {};

  subscriptions.forEach((sub) => {
    let monthlyAmount: number;
    switch (sub.billingCycle) {
      case "weekly": monthlyAmount = sub.price * 4.33; break;
      case "monthly": monthlyAmount = sub.price; break;
      case "quarterly": monthlyAmount = sub.price / 3; break;
      case "yearly": monthlyAmount = sub.price / 12; break;
      default: monthlyAmount = sub.price;
    }

    byCategory[sub.category] = (byCategory[sub.category] || 0) + monthlyAmount;
  });

  return byCategory;
}

export function getUpcomingRenewals(subscriptions: Subscription[], daysAhead: number = 7): Subscription[] {
  const now = new Date();
  const futureDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  return subscriptions
    .filter((sub) => {
      const billingDate = new Date(sub.nextBillingDate);
      return billingDate >= now && billingDate <= futureDate;
    })
    .sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime());
}

export function getDaysUntilRenewal(nextBillingDate: string): number {
  const now = new Date();
  const billing = new Date(nextBillingDate);
  const diffTime = billing.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getNextBillingDate(startDate: string, billingCycle: Subscription["billingCycle"]): string {
  const start = new Date(startDate);
  const now = new Date();
  let next = new Date(start);

  while (next <= now) {
    switch (billingCycle) {
      case "weekly":
        next.setDate(next.getDate() + 7);
        break;
      case "monthly":
        next.setMonth(next.getMonth() + 1);
        break;
      case "quarterly":
        next.setMonth(next.getMonth() + 3);
        break;
      case "yearly":
        next.setFullYear(next.getFullYear() + 1);
        break;
    }
  }

  return next.toISOString().split("T")[0];
}
