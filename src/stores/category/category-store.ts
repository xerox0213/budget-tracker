import { Category } from "@/stores/category/category-types.ts";
import { defineStore } from "pinia";
import { ref } from "vue";

const setupStore = () => {
  const categories = ref<Category[]>([]);

  return {
    categories,
  };
};

export const useCategoryStore = defineStore("category", setupStore);
