"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Github, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas/loginSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleViewPassword() {
    setShowPassword((prevState) => !prevState); // Toggle the state
  }

  const handleLogin = async (formData: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    setError(null);
    console.log(formData);
    try {
      const res = await signIn("credentials", {
        ...formData,
        redirect: false, // Prevent automatic redirection
      });
      console.log("Sign-in response:", res);
      // Check if the response contains an error
      if (res?.error) {
        // Handle sign-in failure
        switch (res.error) {
          case "CredentialsSignin":
            setError("Invalid Credentials. Please try again.");
            break;

          default:
            setError("An unexpected error occurred. Please try again later.");
            break;
        }
      } else if (res?.ok) {
        // Handle successful sign-in
        router.push("/dashboard"); // Redirect to dashboard or desired page
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="w-full min-h-screen flex relative">
        <div className="absolute top-10 left-8">
          <h2 className="sm:text-3xl text-2xl font-bold text-primary lg:text-white text-nowrap">
            AlgoMentor
          </h2>
        </div>
        <section className="hidden lg:flex justify-center items-center lg:w-1/2 h-screen bg-black dark:bg-[rgb(24,24,27)] bg-[url(/images/primaryBG.webp)] bg-no-repeat bg-cover bg-center">
          <h3 className="text-4xl font-bold text-white w-max max-w-[80%]">
            Master Algorithms <br />
            with Your Socratic AI Mentor!
          </h3>
        </section>
        <section className="w-full lg:w-1/2 h-screen flex flex-col justify-center items-center relative">
          <div className="absolute right-8 top-10 flex justify-center items-center gap-x-2">
            <Button asChild variant="ghost">
              <Link href="/signup">Signup</Link>
            </Button>
            <ModeToggle></ModeToggle>
          </div>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(handleLogin)();
              }}
              className="w-2/3 space-y-4"
            >
              <div>
                <h2 className="scroll-m-20 text-4xl font-bold tracking-tight mb-8">
                  Login to account
                </h2>
              </div>
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
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full"
                value="Sign In"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
                Submit
              </Button>
            </form>
            <form
              action={async () => {
                signIn("github", { redirectTo: "/dashboard" });
              }}
              className="w-2/3"
            >
              <fieldset className="border-t-2 text-center mt-8">
                <legend className="px-3">or login with</legend>
                <Button
                  disabled={isLoading}
                  variant="outline"
                  className="w-full bg-black text-white hover:bg-muted mt-5"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}{" "}
                  <Github /> Sign in with GitHub
                </Button>
              </fieldset>
            </form>
          </Form>
        </section>
      </main>
    </>
  );
}

export default LoginPage;
