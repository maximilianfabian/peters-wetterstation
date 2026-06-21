"use client";

/**
 * The welcoming home screen: a big serif greeting, the large round "talk"
 * button, three chunky action tiles, and a suggestion pill. The whole point
 * is that the person never faces a blank box — there's always something
 * friendly to tap.
 */

// The three action tiles. Each sends a starter message when tapped.
// "I'm not feeling well" is handled safely by Biscuit's system prompt: it never
// assesses symptoms, it offers to reach a doctor, family, or emergency services.
const TILES = [
  { label: "Call family", icon: "📞", prompt: "I'd like to call my family.", cls: "bg-green-soft border-green-line text-green-deep" },
  { label: "Get help", icon: "❓", prompt: "I'd like some help, please.", cls: "bg-amber-soft border-amber-line text-amber-deep" },
  { label: "I'm not feeling well", icon: "❤️", prompt: "I'm not feeling well.", cls: "bg-coral-soft border-coral-line text-coral-deep" },
];

function Face() {
  // A simple friendly face drawn on the round button.
  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28" fill="none" aria-hidden="true">
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
    <div className="mx-auto flex h-[100dvh] max-w-md flex-col overflow-y-auto px-5 pb-6 pt-4">
      {/* Greeting */}
      <div className="text-center">
        <p className="font-serif text-[34px] font-semibold leading-tight text-ink">
          {greeting},
        </p>
        <p className="font-serif text-[40px] font-bold leading-tight text-brand-dark">
          I&apos;m here 👋
        </p>
        <p className="mt-3 text-xl text-subtitle">How can I help you today?</p>
      </div>

      {/* The big round talk button — the hero affordance */}
      <div className="my-7 flex flex-col items-center">
        <button
          type="button"
          onClick={() => onStart()}
          aria-label="Start talking with Biscuit"
          className="flex h-52 w-52 items-center justify-center rounded-full bg-talk-gradient shadow-talk transition active:scale-95"
        >
          <Face />
        </button>
        <p className="mt-4 text-2xl font-bold text-brand-dark">Tap to talk</p>
        <p className="text-lg text-subtitle">I&apos;m here when you are</p>
      </div>

      {/* Three action tiles */}
      <div className="grid grid-cols-3 gap-3">
        {TILES.map((tile) => (
          <button
            key={tile.label}
            type="button"
            onClick={() => onStart(tile.prompt)}
            className={`flex min-h-[118px] flex-col items-center justify-center gap-2 rounded-3xl border-2 px-2 py-4 text-center transition active:scale-95 ${tile.cls}`}
          >
            <span className="text-3xl leading-none" aria-hidden="true">{tile.icon}</span>
            <span className="text-[17px] font-semibold leading-tight">{tile.label}</span>
          </button>
        ))}
      </div>

      {/* Suggestion pill */}
      <button
        type="button"
        onClick={() => onStart("Remind me to take my pills at 8am.")}
        className="mt-4 flex min-h-[62px] w-full items-center gap-3 rounded-full border-2 border-edge bg-surface px-6 py-3 text-left text-lg font-medium text-ink transition active:scale-[0.99]"
      >
        <span aria-hidden="true">🕐</span>
        <span>Remind me to take my pills at 8am</span>
        <span className="ml-auto text-2xl text-subtitle" aria-hidden="true">›</span>
      </button>
    </div>
  );
}
