"use client";
import React, { useEffect } from "react";
import SidebarNavigations from "@/components/ui/sidebarNavigations";
import Header from "@/components/ui/header";
import AlgoNav from "../components/AlgoNav";
import { useSession } from "next-auth/react";
import ChatBotUI from "../ChatBotUI";
import { useParams } from "next/navigation";

export default function SocraticAI() {
  const { data: session } = useSession();
  const userData = session?.user;
  const params = useParams<{ algoName: string }>();
  const algoName = params?.algoName?.toLowerCase().replace("-", " ");

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
            {/* <div className="relative w-full flex min-h-[50vh] gap-y-4 flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
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
            </div> */}
            <div className="w-full h-full flex gap-y-4 rounded-xl bg-muted/100 dark:bg-muted/50 p-4 shadow-lg">
              <ChatBotUI algoName={algoName} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
