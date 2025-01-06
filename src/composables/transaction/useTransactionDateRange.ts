import { computed, ref, toValue } from "vue";

import { useTransactionStore } from "@/stores/transaction-store.ts";
import type { Transaction } from "@/types/transaction-type.ts";

export const useTransactionDateRange = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const transactionStore = useTransactionStore();

  const dateRange = ref<[Date, Date]>([today, tomorrow]);

  const transactions = computed<Transaction[]>(() => {
    return transactionStore.transactions.filter((transaction) => {
      if (toValue(dateRange)[0] && toValue(dateRange)[1]) {
        const startTimestamp = toValue(dateRange)[0].getTime();
        const endTimestamp = toValue(dateRange)[1].getTime();
        const transactionTimestamp = transaction.date.getTime();

        return (
          transactionTimestamp >= startTimestamp &&
          transactionTimestamp <= endTimestamp
        );
      }

      return false;
    });
  });

  return {
    dateRange,
    transactions,
  };
};
