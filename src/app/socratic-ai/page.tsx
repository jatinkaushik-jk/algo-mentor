"use client";
import React, { useRef } from "react";
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
import { DialogUpdate } from "./DialogUpdate";
import AlgoNav from "./components/AlgoNav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ChatBotUI from "./ChatBotUI";

export default function SocraticAI() {
  const chatInput = useRef<HTMLTextAreaElement>(null);
  const chatDisplay = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    // router.push("/login");
    console.log("No session");
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarNavigations></SidebarNavigations>
      <div className="flex flex-col gap-4 sm:pl-14">
        <Header pageHeading="Socratic AI" searchbar={false}></Header>
        <main>
          <div className=" w-full h-[calc(100vh-5.5rem)] flex flex-row gap-6 p-6 pt-0 ">
            <AlgoNav></AlgoNav>
            <div className="w-full h-full flex gap-y-4 rounded-xl bg-muted/100 dark:bg-muted/50 p-4 shadow-lg">
              <ChatBotUI />
              {/* <div className="flex-1 h-3/5">
                <div
                  ref={chatDisplay}
                  className="chatDisplay flex flex-col h-full pb-4 text-wrap"
                  style={{ overflowX: "hidden", overflowY: "scroll" }}
                ></div>
              </div>
              <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
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
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>
              </form> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
