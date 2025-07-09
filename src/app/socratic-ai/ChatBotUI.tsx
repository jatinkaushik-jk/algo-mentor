"use client";

import { useChat } from "@ai-sdk/react";
import { Chat } from "@/components/ui/chat";
import { Message } from "@/components/ui/chat-message";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserProvider";
import { Conversation } from "@/models/user.model";
import { LoaderCircle } from "lucide-react";
import EndChatDialog from "./components/EndChatDialog";

export default function ChatBotUI({ algoName = "" }: { algoName?: string }) {
  const [initMessage, setInitMessage] = useState<Conversation[]>([]);
  const [initInput, setInitInput] = useState<string>("");
  const { user, fetchAlgoMessages } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
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

  function endConversation(){
    console.log("Ending conversation and resetting state");
    // Mark module status as completed
    // Redirect to dashboard for selecting another algorithm
  }
  function continueConversation(){
    console.log("Continuing conversation");
    // append a new message to continue the conversation
  }

  useEffect(() => {
    async function fetchInitialMessages() {
      const data = await fetchAlgoMessages(algoName.toLowerCase());
      // Update initial input only if no history
      setIsLoading(false);
      if (data?.length === 0) {
        setInitInput(algoName); // check whether this is needed
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algoName, user?.modules]);

  useEffect(() => {
    if(messages.length > 0 && messages[messages.length - 1]?.role === "assistant") {
      const lastMessage = messages[messages.length - 1];
      if(lastMessage.content.includes("Do you have any further questions about") && lastMessage.content.includes("would you like to explore another algorithm")){
        // Show dialogue options to end conversation
        setIsEnd(true);
      }
    }
  }, [messages]);

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
        <>
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
        <EndChatDialog isOpen={!isEnd} onClose={() => setIsEnd(true)} endConversation={endConversation} continueConversation={continueConversation} /> {/* Later setIsEnd(false) isOpen={isEnd} */}
        </>
      )}
    </>
  );
}
