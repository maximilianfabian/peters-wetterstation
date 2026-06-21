"use client";

import { type UseChatHelpers } from "ai/react";
import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { SUGGESTED_PROMPTS } from "@/lib/suggested-prompts";

/**
 * The conversation screen: a back button to the home screen, the messages,
 * a calm "thinking" note, a warm error state, quick-tap chips, and a big
 * message box. Large text and high contrast throughout.
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

  return (
    <div className="mx-auto flex h-[100dvh] max-w-md flex-col">
      {/* Header with a clear way back */}
      <header className="flex shrink-0 items-center gap-2 border-b border-edge px-3 py-2">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to home"
          className="flex h-12 w-12 items-center justify-center rounded-full text-3xl leading-none text-brand-dark transition active:scale-95"
        >
          ‹
        </button>
        <span className="font-serif text-2xl font-semibold text-brand-dark">Biscuit</span>
      </header>

      {/* Messages */}
      <main className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
        {messages.length === 0 && (
          <p className="px-1 text-xl text-subtitle">
            I&apos;m here and listening. Tell me what you&apos;d like, or tap one
            of the buttons below.
          </p>
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
              className="mt-3 min-h-[48px] rounded-full bg-brand px-5 py-2 text-base font-semibold text-white transition hover:bg-brand-dark active:scale-95"
            >
              Try again
            </button>
          </div>
        )}

        <div ref={endRef} />
      </main>

      {/* Quick chips + message box */}
      <footer className="shrink-0 border-t border-edge px-4 pb-4 pt-3">
        <div className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => append({ role: "user", content: prompt })}
              disabled={isLoading}
              className="min-h-[48px] shrink-0 whitespace-nowrap rounded-full border-2 border-edge bg-surface px-4 py-2 text-base font-semibold text-brand-dark transition active:scale-95 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <label htmlFor="message" className="sr-only">
            Type your message to Biscuit
          </label>
          <input
            id="message"
            value={input}
            onChange={handleInputChange}
            placeholder="Type here…"
            autoComplete="off"
            className="min-h-[58px] flex-1 rounded-full border-2 border-edge bg-surface px-5 py-3 text-xl text-ink placeholder:text-subtitle/70 focus:border-brand"
          />
          <button
            type="submit"
            disabled={isLoading || input.trim().length === 0}
            aria-label="Send"
            className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-talk-gradient text-2xl text-white transition active:scale-95 disabled:opacity-40"
          >
            ➤
          </button>
        </form>
      </footer>
    </div>
  );
}
