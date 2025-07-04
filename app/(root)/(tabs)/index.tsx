import { useAffChartOverview } from "@/app/hooks/useAffiliateHook";
import { useAuth } from "@/app/hooks/useAuth";
import { contactWhatsAppAdmin } from "@/app/utils/openWhatsApp";
import { setIsFirstLaunch } from "@/app/utils/storage";
import CustomBarChart from "@/components/chart/BarChart";
import CustomDonutChart from "@/components/chart/DonutChart";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { AffiliateOverviewChartResponse } from "@/interfaces/affiliate";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const Home = () => {
  const { user, clearAuth } = useAuth();
  const { fetchAffOverviewCharts, overviewDataChart, loading } =
    useAffChartOverview();
  const [refreshing, setRefreshing] = useState(false);
  const [filterBarChart, setFilterBarChart] = useState<"weekly" | "monthly">(
    "weekly"
  );
  const [filterDonutChart, setFilterDonutChart] = useState<
    "weekly" | "monthly"
  >("weekly");
  const [barChartData, setBarChartData] = useState<
    AffiliateOverviewChartResponse["totalServices"]
  >([]);
  const [donutChartData, setDonutChartData] = useState<
    AffiliateOverviewChartResponse["summaryPieChart"]
  >([]);

  const [barLoading, setBarLoading] = useState(false);
  const [donutLoading, setDonutLoading] = useState(false);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return `Good Morning☀️`;
    if (currentHour < 18) return `Good Afternoon🌤️`;
    if (currentHour < 21) return `Good evening🌙`;
    return `Good Night🌌`;
  };

  const handleCopy = () => {};
  const handleToCustomerService = () => {
    contactWhatsAppAdmin(
      `Halo admin, saya user dengan email - ${user?.email} - dan refferal ID - ${user?.referralCode} - ingin menanyakan sesuatu mengenai BAXLancer, mohon bantuannya`
    );
  };
  const handleSettings = () => {};
  const handleLogout = async () => {
    await clearAuth();
    await setIsFirstLaunch(true);
    router.replace("/login");
  };

  const fetchBarChart = async (filter: "weekly" | "monthly") => {
    try {
      setBarLoading(true);
      const response = await fetchAffOverviewCharts(filter);

      if (!response) {
        console.warn("fetchAffOverviewCharts returned null");
        return;
      }

      setBarChartData(response.totalServices);
    } finally {
      setBarLoading(false);
    }
  };

  const fetchDonutChart = async (filter: "weekly" | "monthly") => {
    try {
      setDonutLoading(true);
      const response = await fetchAffOverviewCharts(filter);
      if (!response) {
        console.warn("fetchAffOverviewCharts returned null");
        return;
      }

      setDonutChartData(response.summaryPieChart);
    } finally {
      setDonutLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      fetchAffOverviewCharts(filterBarChart),
      fetchAffOverviewCharts(filterDonutChart),
    ]);
    setRefreshing(false);
  }, [filterBarChart, filterDonutChart]);

  useEffect(() => {
    fetchBarChart(filterBarChart);
  }, [filterBarChart]);

  useEffect(() => {
    fetchDonutChart(filterDonutChart);
  }, [filterDonutChart]);

  const renderTitleBarChart = () => {
    if (overviewDataChart?.filterType === "weekly")
      return "Pencapaian Mingguan";
    if (overviewDataChart?.filterType === "monthly")
      return "Pencapaian Bulanan";
    return "Pencapaian";
  };
  const renderTitlePieChart = () => {
    if (overviewDataChart?.filterType === "weekly")
      return "Status Pencapaian Mingguan";
    if (overviewDataChart?.filterType === "monthly")
      return "Status Pencapaian Bulanan";
    return "Status Pencapaian";
  };

  return (
    <ScrollView
      className="bg-bax-primaryBlue h-full"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <View className="px-5 py-8">
        <View className="flex flex-row items-center justify-between mt-5">
          {/* Greeting User */}
          <View className="flex flex-row">
            <Image
              source={images.avatar}
              className="size-12 rounded-full"
            />

            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-rubik text-white/60">
                {getGreeting()}
              </Text>
              <Text className="text-sm font-rubik-bold text-white/60 uppercase">
                {user?.email ?? "Guest"}
              </Text>
            </View>
          </View>

          {/* Icons */}
          <View className="flex flex-row gap-3">
            <TouchableOpacity onPress={handleToCustomerService}>
              <Image
                source={icons.headset}
                className="size-6"
                tintColor="#FFFFFF"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSettings}>
              <Image
                source={icons.settingIcon}
                className="size-6"
                tintColor="#FFFFFF"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Image
                source={icons.logOutIcon}
                className="size-6"
                tintColor="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Card User */}
        <View className="my-4 bg-white/30 rounded-xl p-4">
          <View className="flex flex-row items-center justify-between mb-2">
            <Text className="text-white text-xs font-rubik-medium bg-white/20 px-2 py-0.5 rounded">
              {user?.role ?? "Guest"}
            </Text>
            <TouchableOpacity>
              <Image
                source={icons.info}
                className="w-4 h-4 tint-white"
              />
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center gap-2">
            <Text className="text-white font-rubik-medium text-sm mb-1">
              Kode Referral: {user?.referralCode ?? "******"}
            </Text>
            <TouchableOpacity onPress={handleCopy}>
              <Image
                source={icons.copyIcon}
                className="size-5"
                tintColor="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
          <Text className="text-white font-rubik-medium text-xs mb-1">
            Saldo Aktif
          </Text>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-white">
              {`IDR ${user?.balance.toLocaleString("id-ID") ?? 0}`}
            </Text>
            <Image
              source={icons.wallet}
              className="size-6"
              tintColor="#FFFFFF"
            />
          </View>
          <TouchableOpacity className="mt-4 flex flex-row items-center gap-2">
            <Image
              source={icons.withdraw}
              className="size-5"
              tintColor="#FFFFFF"
            />
            <Text className="text-white font-rubik-medium text-sm underline">
              Withdrawal
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card Balance */}
        <View className="flex flex-row items-center justify-between gap-2 mb-2">
          {/* Balance Pending */}
          <View className="flex w-[49%] bg-white/30 rounded-xl p-3">
            <View className="flex-row items-center mb-1">
              <Image
                source={icons.arrowDown}
                className="w-4 h-4 mr-1"
                tintColor="#000000"
              />
              <Text className="text-white/70 text-xs font-rubik">
                Total Pendapatan
              </Text>
            </View>
            <Text className="text-white font-bold text-sm">
              {`IDR ${user?.total_earned.toLocaleString("id-ID") ?? 0}`}
            </Text>
          </View>

          {/* Balance Out */}
          <View className="flex w-[49%] bg-white/30 rounded-xl p-3">
            <View className="flex-row items-center mb-1">
              <Image
                source={icons.send}
                className="w-4 h-4 mr-1"
              />
              <Text className="text-white/70 text-xs font-rubik">
                Total Penarikan Dana
              </Text>
            </View>
            <Text className="text-white font-bold text-sm">
              {`IDR ${user?.total_withdrawal.toLocaleString("id-ID") ?? 0}`}
            </Text>
          </View>
        </View>
      </View>

      {/* Section Chart */}
      <View className="bg-white rounded-t-3xl px-5 pb-32 pt-4">
        {/* <CustomCarousel /> */}
        <CustomBarChart
          title={renderTitleBarChart()}
          data={barChartData}
          isLoading={barLoading}
          filterType={filterBarChart}
          onChangeFilterType={(itemValue) => setFilterBarChart(itemValue)}
        />
        <CustomDonutChart
          title={renderTitlePieChart()}
          data={donutChartData}
          isLoading={donutLoading}
          filterType={filterDonutChart}
          onChangeFilterType={(itemValue) => setFilterDonutChart(itemValue)}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
