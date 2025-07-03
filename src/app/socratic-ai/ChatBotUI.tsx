"use client";

import { useChat } from "@ai-sdk/react";

import { Chat } from "@/components/ui/chat";
import { Message } from "@/components/ui/chat-message";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUserContext } from "@/context/UserProvider";
import { Conversation } from "@/models/user.model";

export default function ChatBotUI({ algoName = "" }: { algoName?: string }) {
  const { data: session } = useSession();
  const [initMessage, setInitMessage] = useState<Conversation[]>([]);
  const [initInput, setInitInput] = useState<string>("");
  const userData = session?.user;
  const { user } = useUserContext();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    stop,
  } = useChat({
    api: "/api/ai/chat",
    initialInput: initInput,
    initialMessages: initMessage.length > 0 ? initMessage : [],
  });

  useEffect(() => {
    async function fetchInitialMessages() {
      const res =
        user?.modules?.find(
          (mod) =>
            mod?.algorithm?.title?.toLowerCase() === algoName.toLowerCase()
        )?.conversation || [];
      console.log("sjdfhjkah adata: ", res);
      setInitMessage([
        ...res.map((msg) => ({
          role: msg.role,
          content: msg.content,
          id: msg.id,
          createdAt: new Date(msg.createdAt || ""),
        })),
      ]);
      setInitInput(res.length > 0 ? "" : algoName);
    }

    fetchInitialMessages();
  }, [algoName, user?.modules]);

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
            algoName: algoName,
          }),
        });
        const data = await response.json();
        if (response.status === 200) {
          console.log("Fetched history:", data);
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
    // fetchHistory();
    if (initMessage.length === 0 && initInput.length > 0) {
      // handleSubmit();
      console.log("Initial input set, submitting...", initInput);
    }
  }, [initInput, initMessage]);

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
