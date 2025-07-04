import { useReportAffStore } from "../store/reportAffStore";

export const useReportAff = () => {
  const reportAffResp = useReportAffStore((s) => s.reportAffResp);
  const reportAffRespDetail = useReportAffStore((s) => s.reportAffRespDetail);
  const loading = useReportAffStore((s) => s.loading);
  const error = useReportAffStore((s) => s.error);
  const currentPage = useReportAffStore((s) => s.currentPage);
  const totalCount = useReportAffStore((s) => s.totalCount);
  const totalPage = useReportAffStore((s) => s.totalPage);
  const setPage = useReportAffStore((s) => s.setPage);
  const fetchAffReports = useReportAffStore((s) => s.fetchAffReports);
  const fetchAffReportById = useReportAffStore((s) => s.fetchAffReportById);

  return {
    reportAffResp,
    reportAffRespDetail,
    loading,
    error,
    currentPage,
    totalCount,
    totalPage,
    setPage,
    fetchAffReports, // fetchAffReports("APPROVED", 2)
    fetchAffReportById,
  };
};
