import { create } from "zustand";
import { ReportAffResponse } from "@/interfaces/reportAff";
import { getReportAffDetail, getReportAffResp } from "../api/reportAff";

interface ReportAffState {
  reportAffResp: ReportAffResponse[];
  reportAffRespDetail: ReportAffResponse | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
  totalPage: number;
  currentPage: number;
  setPage: (page: number) => void;
  fetchAffReports: (status?: string, page?: number) => Promise<void>;
  fetchAffReportById: (reportId: string) => Promise<void>;
}

export const useReportAffStore = create<ReportAffState>((set, get) => ({
  reportAffResp: [],
  reportAffRespDetail: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalCount: 0,
  totalPage: 0,

  setPage: (page: number) => set({ currentPage: page }),

  fetchAffReports: async (status?: string, page: number = 1) => {
    set({ loading: true, error: null });
    try {
      const res = await getReportAffResp(status, page);
      console.log("data: ", res);
      set({
        reportAffResp: res.data?.data,
        totalCount: res.data?.total_count,
        totalPage: res.data?.total_page,
        currentPage: page,
        loading: false,
      });
    } catch (error: any) {
      console.error("Error fetching aff reports:", error);
      set({ loading: false, error: error.message || "Unknown error" });
    }
  },

  fetchAffReportById: async (reportId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getReportAffDetail(reportId);
      set({ reportAffRespDetail: response, loading: false });
    } catch (error: any) {
      console.error("Error fetching aff detail report:", error);
      set({ loading: false, error: error.message || "Unknown error" });
    }
  },
}));
