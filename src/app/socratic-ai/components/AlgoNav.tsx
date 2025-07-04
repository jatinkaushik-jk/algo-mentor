"use client";
import { useUserContext } from "@/context/UserProvider";
import { Module } from "@/models/user.model";
import { ArrowRightCircleIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AlgoNav = () => {
  const [algoList, setAlgoList] = useState<Module[]>([]);
  const currentPath = usePathname();
  const router = useRouter();
  // const { data: session } = useSession();

  // useEffect(() => {
  //   const getAlgorithmsList = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch("/api/actions/algo-list", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(session?.user),
  //       });

  //       const data = await response.json();
  //       if (response.ok) {
  //         setAlgoList(data.algoList); // Directly set the list from the response
  //         console.log("AlgoList: ", data.algoList);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching algorithms:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   if (session?.user) {
  //     //   getAlgorithmsList();
  //   }
  // }, [session?.user]);

  const { user } = useUserContext();
  useEffect(() => {
    if (user?.modules) setAlgoList(user.modules);
  }, [user]);

  return (
    <>
      <div className="hidden md:flex flex-col w-80 bg-muted/50 rounded-xl p-2 gap-y-2 py-4 shadow-lg">
        <h3 className="font-semibold text-lg pl-1">Algorithms</h3>
        <hr />
        {!user ? (
          <p>Loading algorithms...</p>
        ) : algoList.length === 0 ? (
          <p>Not Started yet!</p>
        ) : (
          algoList.map((module) => (
            <div
              key={module?.algorithm?.algoID}
              onClick={() =>
                router.push(
                  `/socratic-ai/${module?.algorithm?.title
                    ?.toLowerCase()
                    .replace(/ /g, "-")}`
                )
              }
              className={`font-semibold rounded-sm p-2 px-4 flex flex-row justify-between items-center cursor-pointer dark:hover:bg-primary transition-colors hover:bg-primary ${
                currentPath.includes(
                  module?.algorithm?.title?.toLowerCase().replace(/ /g, "-")
                )
                  ? "bg-primary dark:bg-primary"
                  : "bg-slate-200 dark:bg-slate-800"
              } `}
            >
              {module?.algorithm?.title}{" "}
              <ArrowRightCircleIcon
                style={{
                  color: `${
                    module.state === "pending"
                      ? "rgb(255,191,0)" // yellow for pendings
                      : "rgb(124,252,0)" // green for completed
                  }`,
                }}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AlgoNav;
