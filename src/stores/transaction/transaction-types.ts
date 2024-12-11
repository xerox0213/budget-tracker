import { Category } from "@/stores/category/category-types.ts";

export interface Transaction extends TransactionData, TransactionId {
  categoryId: Category["id"];
}

export interface TransactionData {
  amount: number;
  date: string;
  description?: string;
}

export interface TransactionWithCategory
  extends TransactionData,
    TransactionId {
  category: Category;
}

interface TransactionId {
  id: string;
}
