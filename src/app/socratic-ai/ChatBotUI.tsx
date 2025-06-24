"use client";

import { useChat } from "@ai-sdk/react";

import { Chat } from "@/components/ui/chat";
import { Message } from "@/components/ui/chat-message";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserContext } from "@/context/UserProvider";
import { Conversation } from "@/models/user.model";

export default function ChatBotUI({
  initialInput = "",
  algoName = "",
}: {
  initialInput?: string;
  algoName?: string;
}) {
  const { data: session } = useSession();
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
    initialInput: initialInput,
    initialMessages:
      user?.modules?.find(
        (mod) => mod?.algorithm?.title?.toLowerCase() === algoName.toLowerCase()
      )?.conversation || [],
  });

  // useEffect(() => {
  //   const fetchHistory = async () => {
  //     try {
  //       const response = await fetch(`/api/conversations/getHistory`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           userEmail: userData?.email,
  //           algoName: algoName || "",
  //         }),
  //       });
  //       const data = await response.json();
  //       if (response.status === 200) {
  //         setMessages(data);
  //         return data.length != 0 ? true : false;
  //       } else {
  //         alert(data?.message);
  //         return true;
  //       }
  //     } catch (error) {
  //       console.error("Error fetching history:", error);
  //       return true;
  //     }
  //   };
  // });

  // useEffect(() => {
  //   // save the messages to the database when they change
  //   console.log("Messages: ", messages[messages.length - 1]);
  //   algoName.length > 0 &&
  //     saveMessages({
  //       email: userData?.email || "",
  //       algoName,
  //       message: messages[messages.length - 1] as Conversation,
  //     });
  // }, [messages]);
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
