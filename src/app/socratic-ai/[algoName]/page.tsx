"use client";
import React from "react";
import SidebarNavigations from "@/components/ui/sidebarNavigations";
import Header from "@/components/ui/header";
import AlgoNav from "../components/AlgoNav";
import ChatBotUI from "../ChatBotUI";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";

export default function SocraticAI() {
  const params = useParams<{ algoName: string }>();
  const algoName = params?.algoName?.toLowerCase().replace("-", " ");

  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect to the login page if not authenticated
      router.push("/login");
    },
  });

  if (status === "loading") {
    return (
      <Loader />
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarNavigations></SidebarNavigations>
      <div className="flex flex-col sm:gap-4 sm:pl-14">
        <Header pageHeading="Socratic AI" searchbar={false}></Header>
        <main>
          <div className=" w-full h-[calc(100vh-5.5rem)] flex flex-row gap-6 p-6 pt-0">
            <AlgoNav></AlgoNav>
            <div className="w-full h-full flex gap-y-4 rounded-xl bg-muted/100 dark:bg-muted/50 p-4 shadow-lg">
              <ChatBotUI algoName={algoName} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
