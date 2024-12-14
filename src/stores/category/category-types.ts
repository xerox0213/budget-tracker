import {
  categoryDataSchema,
  CategoryType,
} from "@/stores/category/category-schema.ts";
import { z } from "zod";

export interface Category extends CategoryData {
  id: string;
  type: z.infer<typeof CategoryType>;
}

export type CategoryData = z.infer<typeof categoryDataSchema>;
