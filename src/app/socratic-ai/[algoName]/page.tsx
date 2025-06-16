"use client";
import React, { useEffect, useRef, useState } from "react";
import SidebarNavigations from "@/components/ui/sidebarNavigations";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Header from "@/components/ui/header";
import { DialogUpdate } from "../DialogUpdate";
import { aiReply } from "@/app/api/ai/genai";
import AlgoNav from "../components/AlgoNav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { marked } from "marked";

export default function SocraticAI({
  params,
}: {
  params: { algoName: string };
}) {
  const chatInput = useRef<HTMLTextAreaElement>(null);
  const chatDisplay = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const userData = session?.user;
  const algoName = params.algoName.toLowerCase().replace("-", " ");

  const [messages, setMessages] = useState<
    { role: string; parts: { text: string }[] }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const router = useRouter();

  if (!session) {
    // router.push("/login");
    console.log("No session");
  }

  useEffect(() => {
    if (chatDisplay.current) {
      chatDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    // Fetch chat history when page loads
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

    async function startChat() {
      if (!chatDisplay.current?.hasChildNodes() && chatInput.current) {
        chatInput.current.value = algoName;
        setMessages((prevData) => [
          ...prevData,
          { role: "user", parts: [{ text: algoName }] },
        ]);
        await handleMessageInput();
      }
    }

    if (userData) {
      console.log("Fetching history...");
      fetchHistory().then((res) => {
        !res && startChat();
      });
    }

    return () => {};
  }, []);

  const handleMessageInput = async () => {
    if (chatInput.current && chatInput.current.value !== "") {
      const userMessage = {
        role: "user",
        parts: [{ text: chatInput.current.value }],
      };
      setMessages((prevMSGs) => [...prevMSGs, userMessage]);

      // Send user message to AI and update the chat
      setLoading(true);
      chatInput.current.value = ""; // Clear input
      // get response from AI
      const aiText = await aiReply(
        userMessage.parts[0].text,
        userData?.email,
        algoName
      );
      const isEndRequested = new RegExp(
        `(?=.*explore another algorithm)(?=.*continue with ${algoName})`,
        "i"
      ).test(aiText);
      const aiMessage = { role: "model", parts: [{ text: aiText }] };
      // Update UI
      setMessages((prevMSGs) => [...prevMSGs, aiMessage]);
      setLoading(false);

      // Save chat to DB
      try {
        const response = await fetch(`/api/conversations/saveHistory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: userData?.email,
            algoName: algoName,
            chatMessage: [userMessage, aiMessage],
          }),
        });

        if (response.status !== 200) {
          const data = await response.json();
          console.log(data.message);
        }
      } catch (error) {
        console.error("Error saving chat history:", error);
      }

      if (isEndRequested) {
        setIsEnd(true);
      }
    }
  };

  const endConversation = async () => {
    console.log("end conversation");
    try {
      const response = await fetch(`/api/conversations/module-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: userData?.email,
          algoName: algoName,
          status: "completed",
        }),
      });

      if (response.status !== 200) {
        const data = await response.json();
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error saving Module status");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarNavigations></SidebarNavigations>
      <div className="flex flex-col sm:gap-4 sm:pl-14">
        <Header pageHeading="Socratic AI" searchbar={false}></Header>
        <main>
          <div className=" w-full h-[calc(100vh-5.5rem)] flex flex-row gap-6 p-6 pt-0">
            <AlgoNav></AlgoNav>
            <div className="relative w-full flex min-h-[50vh] gap-y-4 flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
              <div className="flex-1 h-3/5">
                <div
                  ref={chatDisplay}
                  className="chatDisplay flex flex-col h-full pb-4 text-wrap"
                  style={{ overflowX: "hidden", overflowY: "scroll" }}
                >
                  {messages.map((msg, index) => {
                    return msg.role === "user" ? (
                      <div
                        key={index}
                        className="p-2 px-3 bg-slate-100 dark:bg-slate-800 m-2 self-end rounded-md ml-16 text-wrap break-words"
                      >
                        {msg.parts[0].text}
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="p-2 px-3 bg-slate-100 dark:bg-slate-800 m-2 self-start rounded-md mr-16 text-wrap break-words"
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(msg.parts[0].text),
                        }}
                      ></div>
                    );
                  })}
                  {!isEnd && (
                    <div className="flex flex-col xs:flex-row justify-center items-center gap-4 sm:mx-10">
                      <Button
                        variant="outline"
                        className="border-primary border-2 p-4 w-1/2 h-max text-wrap"
                        onClick={endConversation}
                      >
                        Explore another algorithm
                      </Button>
                      <Button
                        variant="outline"
                        className="border-primary border-2 p-4 w-1/2 h-max text-wrap"
                        onClick={() => setIsEnd(false)}
                      >
                        Continue the {algoName}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <form
                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleMessageInput();
                }}
              >
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>
                <Textarea
                  id="message"
                  ref={chatInput}
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center p-3 pt-0">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogUpdate>
                          <Button variant="ghost" size="icon">
                            <Paperclip className="size-4" />
                            <span className="sr-only">Attach file</span>
                          </Button>
                        </DialogUpdate>
                      </TooltipTrigger>
                      <TooltipContent side="top">Attach File</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogUpdate>
                          <Button variant="ghost" size="icon">
                            <Mic className="size-4" />
                            <span className="sr-only">Use Microphone</span>
                          </Button>
                        </DialogUpdate>
                      </TooltipTrigger>
                      <TooltipContent side="top">Use Microphone</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button
                    type="submit"
                    size="sm"
                    className="ml-auto gap-1.5"
                    disabled={isEnd}
                  >
                    {loading ? "Loading..." : "Send Message"}
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
