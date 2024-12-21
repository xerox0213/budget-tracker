import { z } from "zod";

export const categoryTypeEnum = z.enum(["income", "expense"]);

export const categoryDataSchema = z.object({
  name: z.string().min(3),
  icon: z.string().emoji(),
  categoryType: categoryTypeEnum,
});
