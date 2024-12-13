import { categoryDataSchema } from "@/stores/category/category-schema.ts";
import { z } from "zod";

export enum CategoryType {
  EXPENSE = "expense",
  INCOME = "income",
}

export interface Category extends CategoryData {
  id: string;
}

export type CategoryData = z.infer<typeof categoryDataSchema>;
