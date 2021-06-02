import { createAction } from "@reduxjs/toolkit";

export enum CategoryType {
  Income = "Income",
  Expenses = "Expenses",
}

export interface Category {
  id: string;
  name: string;
  categoryType: CategoryType;
}

export interface ListCategoriesDto {
  categories: Category[];
}

export interface ViewCategoriesDto {
  category: Category;
}

export interface CreateCategoryDto {
  name: string;
  categoryType: CategoryType;
}

export interface UpdateCategoryDto extends CreateCategoryDto {
  id: string;
}

export interface CategoryFormValues extends CreateCategoryDto {}
