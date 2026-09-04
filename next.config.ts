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
      // Termografi-artikkelen fikk en nøkkelord-optimalisert slug (2026-09-04).
      {
        source: "/artikler/lekker-boligen-din-varme",
        destination: "/artikler/termografi-av-bolig-og-bygg",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
