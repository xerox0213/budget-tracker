import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useCategoryStore } from "../../src/stores/category/category-store";
import {
  Category,
  CategoryData,
  CategoryType,
} from "../../src/stores/category/category-types";
import { useTransactionStore } from "../../src/stores/transaction/transaction-store";

let categoryStore: ReturnType<typeof useCategoryStore>;

beforeEach(() => {
  setActivePinia(createPinia());
  categoryStore = useCategoryStore();
});

describe("add category action", () => {
  it("should add new category", () => {
    const categoryData: CategoryData = {
      icon: "😊",
      name: "cool",
      type: CategoryType.EXPENSE,
    };

    categoryStore.addCategory(categoryData);

    expect(categoryStore.categories[0]).toMatchObject(categoryData);
  });
});

describe("delete category action", () => {
  let transactionStore: ReturnType<typeof useTransactionStore>;

  beforeEach(() => {
    transactionStore = useTransactionStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should delete the given category", () => {
    const category: Category = {
      icon: "🤑",
      id: "1",
      name: "wait",
      type: CategoryType.INCOME,
    };
    const spy = vi.spyOn(transactionStore, "deleteTransactionByCategoryId");
    categoryStore.categories.push(category);

    categoryStore.deleteCategory(category.id);

    expect(categoryStore.categories).not.toContainEqual(category);
    expect(spy).toHaveBeenCalledWith(category.id);
  });
});

describe("view category", () => {
  it("should return the category", () => {
    const categoryId = "1";
    const category: Category = {
      icon: "🤑",
      id: categoryId,
      name: "wait",
      type: CategoryType.INCOME,
    };
    categoryStore.categories.push(category);

    const resultCategory = categoryStore.getCategory(categoryId);

    expect(resultCategory).toEqual(category);
  });

  it("should return undefined", () => {
    const categoryId = "1";

    const resultCategory = categoryStore.getCategory(categoryId);

    expect(resultCategory).toBeUndefined();
  });
});

describe("category exists action", () => {
  it("should return true", () => {
    const category: Category = {
      icon: "🤑",
      id: "1",
      name: "wait",
      type: CategoryType.INCOME,
    };
    categoryStore.categories.push(category);

    const categoryExists = categoryStore.categoryExists(category.id);

    expect(categoryExists).toBeTruthy();
  });

  it("should return false", () => {
    const categoryExists = categoryStore.categoryExists("1");

    expect(categoryExists).toBeFalsy();
  });
});
