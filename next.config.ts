import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Articles removed 2026-08-14 (no longer relevant). Redirect their URLs
    // to the articles overview so any external links / indexed pages don't 404.
    return [
      {
        source: "/artikler/leier-du-ut-bolig",
        destination: "/artikler",
        permanent: true,
      },
      {
        source: "/artikler/prosjektledelse-frydenhaug-skole",
        destination: "/artikler",
        permanent: true,
      },
      {
        source: "/artikler/radonmaling-vinterhalvaret",
        destination: "/artikler",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
