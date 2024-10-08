import React from "react";
import Calender from "./components/calender";
import SidebarNavigations from "@/components/ui/sidebarNavigations";
import AlgorithmTable from "./components/algorithm-table";
import Header from "@/components/ui/header";
import Image from "next/image";

const Dashboard = async () => {
  // if (!session) {
  //   // Redirect to sign-in if the user is not authenticated
  //   redirect("/login");
  // }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
        <SidebarNavigations></SidebarNavigations>
        <div className="flex flex-col sm:gap-4 sm:pl-14">
          <Header></Header>
          <main>
            <div className="w-full min-h-screen flex flex-row xl:gap-4 p-6">
              <section className="w-full lg:w-[75%]">
                <div className="w-full p-2 hidden sm:flex flex-row gap-6 justify-center items-center">
                  <div className="w-72 aspect-[5/3.4] rounded-xl bg-[url('/images/cardImg01.webp')] bg-center bg-cover bg-no-repeat bg-[rgba(0,0,0,0.1)] bg-blend-multiply hover:bg-white transition-colors"></div>
                  <div className="w-72 aspect-[5/3.4] rounded-xl bg-[url('/images/cardImg02.webp')] bg-center bg-cover bg-no-repeat bg-[rgba(0,0,0,0.1)] bg-blend-multiply hover:bg-white transition-colors"></div>
                  <div className="w-72 aspect-[5/3.4] rounded-xl bg-[url('/images/cardImg03.webp')] bg-center bg-cover bg-no-repeat bg-[rgba(0,0,0,0.1)] bg-blend-multiply hover:bg-white transition-colors"></div>
                </div>
                <div className="mt-4 sm:mt-14">
                  <AlgorithmTable />
                </div>
              </section>
              <section className="hidden lg:block w-full">
                <Calender />
                <div className="rounded-md border shadow-lg shadow-[rgba(23,20,20,0.04)] max-w-full w-[90%] p-4 aspect-auto mx-auto text-center mt-4">
                  <h3 className="font-semibold text-xl">Recent Learnings</h3>
                  <Image
                    src="/images/empty.svg"
                    width={150}
                    height={150}
                    alt="404 Illustration"
                    className="max-w-[100px] sm:max-w-[125px] md:max-w-[140px] lg:max-w-[150px] mx-auto m-6"
                    style={{
                      aspectRatio: "3/2",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
