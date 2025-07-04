import { paymentVerificationStore } from "../store/paymentVerificationStore";

export const usePaymentVerificationHooks = () => {
  const needPaymentData = paymentVerificationStore(
    (state) => state.needPaymentData
  );
  const setNeedPaymentData = paymentVerificationStore(
    (state) => state.setNeedPaymentData
  );
  const clearNeedPaymentData = paymentVerificationStore(
    (state) => state.clearNeedPaymentData
  );

  return { needPaymentData, setNeedPaymentData, clearNeedPaymentData };
};
