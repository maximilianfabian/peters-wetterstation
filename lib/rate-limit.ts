/**
 * A very small, in-memory usage guard so a bug or a bad actor can't run up the
 * LLM bill. This is intentionally simple for Phase 1.
 *
 * NOTE: This lives in server memory, so it resets when the server restarts and
 * is not shared across multiple server instances. It is a sensible first line
 * of defence, NOT a complete solution. The real spending cap must be set in
 * your LLM provider's billing dashboard.
 */

// How many requests one visitor may make within the time window.
const MAX_REQUESTS_PER_WINDOW = 20;
// The length of the window, in milliseconds (here: 1 minute).
const WINDOW_MS = 60 * 1000;

// Remember recent request timestamps for each visitor (keyed by their IP).
const hits = new Map<string, number[]>();

/**
 * Returns true if this visitor is still within their allowance, false if they
 * have made too many requests too quickly.
 */
export function allowRequest(visitorKey: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  // Keep only the timestamps that fall inside the current window.
  const recent = (hits.get(visitorKey) ?? []).filter((t) => t > windowStart);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(visitorKey, recent);
    return false;
  }

  recent.push(now);
  hits.set(visitorKey, recent);
  return true;
}

// The longest single message we will accept, in characters. This stops a huge
// paste from turning into a huge (expensive) request.
export const MAX_MESSAGE_LENGTH = 2000;

// The most messages we will keep in one conversation before we stop accepting
// more. Keeps any single session from growing without bound.
export const MAX_MESSAGES_PER_CONVERSATION = 60;
