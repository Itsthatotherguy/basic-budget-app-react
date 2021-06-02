import client from "../../api/client";
import { AxiosError } from "axios";
import {
  ListCategoriesDto,
  ViewCategoriesDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "./store/models";

enum CategoryErrors {
  CATEGORY_ALREADY_EXISTS = "CATEGORY_ALREADY_EXISTS",
  MISSING_NAME = "MISSING_NAME",
  MISSING_CATEGORY_TYPE = "MISSING_CATEGORY_TYPE",
  MISSING_ID = "MISSING_ID",
  NOT_FOUND = "NOT_FOUND",
}

const baseUrl = "category";

export function create(dto: CreateCategoryDto): Promise<ViewCategoriesDto> {
  return new Promise((resolve, reject) => {
    client
      .post(baseUrl, dto)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error: AxiosError<any>) => {
        if (!error.response) {
          reject(["An unknown error has occurred."]);
        }

        if (typeof error.response!.data.message === "string") {
          reject(determineErrorMessages([error.response!.data]));
        }

        reject(determineErrorMessages([...error.response!.data.message]));
      });
  });
}

export function read(): Promise<ListCategoriesDto> {
  return new Promise((resolve, reject) => {
    client
      .get(baseUrl)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error: AxiosError<string[]>) => {
        if (!error.response) {
          reject(["An unknown error has occurred."]);
        }

        reject(determineErrorMessages([...error.response!.data]));
      });
  });
}

export function update(dto: UpdateCategoryDto): Promise<void> {
  return new Promise((resolve, reject) => {
    const { id, ...updateData } = dto;

    client
      .put(`${baseUrl}/${id}`, updateData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error: AxiosError<string[]>) => {
        if (!error.response) {
          reject(["An unknown error has occurred."]);
        }

        reject(determineErrorMessages([...error.response!.data]));
      });
  });
}

export function remove(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    client
      .delete(`${baseUrl}/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error: AxiosError<string[] | string>) => {
        if (!error.response) {
          reject(["An unknown error has occurred."]);
        }

        if (typeof error.response!.data === "string") {
          reject(determineErrorMessages([error.response!.data]));
        }

        reject(determineErrorMessages(error.response!.data as string[]));
      });
  });
}

function determineErrorMessages(errors: string[]) {
  return errors.map((error) => {
    switch (error) {
      case CategoryErrors.MISSING_NAME:
        return "A name is required.";
      case CategoryErrors.MISSING_CATEGORY_TYPE:
        return "A category type is required.";
      case CategoryErrors.MISSING_ID:
        return "An ID is required.";
      case CategoryErrors.CATEGORY_ALREADY_EXISTS:
        return "A category like that already exists.";
      case CategoryErrors.NOT_FOUND:
        return "The category was not found.";
      default:
        return "An unknown error has occurred.";
    }
  });
}
