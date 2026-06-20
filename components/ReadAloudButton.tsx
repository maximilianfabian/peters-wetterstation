"use client";

import { useEffect, useState } from "react";

/**
 * A "Read aloud" button that speaks a reply using the browser's built-in voice
 * (the free SpeechSynthesis API). Tapping it again stops the speaking.
 *
 * This is a big win for this audience: replies can be heard, not just read.
 */
export function ReadAloudButton({ text }: { text: string }) {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);

  // Check once, in the browser, whether speaking is available.
  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  // If this component goes away mid-sentence, stop any speaking.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!supported) return null;

  function toggle() {
    const synth = window.speechSynthesis;

    // If we're already speaking, a second tap stops it.
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    // Stop anything else first, then read this reply at a calm, clear pace.
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(utterance);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={speaking}
      className="mt-2 inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-brand/40 bg-white px-4 py-2 text-base font-medium text-brand-dark transition hover:bg-brand-soft active:scale-[0.99]"
    >
      <span aria-hidden="true" className="text-xl">
        {speaking ? "⏹" : "🔊"}
      </span>
      {speaking ? "Stop reading" : "Read aloud"}
    </button>
  );
}
