"use client";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { useRouter } from "next/navigation";

function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  // Handle form submission
  async function handleSignUp(formData: z.infer<typeof SignUpSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      // Send the form data to the API
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.status === 200) {
        console.log("User registered successfully");
        alert("User registered successfully");
        // Redirect to login page
        router.push("/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
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
                      <Input placeholder="username" {...field} required />
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
                        required
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
                          required
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
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div>
                <Button disabled={isLoading} className="w-full mt-5">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </div>
              <p className="text-sm mt-10">
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
