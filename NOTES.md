# Biscuit — Notes & ideas for later

A running list of things we deliberately deferred, so they aren't forgotten.
Nothing here is built yet.

## Phase 2 — Memory (remembering the person between visits)

Goal: Biscuit greets and responds with continuity ("Last time we wrote to your
daughter Sarah…"), instead of forgetting everything each session. This is a
**Phase 2** feature — Phase 1 keeps the conversation in memory for the session
only (no database, no login).

Options to compare when we get there:

- **Supabase** (the brief's suggested path): simple magic-link/phone login +
  store conversation history. TypeScript-native, one managed service, generous
  free tier. Lowest operational burden — good default for a solo, non-developer.
- **memanto** (https://github.com/moorcheh-ai/memanto): a dedicated agent
  memory layer (remember / recall / answer), MIT-licensed. Python service, runs
  via Docker locally (on-prem) or against their cloud API. Powerful, but it's a
  **second service in a different language**, which adds operational and
  deployment complexity to our Next.js app. Considered but **not installed**
  (would break Phase 1's "single project, minimal dependencies" rule).
- A **TypeScript-native** approach (e.g. storing summaries/embeddings directly
  in Supabase/Postgres) — keeps everything in one stack.

### Decision criteria
1. **Privacy first.** Memory of an older person's chats is sensitive. Prefer
   storing as little as possible; avoid sending personal conversations to a
   third-party cloud unless we've done the GDPR/HIPAA-adjacent homework. If we
   use memanto, the **local/on-prem mode** is the one to consider.
2. **Simplicity** — the founder operates this; fewer moving parts wins.
3. **Cost** at small scale.
4. **One stack** if possible (TypeScript), to keep it maintainable.

Recommendation today: when Phase 2 starts, default to **Supabase** for login +
saved history; only reach for a dedicated memory engine if Supabase proves
insufficient.
