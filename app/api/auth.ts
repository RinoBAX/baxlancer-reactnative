import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  User,
  VerifyOtpLoginResponse,
  VerifyOtpPayload,
  VerifyOtpResponseBase,
} from "@/interfaces/auth";
import { apiFetch } from "@/lib/apiFetch";

type VerifyOtpResponse = VerifyOtpResponseBase | VerifyOtpLoginResponse;

export async function login(data: LoginPayload) {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    data,
  });
}

export async function register(data: RegisterPayload) {
  return apiFetch<RegisterResponse>("/auth/register/affiliate", {
    method: "POST",
    data,
  });
}

export async function verifyOtpEmail(data: VerifyOtpPayload) {
  return apiFetch<VerifyOtpResponse>("/auth/verify-otp", {
    method: "POST",
    data,
  });
}

export async function verifyOtpLogin(email: string, code: string) {
  return apiFetch<{ token: string }>("/auth/verify-otp-login", {
    method: "POST",
    data: { email, code },
  });
}

export async function resendOtpVerification(email: string) {
  return apiFetch<{ message: string }>("/auth/resend-email", {
    method: "POST",
    data: { email },
  });
}

export async function getAuthUserAffiliate() {
  return apiFetch<User>("/affiliates/affiliate/authorized", {
    method: "GET",
    secure: true,
  });
}
