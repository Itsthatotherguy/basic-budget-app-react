import { Category } from "../../categories/store/models";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: Category;
  amount: number;
  balance: number | null;
}

export interface ViewTransactionDto {
  transaction: Transaction;
}

export interface ListTransactionsDto {
  transactions: Transaction[];
}

export interface CreateTransactionDto {
  date: string;
  description: string;
  categoryId: string;
  amount: number;
}

export interface UpdateTransactionDto extends CreateTransactionDto {
  id: string;
}

export interface FormValues extends CreateTransactionDto {}
