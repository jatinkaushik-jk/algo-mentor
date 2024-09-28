"use client";
// import React from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpSchema } from "@/schemas/signUpSchema";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import { useState } from "react";

function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function handleViewPassword() {
    setShowPassword((prevState) => !prevState); // Toggle the state
  }

  function onSubmit(data: z.infer<typeof SignUpSchema>) {
    setIsLoading(true);
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <>
      <main className="w-full min-h-screen flex relative">
        <div className="absolute top-10 left-8">
          <h2 className="sm:text-3xl text-2xl font-bold text-primary lg:text-white text-nowrap">
            AlgoMentor
          </h2>
        </div>
        <section className="hidden lg:flex lg:w-1/2 justify-center items-center h-screen bg-black dark:bg-[rgb(24,24,27)] bg-[url(/images/primaryBG.webp)] bg-no-repeat bg-cover bg-center">
          <h3 className="text-4xl font-bold w-max max-w-[80%]">
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-4"
            >
              <div>
                <h2 className="scroll-m-20 text-4xl font-bold tracking-tight mb-8">
                  Create an account
                </h2>
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="password"
                          {...field}
                        />
                        <div
                          className="cursor-pointer absolute top-1/2 right-4 translate-y-[-50%]"
                          onClick={handleViewPassword}
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
              <p className="text-sm">
                By creating your account, you agree to the{" "}
                <a
                  href="http://github.com/jatinkaushik-jk/algomentor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="http://github.com/jatinkaushik-jk/algomentor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Privacy Notice
                </a>
                .
              </p>
            </form>
          </Form>
        </section>
      </main>
    </>
  );
}

export default SignUpPage;
