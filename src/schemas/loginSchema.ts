import {z} from "zod";

export const LoginSchema = z.object({
    email: z.string(),
    password: z.string()
})