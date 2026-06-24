import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor configuration — the thin native iOS shell for Biscuit.
 *
 * Because Biscuit has a SERVER-SIDE API route (so your secret key never reaches
 * the browser), the native app does NOT bundle the website. Instead it loads
 * the deployed Biscuit web app from a URL, and only the build + TestFlight
 * upload happen on a Mac. See BUILD-IOS.md for the full walkthrough.
 */
const config: CapacitorConfig = {
  // TODO: set this to YOUR bundle identifier, created in App Store Connect under
  // the Vedat Ulgen Apple Developer account (reverse-domain style).
  appId: "com.biscuit.app",
  appName: "Biscuit",

  // Required by Capacitor. We don't ship the site inside the app, so this just
  // holds a small "loading" page used until the live site is reached.
  webDir: "native-fallback",

  server: {
    // TODO: replace with your deployed Biscuit URL (e.g. your Vercel link).
    // The native app opens this site, so everything (UI + the server-side API)
    // keeps working exactly as on the web.
    url: "https://YOUR-BISCUIT-URL.vercel.app",
    cleartext: false, // only allow secure https
  },
};

export default config;
