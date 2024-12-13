import { useCategoryStore } from "@/stores/category/category-store.ts";
import { z } from "zod";

export const transactionDataSchema = z.object({
  amount: z.number().positive(),
  categoryId: z.string().refine((categoryId) => {
    return useCategoryStore().categoryExists(categoryId);
  }, "The category does not exist."),
  date: z.string().date(),
  description: z.string().optional(),
});
