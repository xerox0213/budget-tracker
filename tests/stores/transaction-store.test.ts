import { CategoryType } from "@/stores/category/category-schema.ts";
import { useCategoryStore } from "@/stores/category/category-store.ts";
import { Category } from "@/stores/category/category-types.ts";
import { useTransactionStore } from "@/stores/transaction/transaction-store.ts";
import {
  Transaction,
  TransactionData,
  TransactionWithCategory,
} from "@/stores/transaction/transaction-types.ts";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, MockInstance, vi } from "vitest";

let transactionStore: ReturnType<typeof useTransactionStore>;
let categoryStore: ReturnType<typeof useCategoryStore>;
let transactionData: TransactionData;
let transaction: Transaction;

beforeEach(() => {
  transactionData = {
    amount: 22,
    categoryId: "1",
    date: "2024-12-14",
    description: "ok",
  };
  transaction = {
    ...transactionData,
    id: "1",
  };
  setActivePinia(createPinia());
  transactionStore = useTransactionStore();
  categoryStore = useCategoryStore();
});

describe("add transaction action", () => {
  let spyCategoryExists: MockInstance<typeof categoryStore.categoryExists>;

  beforeEach(() => {
    spyCategoryExists = vi.spyOn(categoryStore, "categoryExists");
    spyCategoryExists.mockReturnValue(true);
  });

  it("should add the transaction", () => {
    transactionStore.addTransaction(transactionData);

    expect(transactionStore.transactions[0]).toMatchObject(transactionData);
  });

  it("should not add a new transaction if amount < 0", () => {
    transactionData.amount = -22;

    const callback = () => transactionStore.addTransaction(transactionData);

    expect(callback).toThrowError("amount");
  });

  it("should not add a new transaction if amount = 0", () => {
    transactionData.amount = 0;

    const callback = () => transactionStore.addTransaction(transactionData);

    expect(callback).toThrowError("amount");
  });

  it("should not add a new transaction if date is not in the yyyy-mm-dd format", () => {
    transactionData.date = "14-12-2024";

    const callback = () => transactionStore.addTransaction(transactionData);

    expect(callback).toThrowError("date");
  });

  it("should not add a new transaction if the category does not exist", () => {
    spyCategoryExists.mockReturnValueOnce(false);

    const callback = () => transactionStore.addTransaction(transactionData);

    expect(callback).toThrowError("categoryId");
  });
});

describe("delete transaction action", () => {
  it("should delete the transaction", () => {
    transactionStore.transactions.push(transaction);

    transactionStore.deleteTransaction(transaction.id);

    expect(transactionStore.transactions).not.toContain(transaction);
  });
});

describe("delete transaction by category id action", () => {
  it("should delete the transaction", () => {
    transactionStore.transactions.push(transaction);

    transactionStore.deleteTransactionByCategoryId(transaction.categoryId);

    expect(transactionStore.transactions).not.toContain(transaction);
  });
});

describe("computed properties", () => {
  let incomeCategory: Category;
  let expenseCategory: Category;
  let spyGetCategory: MockInstance<typeof categoryStore.getCategory>;
  let transactionsWithCategory: TransactionWithCategory[];

  beforeEach(() => {
    incomeCategory = {
      icon: "🤑",
      id: "1",
      name: "incomes",
      type: CategoryType.enum.income,
    };

    expenseCategory = {
      icon: "😠",
      id: "2",
      name: "expenses",
      type: CategoryType.enum.expense,
    };

    transactionsWithCategory = [];

    for (let index = 0; index < 5; index++) {
      const incomeTransaction: Transaction = {
        amount: 5,
        categoryId: incomeCategory.id,
        date: "2024-12-14",
        id: `${index}`,
      };
      transactionStore.transactions.push(incomeTransaction);
      transactionsWithCategory.push({
        ...incomeTransaction,
        category: incomeCategory,
      });
    }

    for (let index = 0; index < 5; index++) {
      const expenseTransaction: Transaction = {
        amount: 20,
        categoryId: expenseCategory.id,
        date: "2024-12-14",
        id: `${index}`,
      };
      transactionStore.transactions.push(expenseTransaction);
      transactionsWithCategory.push({
        ...expenseTransaction,
        category: expenseCategory,
      });
    }

    spyGetCategory = vi.spyOn(useCategoryStore(), "getCategory");

    spyGetCategory.mockImplementation((categoryId) => {
      if (categoryId === incomeCategory.id) return incomeCategory;
      else if (categoryId === expenseCategory.id) return expenseCategory;
    });
  });

  describe("income amount computed property", () => {
    it("should compute 25", () => {
      expect(transactionStore.incomeAmount).toBe(25);
    });
  });
});
