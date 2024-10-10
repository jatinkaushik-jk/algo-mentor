"use client";
import React, { useEffect, useRef, useState } from "react";
import SidebarNavigations from "@/components/ui/sidebarNavigations";
import {
  ArrowRightCircleIcon,
  CornerDownLeft,
  Mic,
  Paperclip,
} from "lucide-react";

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
import { DialogUpdate } from "../popup";
import { aiReply } from "@/app/api/ai/genai";
import AlgoNav from "../components/AlgoNav";

export default function SocraticAI({
  params,
}: {
  params: { algoName: string };
}) {
  const chatInput = useRef<HTMLTextAreaElement>(null);
  const chatDisplay = useRef<HTMLDivElement>(null);
  // const userId = "exampleUserId";
  const [messages, setMessages] = useState<
    { role: string; parts: { text: string }[] }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chatDisplay.current) {
      chatDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  // // Fetch the stored chat history for the user when the page loads
  // useEffect(() => {
  //   async function fetchHistory() {
  //     try {
  //       const response = await fetch(
  //         `/api/conversations/getHistory?userId=${userId}`
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         setMessages(data.messages);
  //       }
  //     } catch (error) {
  //       console.error("Failed to load conversation history:", error);
  //     }
  //   }
  //   fetchHistory();
  // }, [userId]);

  useEffect(() => {
    // if(params.algoName)
    setMessages(() => [
      { role: "user", parts: [{ text: "Bubble sort" }] },
      {
        role: "model",
        parts: [
          {
            text: "Bubble Sort is one of the simplest sorting algorithms, invented in the 1950s. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. Let's start with a fundamental question: **Can you describe in your own words how Bubble Sort would sort a list of numbers in ascending order?**",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "I think it will just compare and swap the numbers consecutively",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "That's a good start! You're on the right track. Bubble Sort does indeed compare and swap numbers consecutively. Can you elaborate on how the comparison and swapping would happen? For example, imagine we have the list [5, 1, 4, 2, 8]. How would the algorithm work its way through this list in the first pass?",
          },
        ],
      },
    ]);
  }, []);

  const handleMessageInput = async (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.current && chatInput.current.value.trim() !== "") {
      const userMessage = {
        role: "user",
        parts: [{ text: chatInput.current.value }],
      };
      setMessages((prevMSGs) => [...prevMSGs, userMessage]);

      // Send user message to AI and update the chat
      setLoading(true);
      chatInput.current.value = ""; // Clear input
      const aiText = await aiReply(userMessage.parts[0].text);
      const aiMessage = { role: "model", parts: [{ text: aiText }] };
      setMessages((prevMSGs) => [...prevMSGs, aiMessage]);
      setLoading(false);
      //   // Save conversation to the database
      //   try {
      //     await fetch("/api/conversations/saveHistory", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({ userId, messages: [userMessage, aiMessage] }),
      //     });
      //   } catch (error) {
      //     console.error("Failed to save conversation:", error);
      //   }
      // }
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
                        className="p-2 px-3 bg-slate-100 dark:bg-slate-800 m-2 self-end rounded-md mr-16 text-wrap break-words"
                      >
                        {msg.parts[0].text}
                      </div>
                    );
                  })}
                </div>
              </div>
              <form
                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                onSubmit={handleMessageInput}
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
                  <Button type="submit" size="sm" className="ml-auto gap-1.5">
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
