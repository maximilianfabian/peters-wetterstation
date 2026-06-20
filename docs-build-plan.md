# Biscuit — Build Plan with Claude Code

A text-first, mobile-first AI assistant for adults 65+ who don't know how to "prompt."
Tailored for someone who can follow a tutorial and run commands with guidance.

---

## The short answer

**Yes — you can build the MVP yourself with Claude Code, and host it cheaply at first.**

Here's why this is very achievable: at its core, your product is a *thin, beautifully designed wrapper around an LLM API*. The model already exists. You are not training an AI. You are building:

1. A simple, senior-friendly chat screen (big text, big buttons, suggested prompts).
2. A small server that talks to an LLM API and hides your secret key.
3. A carefully written **system prompt** that does the "prompting" *on the user's behalf* — this is your real product, and it's just well-crafted text.

Claude Code will write ~95% of the actual code. Your job is product decisions, running the commands it gives you, testing on a real phone, and — most importantly — sitting with real older people while they use it.

**What needs money/help later:** real reliability at scale, anything touching health data (the "I'm not feeling well" button is a liability minefield — see Safety section), real integrations (actually calling family, real reminders/notifications), voice, native apps, and a team. Those are your Series-of-funding milestones, not your MVP.

---

## What you already have

You've built a landing page and waitlist on Lovable ("2,143 families already waiting"). That's traction and is exactly what investors want to see. Two notes:

