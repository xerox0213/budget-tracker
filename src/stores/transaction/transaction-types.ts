import { Category } from "@/stores/category/category-types.ts";
import { transactionDataSchema } from "@/stores/transaction/transaction-schema.ts";
import { z } from "zod";

export interface Transaction extends TransactionData {
  id: string;
}

export type TransactionData = z.infer<typeof transactionDataSchema>;

export interface TransactionWithCategory extends Transaction {
  category: Category;
}
