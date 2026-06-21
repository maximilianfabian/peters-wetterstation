"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { NameScreen } from "./NameScreen";
import { HomeScreen } from "./HomeScreen";
import { Conversation } from "./Conversation";

const NAME_KEY = "biscuit-name";

/**
 * Holds the screens together: a one-time name question, the welcoming Home
 * screen, and the Conversation. The chat lives only in memory for this session
 * (no login, no database). The name is remembered on this device only.
 */
export function BiscuitApp() {
  const chat = useChat({ api: "/api/chat" });

  // `view` starts as null so the server and browser render the same thing first;
  // we decide the real first screen once we can read the saved name.
  const [view, setView] = useState<null | "name" | "home" | "chat">(null);
  const [name, setName] = useState("");

  const [greeting, setGreeting] = useState("Hello");
  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening",
    );

    // Read the saved name (if any) and pick the first screen.
    let saved = "";
    try {
      saved = window.localStorage.getItem(NAME_KEY) ?? "";
    } catch {
      saved = "";
    }
    if (saved) {
      setName(saved);
      setView("home");
    } else {
      setView("name");
    }
  }, []);

  function saveName(newName: string) {
    setName(newName);
    try {
      window.localStorage.setItem(NAME_KEY, newName);
    } catch {
      // If storage is blocked, we simply won't remember the name — that's fine.
    }
    setView("home");
  }

  function start(prompt?: string) {
    setView("chat");
    if (prompt) chat.append({ role: "user", content: prompt });
  }

  // Before we've read the saved name, show a calm empty screen (no flicker).
  if (view === null) {
    return <div className="h-[100dvh] bg-cream" />;
  }
  if (view === "name") {
    return <NameScreen onSave={saveName} onSkip={() => setView("home")} />;
  }
  if (view === "home") {
    return <HomeScreen greeting={greeting} name={name} onStart={start} />;
  }
  return <Conversation chat={chat} onBack={() => setView("home")} />;
}