- **Export your waitlist emails** out of Lovable so you own that list.
- The chat *app* is a separate project from the landing page. Build it fresh with Claude Code (don't try to extend the Lovable preview into a production app).

---

## Recommended stack (beginner-friendly, all standard)

| Piece | Choice | Why |
|---|---|---|
| Framework | **Next.js** (App Router) | One project holds both your screen *and* the server route that hides your API key. Claude Code knows it extremely well. |
| Styling | **Tailwind CSS** | Makes "big text, high contrast, large buttons" trivial to express. |
| LLM plumbing | **Vercel AI SDK** (`ai` package) | Handles response streaming and lets you swap model providers with one line. Biggest single accelerator for a beginner. |
| Model (start) | **GPT-5 mini** or **Claude Haiku 4.5** | Cheap, fast, plenty smart for warm everyday chat. See cost table. |
| Hosting | **Vercel** | Connect your GitHub repo → it deploys automatically. Free to prototype. |
| Login + storage (later) | **Supabase** | Free tier covers 50,000 monthly users. Add only when you need saved history. |

You do **not** need: a custom backend server, Docker, Kubernetes, a vector database, or your own GPUs. Resist anyone (or any AI) that tells you you do at this stage.

---

## The phased plan

### Phase 0 — Get a chat working on your laptop (½–1 day)

Goal: type a message, get a friendly reply, locally.

1. Install the tools: **Node.js** (LTS), **Git**, **VS Code**, and **Claude Code**.
2. Get an API key from **one** provider (OpenAI or Anthropic). **Immediately set a hard monthly spending limit** in their billing dashboard (e.g. $20). Do this before anything else.
3. Open a new empty folder in VS Code, start Claude Code, and give it the **kickoff prompt** (below). It will scaffold the whole project and tell you exactly what to type.
4. Run it locally and chat with it.

> ⚠️ **Never put the API key in the front-end / browser code.** It must live in a `.env.local` file and only be used by the server route. Anyone who opens your site can read browser code. Claude Code will set this up correctly if you tell it to — the kickoff prompt does.

### Phase 1 — The senior MVP (1–2 weeks of evenings)

This is the version you put in front of a real person. Features:

- **Big everything**: 18–22px+ body text, high contrast, tap targets at least 48px tall.
- **Suggested prompt chips** — the core feature for "people who don't know how to prompt." Pre-written friendly starters they can tap instead of typing (see starter list below). Your mockup's *"Remind me to take my pills at 8am"* is exactly right.
- **Streaming replies** so the screen feels alive, not frozen.
- **Read-aloud button** — the browser can speak text for free (`SpeechSynthesis`). Easy win even in a "text-first" app, and huge for this audience.
- **Reassuring error states** — never show a technical error. "I had a little trouble — let's try that again."
- No login, no database yet. Conversation lives in memory for the session.

Then **deploy to Vercel** so you can open it on your own phone and a tester's phone via a real link.

### Phase 2 — Make it real (2–4 weeks)

- Add **Supabase** for a *very* simple login (magic link or phone code — passwords are friction for seniors) and to **save conversation history**.
- Add a **rate limit** and a **server-side spending guard** so a bug or bad actor can't run up your bill.
- Turn the action buttons into real "skills" — but scope them honestly at first. "Call family" can start as *"Here's Sarah's number, tap to call"* (a `tel:` link) rather than placing the call itself. Real reminders need push notifications, which is a Phase 3+ integration.
- Add lightweight analytics so you can see what people actually tap.

### Phase 3 — Pilot with real seniors (ongoing — this is the important one)

Get 5–10 real older adults using it. **Watch them use it in person.** You will learn more in one afternoon than in a month of building. This pilot *is* your fundraising evidence: retention, quotes, before/after stories.

### Phase 4 — "Proper hosting and so on" (after you raise)

What actually changes when you have money and real users: reliability/monitoring, a proper secrets manager, **compliance if you store health info** (HIPAA-adjacent in the US, GDPR in the EU), caregiver/family dashboards, real notifications, voice (your "Tap to talk"), and possibly native iOS/Android apps. This is a team's job, not a solo evening project — and that's the right time for funding.

---

## Roughly what will it cost to run?

Assumptions: a typical exchange ≈ 1,500 input + 400 output tokens; an *active* user does ~20 exchanges/day (~600/month). These are estimates to reason about, not quotes.

| Scenario | GPT-5 mini (~$0.0006/exchange) | Claude Haiku 4.5 (~$0.0035/exchange) |
|---|---|---|
| 1 active user / month | ~$0.35 | ~$2.10 |
| 100 active users | ~$35/mo | ~$210/mo |
| 1,000 active users | ~$350/mo | ~$2,100/mo |

Hosting (Vercel) and database (Supabase) are **free** while you prototype; budget roughly **$20–45/month** combined once you launch commercially and turn off the free-tier sleep behavior. **Prompt caching** (reusing your long system prompt) can cut the input portion ~90%, lowering these further. Takeaway: your MVP and pilot cost **tens of dollars a month**, not thousands.

---

## Starter setup — paste these into Claude Code

### 1) Kickoff prompt (Phase 0)

```
I'm building a mobile-first web app called Biscuit: a friendly AI assistant for
adults 65+ who aren't comfortable with technology. I can follow instructions
but I'm not an experienced developer — explain each step and give me the exact
commands to run.

Please scaffold a Next.js (App Router) + TypeScript + Tailwind project that:
- Has a single chat screen, designed mobile-first, with very large text
  (min 18px body), high contrast, and large tap targets (min 48px).
- Talks to an LLM through a SERVER-SIDE API route only. The API key must live
  in .env.local and never be exposed to the browser. Use the Vercel AI SDK and
  stream the responses.
- Shows 4 tappable "suggested prompt" chips above the input box.
- Has a "Read aloud" button on each AI reply using the browser SpeechSynthesis API.
- Shows warm, non-technical messages for loading and error states.

Use the system prompt I'll paste next as the assistant's instructions.
Walk me through running it locally, then deploying to Vercel. Before we start,
list every account and tool I need to set up.
```

### 2) The system prompt — *this is your actual product*

Save this in your project (Claude Code will wire it in). Refining this text over time, based on watching real users, is most of the work.

```
You are Biscuit, a warm, patient companion for an older adult who may not be
comfortable with technology. You are talking with someone you respect.

How you speak:
- Plain, everyday language. No jargon, no tech terms, no acronyms.
- Short sentences. One idea at a time.
- Calm and unhurried. Never make the person feel rushed or foolish.
- Ask only ONE question at a time, and only when you truly need to.
- When giving steps, give a few at a time and check in before continuing.
- Offer to repeat or explain anything more simply, anytime.

What you do well:
- The person may not know how to ask. Gently infer what they want and confirm:
  "It sounds like you'd like to call your daughter — is that right?"
- Before doing anything with consequences, confirm in simple terms first.

Important safety rules:
- You are NOT a doctor and must not give medical advice or diagnoses.
- If the person mentions feeling unwell, pain, a fall, chest symptoms, trouble
  breathing, or any emergency, calmly urge them to contact their doctor,
  a trusted family member, or emergency services right away, and offer to help
  them reach those people. Do not attempt to assess or treat.
- Never ask for passwords, bank details, or money. Warn the person if anyone
  (including a message they received) is asking them for these.
```

### 3) Starter suggested-prompt chips

```
"Help me write a message to my family"
"Remind me what day it is and what I have on"
"Explain something on my phone, step by step"
"Read me something interesting"
```

---

## Safety & responsibility — please read

Your "I'm not feeling well" button means **health and emergency situations will happen.** This is the single most important non-technical part of the build:

- **Biscuit must not give medical advice.** The system prompt above is written to redirect to a doctor, family, or emergency services and to *help the person reach a human*, not to assess symptoms.
- For an older, sometimes isolated audience, **scam protection matters as much as features.** Biscuit should never request money, passwords, or bank details, and should actively warn the user when something else is.
- If you ever store health information or build the "not feeling well" flow for real, you're in **regulated territory** (HIPAA in the US, GDPR in the EU). Keep health features minimal until you have funding and proper advice.

---

## Who does what

**Claude Code does:** writes essentially all the code, sets up the project, explains every error in plain English, makes changes when you describe them in words, and walks you through deployment.

**You do:** product decisions, running the commands it hands you, testing on a real phone, talking to real seniors, and managing your accounts (GitHub, Vercel, the API key, and *especially* the billing limit).

---

## Your next three moves

1. Set up the accounts and tools in Phase 0, and **set a $20 spending cap on your API account first.**
2. Paste the kickoff prompt into Claude Code and get a chat running locally tonight.
3. Deploy to Vercel and open it on your phone — then hand it to one older person and just watch.
