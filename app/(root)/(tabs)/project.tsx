import { useService } from "@/app/hooks/useService";
import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import GlobalModal from "@/components/modal/GlobalModal";
import NoResults from "@/components/NoResults";
import Search from "@/components/SearchBar";
import icons from "@/constants/icons";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Project = () => {
  const { services, loading, error, fetchServices } = useService();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const categories = useMemo(() => {
    const cats = services
      .map((s) => s.Category?.name)
      .filter((name): name is string => Boolean(name));
    return ["All", ...Array.from(new Set(cats))];
  }, [services]);

  const filteredServices = useMemo(() => {
    let filtered = services;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (item) => item.Category?.name && item.Category.name === selectedCategory
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [services, selectedCategory, searchQuery]);

  const paginatedServices = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredServices.slice(start, end);
  }, [filteredServices, page]);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const handleCardPress = (id: string) => router.push(`/project/${id}`);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchServices();
    setRefreshing(false);
  }, [fetchServices]);

  // console.log("services", services);
  // console.log("filteredServices", filteredServices);
  // console.log("categories", categories);

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={paginatedServices}
        numColumns={2}
        renderItem={({ item }) => (
          <Card
            item={item}
            onPress={() => handleCardPress(item.id)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <GlobalModal
              isOpen
              variant="loading"
              title="Sebentar ya!"
              message="Sedang menyiapkan datanya nih!"
            />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                <Image
                  source={icons.backArrow}
                  className="size-5"
                />
              </TouchableOpacity>

              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                Temukan Project yang Ideal buat kamu
              </Text>
              <Image
                source={icons.bell}
                className="w-6 h-6"
              />
            </View>

            <Search
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <View className="mt-2">
              <Filters
                options={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {filteredServices.length} Projects
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="flex flex-row justify-center gap-3 mt-5">
            <TouchableOpacity
              disabled={page === 1}
              onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-primary-100 rounded-xl">
              <Text className="text-black">Prev</Text>
            </TouchableOpacity>
            <Text className="text-black self-center">
              Page {page} / {totalPages}
            </Text>
            <TouchableOpacity
              disabled={page === totalPages}
              onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 bg-primary-100 rounded-xl">
              <Text className="text-black">Next</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Project;
