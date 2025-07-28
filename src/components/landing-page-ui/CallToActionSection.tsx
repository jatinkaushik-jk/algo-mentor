import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CallToActionSection = () => {
  return (
    <section className="p-8 sm:p-20 text-center w-full mt-20">
      <h2 className="text-3xl font-semibold">Start Your Coding Journey Now!</h2>
      <p className="mt-4 text-lg">
        Join thousands of learners who are leveling up their coding skills with
        AlgoMentor.
      </p>
      <Button className="mt-6 bg-primary ">
        <Link href="/signup">Sign Up Today</Link>
      </Button>
    </section>
  );
};

export default CallToActionSection;
