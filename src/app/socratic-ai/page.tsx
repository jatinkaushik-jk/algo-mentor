"use client";
import React, { useEffect } from "react";
import SidebarNavigations from "@/components/ui/sidebarNavigations";
import Header from "@/components/ui/header";
import AlgoNav from "./components/AlgoNav";
import { useSession } from "next-auth/react";
import ChatBotUI from "./ChatBotUI";
import { useRouter } from "next/navigation";

export default function SocraticAI() {
  // const { data: session } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     // Redirect to sign-in if the user is not authenticated
  //     router.push("/login");
  //   }
  // });

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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
