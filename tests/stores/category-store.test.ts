import { CategoryType } from "@/stores/category/category-schema.ts";
import { useCategoryStore } from "@/stores/category/category-store.ts";
import { Category, CategoryData } from "@/stores/category/category-types.ts";
import { useTransactionStore } from "@/stores/transaction/transaction-store.ts";
import { createPinia, setActivePinia } from "pinia";
import { v4 as uuidv4 } from "uuid";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  MockInstance,
  vi,
} from "vitest";

let categoryStore: ReturnType<typeof useCategoryStore>;
let transactionStore: ReturnType<typeof useTransactionStore>;
let categoryData: CategoryData;
let expenseCategory: Category;

beforeEach(() => {
  setActivePinia(createPinia());
  categoryStore = useCategoryStore();
  transactionStore = useTransactionStore();
  categoryData = {
    icon: "😊",
    name: "wow",
  };
  expenseCategory = {
    categoryType: CategoryType.enum.expense,
    icon: "😠",
    id: uuidv4(),
    name: "expenses",
  };
  categoryStore.categories.push(expenseCategory);
});

describe("add income category action", () => {
  it("should success", () => {
    categoryStore.addIncomeCategory(categoryData);

    const expected = {
      ...categoryData,
      categoryType: CategoryType.enum.income,
    };
    const result = categoryStore.categories[0];

    expect(result).toMatchObject(expected);
  });

  it("should fail if the icon is not an emoji", () => {
    categoryData.icon = "emoji";

    expect(() => categoryStore.addIncomeCategory(categoryData)).toThrowError(
      "emoji",
    );
  });
});

describe("add expense category action", () => {
  it("should success", () => {
    categoryStore.addExpenseCategory(categoryData);

    const expected = {
      ...categoryData,
      categoryType: CategoryType.enum.expense,
    };
    const result = categoryStore.categories[0];

    expect(result).toMatchObject(expected);
  });

  it("should fail if the icon is not an emoji", () => {
    categoryData.icon = "emoji";

    expect(() => categoryStore.addExpenseCategory(categoryData)).toThrowError(
      "emoji",
    );
  });
});

describe("get category action", () => {
  it("should return the category", () => {
    const category = categoryStore.getCategory(expenseCategory.id);

    expect(category).toEqual(expenseCategory);
  });

  it("should return undefined", () => {
    const category = categoryStore.getCategory("1");

    expect(category).toBeUndefined();
  });
});

describe("category exists action", () => {
  it("should return true", () => {
    const exists = categoryStore.categoryExists(expenseCategory.id);

    expect(exists).toBeTruthy();
  });

  it("should return false", () => {
    const exists = categoryStore.categoryExists("1");

    expect(exists).toBeFalsy();
  });
});

describe("delete category action", () => {
  let spy: MockInstance<typeof transactionStore.deleteTransactionByCategoryId>;

  beforeEach(() => {
    spy = vi.spyOn(transactionStore, "deleteTransactionByCategoryId");
    spy.mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it("should success", () => {
    categoryStore.deleteCategory(expenseCategory.id);

    expect(spy).toHaveBeenCalledOnce();
    expect(categoryStore.categories).not.toContainEqual(expenseCategory);
  });
});
