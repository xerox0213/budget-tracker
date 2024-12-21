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

  it("should fail if the name has not a mini of 3 chars", () => {
    const invalidCategoryData: CategoryData = {
      name: "ma",
      icon: "🕶️",
      categoryType: "income",
    };

    expect(() => categoryStore.storeCategory(invalidCategoryData)).toThrowError(
      "name",
    );
  });

  it("should fail if the icon is not an emoji", () => {
    const invalidCategoryData: CategoryData = {
      name: "matrix",
      icon: "w",
      categoryType: "income",
    };

    expect(() => categoryStore.storeCategory(invalidCategoryData)).toThrowError(
      "icon",
    );
  });

  it("should fail if the category type is invalid", () => {
    const invalidCategoryData: CategoryData = {
      name: "matrix",
      icon: "🕶️",
      categoryType: "neo",
    };

    expect(() => categoryStore.storeCategory(invalidCategoryData)).toThrowError(
      "categoryType",
    );
  });
});
