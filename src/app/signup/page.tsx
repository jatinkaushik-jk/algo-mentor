import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import { Metadata } from "next";
import SignupForm from "./SignupForm";

export const metadata : Metadata = {
  title: "AlgoMentor Signup Page",
  description: "AlgoMentor Signup Page, Signup and get started your socratic learning jounrney through AlgoMentor."
}

function SignUpPage() {

  return (
    <>
      <main className="w-full min-h-screen flex relative">
        <div className="absolute top-10 left-8">
          <h2 className="sm:text-3xl text-2xl font-bold text-primary lg:text-white text-nowrap">
            AlgoMentor
          </h2>
        </div>
        <section className="hidden lg:flex lg:w-1/2 justify-center items-center h-screen bg-black dark:bg-[rgb(24,24,27)] bg-[url(/images/primaryBG.webp)] bg-no-repeat bg-cover bg-center">
          <h3 className="text-4xl font-bold text-white w-max max-w-[80%]">
            Master Algorithms <br />
            with Your Socratic AI Mentor!
          </h3>
        </section>
        <section className="w-full lg:w-1/2 h-screen flex flex-col justify-center items-center relative">
          <div className="absolute right-8 top-10 flex justify-center items-center gap-x-2">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <ModeToggle></ModeToggle>
          </div>
          <SignupForm />
        </section>
      </main>
    </>
  );
}

export default SignUpPage;
