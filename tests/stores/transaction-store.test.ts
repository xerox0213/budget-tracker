import { useCategoryStore } from "@/stores/category/category-store.ts";
import { useTransactionStore } from "@/stores/transaction/transaction-store.ts";
import { TransactionData } from "@/stores/transaction/transaction-types.ts";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

let transactionStore: ReturnType<typeof useTransactionStore>;
let categoryStore: ReturnType<typeof useCategoryStore>;

beforeEach(() => {
  setActivePinia(createPinia());
  transactionStore = useTransactionStore();
  categoryStore = useCategoryStore();
});

describe("add transaction action", () => {
  let transactionData: TransactionData;

  beforeEach(() => {
    transactionData = {
      amount: 22,
      categoryId: "1",
      date: "2024-12-14",
      description: "ok",
    };
    vi.restoreAllMocks();
  });

  it("should add the transaction", () => {
    const spy = vi.spyOn(categoryStore, "categoryExists");
    spy.mockReturnValue(true);

    transactionStore.addTransaction(transactionData);

    expect(transactionStore.transactions[0]).toMatchObject(transactionData);
  });

  it("should not add a new transaction if amount < 0", () => {
    transactionData.amount = -22;
    const spy = vi.spyOn(categoryStore, "categoryExists");
    spy.mockReturnValue(true);

    const callback = () => transactionStore.addTransaction(transactionData);

    expect(callback).toThrowError("amount");
  });

  it("should not add a new transaction if amount = 0", () => {
    transactionData.amount = 0;
    const spy = vi.spyOn(categoryStore, "categoryExists");
    spy.mockReturnValue(true);

    const callback = () => transactionStore.addTransaction(transactionData);

    expect(callback).toThrowError("amount");
  });
});
