"use client";

import { type UseChatHelpers } from "ai/react";
import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { SUGGESTED_PROMPTS } from "@/lib/suggested-prompts";

/**
 * The conversation screen. Designed to the senior-UX rules from our research:
 * a "Back" button WITH the word, a "Send" button WITH the word, big text, and
 * suggestion buttons shown as a VERTICAL stack (never a horizontal scroll, so
 * nothing is hidden off the edge of the screen).
 */
export function Conversation({
  chat,
  onBack,
}: {
  chat: UseChatHelpers;
  onBack: () => void;
}) {
  const { messages, input, handleInputChange, handleSubmit, append, isLoading, error, reload } = chat;

  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const lastRole = messages[messages.length - 1]?.role;
  const showThinking = isLoading && lastRole !== "assistant";
  const isEmpty = messages.length === 0;

  return (
    <div className="mx-auto flex h-[100dvh] max-w-[480px] flex-col overflow-x-hidden">
      {/* Header with a clearly-labelled way back */}
      <header className="flex shrink-0 items-center justify-between border-b border-edge px-3 py-2">
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-[48px] items-center gap-1 rounded-full px-3 text-lg font-semibold text-brand-dark transition active:scale-95"
        >
          <span aria-hidden="true" className="text-3xl leading-none">‹</span> Back
        </button>
        <span className="font-serif text-2xl font-semibold text-brand-dark">Biscuit</span>
        <span className="w-[72px]" aria-hidden="true" />
      </header>

      {/* Messages */}
      <main className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
        {isEmpty && (
          <p className="px-1 text-xl text-subtitle">
            I&apos;m here and ready. Tell me what you&apos;d like, or tap one of
            these to begin:
          </p>
        )}

        {/* Suggestions as a vertical stack of big buttons — only before the chat
            starts, so nothing is hidden and the screen stays uncluttered. */}
        {isEmpty && (
          <div className="flex flex-col gap-3 pt-1">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => append({ role: "user", content: prompt })}
                className="min-h-[60px] w-full rounded-2xl border-2 border-edge bg-surface px-5 py-3 text-left text-lg font-semibold text-brand-dark transition active:scale-[0.99]"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} role={message.role} content={message.content} />
        ))}

        {showThinking && (
          <div className="flex justify-start">
            <div className="rounded-3xl rounded-bl-md border border-edge bg-surface px-5 py-4 text-lg text-subtitle">
              Biscuit is thinking…
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border-2 border-amber-line bg-amber-soft px-5 py-4">
            <p className="text-lg text-ink">
              I had a little trouble just then. Let&apos;s try that again.
            </p>
            <button
              type="button"
              onClick={() => reload()}
              className="mt-3 min-h-[52px] rounded-2xl bg-brand px-6 py-2 text-lg font-semibold text-white transition hover:bg-brand-dark active:scale-95"
            >
              Try again
            </button>
          </div>
        )}

        <div ref={endRef} />
      </main>

      {/* Message box — big input and a Send button that says "Send" */}
      <footer className="shrink-0 border-t border-edge px-4 pb-4 pt-3">
        <form onSubmit={handleSubmit} className="flex items-stretch gap-2">
          <label htmlFor="message" className="sr-only">
            Type your message to Biscuit
          </label>
          <input
            id="message"
            value={input}
            onChange={handleInputChange}
            placeholder="Type here…"
            autoComplete="off"
            className="min-h-[60px] w-0 min-w-0 flex-1 rounded-2xl border-2 border-edge bg-surface px-5 text-xl text-ink placeholder:text-subtitle/70 focus:border-brand"
          />
          <button
            type="submit"
            disabled={isLoading || input.trim().length === 0}
            className="flex min-h-[60px] min-w-[104px] items-center justify-center gap-2 rounded-2xl bg-talk-gradient px-5 text-xl font-semibold text-white transition active:scale-95 disabled:opacity-40"
          >
            Send <span aria-hidden="true">➤</span>
          </button>
        </form>
      </footer>
    </div>
  );
}
