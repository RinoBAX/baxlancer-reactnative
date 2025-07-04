import { useServiceStore } from "../store/serviceStore";

export const useService = () => {
  const services = useServiceStore((s) => s.services);
  const serviceDetail = useServiceStore((s) => s.serviceDetail);
  const loading = useServiceStore((s) => s.loading);
  const error = useServiceStore((s) => s.error);
  const fetchServices = useServiceStore((s) => s.fetchServices);
  const fetchServiceById = useServiceStore((s) => s.fetchServiceById);

  return {
    services,
    serviceDetail,
    loading,
    error,
    fetchServices,
    fetchServiceById,
  };
};
