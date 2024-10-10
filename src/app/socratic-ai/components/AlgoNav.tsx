"use client";
import { Module } from "@/model/user";
import { ArrowRightCircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AlgoNav = () => {
  const [algoList, setAlgoList] = useState<Array<Module>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const getAlgorithmsList = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/actions/algo-list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(session?.user),
        });

        const data = await response.json();
        if (response.ok) {
          setAlgoList(data.algoList); // Directly set the list from the response
          console.log("AlgoList: ", data.algoList);
        }
      } catch (error) {
        console.error("Error fetching algorithms:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (session?.user) {
      //   getAlgorithmsList();
    }
  }, [session?.user]);
  return (
    <>
      <div className="hidden md:flex flex-col w-80 bg-muted/50 rounded-xl p-2 gap-y-2 py-4 shadow-lg">
        <div className="bg-slate-200 dark:bg-slate-800 font-semibold rounded-sm p-2 px-4 flex flex-row justify-between items-center cursor-pointer dark:hover:bg-primary transition-colors hover:bg-primary">
          klsdnfjk
        </div>
        {isLoading ? (
          <p>Loading algorithms...</p>
        ) : algoList.length === 0 ? (
          <p>Not Started yet!</p>
        ) : (
          algoList.map((moduleData) =>
            moduleData.algos.map((algo) => (
              <div
                key={algo.algoID}
                onClick={() =>
                  router.push(
                    `/socratic-ai/${algo.title
                      .toLowerCase()
                      .replace(/ /g, "-")}`
                  )
                }
                className="bg-slate-200 dark:bg-slate-800 font-semibold rounded-sm p-2 px-4 flex flex-row justify-between items-center cursor-pointer dark:hover:bg-primary transition-colors hover:bg-primary"
              >
                {algo.title}{" "}
                <ArrowRightCircleIcon style={{ color: "yellow" }} />
              </div>
            ))
          )
        )}
      </div>
    </>
  );
};

export default AlgoNav;
