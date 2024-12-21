import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

import { transactionDataSchema } from "@/schemas/transaction-schema.ts";
import { useCategoryStore } from "@/stores/category-store.ts";
import type { Transaction, TransactionData } from "@/types/transaction-type.ts";

const setup = () => {
  const transactions = ref<Transaction[]>([]);

  const store = (transactionData: TransactionData) => {
    transactionDataSchema.parse(transactionData);
    const categoryId = transactionData.categoryId;
    const category = useCategoryStore().view(categoryId);
    if (!category) throw new Error("The category does not exist");

    const transaction: Transaction = { id: uuidv4(), ...transactionData };
    transactions.value.push(transaction);
    return transaction;
  };

  return {
    transactions,
    store,
  };
};

export const useTransactionStore = defineStore("transaction", setup);
