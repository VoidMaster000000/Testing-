// Waitlist data management utilities
// Using localStorage for demo - can be replaced with real database

export interface Subscriber {
  id: string;
  email: string;
  referralCode: string;
  referredBy: string | null;
  referralCount: number;
  position: number;
  createdAt: string;
}

export interface Waitlist {
  id: string;
  name: string;
  description: string;
  slug: string;
  subscribers: Subscriber[];
  createdAt: string;
  settings: {
    primaryColor: string;
    collectName: boolean;
    successMessage: string;
  };
}

const STORAGE_KEY = "waitly_data";

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Generate referral code
export function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Get all waitlists
export function getWaitlists(): Waitlist[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Get single waitlist by ID or slug
export function getWaitlist(idOrSlug: string): Waitlist | null {
  const waitlists = getWaitlists();
  return (
    waitlists.find((w) => w.id === idOrSlug || w.slug === idOrSlug) || null
  );
}

// Create new waitlist
export function createWaitlist(
  name: string,
  description: string,
  slug: string
): Waitlist {
  const waitlists = getWaitlists();

  const newWaitlist: Waitlist = {
    id: generateId(),
    name,
    description,
    slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    subscribers: [],
    createdAt: new Date().toISOString(),
    settings: {
      primaryColor: "#7B2D42",
      collectName: false,
      successMessage: "You're on the list! Check your email for confirmation.",
    },
  };

  waitlists.push(newWaitlist);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(waitlists));

  return newWaitlist;
}

// Add subscriber to waitlist
export function addSubscriber(
  waitlistId: string,
  email: string,
  referredBy: string | null = null
): { success: boolean; subscriber?: Subscriber; error?: string } {
  const waitlists = getWaitlists();
  const waitlistIndex = waitlists.findIndex(
    (w) => w.id === waitlistId || w.slug === waitlistId
  );

  if (waitlistIndex === -1) {
    return { success: false, error: "Waitlist not found" };
  }

  const waitlist = waitlists[waitlistIndex];

  // Check if email already exists
  if (waitlist.subscribers.some((s) => s.email === email)) {
    return { success: false, error: "Email already registered" };
  }

  const subscriber: Subscriber = {
    id: generateId(),
    email,
    referralCode: generateReferralCode(),
    referredBy,
    referralCount: 0,
    position: waitlist.subscribers.length + 1,
    createdAt: new Date().toISOString(),
  };

  // Update referrer's count if exists
  if (referredBy) {
    const referrerIndex = waitlist.subscribers.findIndex(
      (s) => s.referralCode === referredBy
    );
    if (referrerIndex !== -1) {
      waitlist.subscribers[referrerIndex].referralCount++;
    }
  }

  waitlist.subscribers.push(subscriber);
  waitlists[waitlistIndex] = waitlist;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(waitlists));

  return { success: true, subscriber };
}

// Delete waitlist
export function deleteWaitlist(id: string): boolean {
  const waitlists = getWaitlists();
  const filtered = waitlists.filter((w) => w.id !== id);
  if (filtered.length === waitlists.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

// Get waitlist stats
export function getWaitlistStats(waitlistId: string) {
  const waitlist = getWaitlist(waitlistId);
  if (!waitlist) return null;

  const totalSubscribers = waitlist.subscribers.length;
  const referralSignups = waitlist.subscribers.filter(
    (s) => s.referredBy
  ).length;
  const today = new Date().toDateString();
  const todaySignups = waitlist.subscribers.filter(
    (s) => new Date(s.createdAt).toDateString() === today
  ).length;

  return {
    totalSubscribers,
    referralSignups,
    todaySignups,
    referralRate:
      totalSubscribers > 0
        ? Math.round((referralSignups / totalSubscribers) * 100)
        : 0,
  };
}
