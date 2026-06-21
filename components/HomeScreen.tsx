"use client";

/**
 * The welcoming home screen. Everything is a BIG, full-width, clearly-labelled
 * button — no tiny tiles, no horizontal scrolling, nothing hidden. Research on
 * older adults shows off-screen and icon-only controls go undiscovered, so each
 * action here is a large stacked button with an icon AND words.
 */

// The action buttons. Each sends a starter message when tapped.
// "I'm not feeling well" is handled safely by Biscuit's system prompt: it never
// assesses symptoms — it offers to reach a doctor, family, or emergency services.
const ACTIONS = [
  { label: "Call my family", icon: "📞", prompt: "I'd like to call my family.", cls: "bg-green-soft border-green-line text-green-deep" },
  { label: "I need some help", icon: "❓", prompt: "I'd like some help, please.", cls: "bg-amber-soft border-amber-line text-amber-deep" },
  { label: "I'm not feeling well", icon: "❤️", prompt: "I'm not feeling well.", cls: "bg-coral-soft border-coral-line text-coral-deep" },
  { label: "Remind me about my pills", icon: "🕐", prompt: "Remind me to take my pills at 8am.", cls: "bg-surface border-edge text-ink" },
];

function Face() {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24" fill="none" aria-hidden="true">
      <circle cx="44" cy="50" r="8" fill="#fff" />
      <circle cx="76" cy="50" r="8" fill="#fff" />
      <path d="M42 76 Q60 90 78 76" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function HomeScreen({
  greeting,
  onStart,
}: {
  greeting: string;
  onStart: (prompt?: string) => void;
}) {
  return (
    <div className="mx-auto flex h-[100dvh] max-w-[480px] flex-col overflow-y-auto overflow-x-hidden px-5 pb-8 pt-5">
      {/* Greeting */}
      <div className="text-center">
        <p className="font-serif text-[32px] font-semibold leading-tight text-ink">
          {greeting},
        </p>
        <p className="font-serif text-[40px] font-bold leading-tight text-brand-dark">
          I&apos;m here 👋
        </p>
      </div>

      {/* The big round button — the main way in */}
      <div className="mt-5 flex flex-col items-center">
        <button
          type="button"
          onClick={() => onStart()}
          aria-label="Tap to start chatting with Biscuit"
          className="flex h-44 w-44 items-center justify-center rounded-full bg-talk-gradient shadow-talk transition active:scale-95"
        >
          <Face />
        </button>
        <p className="mt-4 text-2xl font-bold text-brand-dark">Tap to start</p>
        <p className="text-lg text-subtitle">I&apos;ll chat with you here</p>
      </div>

      {/* Big, fully-visible action buttons — one clear tap each, no scrolling */}
      <div className="mt-6 flex flex-col gap-3">
        {ACTIONS.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={() => onStart(a.prompt)}
            className={`flex min-h-[68px] w-full items-center gap-4 rounded-2xl border-2 px-5 py-3 text-left transition active:scale-[0.99] ${a.cls}`}
          >
            <span className="shrink-0 text-3xl leading-none" aria-hidden="true">{a.icon}</span>
            <span className="text-xl font-semibold leading-snug">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
