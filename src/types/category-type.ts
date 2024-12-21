import { z } from "zod";

import type { categoryDataSchema } from "@/schemas/category-schema.ts";

export type CategoryData = z.infer<typeof categoryDataSchema>;

export type Category = { id: string } & CategoryData;
