"use client";

import { useChat } from "@ai-sdk/react";

import { Chat } from "@/components/ui/chat";
import { Message } from "@/components/ui/chat-message";
import { useEffect } from "react";

export default function ChatBotUI({
  initialMessage,
}: {
  initialMessage?: string;
}) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    stop,
  } = useChat({ api: "/api/ai/chat", initialInput: initialMessage });
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      handleSubmit();
    }
  });
  return (
    <Chat
      messages={messages as Array<Message>}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isGenerating={isLoading}
      stop={stop}
      append={append}
      suggestions={[
        `What is the Socratic method and how is it used in this AI tool?`,
        `How does Socratic AI help me learn algorithms differently than traditional methods?`,
        `Can you walk me through how to get started with Socratic AI?`,
      ]}
    />
  );
}
