import { defineStore } from "pinia";
import { ref } from "vue";

import type { Transaction } from "@/types/transaction-type.ts";

const setup = () => {
  const transactions = ref<Transaction[]>([]);

  return {
    transactions,
  };
};

export const useTransactionStore = defineStore("transaction", setup);
