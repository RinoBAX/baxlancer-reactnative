export interface Category {
  id: number;
  name: string;
  userId: string;
}

export interface CustomReportField {
  id: string;
  serviceId: string;
  key: string;
  label: string;
  type:
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
    | "URL"
    | string;
  required: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceResponse {
  id: string;
  categoryId: number;
  name: string;
  qty: number;
  picture: string | null;
  description: string | null;
  price: number;
  userId: string;
  referalService: string;
  createdAt: string;
  updatedAt: string;
  urlProject: string;
  ReportFieldDefinition: CustomReportField[];
  Category?: {
    name: string;
  };
}

export interface PaginationMeta {
  count: number;
  total_count: number;
  total_page: number;
}

export interface PaginatedResult<T> extends PaginationMeta {
  data: T[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  result: PaginatedResult<T>;
}
