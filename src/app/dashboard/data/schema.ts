import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const algorithmSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  timeComplexity: z.string(),
  label: z.string(),
  difficulty: z.string(),
})

export type Task = z.infer<typeof algorithmSchema>
