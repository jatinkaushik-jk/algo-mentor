"use client";
import React from "react";
import Calender from "./components/calender";
import SidebarNavigations from "@/components/ui/sidebarNavigations";
import AlgorithmTable from "./components/algorithm-table";
import Header from "@/components/ui/header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import RecentLearnings from "./components/RecentLearnings";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
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
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
        <SidebarNavigations></SidebarNavigations>
        <div className="flex flex-col sm:gap-4 sm:pl-14">
          <Header></Header>
          <main>
            <div className="w-full min-h-screen flex flex-row xl:gap-4 p-6">
              <section className="w-full lg:w-[75%]">
                <div className="w-full flex flex-row gap-6 px-2 justify-start items-center">
                  <div className="w-72 aspect-[5/3.4] rounded-xl bg-[url('/images/cardImg01.webp')] bg-center bg-cover bg-no-repeat bg-[rgba(0,0,0,0.1)] bg-blend-multiply hover:bg-white transition-colors"></div>
                  <div className="w-72 aspect-[5/3.4] rounded-xl bg-[url('/images/cardImg02.webp')] bg-center bg-cover bg-no-repeat bg-[rgba(0,0,0,0.1)] bg-blend-multiply hover:bg-white transition-colors"></div>
                  <div className="hidden sm:flex w-72 aspect-[5/3.4] rounded-xl bg-[url('/images/cardImg03.webp')] bg-center bg-cover bg-no-repeat bg-[rgba(0,0,0,0.1)] bg-blend-multiply hover:bg-white transition-colors"></div>
                </div>
                <div className="mt-4 sm:mt-8">
                  <h3 className="font-semibold text-3xl px-2 mb-4">
                    Welcome back {session?.user?.name}!
                  </h3>
                  <AlgorithmTable />
                </div>
              </section>
              <section className="hidden lg:block w-full">
                <Calender />
                <RecentLearnings />
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
