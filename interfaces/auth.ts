// interfaces/auth.ts
export interface RegisterPayload {
  email: string;
  referrerId?: string;
  role: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
  type: string;
}

export interface ResendOtpPayload {
  email: string;
}

export interface LoginPayload {
  email: string;
}

export interface LoginResponse {
  status: string;
  message: string;
}

export interface VerifyOtpResponseBase {
  status: string;
  message: string;
}

export interface VerifyOtpLoginResponse extends VerifyOtpResponseBase {
  token: string;
  data: User;
}

// export type VerifyOtpResponse = VerifyOtpResponseBase | VerifyOtpLoginResponse;

export interface User {
  id: string;
  name?: string | null;
  email: string;
  phone?: string | null;
  referralCode: string;
  referrerId: string | null;
  role?: string;
  balance: number;
  total_withdrawal: number;
  total_earned: number;
  mitraRate: number;
  affiliateRate: number;
  googleId: string | null;
  verified: boolean;
  passwordResetToken: string | null;
  passwordResetExpires: string | null;
  createdAt: string;
  updatedAt: string;
}

// Interface untuk data registration fee
export interface RegistrationFeeData {
  id: string;
  userId: string;
  amount: number;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  mitraId?: string | null;
  affiliateId?: string | null;
  serviceId?: string | null;
  reportId?: string | null;
  qty?: number;
  totalPrice: number;
  paymentMethod?: string;
  feeRegisterId?: string;
  baseAmount?: number;
  discount?: DiscountRule;
  user: User;
}

export interface DiscountRule {
  id: string;
  referralCode: string;
  name: string;
  description: string;
  amount: number;
  appliesTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  serviceId?: string | null;
}

// Interface spesifik untuk NEED_PAYMENT response
export interface VerifyOtpNeedPaymentResponse extends VerifyOtpResponseBase {
  status: "NEED_PAYMENT";
  data: RegistrationFeeData;
}

// Interface spesifik untuk sukses login
export interface VerifyOtpLoginResponse extends VerifyOtpResponseBase {
  status: "SUCCESS";
  token: string;
  data: User;
}

// Tipe gabungan
export type VerifyOtpResponse =
  | VerifyOtpLoginResponse
  | VerifyOtpNeedPaymentResponse
  | VerifyOtpResponseBase;

export interface RegisterResponse {
  message: string;
  entity: User;
}
