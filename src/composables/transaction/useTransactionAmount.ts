import { computed, type Ref, toValue } from "vue";

import type { Transaction } from "@/types/transaction-type.ts";

export const useTransactionAmount = (transactions: Ref<Transaction[]>) => {
  const amount = computed(() => {
    return toValue(transactions).reduce((acc, t) => acc + t.amount, 0);
  });

  return { amount };
};
