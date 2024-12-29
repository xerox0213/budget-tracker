import type { Category } from "@/types/category-type.ts";

export const getLightCategoryColor = (
  categoryType: Category["categoryType"],
) => {
  return `${categoryType}-light`;
};

export const getDarkCategoryColor = (
  categoryType: Category["categoryType"],
) => {
  return `${categoryType}-dark`;
};
