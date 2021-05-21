import { BelongsTo } from "miragejs/-types";

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  category: BelongsTo<"category">;
  amount: number;
}
