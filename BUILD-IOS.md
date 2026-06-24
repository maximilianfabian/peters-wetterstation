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

1. **Point the app at your live site.** Open `capacitor.config.ts` and:
   - set `server.url` to your deployed URL (your Vercel link), and
   - set `appId` to your bundle identifier (e.g. `com.yourcompany.biscuit`).

2. On the Mac, in the project folder:
   ```bash
   npm install
   npm run ios:add      # creates the ios/ Xcode project (Mac only)
   npm run ios:sync     # copies config + the fallback page in
   npm run ios:open     # opens the project in Xcode
   ```

3. **In Xcode** (the App target → "Signing & Capabilities"):
   - **Team**: choose the Vedat Ulgen team (**72JBWD8T65**).
   - **Bundle Identifier**: `com.intomembers.biscuit` (matches `appId` in
     `capacitor.config.ts` and the App Store Connect record below).

4. **In App Store Connect** (appstoreconnect.apple.com → Apps → "+"), signed in
   as `vedat@vemax.io`:
   - First register the bundle ID at developer.apple.com → Identifiers (App ID
     `com.intomembers.biscuit`, team 72JBWD8T65).
   - Then create a new app with that **same bundle ID**, name "Biscuit",
     platform iOS, and an SKU.

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
