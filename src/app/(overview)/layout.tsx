"use client";
import React from "react";
import Header from "@/components/header";
import SidebarNavigations from "@/components/sidebarNavigations";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import { useUserContext } from "@/context/UserProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pageHeading, setPageHeading] = React.useState("Socratic AI");
  const currentPath = usePathname();
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect to the login page if not authenticated
      router.push("/login");
    },
  });
  const {updateStreak} = useUserContext();

  React.useEffect(() => {
    switch (currentPath) {
      case "/dashboard":
        setPageHeading("AlgoMentor");
        break;
      case "/socratic-ai":
        setPageHeading("Socratic AI");
        break;
      case "/analytics":
        setPageHeading("Analytics");
        break;
      case "/community":
        setPageHeading("Community");
        break;
      case "/settings":
        setPageHeading("Settings");
        break;

      default:
        setPageHeading("AlgoMentor");
        break;
    }
  }, [currentPath]);

  React.useEffect(() => {
    if (status === "authenticated") {
      updateStreak();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
      <SidebarNavigations></SidebarNavigations>
      <div className="flex flex-col sm:gap-4 sm:pl-14">
        <Header pageHeading={pageHeading} searchbar={false}></Header>
        <main className="p-6 pt-0">{children}</main>
      </div>
    </div>
  );
}
