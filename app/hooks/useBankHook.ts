import { useBankStore } from "../store/bankStore";

export const useBankHooks = () => {
  const banks = useBankStore((state) => state.banks);
  const bankDetail = useBankStore((state) => state.bankDetail);
  const loading = useBankStore((state) => state.loading);
  const error = useBankStore((state) => state.error);
  const fetchBanks = useBankStore((state) => state.fetchBanks);
  const fetchBankById = useBankStore((state) => state.fetchBankById);
  return { banks, bankDetail, loading, error, fetchBanks, fetchBankById };
};
