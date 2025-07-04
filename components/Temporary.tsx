import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import SearchBar from "@/components/SearchBar";
import { projects as allProjects } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const [selectedFilter, setSelectedFilter] = useState(params.filter || "All");

  const user = {
    name: "Muhammad Nur Ilham",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const latestProjects = allProjects.filter((item) => item.isFeatured);

  const baxProjects = allProjects.filter(
    (item) =>
      (selectedFilter === "All" || item.category === selectedFilter) &&
      (!params.query ||
        item.title.toLowerCase().includes(params.query.toLowerCase()))
  );

  const handleCardPress = (id: string) => router.push(`/project/${id}`);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={baxProjects}
        numColumns={2}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={baxProjects.length === 0 ? <NoResults /> : null}
        ListHeaderComponent={() => (
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row">
                <Image
                  source={{ uri: user.avatar }}
                  className="size-12 rounded-full"
                />

                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-primary/20">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-bold text-primary/30 uppercase">
                    {user.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>

            {/* 🔵 Akun Card */}
            <View className="my-4 bg-bax-sky rounded-xl p-4">
              <View className="flex flex-row items-center justify-between mb-2">
                <Text className="text-white text-xs font-medium bg-white/20 px-2 py-0.5 rounded">
                  Lihat BCA ID
                </Text>
                <TouchableOpacity>
                  <Image source={icons.info} className="w-4 h-4 tint-white" />
                </TouchableOpacity>
              </View>
              <Text className="text-white text-sm mb-1">
                Rekening: 103 - 078 - 2719
              </Text>
              <Text className="text-white text-xs mb-1">Saldo Aktif</Text>
              <View className="flex flex-row items-center justify-between">
                <Text className="text-2xl font-bold text-white">
                  IDR 3,926.71
                </Text>
                <Image source={icons.send} className="w-5 h-5 tint-white" />
              </View>
              <TouchableOpacity className="mt-4 flex flex-row items-center gap-2">
                <Image source={icons.heart} className="w-4 h-4 tint-white" />
                <Text className="text-white underline">Mutasi Rekening</Text>
              </TouchableOpacity>
            </View>

            <SearchBar />

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-primary/30">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-bluePrimary/">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {latestProjects.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProjects}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                />
              )}
            </View>

            <View className="mt-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-primary/30">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Link href="/project">
                    <Text className="text-base font-rubik-bold text-accent">
                      See all
                    </Text>
                  </Link>
                </TouchableOpacity>
              </View>

              <Filters selected={selectedFilter} onSelect={setSelectedFilter} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
