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
});
