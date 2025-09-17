import { IPost } from "@/models/posts.model";

// categories- "For You", "Career", "Contest", "Interview", "Feedback"
export const samplePosts: IPost[] = [
  {
    postId: "1",
    title: "Understanding Two Pointers in Arrays",
    content:
      "Two pointers is a common technique for array problems. Use left and right pointers to iterate inward or outward depending on the problem. Works well for problems like max area, sorted pair sum, etc.",
    category: "For You",
    label: "Algorithm",
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
    postId: "2",
    title: "What is the difference between Greedy and DP?",
    content:
      "Greedy chooses the best option at every step, whereas DP considers all options and caches them. Greedy is faster but doesn’t always yield optimal results. DP is safe but memory-intensive.",
    category: "For You",
    label: "DSA Concepts",
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
    postId: "3",
    title: "Tips for Cracking Medium-Level Graph Questions",
    content:
      "Always start by identifying if it's DFS, BFS, Union Find or Dijkstra. Dry run on paper before coding. Try practicing on undirected graphs before moving to directed/weighted ones.",
    category: "Interview",
    label: "Interview Prep",
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
    postId: "4",
    title: "How do you prepare for CP contests?",
    content:
      "Practice on Codeforces and AtCoder regularly. Keep track of your rating and participate in virtual contests. Learn STL and efficient debugging methods to save time.",
    category: "Career",
    label: "Competitive Programming",
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
  {
    postId: "5",
    title: "Mastering the Art of Problem Solving",
    content:
      "Problem solving is a skill that can be developed with practice. Break down problems into smaller parts, understand the underlying concepts, and apply them to different scenarios.",
    category: "Career",
    label: "General",
    tags: ["Problem Solving", "Tips", "Mindset"],
    author: {
      name: "Sneha Gupta",
      avatarUrl: "/avatars/user5.png",
    },
    createdAt: "2025-07-12T12:00:00Z",
    upvotes: 50,
    comments: 8,
    views: 250,
  },
  {
    postId: "6",
    title: "The Importance of Data Structures in Interviews",
    content:
      "Data structures are the building blocks of efficient algorithms. Understanding their properties and use cases can greatly improve your problem-solving skills in interviews.",
    category: "Interview",
    label: "Interview Prep",
    tags: ["Data Structures", "Algorithms", "Interview Tips"],
    author: {
      name: "Ravi Kumar",
      avatarUrl: "/avatars/user6.png",
    },
    createdAt: "2025-07-11T09:15:00Z",
    upvotes: 40,
    comments: 6,
    views: 180,
  },
  {
    postId: "7",
    title: "Effective Debugging Techniques",
    content:
      "Debugging is an essential skill for developers. Use print statements, debuggers, and rubber duck debugging to identify and fix issues in your code.",
    category: "Career",
    label: "General",
    tags: ["Debugging", "Tips", "Programming"],
    author: {
      name: "Aditi Verma",
      avatarUrl: "/avatars/user7.png",
    },
    createdAt: "2025-07-10T11:00:00Z",
    upvotes: 55,
    comments: 9,
    views: 220,
  },
  {
    postId: "8",
    title: "Understanding Time Complexity",
    content:
      "Time complexity is a way to express the amount of time an algorithm takes to complete as a function of the length of the input. It's crucial for evaluating the efficiency of algorithms.",
    category: "For You",
    label: "Algorithms",
    tags: ["Time Complexity", "Big O", "Algorithms"],
    author: {
      name: "Vikram Singh",
      avatarUrl: "/avatars/user8.png",
    },
    createdAt: "2025-07-09T15:30:00Z",
    upvotes: 65,
    comments: 11,
    views: 275,
  },
  {
    postId: "9",
    title: "Feedback: Community Moderation",
    content:
      "As the community grows, having more moderators or a reporting system for inappropriate content would be beneficial.",
    category: "Feedback",
    label: "Community",
    tags: ["Feedback", "Moderation", "Community"],
    author: {
      name: "Anjali Mehta",
      avatarUrl: "/avatars/user9.png",
    },
    createdAt: "2025-07-08T10:00:00Z",
    upvotes: 22,
    comments: 4,
    views: 75,
  },
  {
    postId: "10",
    title: "Feedback: Feature Requests",
    content:
      "It would be great to have more customization options for user profiles and the ability to follow specific topics.",
    category: "Feedback",
    label: "Community",
    tags: ["Feedback", "Feature Requests", "Community"],
    author: {
      name: "Ravi Kumar",
      avatarUrl: "/avatars/user6.png",
    },
    createdAt: "2025-07-07T09:15:00Z",
    upvotes: 30,
    comments: 5,
    views: 100,
  },
  {
    postId: "11",
    title: "Contest Preparation Tips",
    content:
      "Start with easy problems and gradually increase difficulty. Participate in mock contests and analyze your performance.",
    category: "Contest",
    label: "Preparation",
    tags: ["Contest", "Preparation", "Tips"],
    author: {
      name: "Anjali Mehta",
      avatarUrl: "/avatars/user9.png",
    },
    createdAt: "2025-07-08T10:00:00Z",
    upvotes: 22,
    comments: 4,
    views: 75,
  },
  {
    postId: "12",
    title: "Contest Strategy: Time Management",
    content:
      "Effective time management is crucial during contests. Practice pacing yourself and allocating time wisely to different problems.",
    category: "Contest",
    label: "Strategy",
    tags: ["Contest", "Time Management", "Strategy"],
    author: {
      name: "Ravi Kumar",
      avatarUrl: "/avatars/user6.png",
    },
    createdAt: "2025-07-07T09:15:00Z",
    upvotes: 30,
    comments: 5,
    views: 100,
  },
];
