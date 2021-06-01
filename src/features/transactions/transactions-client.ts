import client from "../../api/client";
import { CategoryType } from "../categories/store/models";
import {
  CreateTransactionDto,
  Transaction,
  TransactionEntity,
  TransactionResponse,
  TransactionsResponse,
  UpdateTransactionDto,
} from "./store/models";

const baseUrl = "transactions";

export async function read(): Promise<Transaction[]> {
  const response = await client<TransactionsResponse>(`${baseUrl}/`, "GET");

  return response.transactions.map((transaction) =>
    mapEntityToModel(transaction)
  );
}

export async function create(dto: CreateTransactionDto): Promise<Transaction> {
  const response = await client<TransactionResponse>(baseUrl, "POST", dto);

  return mapEntityToModel(response.transaction);
}

export function remove(id: string): Promise<void> {
  return client<void>(`${baseUrl}/${id}`, "DELETE");
}

export function update(dto: UpdateTransactionDto): Promise<void> {
  const { id, ...updateData } = dto;

  return client<void>(`${baseUrl}/${id}`, "PUT", updateData);
}

const mapEntityToModel = (entity: TransactionEntity): Transaction => ({
  id: entity.id,
  date: entity.date,
  description: entity.description,
  amount: entity.amount,
  categoryId: entity.category.id,
});
