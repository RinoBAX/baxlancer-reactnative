import {
  AffiliateDownLineResponse,
  AffiliateOverviewChartResponse,
  PaginatedResponseAffDownline,
} from "@/interfaces/affiliate";
import { apiFetch } from "@/lib/apiFetch";

export async function getAffiliateOverviewChart(
  filterType: "weekly" | "monthly" = "weekly"
): Promise<AffiliateOverviewChartResponse> {
  const queryParams = new URLSearchParams({ filterType });

  return apiFetch<AffiliateOverviewChartResponse>(
    `/affiliates/affiliate/chart/overview?${queryParams.toString()}`,
    {
      method: "GET",
      secure: true,
    }
  );
}

export async function getAffiliateDownLine(
  page: number = 1
): Promise<AffiliateDownLineResponse> {
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page.toString());
  return apiFetch<AffiliateDownLineResponse>(
    `/affiliates/affiliate/customer?${queryParams.toString()}`,
    {
      method: "GET",
      secure: true,
    }
  );
}
