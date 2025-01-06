import { computed, type Ref, toValue } from "vue";

import { useCategoryStore } from "@/stores/category-store.ts";
import type { Category } from "@/types/category-type.ts";
import type { Transaction } from "@/types/transaction-type.ts";

export const useTransactionTypeFilter = (
  transactions: Ref<Transaction[]>,
  transactionType: Category["categoryType"],
) => {
  const filteredTransactions = computed<Transaction[]>(() => {
    const categoryStore = useCategoryStore();

    return toValue(transactions).filter((transaction) => {
      const category = categoryStore.view(transaction.categoryId);
      return category && category.categoryType === transactionType;
    });
  });

  return { filteredTransactions };
};
