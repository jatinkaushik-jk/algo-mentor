import React from "react";
import { ArrowLeftCircleIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { plans } from "./plans";

export default function PricingPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-6 left-6">
        <Link href={"/"} className="group flex items-center gap-x-1"><ArrowLeftCircleIcon className="text-primary group-hover:-translate-x-1 transition" /><span className="text-sm group-hover:underline underline-offset-2">Back to Home</span></Link>
      </div>
      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Choose Your Plan
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
          Simple and affordable pricing plans for individuals and teams. All
          prices are in <span className="font-semibold">INR/month</span>.
        </p>
        <div className="grid gap-8 md:grid-cols-3 px-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`${plan.name == "Pro" ? "bg-primary text-white" : "translate-y-8"}  rounded-3xl shadow-lg p-8 flex flex-col justify-between border-2 border-primary hover:shadow-2xl transition text-left`}
            >
              <div>
                {plan.name == "Pro" && (
                  <div className="flex justify-end">
                    <div className="bg-white/20 p-2 px-4 rounded-lg text-sm">
                      Popular
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-start mb-4 gap-x-4">
                  <div
                    className={`${plan.name == "Pro" ? "bg-white" : "bg-primary/20"} rounded-lg w-12 h-12 grid place-content-center`}
                  >
                    <plan.icon className={`text-primary`} />
                  </div>
                  <div className="text-start">
                    <h4
                      className={`${plan.name == "Pro" ? "text-gray-300" : "text-gray-600 dark:text-gray-300"} -mb-1`}
                    >
                      {plan.label}
                    </h4>
                    <h5 className="font-bold text-xl">{plan.name}</h5>
                  </div>
                </div>
                <p
                  className={`${plan.name == "Pro" ? "text-gray-300" : "text-gray-600 dark:text-gray-300"} mb-4`}
                >
                  {plan.description}
                </p>
                <p className="text-4xl font-bold mb-6">
                  ₹{plan.price}{" "}
                  <span
                    className={`${plan.name == "Pro" ? "text-gray-300" : "text-gray-600 dark:text-gray-300"} text-sm font-medium`}
                  >
                    ({plan.duration})
                  </span>
                </p>
                <p className="font-bold mb-4">What&apos;s included</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-center ${plan.name == "Pro" ? "text-gray-300 " : "text-gray-600 dark:text-gray-300 "}`}
                    >
                      <CheckIcon
                        className={`${plan.name == "Pro" ? "text-primary bg-white" : "text-white bg-primary"} w-5 h-5 p-1 mr-3 rounded-full`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant={plan.name == "Pro" ? "secondary" : "default"}
                className={`mt-16 py-6 rounded-full ${plan.name == "Pro" ? "bg-white text-primary hover:bg-gray-100" : ""} transition`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
