import client from "../../api/client";
import { AxiosError, AxiosResponse } from "axios";
import {
  CreateTransactionDto,
  ListTransactionsDto,
  UpdateTransactionDto,
  ViewTransactionDto,
} from "./store/models";

const baseUrl = "transaction";

enum TransactionErrors {
  MISSING_DATE = "MISSING_DATE",
  MISSING_DESCRIPTION = "MISSING_DESCRIPTION",
  MISSING_CATEGORY = "MISSING_CATEGORY",
  MISSING_AMOUNT = "MISSING_AMOUNT",
  MISSING_ID = "MISSING_ID",
  NOT_FOUND = "NOT_FOUND",
}

export async function create(
  dto: CreateTransactionDto
): Promise<ViewTransactionDto> {
  return new Promise((resolve, reject) => {
    client
      .post(baseUrl, dto)
      .then((response) => resolve(response.data))
      .catch((error: AxiosError<string[]>) => {
        if (!error.response) {
          reject(["An unknown error has occurred."]);
        }

        reject(determineErrorMessages([...error.response!.data]));
      });
  });
}

export async function read(): Promise<ListTransactionsDto> {
  return new Promise((resolve, reject) => {
    client
      .get(baseUrl)
      .then((response) => resolve(response.data))
      .catch((error: AxiosError<string[]>) => {
        if (!error.response) {
          reject(["An unknown error has occurred."]);
        }

        reject(determineErrorMessages([...error.response!.data]));
      });
  });
}

export function update(dto: UpdateTransactionDto): Promise<void> {
  return new Promise((resolve, reject) => {
    const { id, ...updateData } = dto;

    client
      .put(`${baseUrl}/${id}`, updateData)
      .then((response) => resolve(response.data))
      .catch((error: AxiosError<string[]>) => {
        if (!error.response) {
          reject(["An unknown error has occurred."]);
        }

        reject(determineErrorMessages([...error.response!.data]));
      });
  });
}

export function remove(id: string): Promise<AxiosResponse<void>> {
  return new Promise((resolve, reject) => {
    client
      .delete(`${baseUrl}/${id}`)
      .then((response) => resolve(response.data))
      .catch((error: AxiosError<string[]>) => {
        if (!error.response) {
          reject(["An unknown error has occurred."]);
        }

        reject(determineErrorMessages([...error.response!.data]));
      });
  });
}

function determineErrorMessages(errors: string[]) {
  return errors.map((error) => {
    switch (error) {
      case TransactionErrors.MISSING_DATE:
        return "A date is required.";
      case TransactionErrors.MISSING_DESCRIPTION:
        return "A description is required.";
      case TransactionErrors.MISSING_CATEGORY:
        return "An category is required.";
      case TransactionErrors.MISSING_AMOUNT:
        return "An amount is required.";
      case TransactionErrors.MISSING_ID:
        return "An ID is required.";
      case TransactionErrors.NOT_FOUND:
        return "No transaction was found.";
      default:
        return "An unknown error has occurred.";
    }
  });
}
