import { CategoryType } from "@/stores/category/category-schema.ts";
import { useCategoryStore } from "@/stores/category/category-store.ts";
import { Category, CategoryData } from "@/stores/category/category-types.ts";
import { useTransactionStore } from "@/stores/transaction/transaction-store.ts";
import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
      type: CategoryType.enum.expense,
    };

    categoryStore.addCategory(categoryData);

    expect(categoryStore.categories[0]).toMatchObject(categoryData);
  });

  it("should not add category if icon is not an emoji", () => {
    const categoryData: CategoryData = {
      icon: "lol",
      name: "cool",
      type: CategoryType.enum.expense,
    };

    expect(() => categoryStore.addCategory(categoryData)).toThrowError("emoji");
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
      type: CategoryType.enum.income,
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
      type: CategoryType.enum.income,
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
      type: CategoryType.enum.income,
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
