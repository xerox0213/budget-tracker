import {
  categoryDataSchema,
  CategoryType,
} from "@/stores/category/category-schema.ts";
import { Category, CategoryData } from "@/stores/category/category-types.ts";
import { useTransactionStore } from "@/stores/transaction/transaction-store.ts";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { computed, ref } from "vue";

const setupStore = () => {
  const categories = ref<Category[]>([]);

  const incomeCategories = computed<Category[]>(() => {
    return categories.value.filter(
      (category) => category.type === CategoryType.enum.income,
    );
  });

  const expenseCategories = computed<Category[]>(() => {
    return categories.value.filter(
      (category) => category.type === CategoryType.enum.expense,
    );
  });

  const addIncomeCategory = (categoryData: CategoryData) => {
    categoryDataSchema.parse(categoryData);
    const category: Category = {
      ...categoryData,
      id: uuidv4(),
      type: CategoryType.enum.income,
    };
    categories.value.push(category);
  };

  const addExpenseCategory = (categoryData: CategoryData) => {
    categoryDataSchema.parse(categoryData);
    const category: Category = {
      ...categoryData,
      id: uuidv4(),
      type: CategoryType.enum.expense,
    };
    categories.value.push(category);
  };

  const deleteCategory = (categoryId: Category["id"]): void => {
    const transactionStore = useTransactionStore();

    categories.value = categories.value.filter(
      (category) => category.id !== categoryId,
    );
    transactionStore.deleteTransactionByCategoryId(categoryId);
  };

  const getCategory = (categoryId: Category["id"]) =>
    categories.value.find((category) => category.id === categoryId);

  const categoryExists = (categoryId: Category["id"]) =>
    getCategory(categoryId) != undefined;

  return {
    addExpenseCategory,
    addIncomeCategory,
    categories,
    categoryExists,
    deleteCategory,
    expenseCategories,
    getCategory,
    incomeCategories,
  };
};

export const useCategoryStore = defineStore("category", setupStore);
