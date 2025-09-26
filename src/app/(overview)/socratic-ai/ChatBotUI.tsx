"use client";
import { useChat } from "@ai-sdk/react";
import { Chat } from "@/components/ui/chat";
import { Message } from "@/components/ui/chat-message";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserProvider";
import { IAlgorithm, IConversation } from "@/interfaces/algorithms.interface";
import { LoaderCircle } from "lucide-react";
import EndChatDialog from "./components/EndChatDialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ChatBotUI({ algorithm }: { algorithm: IAlgorithm }) {
  const [initMessage, setInitMessage] = useState<IConversation[]>([]);
  const [initInput, setInitInput] = useState<string>("");
  const { user, fetchAlgoMessages, markModuleStatus } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isModuleCompleted, setIsModuleCompleted] = useState<boolean>(false);
  const router = useRouter();
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

  function endConversation() {
    // Mark module status as completed
    markModuleStatus(algorithm.algoID, "COMPLETED").then(
      (res) =>
        res &&
        toast("Module Completed", {
          description: "You can still interact with AI for this module!",
        })
    );
    // Redirect to dashboard for selecting another algorithm
    router.push("/dashboard");
  }
  function continueConversation() {
    console.log("Continuing conversation");
    // append a new message to continue the conversation
    append({
      role: "user",
      content: "Continue with this algorithm",
      createdAt: new Date(),
      id: crypto.randomUUID(),
    });
  }

  // Fetch initial messages for the algorithm
  useEffect(() => {
    async function fetchInitialMessages() {
      const data = await fetchAlgoMessages(algorithm.algoID);
      // Update initial input only if no history
      setIsLoading(false);
      if (data?.length === 0) {
        setInitInput(algorithm.title); // check whether this is needed
        append({
          role: "user",
          content: algorithm.title,
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
  }, [algorithm, user?.modules]);

  // Check if the user has already completed this module
  useEffect(() => {
    if (user?.modules) {
      // Check if the user has completed this module
      const algoModule = user.modules.find(
        (mod) => mod.algorithm?.algoID === algorithm.algoID
      );
      if (algoModule?.state === "COMPLETED") {
        toast("Module already completed", {
          description: "You can still interact with AI for this module!",
        });
        setIsModuleCompleted(true);
      }
    }
  }, [user?.modules, algorithm]);

  // Trigger End Chat Dialog when the last message from AI is a prompt to end conversation
  useEffect(() => {
    if (
      !isModuleCompleted &&
      messages.length > 0 &&
      messages[messages.length - 1]?.role === "assistant"
    ) {
      const lastMessage = messages[messages.length - 1];
      if (
        lastMessage.content.includes(
          "Do you have any further questions about"
        ) &&
        lastMessage.content.includes(
          "would you like to explore another algorithm"
        )
      ) {
        // Show dialogue options to end conversation
        setIsEnd(true);
      }
    }
  }, [messages, isModuleCompleted]);

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
          <EndChatDialog
            isOpen={isEnd}
            onClose={() => setIsEnd(false)}
            endConversation={endConversation}
            continueConversation={continueConversation}
          />{" "}
        </>
      )}
    </>
  );
}
