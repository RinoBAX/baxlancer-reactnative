// useOtpStore.ts
import { VerifyOtpNeedPaymentResponse } from "@/interfaces/auth";
import { create } from "zustand";

interface PaymentVerificationStore {
  needPaymentData: VerifyOtpNeedPaymentResponse | null;
  setNeedPaymentData: (data: VerifyOtpNeedPaymentResponse) => void;
  clearNeedPaymentData: () => void;
}

export const paymentVerificationStore = create<PaymentVerificationStore>(
  (set) => ({
    needPaymentData: null,
    setNeedPaymentData: (data) => set({ needPaymentData: data }),
    clearNeedPaymentData: () => set({ needPaymentData: null }),
  })
);
