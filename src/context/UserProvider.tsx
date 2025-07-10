"use client";
import { Algorithm, Conversation, Module, User } from "@/models/user.model";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

interface UserContextType {
  user: User | undefined;
  fetchAlgoMessages: (algoName: string) => Promise<Conversation[] | undefined>;
  fetchAlgoList: () => Promise<Module[] | undefined>;
  fetchRecentLearnings: () => Promise< Algorithm[] | undefined>;
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

  const fetchAlgoList = async () => {
    try {
      const response = await fetch("/api/actions/getAlgorithms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      if (response.status === 200) {
        return jsonData.data;
      } else {
        console.error("Error fetching algorithm list:", jsonData.message);
      }
    } catch (error) {
      console.error("Error fetching algorithm list:", error);
    }
  };
  const fetchRecentLearnings = async () => {
    try {
      const response = await fetch("/api/actions/getAlgorithms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      if (response.status === 200) {
        const modules = jsonData.data as Module[];
        return modules.filter((mod)=> mod.state === "pending").map((mod)=> mod.algorithm)
      } else {
        console.error("Error fetching recent learnings:", jsonData.message);
      }
    } catch (error) {
      console.error("Error fetching recent learnings:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUsersData();
    }
  }, [session, status]);

  return (
    <UserContext.Provider value={{ user, fetchAlgoMessages, fetchAlgoList, fetchRecentLearnings }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
