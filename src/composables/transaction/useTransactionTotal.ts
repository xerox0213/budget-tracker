import { computed, type Ref, toValue } from "vue";

import type { Transaction } from "@/types/transaction-type.ts";

export const useTransactionTotal = (transactions: Ref<Transaction[]>) => {
  const total = computed(() => {
    return toValue(transactions).reduce((acc, t) => acc + t.amount, 0);
  });

  return { total };
};
