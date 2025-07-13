"use client";
import React from "react";
import AlgoNav from "../components/AlgoNav";
import ChatBotUI from "../ChatBotUI";
import { useParams } from "next/navigation";

export default function SocraticAI() {
  const params = useParams<{ algoName: string }>();
  const algoName = params?.algoName?.toLowerCase().replace("-", " ");

  return (
    <div className=" w-full h-[calc(100vh-5.5rem)] flex flex-row gap-6">
      <AlgoNav></AlgoNav>
      <div className="w-full h-full flex gap-y-4 rounded-xl bg-muted/100 dark:bg-muted/50 p-4 shadow-lg">
        <ChatBotUI algoName={algoName} />
      </div>
    </div>
  );
}
