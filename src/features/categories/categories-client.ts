import client from "../../api/client";
import {
  CategoriesResponse,
  CategoryResponse,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "./store/models";

const baseUrl = "categories";

export function create(dto: CreateCategoryDto): Promise<CategoryResponse> {
  return client<CategoryResponse>(baseUrl, "POST", dto);
}

export function read(): Promise<CategoriesResponse> {
  return client<CategoriesResponse>(baseUrl, "GET");
}

export function update(dto: UpdateCategoryDto): Promise<void> {
  const { id, ...updateData } = dto;

  return client<void>(`${baseUrl}/${id}`, "PUT", updateData);
}

export function remove(id: string): Promise<void> {
  return client<void>(`${baseUrl}/${id}`, "DELETE");
}
