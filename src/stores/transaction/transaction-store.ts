import { CategoryType } from "@/stores/category/category-schema.ts";
import { useCategoryStore } from "@/stores/category/category-store.ts";
import { Category } from "@/stores/category/category-types.ts";
import { transactionDataSchema } from "@/stores/transaction/transaction-schema.ts";
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
      if (!category || category.type != CategoryType.enum.income) continue;
      amount += transaction.amount;
    }

    return amount;
  });

  const expenseAmount = computed<number>(() => {
    const categoryStore = useCategoryStore();
    let amount = 0;

    for (const transaction of transactions.value) {
      const category = categoryStore.getCategory(transaction.categoryId);
      if (!category || category.type != CategoryType.enum.expense) continue;
      amount += transaction.amount;
    }

    return amount;
  });

  const balanceAmount = computed<number>(() => {
    return incomeAmount.value - expenseAmount.value;
  });

  const addTransaction = (transactionData: TransactionData) => {
    transactionDataSchema.parse(transactionData);
    const transaction = { ...transactionData, id: uuidv4() };
    transactions.value.push(transaction);
  };

  const deleteTransaction = (transactionId: Transaction["id"]) => {
    transactions.value = transactions.value.filter(
      (transaction) => transaction.id !== transactionId,
    );
  };

  const deleteTransactionByCategoryId = (categoryId: Category["id"]) => {
    transactions.value = transactions.value.filter(
      (transaction) => transaction.categoryId !== categoryId,
    );
  };

  return {
    addTransaction,
    balanceAmount,
    deleteTransaction,
    deleteTransactionByCategoryId,
    expenseAmount,
    incomeAmount,
    transactions,
    transactionsWithCategory,
  };
};

export const useTransactionStore = defineStore("transaction", setupStore);
