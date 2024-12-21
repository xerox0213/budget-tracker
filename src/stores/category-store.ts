import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

import { categoryDataSchema } from "@/schemas/category-schema.ts";
import type { Category, CategoryData } from "@/types/category-type.ts";

const setup = () => {
  const categories = ref<Category[]>([]);

  const store = (categoryData: CategoryData) => {
    categoryDataSchema.parse(categoryData);
    const category: Category = { id: uuidv4(), ...categoryData };
    categories.value.push(category);
    return category;
  };

  return {
    categories,
    store,
  };
};

export const useCategoryStore = defineStore("category", setup);
