import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

import { categoryTypeEnum } from "../../../src/schemas/category-schema";
import { useCategoryStore } from "../../../src/stores/category-store";
import { useTransactionStore } from "../../../src/stores/transaction-store";
import { Category } from "../../../src/types/category-type";
import { TransactionData } from "../../../src/types/transaction-type";

let transactionStore: ReturnType<typeof useTransactionStore>;
let categoryStore: ReturnType<typeof useCategoryStore>;

beforeEach(() => {
  setActivePinia(createPinia());
  transactionStore = useTransactionStore();
  categoryStore = useCategoryStore();
});

describe("store action", () => {
  let category: Category;

  beforeEach(() => {
    category = {
      id: "1",
      name: "matrix",
      icon: "🕶️",
      categoryType: categoryTypeEnum.enum.income,
    };
    categoryStore.categories.push(category);
  });

  it("should succeed", () => {
    const validTransactionData: TransactionData = {
      amount: 25,
      date: "2024-12-21",
      categoryId: category.id,
    };

    const storedTransaction = transactionStore.store(validTransactionData);

    expect(storedTransaction).toMatchObject(validTransactionData);
    expect(transactionStore.transactions).toEqual(
      expect.arrayContaining([expect.objectContaining(validTransactionData)]),
    );
  });

  it("should fail if the amount is not a positive number", () => {
    const invalidTransactionData: TransactionData = {
      amount: 0,
      date: "2024-12-21",
      categoryId: category.id,
    };

    expect(() => transactionStore.store(invalidTransactionData)).toThrow(
      "amount",
    );
  });

  it("should fail if the date is not a date in the format YYYY-MM-DD", () => {
    const invalidTransactionData: TransactionData = {
      amount: 23,
      date: "21-12-2024",
      categoryId: category.id,
    };

    expect(() => transactionStore.store(invalidTransactionData)).toThrow(
      "date",
    );
  });
});
