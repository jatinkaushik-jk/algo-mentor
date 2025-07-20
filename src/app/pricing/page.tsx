import React from "react";
import { CheckIcon, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    label: "For Trial",
    price: 0,
    description: "Free plan for individuals",
    features: [
      "Access to public posts",
      "Basic discussion tools",
      "Community support",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    label: "For Regular",
    price: 299,
    description: "Advanced features for professionals",
    features: [
      "Everything in Free",
      "Create private posts",
      "Advanced analytics",
    ],
    cta: "Upgrade to Pro",
  },
  {
    name: "Mastery",
    label: "For Committed Learners",
    price: 799,
    description: "Collaborative tools for teams",
    features: [
      "Everything in Pro",
      "Team collaboration tools",
      "Custom branding",
    ],
    cta: "Get Team Plan",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h2>
        <p className="text-lg text-gray-600 mb-12">
          Simple and affordable pricing plans for individuals and teams. All prices are in <span className="font-semibold">INR/month</span>.
        </p>
        <div className="grid gap-8 md:grid-cols-3 px-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between border-2 border-primary hover:shadow-2xl transition text-left"
            >
              <div>
                <div className="flex items-center justify-start mb-4 gap-x-4">
                    <div className="rounded-lg bg-primary/20 w-12 h-12 grid place-content-center"><Circle className="text-primary"/></div>
                    <div className="text-start">
                        <h4 className="text-gray-600 font-semibold -mb-1">{plan.label}</h4>
                        <h5 className="font-bold text-xl">{plan.name}</h5>
                    </div>
                </div>
                <p className="font-medium text-gray-600 mb-4">
                  {plan.description}
                </p>
                <p className="text-4xl font-bold mb-6">
                  ₹{plan.price} <span className="text-sm font-medium text-gray-500">/month</span>
                </p>
                <p className="font-bold mb-4">What&apos;s included</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700 font-medium">
                        <CheckIcon className="w-5 h-5 p-1 text-white mr-3 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="mt-16 py-6 rounded-full">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
