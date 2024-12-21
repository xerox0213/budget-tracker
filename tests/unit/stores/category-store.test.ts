import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

import { useCategoryStore } from "../../../src/stores/category-store";
import { CategoryData } from "../../../src/types/category-type";

let categoryStore: ReturnType<typeof useCategoryStore>;

beforeEach(() => {
  setActivePinia(createPinia());
  categoryStore = useCategoryStore();
});

describe("store category action", () => {
  it("should succeed", () => {
    const validCategoryData = {
      name: "matrix",
      icon: "🕶️",
      categoryType: "income",
    };

    const storedCategory = categoryStore.storeCategory(validCategoryData);

    expect(storedCategory).toMatchObject(validCategoryData);
    expect(categoryStore.categories).toEqual(
      expect.arrayContaining([expect.objectContaining(validCategoryData)]),
    );
  });
});
