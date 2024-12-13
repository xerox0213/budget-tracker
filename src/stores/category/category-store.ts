import { categoryDataSchema } from "@/stores/category/category-schema.ts";
import { Category, CategoryData } from "@/stores/category/category-types.ts";
import { useTransactionStore } from "@/stores/transaction/transaction-store.ts";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

const setupStore = () => {
  const categories = ref<Category[]>([]);

  const addCategory = (categoryData: CategoryData): void => {
    categoryDataSchema.parse(categoryData);
    const category: Category = { ...categoryData, id: uuidv4() };
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
    addCategory,
    categories,
    categoryExists,
    deleteCategory,
    getCategory,
  };
};

export const useCategoryStore = defineStore("category", setupStore);
