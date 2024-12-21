import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

import { categoryDataSchema } from "@/schemas/category-schema.ts";
import { useTransactionStore } from "@/stores/transaction-store.ts";
import type { Category, CategoryData } from "@/types/category-type.ts";

const setup = () => {
  const categories = ref<Category[]>([]);

  const store = (categoryData: CategoryData) => {
    categoryDataSchema.parse(categoryData);
    const category: Category = { id: uuidv4(), ...categoryData };
    categories.value.push(category);
    return category;
  };

  const view = (categoryId: Category["id"]) => {
    return categories.value.find(
      (category: Category) => category.id === categoryId,
    );
  };

  const destroy = (categoryId: Category["id"]) => {
    categories.value = categories.value.filter(
      (category) => category.id !== categoryId,
    );
    const transactionStore = useTransactionStore();
    transactionStore.destroyByCategoryId(categoryId);
  };

  return {
    categories,
    store,
    view,
    destroy,
  };
};

export const useCategoryStore = defineStore("category", setup);
