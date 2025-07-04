import { create } from "zustand";
import { getBankById, getBanks } from "../api/bank";

interface BankState {
  banks: BankAccountResponse[];
  bankDetail: BankAccountResponse | null;
  loading: boolean;
  error: string | null;
  fetchBanks: () => Promise<void>;
  fetchBankById: (id: string) => Promise<void>;
}

export const useBankStore = create<BankState>((set) => ({
  banks: [],
  bankDetail: null,
  loading: false,
  error: null,
  fetchBanks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getBanks();
      set({ banks: response.result.data, loading: false });
    } catch (error: any) {
      console.error("Error fetching banks:", error);
      set({ loading: false, error: error.message || "Unknown error" });
    }
  },
  fetchBankById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getBankById(id);
      set({ bankDetail: response, loading: false });
    } catch (error: any) {
      console.error("Error fetching bank detail:", error);
      set({ loading: false, error: error.message || "Unknown error" });
    }
  },
}));
