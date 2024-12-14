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
let expenseCategories: Category[];
let incomeCategories: Category[];

beforeEach(() => {
  setActivePinia(createPinia());
  categoryStore = useCategoryStore();
  transactionStore = useTransactionStore();
  categoryData = {
    icon: "😊",
    name: "wow",
  };

  incomeCategories = [];
  for (let index = 0; index < 5; index++) {
    const incomeCategory: Category = {
      icon: "😍",
      id: uuidv4(),
      name: "enfant du monde",
      type: CategoryType.enum.income,
    };
    categoryStore.categories.push(incomeCategory);
    incomeCategories.push(incomeCategory);
  }

  expenseCategories = [];
  for (let index = 0; index < 5; index++) {
    const expenseCategory: Category = {
      icon: "😍",
      id: uuidv4(),
      name: "last dance",
      type: CategoryType.enum.expense,
    };
    categoryStore.categories.push(expenseCategory);
    expenseCategories.push(expenseCategory);
  }
});

describe("add income category action", () => {
  it("should success", () => {
    categoryStore.addIncomeCategory(categoryData);

    const expected = {
      ...categoryData,
      type: CategoryType.enum.income,
    };

    expect(categoryStore.categories).toEqual(
      expect.arrayContaining([expect.objectContaining(expected)]),
    );
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
      type: CategoryType.enum.expense,
    };
    expect(categoryStore.categories).toEqual(
      expect.arrayContaining([expect.objectContaining(expected)]),
    );
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
    const category = categoryStore.getCategory(incomeCategories[0].id);

    expect(category).toEqual(incomeCategories[0]);
  });

  it("should return undefined", () => {
    const category = categoryStore.getCategory("1");

    expect(category).toBeUndefined();
  });
});

describe("category exists action", () => {
  it("should return true", () => {
    const exists = categoryStore.categoryExists(expenseCategories[0].id);

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
    categoryStore.deleteCategory(expenseCategories[0].id);

    expect(spy).toHaveBeenCalledOnce();
    expect(categoryStore.categories).not.toContainEqual(expenseCategories[0]);
  });
});

describe("income categories computed property", () => {
  it("should success", () => {
    expect(categoryStore.incomeCategories).toMatchObject(incomeCategories);
  });
});

describe("expense categories computed property", () => {
  it("should success", () => {
    expect(categoryStore.expenseCategories).toMatchObject(expenseCategories);
  });
});
