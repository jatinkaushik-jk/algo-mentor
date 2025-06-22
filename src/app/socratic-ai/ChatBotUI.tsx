"use client";

import { useChat } from "@ai-sdk/react";

import { Chat } from "@/components/ui/chat";
import { Message } from "@/components/ui/chat-message";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ChatBotUI({
  initialInput,
  algoName,
}: {
  initialInput?: string;
  algoName?: string;
}) {
  const { data: session } = useSession();
  const userData = session?.user;
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    setMessages,
    isLoading,
    stop,
  } = useChat({
    api: "/api/ai/chat",
    initialInput: initialInput,
    initialMessages: [],
  });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/conversations/getHistory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: userData?.email,
            algoName: algoName || "",
          }),
        });
        const data = await response.json();
        if (response.status === 200) {
          setMessages(data);
          return data.length != 0 ? true : false;
        } else {
          alert(data?.message);
          return true;
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        return true;
      }
    };
  });
  useEffect(() => {
    if (initialInput && messages.length === 0) {
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
