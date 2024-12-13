import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

import { useCategoryStore } from "../../src/stores/category/category-store";
import {
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
