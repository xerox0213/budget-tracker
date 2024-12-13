import { Category } from "@/stores/category/category-types.ts";

export interface Transaction extends TransactionData {
  id: string;
}

export interface TransactionData {
  amount: number;
  categoryId: Category["id"];
  date: string;
  description?: string;
}

export interface TransactionWithCategory extends Transaction {
  category: Category;
}
