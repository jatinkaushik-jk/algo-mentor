"use client";
import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import CategoryTabs from "./components/CategoryTabs";
import Link from "next/link";
import { Post, samplePosts } from "@/lib/sample-post-data";
import { LockKeyholeIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserProvider";


export default function CommunityPage() {
//   const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [category, setCategory] = useState("For You");
  const [currPosts, setCurrPosts] = useState<Post[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { getSubscription } = useUserContext();

  useEffect(() => {
    // API fetch based on category
    const filteredPosts = samplePosts.filter(post => post.category === category);
    setCurrPosts(filteredPosts);
  }, [category]);

  useEffect(()=>{
    // API fetch for subscription status
    const fetchSubscriptionStatus = async () => {
      const subscription = await getSubscription();
      setIsSubscribed(()=> subscription?.plan.name !== "Basic");
    };
    fetchSubscriptionStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   useEffect(() => {
//     // Simulated API fetch based on category
//     fetch(`/api/discuss?category=${category}`)
//       .then((res) => res.json())
//       .then(setPosts);
//   }, [category]);

  return (
    <div>
      <div className="flex justify-end items-center mb-4 px-4">
        <Button asChild
          className="bg-green-500 hover:bg-green-600 transition-colors flex items-center gap-2"
        >
        <Link
          href={isSubscribed ? "/community/create" : "/pricing"}
          target="_blank"
        >
          {isSubscribed ? <PlusCircleIcon size={16} /> : <LockKeyholeIcon size={16} />} Create
        </Link>
        </Button>
      </div>
      <CategoryTabs onChange={(val) => setCategory(val)} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {currPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
