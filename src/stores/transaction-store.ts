import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

import { transactionDataSchema } from "@/schemas/transaction-schema.ts";
import type { Category } from "@/types/category-type.ts";
import type { Transaction, TransactionData } from "@/types/transaction-type.ts";

const setup = () => {
  const transactions = ref<Transaction[]>([]);

  const store = (transactionData: TransactionData) => {
    transactionDataSchema.parse(transactionData);
    const transaction: Transaction = { id: uuidv4(), ...transactionData };
    transactions.value.push(transaction);
    return transaction;
  };

  const destroy = (transactionId: Transaction["id"]) => {
    transactions.value = transactions.value.filter(
      (transaction) => transaction.id !== transactionId,
    );
  };

  const destroyByCategoryId = (categoryId: Category["id"]) => {
    transactions.value = transactions.value.filter(
      (transaction) => transaction.categoryId !== categoryId,
    );
  };

  return {
    transactions,
    store,
    destroy,
    destroyByCategoryId,
  };
};

export const useTransactionStore = defineStore("transaction", setup);
