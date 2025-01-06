import { computed, type Ref, toValue } from "vue";

import { useCategoryStore } from "@/stores/category-store.ts";
import type {
  Transaction,
  TransactionWithCategory,
} from "@/types/transaction-type.ts";

export const useTransactionsWithCategories = (
  transactions: Ref<Transaction[]>,
) => {
  const transactionsWithCategories = computed<TransactionWithCategory[]>(() => {
    const categoryStore = useCategoryStore();
    const result: TransactionWithCategory[] = [];

    for (const transaction of toValue(transactions)) {
      const category = categoryStore.view(transaction.categoryId);
      if (category) {
        result.push({
          ...transaction,
          category,
        });
      }
    }

    return result;
  });

  return {
    transactionsWithCategories,
  };
};
