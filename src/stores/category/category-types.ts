import {
  categoryDataSchema,
  CategoryType,
} from "@/stores/category/category-schema.ts";
import { z } from "zod";

export interface Category extends CategoryData {
  categoryType: z.infer<typeof CategoryType>;
  id: string;
}

export type CategoryData = z.infer<typeof categoryDataSchema>;
