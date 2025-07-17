export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  upvotes: number;
  views: number;
  comments: number;
}
export const samplePosts = [
  {
    id: "1",
    title: "Understanding Two Pointers in Arrays",
    content:
      "Two pointers is a common technique for array problems. Use left and right pointers to iterate inward or outward depending on the problem. Works well for problems like max area, sorted pair sum, etc.",
    category: "Algorithms",
    tags: ["Two Pointers", "Arrays", "Pointers"],
    author: {
      name: "Ananya Sharma",
      avatarUrl: "/avatars/user1.png",
    },
    createdAt: "2025-07-16T14:00:00Z",
    upvotes: 42,
    comments: 5,
    views: 100,
  },
  {
    id: "2",
    title: "What is the difference between Greedy and DP?",
    content:
      "Greedy chooses the best option at every step, whereas DP considers all options and caches them. Greedy is faster but doesn’t always yield optimal results. DP is safe but memory-intensive.",
    category: "DSA Concepts",
    tags: ["Greedy", "DP", "Optimization"],
    author: {
      name: "Rohan Mehta",
      avatarUrl: "/avatars/user2.png",
    },
    createdAt: "2025-07-15T10:30:00Z",
    upvotes: 75,
    comments: 12,
    views: 200,
  },
  {
    id: "3",
    title: "Tips for Cracking Medium-Level Graph Questions",
    content:
      "Always start by identifying if it's DFS, BFS, Union Find or Dijkstra. Dry run on paper before coding. Try practicing on undirected graphs before moving to directed/weighted ones.",
    category: "Interview Prep",
    tags: ["Graphs", "DFS", "BFS", "Leetcode"],
    author: {
      name: "Ishita Dey",
      avatarUrl: "/avatars/user3.png",
    },
    createdAt: "2025-07-14T08:45:00Z",
    upvotes: 31,
    comments: 7,
    views: 150,
  },
  {
    id: "4",
    title: "How do you prepare for CP contests?",
    content:
      "Practice on Codeforces and AtCoder regularly. Keep track of your rating and participate in virtual contests. Learn STL and efficient debugging methods to save time.",
    category: "Competitive Programming",
    tags: ["CP", "Codeforces", "AtCoder", "Tips"],
    author: {
      name: "Mohit Bansal",
      avatarUrl: "/avatars/user4.png",
    },
    createdAt: "2025-07-13T16:20:00Z",
    upvotes: 60,
    comments: 10,
    views: 300,
  },
];
