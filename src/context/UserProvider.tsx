"use client";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { ContactFormData } from "@/app/contact/ContactForm";
import { IUser, IUserProfile } from "@/interfaces/user.interface";
import {
  IAlgorithm,
  IConversation,
  IModule,
} from "@/interfaces/algorithms.interface";
import { ISubscription } from "@/interfaces/subscription.interface";

interface UserContextType {
  user: IUser | undefined;
  updateUserDetails: (userData: IUserProfile) => Promise<void>;
  fetchAlgoMessages: (algoName: string) => Promise<IConversation[] | undefined>;
  fetchAlgoList: () => Promise<IModule[] | undefined>;
  fetchRecentLearnings: () => Promise<IAlgorithm[] | undefined>;
  markModuleStatus: (
    algoName: string,
    status: string
  ) => Promise<boolean | undefined>;
  getLoginHistory: () => Promise<string[]>;
  getAlgoStats: () => Promise<
    { category: string; difficulty: string; module: string }[]
  >;
  updateStreak: () => Promise<void>;
  submitContactRequest: (contactData: ContactFormData) => Promise<void>;
  getSubscription: () => Promise<ISubscription | null>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>();
  const { data: session, status } = useSession();

  const fetchUsersData = async () => {
    try {
      const response = await fetch("/api/actions/user-details", {
        method: "GET",
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

  const updateUserDetails = async (userData: IUserProfile) => {
    try {
      const response = await fetch("/api/actions/user-details", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const jsonData = await response.json();
      if (response.status === 200) {
        // setUser(jsonData.data);
        fetchUsersData(); // Refresh user data after update
        toast.success("User details updated successfully!");
      } else {
        toast.error("Failed to update user details.");
        console.error("Error updating user details:", jsonData.message);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const fetchAlgoMessages = async (
    algoName: string
  ): Promise<IConversation[] | undefined> => {
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

  const fetchAlgoList = async (): Promise<IModule[] | undefined> => {
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
  const fetchRecentLearnings = async (): Promise<IAlgorithm[] | undefined> => {
    try {
      const response = await fetch("/api/actions/getAlgorithms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      if (response.status === 200) {
        const modules = jsonData.data as IModule[];
        return modules
          .filter((mod) => mod.state === "PENDING")
          .map((mod) => mod.algorithm);
      } else {
        console.error("Error fetching recent learnings:", jsonData.message);
      }
    } catch (error) {
      console.error("Error fetching recent learnings:", error);
    }
  };
  const markModuleStatus = async (
    algoName: string,
    status: string
  ): Promise<boolean | undefined> => {
    try {
      const response = await fetch("/api/conversations/set-module-status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ algoName, status: status.toUpperCase() }),
      });
      const jsonData = await response.json();
      if (response.status === 200) {
        return true;
      } else {
        console.error("Error fetching recent learnings:", jsonData.message);
      }
    } catch (error) {
      console.error("Error fetching recent learnings:", error);
    }
  };

  const getLoginHistory = async () => {
    // Returns: ["2024-06-01", "2024-06-02", ...]
    return ["2024-06-01", "2024-06-02"];
  };

  const getAlgoStats = async () => {
    const res = await fetchAlgoList();
    if (!res) return [];
    const data = res.map((module) => ({
      category: module.algorithm.category,
      difficulty: module.algorithm.difficulty,
      module: module.state,
    }));
    // Returns: [{ category: "Sorting", difficulty: "Easy" }, { category: "Graph", difficulty: "Hard" }, ...]
    return data;
  };

  const updateStreak = async (): Promise<void> => {
    try {
      await fetch("/api/actions/streak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error updating streak:", error);
    }
  };

  const getSubscription = async (): Promise<ISubscription | null> => {
    try {
      const response = await fetch("/api/actions/getSubscription", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      if (response.status === 200) {
        return jsonData.data;
      } else {
        console.error("Error fetching subscription:", jsonData.message);
      }
    } catch (error) {
      console.error("Error fetching subscription:", error);
    }
    return null;
  };

  const submitContactRequest = async (
    contactData: ContactFormData
  ): Promise<void> => {
    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        contactData,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID as string,
        }
      );
      if (response.status === 200) {
        toast.success("Your message has been sent successfully!");
      } else {
        toast.error("Failed to send your message.");
      }
    } catch (error) {
      toast.error("Error sending email.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUsersData();
    }
  }, [session, status]);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUserDetails,
        fetchAlgoMessages,
        fetchAlgoList,
        fetchRecentLearnings,
        markModuleStatus,
        getLoginHistory,
        getAlgoStats,
        updateStreak,
        submitContactRequest,
        getSubscription,
      }}
    >
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
