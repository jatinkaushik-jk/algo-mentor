import { Award, GraduationCap, ShieldHalfIcon } from "lucide-react";

export const labels = [
  {
    value: "sorting",
    label: "sorting",
  },
  {
    value: "searching",
    label: "searching",
  },
];

export const timeComplexity = [
  {
    value: "O(n^2)",
    label: "O(n^2)",
  },
  {
    value: "O(n log n)",
    label: "O(n log n)",
  },
  {
    value: "O(nk)",
    label: "O(nk)",
  },
  {
    value: "O(n + k)",
    label: "O(n + k)",
  },
  {
    value: "O(log n)",
    label: "O(log n)",
  },
  {
    value: "O(V + E)",
    label: "O(V + E)",
  },
  {
    value: "O(√n)",
    label: "O(√n)",
  },
  {
    value: "O(n)",
    label: "O(n)",
  },
];

export const difficulty = [
  {
    label: "Easy",
    value: "Easy",
    color: "#22c55e",
  },
  {
    label: "Medium",
    value: "Medium",
    color: "#eab308",
  },
  {
    label: "Hard",
    value: "Hard",
    color: "#ef4444",
  },
];

export const access = [
  {
    label: "FREE",
    value: "FREE",
    icon: ShieldHalfIcon,
    color: "#1CE3BB",
  },
  {
    label: "PRO",
    value: "PRO",
    icon: Award,
    color: "#1CA7E3",
  },
  {
    label: "MASTER",
    value: "MASTER",
    icon: GraduationCap,
    color: "#1C44E3",
  },
]
