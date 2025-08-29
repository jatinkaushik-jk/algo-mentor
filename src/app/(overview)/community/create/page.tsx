"use client"
import { useUserContext } from "@/context/UserProvider";
import PostEditor from "../components/PostEditor";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightCircleIcon } from "lucide-react";

export default function CreateDiscussPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { getSubscription } = useUserContext();

  useEffect(() => {
    const checkSubscription = async () => {
      const subscription = await getSubscription();
      setIsSubscribed(subscription?.plan.name !== "Basic");
    };
    checkSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isSubscribed) {
    return (
      <div className="p-4 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Subscription Required</h2>
        <p>You need to be a subscribed member to create a new discussion post. Please upgrade your plan to access this feature.</p>
        <Link href="/pricing" className="group underline underline-offset-1 mt-2 flex items-center gap-1">
          Upgrade Plan <ArrowRightCircleIcon size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }
  return <PostEditor />;
}