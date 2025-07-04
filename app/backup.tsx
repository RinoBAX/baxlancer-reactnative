import { Card } from "@/components/Cards";
import NoResults from "@/components/NoResults";
import SearchBar from "@/components/SearchBar";
import { apiFetch } from "@/lib/apiFetch";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Service {
  id: string;
  categoryId: number;
  name: string;
  qty: number;
  price: number;
  userId: string;
  referalService: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  result: {
    count: number;
    data: T[];
    next_page: string | null;
    prev_page: string | null;
    total_count: number;
    total_page: number;
  };
}

export default function DownLineScreen() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await apiFetch<ApiResponse<Service>>("/services/service", {
        method: "GET",
      });
      console.log("✅ Raw fetched data:", data);

      const servicesArray = data?.result?.data || [];
      console.log("✅ Services array:", servicesArray);

      setServices(servicesArray);
    } catch (err: any) {
      console.error("❌ Failed to fetch services:", err); // 👉 Log error detail
      setError(err.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCardPress = (id: string) => router.push(`/project/${id}`);

  // Filter by search query jika ada
  const filteredServices = params.query
    ? services.filter((service) =>
        service.name.toLowerCase().includes(params.query!.toLowerCase())
      )
    : services;

  // Debug log
  console.log("🔍 Query params:", params.query);
  console.log("📦 Filtered services:", filteredServices.length);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-red-500 font-semibold">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <SearchBar />

      {filteredServices.length === 0 ? (
        <NoResults />
      ) : (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCardPress(item.id)}>
              <View className="p-4 bg-white rounded-lg shadow">
                <Text className="font-bold text-lg text-bax-primaryBlue">
                  {item.name}
                </Text>
                <Text>Harga: {item.price}</Text>
                <Text>Kategori: {item.categoryId}</Text>
                <Text>Referal: {item.referalService}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        />
      )}
    </SafeAreaView>
  );
}
