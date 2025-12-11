import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import CTA_illustration from "@/assets/illustrations/cta-illustration.png"
import Vector from "@/assets/illustrations/vector-1.png"

const CallToActionSection = () => {
  return (
    <section className="lg:my-40 my-20">
      <div className="bg-gray-100 dark:bg-gray-800 w-full max-w-5xl rounded-2xl mx-auto px-8 sm:px-16 pt-16 pb-4 lg:py-0 text-start flex lg:flex-row flex-col items-center justify-between gap-20 overflow-hidden">
        <div>
          <div>
            <h2 className="text-3xl font-bold">
          Start Your Coding Journey Now!
        </h2>
        <p className="mt-3 text-base">
          Join thousands of learners who are leveling up their coding skills
          with AlgoMentor.
        </p>
        <Button className="mt-10 bg-black hover:bg-black/80 rounded-full">
          <Link href="/signup">Signup Today</Link>
        </Button>
          </div>
        </div>
        <div className="w-10/12 sm:w-8/12 lg:w-96 grid place-content-center my-10 relative">
          <Image src={CTA_illustration} alt="cta-illustration" className="relative z-10" />
          <Image src={Vector} alt="vector" className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 scale-[130%]" />
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
