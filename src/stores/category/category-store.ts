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
      (category) => category.categoryType === CategoryType.enum.income,
    );
  });

  const addIncomeCategory = (categoryData: CategoryData) => {
    categoryDataSchema.parse(categoryData);
    const category: Category = {
      ...categoryData,
      categoryType: CategoryType.enum.income,
      id: uuidv4(),
    };
    categories.value.push(category);
  };

  const addExpenseCategory = (categoryData: CategoryData) => {
    categoryDataSchema.parse(categoryData);
    const category: Category = {
      ...categoryData,
      categoryType: CategoryType.enum.expense,
      id: uuidv4(),
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
    getCategory,
    incomeCategories,
  };
};

export const useCategoryStore = defineStore("category", setupStore);
