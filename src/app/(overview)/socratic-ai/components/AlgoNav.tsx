"use client";
import Loader from "@/components/Loader";
import { useUserContext } from "@/context/UserProvider";
import { IModule } from "@/interfaces/algorithms.interface";
import { ArrowRightCircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AlgoNav = () => {
  const [algoList, setAlgoList] = useState<IModule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentPath = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { fetchAlgoList } = useUserContext();

  useEffect(() => {
    const getAlgorithmsList = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAlgoList();
        if (data) {
          setAlgoList(data); // Directly set the list from the response
        }
      } catch (error) {
        console.error("Error fetching algorithms:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (session?.user) {
      getAlgorithmsList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user]);

  return (
    <>
      <div className="hidden md:flex flex-col w-80 bg-muted/50 rounded-xl p-2 gap-y-2 py-4 shadow-lg">
        <h3 className="font-semibold text-lg pl-1">Algorithms</h3>
        <hr />
        {isLoading ? (
          <Loader />
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
                    module.state === "PENDING"
                      ? "rgb(255,191,0)" // yellow for PENDING
                      : "rgb(124,252,0)" // green for COMPLETED
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
