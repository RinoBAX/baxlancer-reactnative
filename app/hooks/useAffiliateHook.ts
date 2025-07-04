import {
  useAffDownLineStore,
  useAffOverviewChartStore,
} from "../store/affiliateStore";

export const useAffChartOverview = () => {
  const overviewDataChart = useAffOverviewChartStore(
    (state) => state.overviewData
  );
  const loading = useAffOverviewChartStore((state) => state.loading);
  const error = useAffOverviewChartStore((state) => state.error);
  const fetchAffOverviewCharts = useAffOverviewChartStore(
    (state) => state.fetchAffOverviewCharts
  );

  return {
    overviewDataChart,
    loading,
    error,
    fetchAffOverviewCharts,
  };
};

export const useAffDownLineHook = () => {
  const downLineData = useAffDownLineStore((state) => state.dataDownLines);
  const detailDownline = useAffDownLineStore(
    (state) => state.dataDownLineDetail
  );
  const loading = useAffDownLineStore((state) => state.loading);
  const error = useAffDownLineStore((state) => state.error);
  const totalCount = useAffDownLineStore((state) => state.totalCount);
  const totalPage = useAffDownLineStore((state) => state.totalPage);
  const currentPage = useAffDownLineStore((state) => state.currentPage);
  const setPage = useAffDownLineStore((state) => state.setPage);
  const fetchDownLine = useAffDownLineStore((state) => state.fetchAffDownLines);
  // const fetchDownlineDetail = useAffDownLineStore(
  //   (state) => state.fetchDownlineDetail
  // );
  return {
    downLineData,
    detailDownline,
    loading,
    error,
    totalCount,
    totalPage,
    currentPage,
    setPage,
    fetchDownLine,
    // fetchDownlineDetail,
  };
};
