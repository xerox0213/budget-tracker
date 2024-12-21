import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

import { categoryDataSchema } from "@/schemas/category-schema.ts";
import type { Category, CategoryData } from "@/types/category-type.ts";

const setup = () => {
  const categories = ref<Category[]>([]);

  const storeCategory = (categoryData: CategoryData) => {
    categoryDataSchema.parse(categoryData);
    categories.value.push({ id: uuidv4(), ...categoryData });
  };

  return {
    categories,
    storeCategory,
  };
};

export const useCategoryStore = defineStore("category", setup);
