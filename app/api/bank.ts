import { apiFetch } from "@/lib/apiFetch";

export async function getBanks(): Promise<
  PaginatedResponse<BankAccountResponse>
> {
  return apiFetch<PaginatedResponse<BankAccountResponse>>("/bank", {
    method: "GET",
    secure: true,
  });
}

export async function getBankById(id: string): Promise<BankAccountResponse> {
  return apiFetch<BankAccountResponse>(`/bank/${id}`, {
    method: "GET",
    secure: true,
  });
}
