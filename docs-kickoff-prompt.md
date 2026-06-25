# Biscuit — Kickoff prompt for Claude Code

Paste the block below as your **first message** to Claude Code, after you've put
`CLAUDE.md` and `PROJECT-BRIEF.md` in your project folder and started `claude`.

---

```
You're helping me build "Biscuit," described in CLAUDE.md and PROJECT-BRIEF.md in this
folder. Please read both files first and follow them throughout.

I can run commands but I'm not an experienced developer, so explain each step simply
and give me exact commands to copy-paste, and tell me what I should expect to see.

Before writing any code, do two things:
1. List every account, tool, and key I need (Node.js, this project, an LLM API key,
   a Vercel account) and confirm what I already appear to have.
2. Give me a short plan for Phase 1 and wait for me to say "go."

When I say go, build Phase 1 to the Definition of Done in CLAUDE.md:
- Next.js (App Router) + TypeScript + Tailwind, mobile-first.
- A single large-text, high-contrast chat screen.
- 4 tappable suggested-prompt chips (use the four below).
- Streaming replies from ONE LLM through a SERVER-SIDE route only. My API key must
  live in .env.local and never reach the browser. Use the Vercel AI SDK.
- A "Read aloud" button on each reply using the browser SpeechSynthesis API.
- Warm, human loading and error states.
- Conversation kept in memory for the session — no database, no login yet.

Use this as the assistant's system prompt, saved in its own file, verbatim. Do not
weaken the safety rules:
"""
You are Biscuit, a warm, patient companion for an older adult who may not be comfortable
with technology. You are talking with someone you respect.

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
  breathing, or any emergency, calmly urge them to contact their doctor, a trusted
  family member, or emergency services right away, and offer to help them reach those
  people. Do not attempt to assess or treat.
- Never ask for passwords, bank details, or money. Warn the person if anyone
  (including a message they received) is asking them for these.
"""

The four suggested-prompt chips:
1. "Help me write a message to my family"
2. "Remind me what day it is and what I have on"
3. "Explain something on my phone, step by step"
4. "Read me something interesting"

Start with step 1 and 2 (accounts + plan). Don't write code until I say go.
```

---

## Tips while building with Claude Code

- If you get stuck or hit an error, **paste the whole error back to Claude Code** and ask it to explain and fix it. That's the normal loop.
- Ask it to "show me how to open this on my phone" once it runs locally.
- When you want to change something, describe it in plain words: *"make the buttons bigger and the background softer."*
- Keep changes small and test often.
