import { useCategoryStore } from "@/stores/category-store.ts";
import type { Category } from "@/types/category-type.ts";
import type { Transaction } from "@/types/transaction-type.ts";

export const filterTransactionsByType = (
  transactions: Transaction[],
  type: Category["categoryType"],
) => {
  const categoryStore = useCategoryStore();

  return transactions.filter((transaction) => {
    const category = categoryStore.view(transaction.categoryId);
    return category && category.categoryType === type;
  });
};

export const getTotalTransactions = (transactions: Transaction[]) => {
  return transactions.reduce((acc, t) => acc + t.amount, 0);
};

export const getBalance = (totalIncome: number, totalExpense: number) => {
  return totalIncome - totalExpense;
};
