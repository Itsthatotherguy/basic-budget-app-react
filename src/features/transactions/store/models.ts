import { Category } from "../../categories/store/models";

export interface TransactionEntity {
  id: string;
  date: string;
  description: string;
  category: Category;
  amount: number;
}

export interface TransactionsResponse {
  transactions: TransactionEntity[];
}

export interface TransactionResponse {
  transaction: TransactionEntity;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  categoryId: string;
  amount: number;
}

export interface ListTransactionsDto {
  id: string;
  key: string;
  date: string;
  description: string;
  amount: number;
  category: {
    id: string;
    name: string;
  };
}

export interface CreateTransactionDto {
  date: string;
  description: string;
  categoryId: string;
  amount: number;
}

export interface UpdateTransactionDto {
  id: string;
  date: string;
  description: string;
  categoryId: string;
  amount: number;
}

export interface FormValues {
  date: Date;
  description: string;
  categoryId: string;
  amount: number;
}
