import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

import { useCategoryStore } from "../../src/stores/category/category-store";
import {
  Category,
  CategoryData,
  CategoryType,
} from "../../src/stores/category/category-types";

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
  it("should delete the given category", () => {
    const categoryId = "1";
    const category: Category = {
      icon: "🤑",
      id: categoryId,
      name: "wait",
      type: CategoryType.INCOME,
    };
    categoryStore.categories.push(category);

    categoryStore.deleteCategory(categoryId);

    expect(categoryStore.categories).not.toContainEqual(category);
  });
});
