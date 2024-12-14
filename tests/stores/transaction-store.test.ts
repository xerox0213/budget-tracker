import { useCategoryStore } from "@/stores/category/category-store.ts";
import { useTransactionStore } from "@/stores/transaction/transaction-store.ts";
import {
  Transaction,
  TransactionData,
} from "@/stores/transaction/transaction-types.ts";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, MockInstance, vi } from "vitest";

let transactionStore: ReturnType<typeof useTransactionStore>;
let categoryStore: ReturnType<typeof useCategoryStore>;

beforeEach(() => {
  setActivePinia(createPinia());
  transactionStore = useTransactionStore();
  categoryStore = useCategoryStore();
});

describe("add transaction action", () => {
  let transactionData: TransactionData;
  let spyCategoryExists: MockInstance<typeof categoryStore.categoryExists>;

  beforeEach(() => {
    transactionData = {
      amount: 22,
      categoryId: "1",
      date: "2024-12-14",
      description: "ok",
    };
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
  let transaction: Transaction;

  beforeEach(() => {
    transaction = {
      amount: 22,
      categoryId: "1",
      date: "2024-14-12",
      id: "1",
    };
    transactionStore.transactions.push(transaction);
  });

  it("should delete the transaction", () => {
    transactionStore.deleteTransaction(transaction.id);

    expect(transactionStore.transactions).not.toContain(transaction);
  });
});

describe("delete transaction by category id action", () => {
  let transaction: Transaction;

  beforeEach(() => {
    transaction = {
      amount: 22,
      categoryId: "1",
      date: "2024-14-12",
      id: "1",
    };
    transactionStore.transactions.push(transaction);
  });

  it("should delete the transaction", () => {
    transactionStore.deleteTransactionByCategoryId(transaction.categoryId);

    expect(transactionStore.transactions).not.toContain(transaction);
  });
});
