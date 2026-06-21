# Biscuit

A warm, patient AI companion for adults 65+ who aren't comfortable with
technology. Text-first, mobile-first, built so the user **never faces a blank
box** — they tap suggested prompts, read big text, and can have replies read
aloud.

See [`PROJECT-BRIEF.md`](./PROJECT-BRIEF.md) for the full product vision,
[`DESIGN.md`](./DESIGN.md) for the senior-friendly design principles, and
[`CLAUDE.md`](./CLAUDE.md) for working conventions.

---

## What you need (one-time setup)

1. **Node.js** (version 18 or newer). Check by running `node --version`.
2. **An Anthropic API key.** Sign up at <https://console.anthropic.com>, then
   **set a hard monthly spending cap first** (e.g. $20) in the billing settings.
3. *(Later, for putting it online)* a free **Vercel** account.

## Run it on your computer

These are the exact commands. Run them from inside this project folder.

```bash
# 1. Install the building blocks (only needed the first time, or after changes).
npm install

# 2. Create your secret key file from the example.
cp .env.local.example .env.local
#    Then open .env.local and paste your real Anthropic key after the = sign.

# 3. Start the app.
npm run dev
```

You should see a line like `Local: http://localhost:3000`. Open that address
in your web browser and you'll see Biscuit. Tap a suggested prompt to begin.

> **Open it on your phone (same Wi‑Fi):** the start-up message also prints a
> `Network:` address (something like `http://192.168.x.x:3000`). Type that into
> your phone's browser.

## How it stays safe and cheap

- **Your secret key never reaches the browser.** The app only talks to a
  server route at `app/api/chat/route.ts`; only that server code uses the key.
- **`.env.local` is never committed** (it's listed in `.gitignore`).
- A small **usage guard** (`lib/rate-limit.ts`) caps message length and how
  fast requests can come in, so a bug can't run up the bill.
- This is a backstop only — **the real protection is the spending cap you set
  in the Anthropic dashboard.**

## Put it online (deploy to Vercel)

1. Push this project to GitHub.
2. At <https://vercel.com>, choose **Add New → Project** and pick this repo.
3. Under **Environment Variables**, add `ANTHROPIC_API_KEY` with your real key.
4. Click **Deploy**. Vercel gives you a public link you can open on any phone.

## The most important file

[`lib/system-prompt.ts`](./lib/system-prompt.ts) defines how Biscuit speaks and the
safety rules it follows. It is the real product — refine it over time based on
watching real people use Biscuit. Don't weaken the safety rules.

## What's here

| Path | What it does |
|---|---|
| `app/page.tsx` | Renders the app (home screen + conversation). |
| `components/BiscuitApp.tsx` | Switches between the name step, home screen, and chat. |
| `components/NameScreen.tsx` | One-time, skippable "What may I call you?" (saved on-device). |
| `components/HomeScreen.tsx` | Welcome screen: round button + big action buttons. |
| `components/Conversation.tsx` | The chat screen (messages, suggestions, message box). |
| `components/MessageBubble.tsx` | One message; "Read aloud" sits under Biscuit's replies. |
| `components/ReadAloudButton.tsx` | "Read aloud" using the browser's voice. |
| `app/api/chat/route.ts` | Server-only route that talks to the LLM. |
| `lib/system-prompt.ts` | Biscuit's instructions and safety rules. |
| `lib/suggested-prompts.ts` | The quick-tap suggestions shown in a chat. |
| `lib/rate-limit.ts` | A simple server-side usage guard. |

## Switching the AI provider later

Biscuit uses the Vercel AI SDK, so swapping providers is a small change in
`app/api/chat/route.ts` (the `import` and the `MODEL` line) plus the matching
package and environment variable. The browser code never changes.
