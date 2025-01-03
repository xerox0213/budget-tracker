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
    const result: Transaction[] = [];

    for (const transaction of toValue(transactions)) {
      const category = categoryStore.view(transaction.categoryId);

      if (category && category.categoryType === transactionType) {
        result.push(transaction);
      }
    }

    return result;
  });

  return { filteredTransactions };
};
