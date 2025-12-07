"use client";
import React from "react";
import Calender from "./components/calender";
import AlgorithmTable from "@/components/algorithms/ui/algorithm-table";
import { useSession } from "next-auth/react";
import RecentLearnings from "./components/RecentLearnings";
import { useUserContext } from "@/context/UserProvider";
import { FlameIcon } from "lucide-react";
import Link from "next/link";
import GuideTour from "@/components/GuideTour/GuideTour";

const steps = [
  {
    target: '.streak_tab',
    content: 'This is my awesome streak feature!',
  },
  {
    target: '.calender_tab',
    content: 'This another awesome calender feature!',
  },
];

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <>
      <GuideTour steps={steps} />
      <div className="w-full min-h-screen flex flex-row xl:gap-4">
        <section className="w-full lg:w-[75%]">
          <div className="w-full flex flex-col sm:flex-row gap-6 px-2 justify-start items-center">
            <Link href="/algorithms/easy" className="w-full">
              <div className="w-full aspect-[5/3.4] rounded-xl bg-[url('/images/cardImg01.webp')] bg-center bg-cover bg-no-repeat bg-[rgba(0,0,0,0.1)] bg-blend-multiply hover:bg-white transition-colors"></div>
            </Link>
            <Link href="/algorithms/popular" className="w-full">
              <div className="w-full aspect-[5/3.4] rounded-xl bg-[url('/images/cardImg02.webp')] bg-center bg-cover bg-no-repeat bg-[rgba(0,0,0,0.1)] bg-blend-multiply hover:bg-white transition-colors"></div>
            </Link>
            <Link href="/algorithms/cheatsheet" className="w-full">
              <div className="hidden sm:flex w-full aspect-[5/3.4] rounded-xl bg-[url('/images/cardImg03.webp')] bg-center bg-cover bg-no-repeat bg-[rgba(0,0,0,0.1)] bg-blend-multiply hover:bg-white transition-colors"></div>
            </Link>
          </div>
          <div className="mt-4 sm:mt-8">
            <h3 className="font-semibold text-3xl px-2 mb-4">
              Welcome back {session?.user?.name}!
            </h3>
            <AlgorithmTable />
          </div>
        </section>
        <section className="hidden lg:block w-full space-y-2">
          <StreakTab />
          <Calender />
          <RecentLearnings />
        </section>
      </div>
      
    </>
  );
};

function StreakTab() {
  const { user } = useUserContext();

  return (
    <div className="streak_tab rounded-md border shadow-lg shadow-[rgba(23,20,20,0.04)] max-w-[16rem] w-full p-4 aspect-auto mx-auto text-center">
      <div className="flex flex-row items-center justify-center gap-6">
        <div className="p-2 bg-orange-200 dark:bg-orange-400/90 dark:shadow-[0_0_10px_rgba(255,165,0,0.5)] rounded-full">
          <FlameIcon
            className="text-orange-500 dark:text-white drop-shadow-[0_0_10px_rgba(255,165,0,0.5)]"
            size={50}
          />
        </div>
        <div>
          <p className="text-2xl font-bold text-start">
            {user?.streak.current}
          </p>
          <p className="text-base">Streak Days</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
