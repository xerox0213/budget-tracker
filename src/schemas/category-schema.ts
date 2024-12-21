import { z } from "zod";

export const categoryDataSchema = z.object({
  name: z.string().min(3),
  icon: z.string().emoji(),
  categoryType: z.enum(["income", "expense"]),
});
