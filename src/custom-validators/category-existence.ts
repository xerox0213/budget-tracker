import { useCategoryStore } from "@/stores/category-store.ts";
import type { Category } from "@/types/category-type.ts";

const validator = (categoryId: Category["id"]) => {
  const categoryStore = useCategoryStore();
  return categoryStore.view(categoryId);
};

const message = "The category does not exist";

export const categoryExistence = {
  validator,
  message,
};
