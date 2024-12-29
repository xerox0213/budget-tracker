import type { Category } from "@/types/category-type.ts";

export const getLightCategoryColor = (
  categoryType: Category["categoryType"],
) => {
  switch (categoryType) {
    case "income":
      return "income-light";
    case "expense":
      return "expense-light";
  }
};

export const getDarkCategoryColor = (
  categoryType: Category["categoryType"],
) => {
  switch (categoryType) {
    case "income":
      return "income-dark";
    case "expense":
      return "expense-dark";
  }
};
