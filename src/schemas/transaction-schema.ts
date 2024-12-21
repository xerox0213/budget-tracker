import { z } from "zod";

import { categoryExistence } from "@/custom-validators/category-existence.ts";

export const transactionDataSchema = z.object({
  description: z.string().optional(),
  amount: z.number().positive(),
  categoryId: z
    .string()
    .refine(categoryExistence.validator, categoryExistence.message),
  date: z.string().date(),
});
