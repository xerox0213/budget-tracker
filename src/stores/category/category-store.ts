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

  return {
    addCategory,
    categories,
  };
};

export const useCategoryStore = defineStore("category", setupStore);
