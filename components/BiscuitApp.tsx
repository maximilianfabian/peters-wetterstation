"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { HomeScreen } from "./HomeScreen";
import { Conversation } from "./Conversation";

/**
 * Holds the two screens together: the welcoming Home screen and the
 * Conversation. The chat itself lives only in memory for this session
 * (no login, no database yet).
 */
export function BiscuitApp() {
  const chat = useChat({ api: "/api/chat" });
  const [view, setView] = useState<"home" | "chat">("home");

  // A warm, time-of-day greeting. Set after load so the server and browser
  // never disagree about the time.
  const [greeting, setGreeting] = useState("Hello");
  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening",
    );
  }, []);

  // Move to the conversation. If a starter was tapped, send it straight away.
  function start(prompt?: string) {
    setView("chat");
    if (prompt) chat.append({ role: "user", content: prompt });
  }

  if (view === "home") {
    return <HomeScreen greeting={greeting} onStart={start} />;
  }
  return <Conversation chat={chat} onBack={() => setView("home")} />;
}
