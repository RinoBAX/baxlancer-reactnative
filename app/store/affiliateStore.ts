import { create } from "zustand";
import {
  getAffiliateDownLine,
  getAffiliateOverviewChart,
} from "../api/affiliate";
import {
  AffiliateDownLineResponse,
  AffiliateOverviewChartResponse,
  filterTypeChartData,
} from "@/interfaces/affiliate";

interface AffiliateOverviewChartStore {
  overviewData: AffiliateOverviewChartResponse | null;
  loading: boolean;
  error: string | null;
  fetchAffOverviewCharts: (
    filterType?: filterTypeChartData
  ) => Promise<AffiliateOverviewChartResponse | null>;
}

interface AffiliateDownLineResponseState {
  dataDownLines: AffiliateDownLineResponse | null;
  dataDownLineDetail: AffiliateDownLineResponse | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
  totalPage: number;
  currentPage: number;
  setPage: (page: number) => void;
  fetchAffDownLines: (page?: number) => Promise<void>;
  // fetchAffDownLineById: (reportId: string) => Promise<void>;
}

export const useAffOverviewChartStore = create<AffiliateOverviewChartStore>(
  (set) => ({
    overviewData: null,
    loading: false,
    error: null,
    fetchAffOverviewCharts: async (filterType) => {
      set({ loading: true, error: null });

      try {
        const response = await getAffiliateOverviewChart(filterType);
        console.log("Affiliate Overview Response:", response);

        set({
          overviewData: response,
          loading: false,
        });
        return response;
      } catch (error: any) {
        console.error("Error fetching affiliate overview:", error);
        set({
          loading: false,
          error: error.message || "Unknown error occurred",
        });
        return null;
      }
    },
  })
);

export const useAffDownLineStore = create<AffiliateDownLineResponseState>(
  (set) => ({
    dataDownLines: null,
    dataDownLineDetail: null,
    loading: false,
    error: null,
    totalCount: 0,
    totalPage: 0,
    currentPage: 1,
    setPage: (page: number) => set({ currentPage: page }),
    fetchAffDownLines: async (page: number = 1) => {
      set({ loading: true, error: null });
      try {
        const res = await getAffiliateDownLine(page);
        console.log("data: ", res);
        set({
          dataDownLines: res,
          totalCount: res.total_count,
          totalPage: res.total_page,
          currentPage: page,
          loading: false,
        });
      } catch (error: any) {
        console.error("Error fetching aff reports:", error);
        set({ loading: false, error: error.message || "Unknown error" });
      }
    },
    // fetchAffDownLineById: async (reportId: string) => {},
  })
);
