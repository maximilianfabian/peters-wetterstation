"use client";

import { SUGGESTED_PROMPTS } from "@/lib/suggested-prompts";

/**
 * The tappable suggested-prompt chips. This is Biscuit's core feature: the person
 * never faces an empty box — they can simply tap a friendly starter.
 *
 * - "grid" is the big, welcoming 2x2 layout shown before the chat begins.
 * - "row"  is a compact, scrollable strip kept just above the message box once
 *          the conversation is underway, so a starter is always within reach.
 */
export function PromptChips({
  variant,
  onPick,
  disabled,
}: {
  variant: "grid" | "row";
  onPick: (prompt: string) => void;
  disabled?: boolean;
}) {
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPick(prompt)}
            disabled={disabled}
            className="min-h-[64px] rounded-2xl border-2 border-brand/30 bg-white px-5 py-4 text-left text-lg font-medium text-ink shadow-sm transition active:scale-[0.99] hover:border-brand hover:bg-brand-soft disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {SUGGESTED_PROMPTS.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onPick(prompt)}
          disabled={disabled}
          className="min-h-[48px] shrink-0 whitespace-nowrap rounded-full border-2 border-brand/30 bg-white px-4 py-2 text-base font-medium text-brand-dark shadow-sm transition active:scale-[0.99] hover:border-brand hover:bg-brand-soft disabled:opacity-50"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
