"use client";
import { Conversation, User } from "@/models/user.model";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

interface UserContextType {
  user: User | undefined;
  saveMessages: (params: {
    email: string;
    algoName: string;
    message: Conversation;
  }) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  const { data: session, status } = useSession();

  const saveMessages = async ({
    email,
    algoName,
    message,
  }: {
    email: string;
    algoName: string;
    message: Conversation;
  }) => {
    try {
      const response = await fetch(`/api/conversations/saveHistory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          algoName: algoName,
          message: message,
        }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        alert(data?.message);
      }
    } catch (error) {
      console.error("Error saving messages:", error);
    }
  };

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

  return (
    <UserContext.Provider value={{ user, saveMessages }}>
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
