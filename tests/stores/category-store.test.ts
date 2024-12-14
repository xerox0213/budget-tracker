import { CategoryType } from "@/stores/category/category-schema.ts";
import { useCategoryStore } from "@/stores/category/category-store.ts";
import { CategoryData } from "@/stores/category/category-types.ts";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

let categoryStore: ReturnType<typeof useCategoryStore>;
let categoryData: CategoryData;

beforeEach(() => {
  setActivePinia(createPinia());
  categoryStore = useCategoryStore();
  categoryData = {
    icon: "😊",
    name: "wow",
  };
});

describe("add income category action", () => {
  it("should add new income category", () => {
    categoryStore.addIncomeCategory(categoryData);

    const expected = {
      ...categoryData,
      categoryType: CategoryType.enum.income,
    };
    const result = categoryStore.categories[0];

    expect(result).toMatchObject(expected);
  });

  it("should not add new income category if its icon is not an emoji", () => {
    categoryData.icon = "emoji";

    expect(() => categoryStore.addIncomeCategory(categoryData)).toThrowError(
      "emoji",
    );
  });
});
