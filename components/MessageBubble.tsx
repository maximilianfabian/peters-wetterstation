"use client";

import { ReadAloudButton } from "./ReadAloudButton";

/**
 * One message. The person's own words sit on the right in teal;
 * Biscuit's replies sit on the left in white and can be read aloud.
 */
export function MessageBubble({
  role,
  content,
}: {
  role: "user" | "assistant" | "system" | "data";
  content: string;
}) {
  const isUser = role === "user";

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div className={isUser ? "max-w-[86%]" : "max-w-[92%]"}>
        <div
          className={
            isUser
              ? "rounded-3xl rounded-br-md bg-brand px-5 py-3 text-xl text-white"
              : "rounded-3xl rounded-bl-md border border-edge bg-surface px-5 py-4 text-xl text-ink"
          }
        >
          <p className="whitespace-pre-wrap">{content}</p>
        </div>

        {!isUser && content.trim().length > 0 && <ReadAloudButton text={content} />}
      </div>
    </div>
  );
}
