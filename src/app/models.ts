export type RequestStatus = "idle" | "loading" | "succeeded" | "fail";

export interface ErrorResponse {
  error: {
    message: string;
  };
}
