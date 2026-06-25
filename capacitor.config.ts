import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor configuration — the thin native iOS shell for Biscuit.
 *
 * Biscuit has a SERVER-SIDE API route (so the secret key never reaches the
 * browser), so the native app does NOT bundle the website — it loads the
 * deployed Biscuit web app from a URL. Only the build + TestFlight upload happen
 * on a Mac. See BUILD-IOS.md.
 *
 * STAGING vs PRODUCTION — choose at build time with an env var:
 *   BISCUIT_ENV=staging npm run ios:sync   # staging app
 *   npm run ios:sync                       # production app (default)
 *
 * Staging uses its OWN bundle id (app.biscuit.staging) and its OWN App Store
 * Connect record, completely separate from production AND from the INTO app.
 */
const isStaging = process.env.BISCUIT_ENV === "staging";

const config: CapacitorConfig = {
  // Biscuit's OWN bundle ids — deliberately NOT under com.intomembers.*, so they
  // can never collide with the separate INTO Members app. Same Apple team
  // (72JBWD8T65), which is safe and additive.
  appId: isStaging ? "app.biscuit.staging" : "app.biscuit",
  appName: isStaging ? "Biscuit (Staging)" : "Biscuit",

  // Required by Capacitor. We don't ship the site inside the app; this is just a
  // small "loading" page shown until the live site is reached.
  webDir: "native-fallback",

  server: {
    // The native app opens this site (UI + the server-side API both work).
    // Set the matching URL via env var, or replace the placeholders below.
    url: isStaging
      ? process.env.BISCUIT_STAGING_URL ?? "https://biscuit-puce.vercel.app"
      : process.env.BISCUIT_PROD_URL ?? "https://biscuit-puce.vercel.app",
    cleartext: false, // only allow secure https
  },
};

export default config;
