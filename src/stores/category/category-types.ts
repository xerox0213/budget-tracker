export enum CategoryType {
  EXPENSE = "expense",
  INCOME = "income",
}

export interface Category extends CategoryData {
  id: string;
}

export interface CategoryData {
  icon: string;
  name: string;
  type: CategoryType;
}
