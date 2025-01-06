import { computed, type Ref, toValue } from "vue";

import { useTransactionTotal } from "@/composables/transaction/useTransactionTotal.ts";
import { useCategoryStore } from "@/stores/category-store.ts";
import type { Category, CategoryWithAnalytics } from "@/types/category-type.ts";
import type { Transaction } from "@/types/transaction-type.ts";

export const useCategoriesWithAnalytics = (
  transactions: Ref<Transaction[]>,
) => {
  const { total } = useTransactionTotal(transactions);

  const transactionsByCategory = computed(() => {
    const result = new Map<Category["id"], Transaction[]>();

    for (const transaction of toValue(transactions)) {
      const categoryTransactions = result.get(transaction.categoryId);

      if (categoryTransactions) {
        categoryTransactions.push(transaction);
      } else {
        result.set(transaction.categoryId, [transaction]);
      }
    }

    return result;
  });

  const categoriesWithAnalytics = computed<CategoryWithAnalytics[]>(() => {
    const categoryStore = useCategoryStore();
    const result: CategoryWithAnalytics[] = [];

    for (const [categoryId, transactions] of toValue(transactionsByCategory)) {
      const category = categoryStore.view(categoryId);

      if (category) {
        const transactionAmount = transactions.reduce(
          (acc, t) => acc + t.amount,
          0,
        );
        const part = Math.round((transactionAmount / toValue(total)) * 100);
        result.push({ ...category, transactionAmount, part });
      }
    }

    return result;
  });

  return { categoriesWithAnalytics };
};
