import { Award, GraduationCap, ShieldHalfIcon } from "lucide-react";

export const plans = [
  {
    name: "Basic",
    label: "For Trial",
    icon: ShieldHalfIcon,
    price: 0,
    duration: "monthly",
    description: "Free plan for individuals",
    features: [
      "Access to 10+ learning modules",
      "Only 30 minutes of AI interaction per day",
      "Limited Community support",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    label: "For Regular",
    icon: Award,
    price: 299,
    duration: "monthly",
    description: "Advanced features for professionals",
    features: [
      "Access to 50+ learning modules",
      "Community support",
      "Access to analytics",
    ],
    cta: "Upgrade to Pro",
  },
  {
    name: "Mastery",
    label: "For Committed Learners",
    icon: GraduationCap,
    price: 799,
    duration: "monthly",
    description: "Collaborative tools for teams",
    features: [
      "Everything in Pro",
      "Access to all learning modules",
      "Advanced analytics",
    ],
    cta: "Get Mastery Plan",
  },
];