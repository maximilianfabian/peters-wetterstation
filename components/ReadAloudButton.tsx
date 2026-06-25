"use client";

import { useEffect, useState } from "react";

/**
 * A "Read aloud" button that speaks a reply using the browser's built-in voice
 * (the free SpeechSynthesis API). Tapping it again stops the speaking.
 */
export function ReadAloudButton({ text }: { text: string }) {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

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
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
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
      className="mt-2 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-base font-semibold text-brand-dark transition active:scale-95"
    >
      <span aria-hidden="true" className="text-xl">
        {speaking ? "⏹" : "🔊"}
      </span>
      {speaking ? "Stop reading" : "Read aloud"}
    </button>
  );
}
