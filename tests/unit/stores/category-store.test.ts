import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { categoryTypeEnum } from "../../../src/schemas/category-schema";
import { useCategoryStore } from "../../../src/stores/category-store";
import { useTransactionStore } from "../../../src/stores/transaction-store";
import { Category, CategoryData } from "../../../src/types/category-type";

let categoryStore: ReturnType<typeof useCategoryStore>;
let transactionStore: ReturnType<typeof useTransactionStore>;

beforeEach(() => {
  setActivePinia(createPinia());
  categoryStore = useCategoryStore();
  transactionStore = useTransactionStore();
});

describe("store action", () => {
  it("should succeed", () => {
    const validCategoryData = {
      name: "matrix",
      icon: "🕶️",
      categoryType: categoryTypeEnum.enum.income,
    };

    const storedCategory = categoryStore.store(validCategoryData);

    expect(storedCategory).toMatchObject(validCategoryData);
    expect(categoryStore.categories).toEqual(
      expect.arrayContaining([expect.objectContaining(validCategoryData)]),
    );
  });

  it("should fail if the name has not a mini of 3 chars", () => {
    const invalidCategoryData: CategoryData = {
      name: "ma",
      icon: "🕶️",
      categoryType: categoryTypeEnum.enum.expense,
    };

    expect(() => categoryStore.store(invalidCategoryData)).toThrowError("name");
  });

  it("should fail if the icon is not an emoji", () => {
    const invalidCategoryData: CategoryData = {
      name: "matrix",
      icon: "w",
      categoryType: categoryTypeEnum.enum.income,
    };

    expect(() => categoryStore.store(invalidCategoryData)).toThrowError("icon");
  });

  it("should fail if the category type is invalid", () => {
    const invalidCategoryData: CategoryData = {
      name: "matrix",
      icon: "🕶️",
      categoryType: "neo",
    };

    expect(() => categoryStore.store(invalidCategoryData)).toThrowError(
      "categoryType",
    );
  });
});

describe("view action", () => {
  it("should return the category", () => {
    const category: Category = {
      id: "1",
      name: "matrix",
      icon: "🕶️",
      categoryType: categoryTypeEnum.enum.income,
    };
    categoryStore.categories.push(category);

    const viewedCategory = categoryStore.view(category.id);

    expect(viewedCategory).toEqual(category);
  });

  it("should return undefined", () => {
    const viewedCategory = categoryStore.view("1");

    expect(viewedCategory).toBeUndefined();
  });
});

describe("destroy action", () => {
  it("should succeed", () => {
    const category: Category = {
      id: "1",
      name: "matrix",
      icon: "🕶️",
      categoryType: categoryTypeEnum.enum.income,
    };
    const spy = vi.spyOn(transactionStore, "destroyByCategoryId");
    spy.mockImplementationOnce(() => {});
    categoryStore.categories.push(category);

    categoryStore.destroy(category.id);

    expect(spy).toHaveBeenCalledWith(category.id);
    expect(categoryStore.categories).not.toContainEqual(category);
  });
});
