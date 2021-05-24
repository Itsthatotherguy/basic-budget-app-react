import client from "../../api/client";
import { TransactionsResponse } from "./store/models";

const baseUrl = "transactions";

export function read(): Promise<TransactionsResponse> {
  return client(`${baseUrl}/`, "GET");
}
