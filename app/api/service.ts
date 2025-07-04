import { apiFetch } from "@/lib/apiFetch";
import { PaginatedResponse, ServiceResponse } from "@/interfaces/service";

export async function getServices(): Promise<
  PaginatedResponse<ServiceResponse>
> {
  return apiFetch<PaginatedResponse<ServiceResponse>>("/services/service", {
    method: "GET",
    secure: true,
  });
}

export async function getServiceById(id: string): Promise<ServiceResponse> {
  return apiFetch<ServiceResponse>(`/services/service/${id}`, {
    method: "GET",
    secure: true,
  });
}
