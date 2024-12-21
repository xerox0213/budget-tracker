import { z } from "zod";

import { categoryExistence } from "@/checkers/category-existence.ts";

export const transactionDataSchema = z.object({
  description: z.string().optional(),
  amount: z.number().positive(),
  categoryId: z
    .string()
    .refine(categoryExistence.checker, categoryExistence.message),
  date: z.string().date(),
});
