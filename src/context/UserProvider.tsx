"use client";
import { Conversation, User } from "@/models/user.model";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

interface UserContextType {
  user: User | undefined;
  fetchAlgoMessages: (algoName: string) => Promise<Conversation[] | undefined>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  const { data: session, status } = useSession();

  const fetchUsersData = async () => {
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

  const fetchAlgoMessages = async (algoName: string) => {
    try {
      const response = await fetch(
        `/api/conversations/getHistory?algoName=${algoName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      if (response.status === 200) {
        return jsonData.data;
      } else {
        console.error("Error fetching algorithm messages:", jsonData.message);
      }
    } catch (error) {
      console.error("Error fetching algorithm messages:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUsersData();
    }
  }, [session, status]);

  return (
    <UserContext.Provider value={{ user, fetchAlgoMessages }}>
      {children}
    </UserContext.Provider>
  );
  //   return <UserContext.Provider value={} {...props}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
