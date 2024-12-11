import { Transaction } from "@/stores/transaction/transaction-types.ts";
import { defineStore } from "pinia";
import { ref } from "vue";

const setupStore = () => {
  const transactions = ref<Transaction[]>([]);

  return {
    transactions,
  };
};

export const useTransactionStore = defineStore("transaction", setupStore);
