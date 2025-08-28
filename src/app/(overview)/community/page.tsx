"use client";
import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import CategoryTabs from "./components/CategoryTabs";
import Link from "next/link";
import { Post, samplePosts } from "@/lib/sample-post-data";
import { PlusCircleIcon } from "lucide-react";


export default function CommunityPage() {
//   const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [category, setCategory] = useState("For You");
  const [currPosts, setCurrPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Simulated API fetch based on category
    const filteredPosts = samplePosts.filter(post => post.category === category);
    setCurrPosts(filteredPosts);
    console.log("Filtered Posts:", filteredPosts);
  }, [category]);
  //   useEffect(() => {
//     // Simulated API fetch based on category
//     fetch(`/api/discuss?category=${category}`)
//       .then((res) => res.json())
//       .then(setPosts);
//   }, [category]);

  return (
    <div>
      <div className="flex justify-end items-center mb-4 px-4">
        <Link
          href="/community/create"
          target="_blank"
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition-colors"
        >
          <PlusCircleIcon/> Create
        </Link>
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
