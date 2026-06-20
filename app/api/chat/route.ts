import { anthropic } from "@ai-sdk/anthropic";
import { streamText, type CoreMessage } from "ai";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";
import {
  allowRequest,
  MAX_MESSAGE_LENGTH,
  MAX_MESSAGES_PER_CONVERSATION,
} from "@/lib/rate-limit";

// The model Biscuit uses. It is cheap, fast, and warm enough for everyday chat.
// To switch providers later (e.g. to OpenAI), you change this line and the
// import above — nothing in the browser needs to know.
const MODEL = "claude-haiku-4-5-20251001";

// Allow replies to stream for up to 30 seconds before timing out.
export const maxDuration = 30;

/**
 * This route runs ONLY on the server. The API key (read from the environment
 * by the Anthropic provider) never reaches the browser. The browser only ever
 * talks to this route, never directly to the LLM.
 */
export async function POST(req: Request) {
  // Make sure the secret key is actually configured before we try to use it.
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The assistant isn't set up yet. Please add your API key." },
      { status: 500 },
    );
  }

  // A simple per-visitor rate limit, so usage can't spiral.
  const visitorKey =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  if (!allowRequest(visitorKey)) {
    return Response.json(
      { error: "You're going a little fast for me. Please wait a moment, then try again." },
      { status: 429 },
    );
  }

  let messages: CoreMessage[];
  try {
    const body = await req.json();
    messages = body.messages;
  } catch {
    return Response.json({ error: "I couldn't read that message." }, { status: 400 });
  }

  // Basic shape and size checks to keep requests small and well-formed.
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "There was nothing to send." }, { status: 400 });
  }
  if (messages.length > MAX_MESSAGES_PER_CONVERSATION) {
    return Response.json(
      { error: "This conversation has grown quite long. Please start a fresh one." },
      { status: 400 },
    );
  }
  const lastMessage = messages[messages.length - 1];
  if (typeof lastMessage?.content === "string" && lastMessage.content.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { error: "That message is a little too long for me. Could you shorten it?" },
      { status: 400 },
    );
  }

  // Ask the model for a streaming reply, with Biscuit's system prompt in charge.
  const result = streamText({
    model: anthropic(MODEL),
    system: SYSTEM_PROMPT,
    messages,
  });

  // Stream the reply back to the browser so the screen feels alive.
  return result.toDataStreamResponse();
}
