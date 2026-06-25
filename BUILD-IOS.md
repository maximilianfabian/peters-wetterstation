# Putting Biscuit on TestFlight (iOS)

Biscuit is a web app. To get it into **TestFlight**, we wrap it in a thin native
shell with **Capacitor**. The shell simply opens the deployed Biscuit website,
so the whole app — including the server-side AI and your secret key — keeps
working exactly as on the web. Only the **build + upload** must happen on a Mac.

> Plain version: we make a tiny iPhone "app" that opens your Biscuit website
> inside it, then send that to Apple's TestFlight so testers can install it.

> **Note on EAS / Expo:** the org's other apps build with Expo + `eas build` /
> `eas submit`. That pipeline is for React Native apps and does **not** apply
> here — Biscuit is a web app wrapped with Capacitor, so we build with **Xcode
> Archive** instead of EAS. We still use the same Apple account for signing.
> Apple account: `vedat@vemax.io`, team **72JBWD8T65**.

## Isolation from the INTO Members app (read this first)

Biscuit shares **only** the Apple Developer team with the separate,
business-critical **INTO Members** app. Keep them 100% isolated:

1. **Own bundle ID.** Biscuit uses `app.biscuit`. It must **never** be, or
   sit under, INTO's namespace: `com.intomembers.app` (prod) or
   `com.intomembers.app.staging` (staging).
2. **No EAS / Expo, ever.** Do not create or run `eas.json`, `app.config.ts`,
   `eas build`, `eas submit`, or `eas update` — those belong to INTO's project
   and own its build numbers/OTA channels. Biscuit builds **only** via Xcode.
3. **Don't disturb shared signing.** Use **automatic** signing and let Xcode
   create a **new** profile for Biscuit. **Never revoke/reset/regenerate** any
   existing certificate or profile — INTO's builds depend on them. If prompted to
   reset/revoke, **stop and ask**.
4. **New App Store Connect record only.** Create a brand-new app (own SKU, own
   bundle ID). Never modify or reuse INTO's two records.
5. **No INTO backend.** Biscuit points only at its own deployed web URL. Never
   import INTO's Supabase/env/API keys.
6. **Separate repo.** Everything stays in the Biscuit repo
   (`maximilianfabian/biscuit`). Never touch the INTO repo
   (`maximilianfabian/new-into`).

---

## What you need first

1. **A Mac** with **Xcode** installed (free, from the Mac App Store).
2. **CocoaPods**: open Terminal and run `sudo gem install cocoapods`.
3. **Node.js** (same as for the web app).
4. Access to the **Vedat Ulgen Apple Developer account** (paid Apple Developer
   Program — required for TestFlight).
5. **Biscuit deployed to a public URL** (e.g. Vercel). You need this URL before
   building. See README → "Put it online (deploy to Vercel)".

---

## One-time setup

1. **Choose environment + URL.** Everything is driven by `capacitor.config.ts`:
   - **Production** (default): bundle id `app.biscuit`, name "Biscuit", loads
     `BISCUIT_PROD_URL`.
   - **Staging**: prefix commands with `BISCUIT_ENV=staging` — bundle id
     `app.biscuit.staging`, name "Biscuit (Staging)", loads `BISCUIT_STAGING_URL`.

   Provide the matching URL as an env var (shown below) or by editing the
   placeholder in `capacitor.config.ts`. **You must deploy Biscuit to that URL
   first** (see README → "Put it online (deploy to Vercel)"). Staging and
   production should be two separate deployments/URLs.

2. On the Mac, in the project folder. For a **staging** build, prefix the
   Capacitor commands with the env vars (omit them for production):
   ```bash
   npm install
   export BISCUIT_ENV=staging
   export BISCUIT_STAGING_URL=https://your-staging-url   # your deployed staging link
   npm run ios:add      # creates the ios/ Xcode project (Mac only)
   npm run ios:sync     # writes the staging bundle id + URL into the project
   npm run ios:open     # opens Xcode
   ```

3. **In Xcode** (the App target → "Signing & Capabilities"):
   - **Team**: choose the Vedat Ulgen team (**72JBWD8T65**).
   - **Signing**: leave **Automatically manage signing** ON. Let Xcode create a
     **new** provisioning profile for Biscuit's bundle ID. **Never** revoke,
     reset, or regenerate any existing certificate/profile (those are shared with
     INTO — see "Isolation" above). If Xcode offers to "Reset" or "Revoke", STOP.
   - **Bundle Identifier**: should read `app.biscuit.staging` for a staging build
     (or `app.biscuit` for production) — it matches `appId` in
     `capacitor.config.ts` and the App Store Connect record below.

4. **In App Store Connect** (appstoreconnect.apple.com → Apps → "+"), signed in
   as `vedat@vemax.io`:
   - First register a **new, explicit** App ID at developer.apple.com →
     Identifiers — `app.biscuit.staging` for staging (or `app.biscuit` for
     production), team 72JBWD8T65. Not a wildcard.
   - Then create a **brand-new app record** with that **same bundle ID** — name
     "Biscuit (Staging)" for staging — platform iOS, its own unique SKU. Do
     **not** modify or reuse INTO's existing records. (A separate staging app is
     exactly how INTO is set up.)

---

## Build & upload to TestFlight

1. In Xcode, set the run destination to **"Any iOS Device (arm64)"**.
2. Menu: **Product → Archive**. Wait for it to finish.
3. In the Organizer window that appears: **Distribute App → App Store Connect →
   Upload**. Follow the prompts (Xcode handles signing).
4. After a few minutes the build shows up in **App Store Connect → your app →
   TestFlight**.
5. Add **Internal Testers** (people on your team) — they can install via the
   **TestFlight** app on their iPhone almost immediately. External testers need
   a short Apple "beta review" first.

When you change the website, testers **don't** need a new build — the app loads
the live site, so a Vercel redeploy is enough. You only rebuild for native
changes (icon, name, new plugins).

---

## Don't forget

- **App icon & name**: add an icon set in Xcode (`Assets.xcassets → AppIcon`).
  Without one, the build still works but shows a blank icon.
- **App Review note (guideline 4.2):** a wrapper that's "just a website" can be
  rejected from the **public App Store**. TestFlight beta is fine. For a real
  App Store release later we'd add genuinely native touches (offline screen,
  notifications, voice, etc. — that's the Phase 4 native work).
- **No cloud Mac?** Services like **Codemagic**, **Xcode Cloud**, or **Bitrise**
  can build and upload using your Apple credentials without a physical Mac.

---

## Don't commit the generated iOS project blindly

`npm run ios:add` creates an `ios/` folder (an Xcode project). Build artifacts
and CocoaPods are already covered by `.gitignore`. You can commit the rest of
`ios/` if you want it tracked, but it's only generatable on a Mac.
