import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SubTrackr - Subscription Tracker",
    short_name: "SubTrackr",
    description:
      "Track all your subscriptions in one place. Get renewal reminders and spending insights.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#7B2D42",
    icons: [
      {
        src: "/icon-192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
