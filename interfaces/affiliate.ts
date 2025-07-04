export type filterTypeChartData = "weekly" | "monthly";

export interface AffiliateOverviewChartResponse {
  message: string;
  filterType: filterTypeChartData;
  last_report: {
    id: string;
    isApprove: string;
    createdAt: string;
    referalService: string;
    service: {
      name: string;
    };
  }[];
  totalServices: {
    name: string;
    pending: number;
    approved: number;
    rejected: number;
  }[];
  summaryPieChart: {
    label: string;
    value: number;
    percentage: number;
  }[];
}

export interface Upline {
  id: string;
  name: string;
  email: string;
}

export interface SubDownline {
  id: string;
  email: string;
}

export interface Downline {
  id: string;
  name: string | null;
  email: string;
  total_achievements: number;
  last_project: string | null;
  sub_downline: SubDownline | null;
  total_sub_downlines: number;
}

export interface AffiliateDownLineResponse {
  your_upline: Upline;
  downlines: Downline[];
  total_downlines: number;
  total_count: number;
  total_page: number;
  next_page: number | null;
  prev_page: number | null;
  count: number;
  message: string;
}

// Meta untuk pagination
export interface PaginationMeta {
  count: number;
  total_count: number;
  total_page: number;
}

// PaginatedResult agar `data` bukan array
export interface PaginatedResult<T> extends PaginationMeta {
  data: T; // <-- langsung T
}

// PaginatedResponse juga mengikuti
export interface PaginatedResponseAffDownline<T> {
  success: boolean;
  message: string;
  result: PaginatedResult<T>;
}
