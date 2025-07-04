export interface PaginationMeta {
  count: number;
  total_count: number;
  total_page: number;
  next_page?: number | null;
  prev_page?: number | null;
}

export interface PaginatedResult<T> extends PaginationMeta {
  data: T[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: PaginatedResult<T>;
}

export interface ReportAffResponse {
  id: string;
  referalAff: string;
  emailCustomer: string;
  referalService: string;
  isApprove: StatusReport;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    referralCode: string;
  };
  service: {
    name: string;
    price: number;
    referalService: string;
    urlProject: string;
    Category: {
      name: string;
    };
  };
  reportFieldResponse: ReportFieldResponse[];
}

export interface ReportFieldResponse {
  id: string;
  reportAffiliateId: string;
  reportFieldDefinitionId: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  ReportFieldDefinition: {
    key: string;
    label: string;
    type: TypeFieldInput;
  };
}

export type TypeFieldInput =
  | "TEXT"
  | "NUMBER"
  | "IMAGE"
  | "FILE"
  | "DATE"
  | "CHECKBOX"
  | "EMAIL"
  | "PASSWORD"
  | "RADIO"
  | "RANGE"
  | "TEL"
  | "URL";

export type StatusReport = "APPROVED" | "REJECTED" | "PENDING";
