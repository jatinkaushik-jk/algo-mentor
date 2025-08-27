"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";

export default function LoginForm() {
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
    try {
      const res = await signIn("credentials", {
        ...formData,
        redirect: false, // Prevent automatic redirection
      });
      // console.log("Sign-in response:", res);
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
        toast.success("Login successful!");
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
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(handleLogin)();
        }}
        className="space-y-4 w-full"
      >
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
        className="w-full"
      >
        <fieldset className="border-t-2 text-center mt-8">
          <legend className="px-3">or login with</legend>
          <Button
            disabled={isLoading}
            variant="outline"
            className="w-full bg-black text-white hover:bg-muted mt-5"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
            <Github /> Sign in with GitHub
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
