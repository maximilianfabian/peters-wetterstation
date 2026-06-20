"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { PromptChips } from "./PromptChips";
import { MessageBubble } from "./MessageBubble";

/**
 * The whole app: one calm, large-text chat screen.
 *
 * The conversation lives only in memory for this session — there is no login
 * and no database yet (that comes in a later phase).
 */
export function ChatScreen() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    error,
    reload,
  } = useChat({ api: "/api/chat" });

  // A warm, time-of-day greeting. We set it after the page loads so the server
  // and browser never disagree about the time.
  const [greeting, setGreeting] = useState("Hello");
  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening",
    );
  }, []);

  // Gently keep the newest message in view.
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const hasMessages = messages.length > 0;
  const lastRole = messages[messages.length - 1]?.role;
  // Show a calm "thinking" note only before Biscuit's reply starts arriving.
  const showThinking = isLoading && lastRole !== "assistant";

  // Tapping a suggested chip sends it straight away.
  function sendPrompt(prompt: string) {
    append({ role: "user", content: prompt });
  }

  return (
    <div className="mx-auto flex h-[100dvh] max-w-2xl flex-col">
      {/* Header */}
      <header className="shrink-0 border-b border-brand/15 bg-cream/90 px-4 py-3 backdrop-blur">
        <h1 className="text-xl font-bold text-brand-dark">Biscuit</h1>
        <p className="text-base text-ink/70">Your patient companion</p>
      </header>

      {/* Conversation */}
      <main
        className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
        aria-live="polite"
      >
        {!hasMessages && (
          <div className="space-y-6 pt-2">
            <div>
              <p className="text-2xl font-bold text-ink">{greeting} 👋</p>
              <p className="mt-2 text-lg text-ink/80">
                I&apos;m here to help with everyday things. Tap one of these to
                begin, or type a message below — whatever feels easiest.
              </p>
            </div>
            <PromptChips
              variant="grid"
              onPick={sendPrompt}
              disabled={isLoading}
            />
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

        {showThinking && (
          <div className="flex justify-start">
            <div className="rounded-3xl rounded-bl-md bg-white px-5 py-4 text-lg text-ink/60 shadow-sm">
              Biscuit is thinking…
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 px-5 py-4">
            <p className="text-lg text-ink">
              I had a little trouble just then. Let&apos;s try that again.
            </p>
            <button
              type="button"
              onClick={() => reload()}
              className="mt-3 min-h-[48px] rounded-full bg-brand px-5 py-2 text-base font-medium text-white transition hover:bg-brand-dark active:scale-[0.99]"
            >
              Try again
            </button>
          </div>
        )}

        <div ref={endRef} />
      </main>

      {/* Message box */}
      <footer className="shrink-0 border-t border-brand/15 bg-cream/90 px-4 pb-4 pt-3 backdrop-blur">
        {hasMessages && (
          <div className="mb-3">
            <PromptChips variant="row" onPick={sendPrompt} disabled={isLoading} />
          </div>
        )}

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
            className="min-h-[56px] flex-1 rounded-2xl border-2 border-brand/30 bg-white px-5 py-3 text-lg text-ink placeholder:text-ink/40 focus:border-brand"
          />
          <button
            type="submit"
            disabled={isLoading || input.trim().length === 0}
            className="min-h-[56px] rounded-2xl bg-brand px-6 py-3 text-lg font-semibold text-white transition hover:bg-brand-dark active:scale-[0.99] disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
