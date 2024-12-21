import { z } from "zod";

export const transactionDataSchema = z.object({
  description: z.string().optional(),
  amount: z.number().positive(),
  categoryId: z.string(),
  date: z.string().date(),
});
