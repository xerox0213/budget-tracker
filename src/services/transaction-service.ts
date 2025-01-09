import { getDaysInMonth } from "@/services/date-service.ts";
import { useCategoryStore } from "@/stores/category-store.ts";
import type { Category } from "@/types/category-type.ts";
import type { Transaction } from "@/types/transaction-type.ts";

export const filterTransactionsByType = (
  transactions: Transaction[],
  type: Category["categoryType"],
) => {
  const categoryStore = useCategoryStore();

  return transactions.filter((transaction) => {
    const category = categoryStore.view(transaction.categoryId);
    return category && category.categoryType === type;
  });
};

export const getTotalTransactions = (transactions: Transaction[]) => {
  return transactions.reduce((acc, t) => acc + t.amount, 0);
};

export const getBalance = (totalIncome: number, totalExpense: number) => {
  return totalIncome - totalExpense;
};

export const getAvailableYears = (transactions: Transaction[]) => {
  const availableYears: Set<number> = new Set();

  for (const transaction of transactions) {
    availableYears.add(transaction.date.getFullYear());
  }

  return [...availableYears].sort((a, b) => a - b);
};

export const getTotalByMonth = (transactions: Transaction[], year: number) => {
  const monthsInYear = 12;
  const totalByMonth: number[] = new Array(monthsInYear).fill(0);

  for (const transaction of transactions) {
    const yearTransaction = transaction.date.getFullYear();
    if (yearTransaction === year) {
      const monthTransaction = transaction.date.getMonth();
      totalByMonth[monthTransaction] += transaction.amount;
    }
  }

  return totalByMonth;
};

export const getTotalByDay = (
  transactions: Transaction[],
  year: number,
  month: number,
) => {
  const daysInMonth = getDaysInMonth(year, month);
  const totalByDay: number[] = new Array(daysInMonth).fill(0);

  for (const transaction of transactions) {
    const yearTransaction = transaction.date.getFullYear();
    const monthTransaction = transaction.date.getMonth();
    if (yearTransaction === year && monthTransaction === month - 1) {
      const dayTransaction = transaction.date.getDate() - 1;
      totalByDay[dayTransaction] += transaction.amount;
    }
  }

  return totalByDay;
};
