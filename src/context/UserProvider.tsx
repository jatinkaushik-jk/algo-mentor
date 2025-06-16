"use client";
import { User } from "@/model/user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext<any>(undefined);
export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User>();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/actions/user-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonData = await response.json();
        if (response.status === 200) {
          setUser(jsonData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (status === "authenticated") {
      fetchData();
    }
  }, [session, status]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  //   return <UserContext.Provider value={} {...props}>{children}</UserContext.Provider>;
}
