import { create } from "zustand";
import { PaginatedResponse, ServiceResponse } from "@/interfaces/service";
import { getServiceById, getServices } from "../api/service";

interface ServiceState {
  services: ServiceResponse[];
  serviceDetail: ServiceResponse | null;
  loading: boolean;
  error: string | null;
  fetchServices: () => Promise<void>;
  fetchServiceById: (id: string) => Promise<void>;
}

export const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  serviceDetail: null,
  loading: false,
  error: null,

  fetchServices: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getServices();
      set({ services: response.result.data, loading: false });
    } catch (error: any) {
      console.error("Error fetching services:", error);
      set({ loading: false, error: error.message || "Unknown error" });
    }
  },

  fetchServiceById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getServiceById(id);
      set({ serviceDetail: response, loading: false });
    } catch (error: any) {
      console.error("Error fetching service detail:", error);
      set({ loading: false, error: error.message || "Unknown error" });
    }
  },
}));
