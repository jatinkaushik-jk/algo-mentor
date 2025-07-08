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
  // Need to handle the conversation end status
  // use this string "Do you have any further questions about [topic], or would you like to explore another algorithm?" to check if the conversation is ended
  // const [conversationEnded, setConversationEnded] = React.useState(false);
  // const endConversation = async () => {
  //   console.log("end conversation");
  //   try {
  //     const response = await fetch(`/api/conversations/module-status`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userEmail: userData?.email,
  //         algoName: algoName,
  //         status: "completed",
  //       }),
  //     });

  //     if (response.status !== 200) {
  //       const data = await response.json();
  //       console.log(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error saving Module status", error);
  //   }
  // };

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
