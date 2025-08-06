import { z } from "zod";

export const algorithmSchema = z.object({
  algoID: z.string(),
  title: z.string(),
  description: z.string(),
  timeComplexity: z.string(),
  label: z.string(),
  difficulty: z.string(),
  access: z.string(),
});

export type Task = z.infer<typeof algorithmSchema>;
