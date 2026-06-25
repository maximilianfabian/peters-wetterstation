# CLAUDE.md — Working instructions for Biscuit

This file tells you (Claude Code) how to work in this project. Read it before doing anything.
See `PROJECT-BRIEF.md` for the full product vision.

## Who you're working with

The founder can follow instructions and run commands but is **not an experienced developer.**
Therefore:

- Explain each step in plain language. Avoid unexplained jargon.
- When something needs to run in the terminal, give the **exact command** to copy‑paste, and say what it does and what they should expect to see.
- Make small, reviewable changes. After each meaningful step, say what you did and what to do next.
- When you hit a decision, briefly recommend the simplest good option rather than asking many questions.
- Never assume the founder has done a hidden setup step — list prerequisites explicitly.

## What we're building

A text-first, mobile-first web app: a warm, patient AI companion for adults 65+ who aren't comfortable with tech. The headline feature is that the user **never faces a blank box** — they tap suggested prompts, read big text, and can have replies read aloud.

## Tech stack & conventions

- **Next.js (App Router) + TypeScript + Tailwind CSS.**
- **Vercel AI SDK (`ai`)** for streaming chat and easy model swapping.
- The LLM is called **only from a server route / server action** — never from the browser.
- Keep it a **single project**, no extra services in Phase 1.
- Prefer small, clearly named components. Add short comments explaining non-obvious code, since a beginner will read it.
- Don't add new dependencies without saying what each one is for. Keep the dependency list small.

## Senior-friendly UI rules (apply to everything you build)

- Body text **≥ 18px** (aim 20–22px); large headings; generous spacing.
- Tap targets **≥ 48px** tall, well separated.
- High contrast; never use color as the only signal.
- Plain, friendly button/label text. Minimal UI, lots of whitespace, no clutter.
- Mobile-first; usable one-handed. Nothing important buried in menus.
- Loading and error states must be calm and human: e.g. "I had a little trouble — let's try that again," never a raw error.

## Security & cost rules (do not violate)

- The LLM API key lives in **`.env.local`** and is used **only server-side**. It must never appear in client components or be shipped to the browser.
- Add `.env.local` to `.gitignore`. Never commit secrets.
- Add a simple server-side guard (basic rate limit / message length cap) so usage can't spiral.
- Remind the founder to set a hard spending cap in their LLM provider's billing dashboard.

## The system prompt is the product

The assistant's behavior is defined by a system prompt kept in a single, clearly named file (e.g. `lib/system-prompt.ts`). Treat it as the most important file in the repo. The starting version is in `KICKOFF-PROMPT.md` / `PROJECT-BRIEF.md`. Wire it in verbatim. Don't water down the safety rules.

## Safety rules baked into the product

- Biscuit must **never give medical advice or assess symptoms.** If the user mentions feeling unwell, pain, a fall, breathing/chest symptoms, or an emergency, Biscuit calmly redirects them to a doctor, trusted family member, or emergency services, and offers to help reach them.
- Biscuit never asks for passwords, bank details, or money, and warns the user if anyone else does.
- No medical, calling, reminder, or notification features that actually act in the world yet — Phase 1 only drafts text or opens a `tel:` link.

## Phase 1 — Definition of Done

1. App runs locally with `npm run dev`.
2. A mobile-first chat screen with large, high-contrast text.
3. 4 tappable suggested-prompt chips that fill/send a starter message.
4. Streaming replies from one LLM via a server route; key is server-side only.
5. A "Read aloud" button on each reply (browser SpeechSynthesis).
6. Warm loading + error states.
7. Conversation held in memory for the session (no database, no login yet).
8. Successfully deployed to Vercel with the API key set as an environment variable there.

## Do NOT (in Phase 1)

- Don't add a database or login.
- Don't add voice input.
- Don't implement real phone calls, reminders, or notifications.
- Don't let the assistant give medical advice.
- Don't put the API key anywhere the browser can see it.
- Don't add big frameworks or many dependencies "to be safe." Keep it minimal.
