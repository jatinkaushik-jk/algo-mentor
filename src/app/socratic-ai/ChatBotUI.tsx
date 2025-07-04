"use client";

import { useChat } from "@ai-sdk/react";
import { Chat } from "@/components/ui/chat";
import { Message } from "@/components/ui/chat-message";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserProvider";
import { Conversation } from "@/models/user.model";
import { LoaderCircle } from "lucide-react";

export default function ChatBotUI({ algoName = "" }: { algoName?: string }) {
  const [initMessage, setInitMessage] = useState<Conversation[]>([]);
  const [initInput, setInitInput] = useState<string>("");
  const { user, fetchAlgoMessages } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    // isLoading,
    stop,
  } = useChat({
    api: "/api/ai/chat",
    initialInput: initInput,
    initialMessages: initMessage.length > 0 ? initMessage : [],
  });

  useEffect(() => {
    async function fetchInitialMessages() {
      const data = await fetchAlgoMessages(algoName.toLowerCase());
      // Update initial input only if no history
      setIsLoading(false);
      if (data?.length === 0) {
        setInitInput(algoName);
        console.log("Setting initial input:", algoName);
        append({
          role: "user",
          content: algoName,
          createdAt: new Date(),
          id: crypto.randomUUID(),
        });
      } else {
        setInitMessage(
          data?.map((msg) => ({
            role: msg.role,
            content: msg.content,
            id: msg.id,
            createdAt: new Date(msg.createdAt || ""),
          })) || []
        );
      }
    }

    if (user?.modules) fetchInitialMessages();
  }, [algoName, user?.modules]);

  useEffect(() => {
    // fetchHistory();
    if (initMessage.length === 0 && initInput.length > 0) {
      // handleSubmit();
      console.log("Initial input set, submitting...", initInput);
    }
  }, [initInput, initMessage]);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full grid place-content-center text-center">
          <LoaderCircle className="animate-spin mx-auto mb-4" />
          Loading Socratic AI...
          <p className="text-muted-foreground text-sm">
            This may take a few seconds, please wait...
          </p>
        </div>
      ) : (
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
      )}
    </>
  );
}
