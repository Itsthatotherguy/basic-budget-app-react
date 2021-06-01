import client from "../../api/client";
import {
  CreateTransactionDto,
  TransactionResponse,
  TransactionsResponse,
} from "./store/models";

const baseUrl = "transactions";

export function read(): Promise<TransactionsResponse> {
  return client(`${baseUrl}/`, "GET");
}

export function create(
  dto: CreateTransactionDto
): Promise<TransactionResponse> {
  return client<TransactionResponse>(baseUrl, "POST", dto);
}

export function remove(id: string): Promise<void> {
  return client<void>(`${baseUrl}/${id}`, "DELETE");
}
