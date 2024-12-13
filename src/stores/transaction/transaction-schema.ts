import { useCategoryStore } from "@/stores/category/category-store.ts";
import { z } from "zod";

const checkCategoryExistence = (categoryId: string) => {
  return useCategoryStore().categoryExists(categoryId);
};

export const transactionDataSchema = z.object({
  amount: z.number().positive(),
  categoryId: z
    .string()
    .refine(checkCategoryExistence, "The category does not exist"),
  date: z.string().date(),
  description: z.string().optional(),
});
