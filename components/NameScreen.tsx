"use client";

import { useState } from "react";

/**
 * A gentle one-time question on first use: "What may I call you?"
 *
 * The name is kept only on this device (in the browser) so Biscuit can greet
 * the person warmly. It is NOT a login and NOT a database — and it can be
 * skipped. Everything here is big, clearly labelled, and easy to skip.
 */
export function NameScreen({
  onSave,
  onSkip,
}: {
  onSave: (name: string) => void;
  onSkip: () => void;
}) {
  const [value, setValue] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const name = value.trim();
    if (name) onSave(name);
    else onSkip();
  }

  return (
    <div className="mx-auto flex h-[100dvh] max-w-[480px] flex-col justify-center overflow-x-hidden px-6">
      <p className="font-serif text-[40px] font-bold leading-tight text-brand-dark">
        Hello 👋
      </p>
      <p className="mt-3 text-2xl text-ink">What may I call you?</p>
      <p className="mt-2 text-lg text-subtitle">
        Just your first name is lovely. You can skip this if you&apos;d rather.
      </p>

      <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
        <label htmlFor="name" className="sr-only">
          Your first name
        </label>
        <input
          id="name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your name…"
          autoComplete="given-name"
          className="min-h-[64px] w-full rounded-2xl border-2 border-edge bg-surface px-5 text-2xl text-ink placeholder:text-subtitle/70 focus:border-brand"
        />
        <button
          type="submit"
          className="min-h-[64px] w-full rounded-2xl bg-talk-gradient px-6 text-2xl font-semibold text-white transition active:scale-[0.99]"
        >
          That&apos;s me
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="min-h-[48px] text-lg font-semibold text-brand-dark underline-offset-4 hover:underline"
        >
          Skip for now
        </button>
      </form>
    </div>
  );
}
