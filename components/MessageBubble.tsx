"use client";

import { ReadAloudButton } from "./ReadAloudButton";

/**
 * One message in the conversation. The person's own words sit on the right;
 * Biscuit's replies sit on the left and can be read aloud.
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
      <div className={isUser ? "max-w-[85%]" : "max-w-[92%]"}>
        <div
          className={
            isUser
              ? "rounded-3xl rounded-br-md bg-brand px-5 py-3 text-lg text-white"
              : "rounded-3xl rounded-bl-md bg-white px-5 py-4 text-lg text-ink shadow-sm"
          }
        >
          {/* Preserve the line breaks Biscuit writes, for easy reading. */}
          <p className="whitespace-pre-wrap">{content}</p>
        </div>

        {/* Only Biscuit's replies get a Read aloud button. */}
        {!isUser && content.trim().length > 0 && <ReadAloudButton text={content} />}
      </div>
    </div>
  );
}
