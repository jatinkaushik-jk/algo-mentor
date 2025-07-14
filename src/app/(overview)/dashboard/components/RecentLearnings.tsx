"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserProvider";
import { Algorithm } from "@/models/user.model";
import { ArrowRightCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RecentLearnings = () => {
  const { fetchRecentLearnings } = useUserContext();
  const router = useRouter();
  const [recentLearnings, setRecentLearnings] = useState<Algorithm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    async function getRecentLearnings() {
      try {
        setIsLoading(true);
        const data = await fetchRecentLearnings();
        if (data) setRecentLearnings(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (session?.user) {
      getRecentLearnings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user]);
  return (
    <div className="rounded-md border shadow-lg shadow-[rgba(23,20,20,0.04)] max-w-[16rem] w-full p-4 aspect-auto mx-auto text-center">
      <h3 className="font-semibold text-xl mb-2">Recent Learnings</h3>
      <hr />
      {isLoading ? (
        <Loader />
      ) : recentLearnings.length > 0 ? (
        <div>
          <ul className="space-y-2 mt-2">
            {recentLearnings.map((learnings) => (
              <li key={learnings.algoID}>
                <Button 
                onClick={() =>
                router.push(
                  `/socratic-ai/${learnings.title
                    ?.toLowerCase()
                    .replace(/ /g, "-")}`
                )
              }
                variant={"outline"} 
                className="group w-full flex justify-between items-center">
                  {learnings.title} <ArrowRightCircle size={"sm"} width={20} className="group-hover:translate-x-1 transition"/>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Image
          src="/images/empty.svg"
          width={150}
          height={150}
          alt="404 Illustration"
          className="max-w-[100px] sm:max-w-[125px] md:max-w-[140px] lg:max-w-[150px] h-auto w-auto mx-auto m-6"
          style={{
            aspectRatio: "3/2",
            objectFit: "contain",
          }}
        />
      )}
    </div>
  );
};

export default RecentLearnings;
