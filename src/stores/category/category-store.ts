import { Category, CategoryData } from "@/stores/category/category-types.ts";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

const setupStore = () => {
  const categories = ref<Category[]>([]);

  const addCategory = (categoryData: CategoryData): void => {
    const category: Category = { ...categoryData, id: uuidv4() };
    categories.value.push(category);
  };

  const deleteCategory = (categoryId: Category["id"]): void => {
    categories.value = categories.value.filter(
      (category) => category.id !== categoryId,
    );
  };

  const getCategory = (categoryId: Category["id"]) =>
    categories.value.find((category) => category.id === categoryId);

  return {
    addCategory,
    categories,
    deleteCategory,
    getCategory,
  };
};

export const useCategoryStore = defineStore("category", setupStore);
