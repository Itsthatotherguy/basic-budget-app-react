export interface Transaction {
  id: string;
  date: Date;
  description: string;
  category: any;
  amount: number;
  isReviewed: boolean;
}

export interface TransactionsResponse {
  transactions: Transaction[];
}
