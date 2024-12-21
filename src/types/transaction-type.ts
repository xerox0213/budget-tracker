import { z } from "zod";

import { transactionDataSchema } from "@/schemas/transaction-schema.ts";
import type { Category } from "@/types/category-type.ts";

export type TransactionData = z.infer<typeof transactionDataSchema>;

export type Transaction = { id: string } & TransactionData;

export type TransactionWithCategory = Transaction & { category: Category };
