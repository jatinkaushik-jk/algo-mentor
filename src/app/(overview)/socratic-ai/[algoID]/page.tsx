"use client";
import React, { useEffect } from "react";
import AlgoNav from "../components/AlgoNav";
import ChatBotUI from "../ChatBotUI";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Loader from "@/components/Loader";

export default function SocraticAI() {
  const { algoID } = useParams<{ algoID: string }>();
  const router = useRouter();
  const [isValidAlgo, setIsValidAlgo] = React.useState<boolean>(false);

  useEffect(() => {
    // Verify if algorithm is valid and the user has access to this algorithm
    const fetchData = async () => {
      try {
        const res = await fetch("/api/actions/algo-actions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ algoID }),
        });
        const result = await res.json();
        if (res.status == 200) {
          setIsValidAlgo(true);
        } else if (res.status == 404) {
          toast.error(result.message, {
            description: "The requested algorithm was not found.",
          });
          router.push("/not-found");
        } else if (res.status == 403) {
          toast.error(result.message, {
            description: "Please upgrade your plan to access this feature.",
            action: {
              label: "Upgrade",
              onClick: () => (window.location.href = "/pricing"),
            },
          });
          router.push("/pricing");
        } else {
          toast.error(result.message);
          router.push("/dashboard");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" w-full h-[calc(100vh-5.5rem)] flex flex-row gap-6">
      <AlgoNav></AlgoNav>
      <div className="w-full h-full flex gap-y-4 rounded-xl bg-muted/100 dark:bg-muted/50 p-4 shadow-lg">
        {/* {isValidAlgo && <ChatBotUI algoID={algoID} />} */}
        {isValidAlgo && <>ChatBot here</>}
        {!isValidAlgo && <Loader>Verifying algorithm access...</Loader>}
      </div>
    </div>
  );
}
