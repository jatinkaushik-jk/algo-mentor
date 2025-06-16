import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .toLowerCase()
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
