export interface Transaction {
  id: string;
  date: Date;
  description: string;
  category: any;
  amount: number;
}

export interface TransactionsResponse {
  transactions: Transaction[];
}

export interface CreateTransactionDto {
  date: string;
  description: string;
  category: string;
  amount: number;
}

export interface TransactionResponse {
  transaction: Transaction;
}
