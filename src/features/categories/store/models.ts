export enum CategoryType {
  Income = "Income",
  Expenses = "Expenses",
}

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface CategoryResponse {
  category: Category;
}

export interface CreateCategoryDto {
  name: string;
  type: CategoryType;
}

export interface UpdateCategoryDto {
  id: string;
  name: string;
  type: CategoryType;
}

export interface CategoryFormValues {
  name: string;
  type: CategoryType;
}
