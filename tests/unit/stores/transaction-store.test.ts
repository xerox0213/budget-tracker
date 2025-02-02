import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

import { categoryTypeEnum } from "../../../src/schemas/category-schema";
import { useCategoryStore } from "../../../src/stores/category-store";
import { useTransactionStore } from "../../../src/stores/transaction-store";
import { Category } from "../../../src/types/category-type";
import {
  Transaction,
  TransactionData,
} from "../../../src/types/transaction-type";

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
      date: new Date(),
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
      date: new Date(),
      categoryId: category.id,
    };

    expect(() => transactionStore.store(invalidTransactionData)).toThrow(
      "amount",
    );
  });

  it("should fail if the date is not a date", () => {
    const invalidTransactionData: TransactionData = {
      amount: 23,
      date: "2022-01-12T00:00:00.000Z",
      categoryId: category.id,
    };

    expect(() => transactionStore.store(invalidTransactionData)).toThrow(
      "date",
    );
  });

  it("should fail if the category does not exist", () => {
    const invalidTransactionData: TransactionData = {
      amount: 23,
      date: new Date(),
      categoryId: "232",
    };

    expect(() => transactionStore.store(invalidTransactionData)).toThrow(
      "categoryId",
    );
  });
});

describe("destroy action", () => {
  it("should succeed", () => {
    const transaction: Transaction = {
      id: "1",
      amount: 33,
      date: "2024-12-21",
      categoryId: "1",
    };
    transactionStore.transactions.push(transaction);

    transactionStore.destroy(transaction.id);

    expect(transactionStore.transactions).not.toContainEqual(transaction);
  });
});

describe("destroy by category id action", () => {
  it("should succeed", () => {
    const categoryId = "1";
    for (let i = 0; i < 3; i++) {
      transactionStore.transactions.push({
        id: `${i}`,
        amount: 22,
        categoryId,
        date: "2024-12-21",
      });
    }

    transactionStore.destroyByCategoryId(categoryId);

    expect(transactionStore.transactions).toHaveLength(0);
  });
});
