import { useCategoryStore } from "@/stores/category/category-store.ts";
import { CategoryType } from "@/stores/category/category-types.ts";
import {
  Transaction,
  TransactionData,
  TransactionWithCategory,
} from "@/stores/transaction/transaction-types.ts";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
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

  const incomeAmount = computed<number>(() => {
    const categoryStore = useCategoryStore();
    let amount = 0;

    for (const transaction of transactions.value) {
      const category = categoryStore.getCategory(transaction.categoryId);
      if (!category || category.type != CategoryType.INCOME) continue;
      amount += transaction.amount;
    }

    return amount;
  });

  const expenseAmount = computed<number>(() => {
    const categoryStore = useCategoryStore();
    let amount = 0;

    for (const transaction of transactions.value) {
      const category = categoryStore.getCategory(transaction.categoryId);
      if (!category || category.type != CategoryType.EXPENSE) continue;
      amount += transaction.amount;
    }

    return amount;
  });

  const balanceAmount = computed<number>(() => {
    return incomeAmount.value - expenseAmount.value;
  });

  const addTransaction = (transactionData: TransactionData) => {
    const amount = transactionData.amount;
    if (amount <= 0) throw new Error("Amount must be greater than 0");

    const transaction = { ...transactionData, id: uuidv4() };
    transactions.value.push(transaction);
  };

  const deleteTransaction = (transactionId: Transaction["id"]) => {
    transactions.value = transactions.value.filter(
      (transaction) => transaction.id !== transactionId,
    );
  };

  return {
    addTransaction,
    balanceAmount,
    deleteTransaction,
    expenseAmount,
    incomeAmount,
    transactions,
    transactionsWithCategory,
  };
};

export const useTransactionStore = defineStore("transaction", setupStore);
