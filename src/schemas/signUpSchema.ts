import { z } from "zod";

export const usernameValidation = z
.string()
.min(3, "Username must contain at least 3 characters")
.max(20, "Username must not exceed 20 characters")
.regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")

export const SignUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid Email address"}),
    password: z.string().min(8,{message: "Password must contain at least 8 characters"})
})
