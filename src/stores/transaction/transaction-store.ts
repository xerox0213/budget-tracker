import { useCategoryStore } from "@/stores/category/category-store.ts";
import {
  Transaction,
  TransactionWithCategory,
} from "@/stores/transaction/transaction-types.ts";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const setupStore = () => {
  const transactions = ref<Transaction[]>([]);

  const transactionsWithCategory = computed<TransactionWithCategory[]>(() => {
    const categoryStore = useCategoryStore();
    const transactionsWithCategory: TransactionWithCategory[] = [];

    for (const transaction of transactions.value) {
      const category = categoryStore.getCategory(transaction.categoryId);
      if (!category) continue;
      transactionsWithCategory.push({ ...transaction, category });
    }

    return transactionsWithCategory;
  });

  return {
    transactions,
    transactionsWithCategory,
  };
};

export const useTransactionStore = defineStore("transaction", setupStore);
