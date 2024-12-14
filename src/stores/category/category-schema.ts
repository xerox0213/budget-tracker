import { z } from "zod";

export const CategoryType = z.enum(["income", "expense"]);

export const categoryDataSchema = z.object({
  icon: z.string().emoji(),
  name: z.string(),
});
