import { defineStore } from "pinia";
import { ref } from "vue";

import type { Category } from "@/types/category-type.ts";

const setup = () => {
  const categories = ref<Category[]>([]);

  return {
    categories,
  };
};

export const useCategoryStore = defineStore("category", setup);
