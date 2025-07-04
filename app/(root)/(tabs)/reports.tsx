import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import NoResults from "@/components/NoResults";
import icons from "@/constants/icons";
import CustomBottomSheetModal, {
  BottomSheetModalRef,
} from "@/components/CustomBottomSheetModal";
import { useReportAff } from "@/app/hooks/useReportAff";
import { ReportAffResponse } from "@/interfaces/reportAff";
import GlobalModal from "@/components/modal/GlobalModal";
import { ReportCard } from "@/components/Cards";
import ReportDetailSheet from "@/components/ReportDetailSheet";

const STATUS_FILTERS = [
  { label: "ALL", value: "" },
  { label: "APPROVED", value: "APPROVED" },
  { label: "REJECTED", value: "REJECTED" },
  { label: "PENDING", value: "PENDING" },
];

const Reports = () => {
  const {
    reportAffResp,
    fetchAffReports,
    fetchAffReportById,
    loading,
    currentPage,
    totalCount,
    totalPage,
    setPage,
  } = useReportAff();

  const bottomSheetRef = useRef<BottomSheetModalRef>(null);
  const [selectedReport, setSelectedReport] =
    useState<ReportAffResponse | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAffReports(selectedStatus, currentPage);
    setRefreshing(false);
  };

  useEffect(() => {
    const statusToFetch = selectedStatus === "" ? undefined : selectedStatus;
    setSelectedReport(null);
    fetchAffReports(statusToFetch, currentPage);
  }, [currentPage, selectedStatus]);

  const handleCardPress = async (report: ReportAffResponse) => {
    try {
      setDetailError(false);
      setDetailLoading(true);
      await fetchAffReportById(report.id);
      setSelectedReport(report);
      console.log("data detail report :", report);
      // bottomSheetRef.current?.open();
    } catch (error) {
      console.error("Gagal ambil detail report:", error);
      setDetailError(true);
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    if (selectedReport) {
      // Tunggu 100ms supaya rendering selesai sebelum buka modal
      const timeout = setTimeout(() => {
        bottomSheetRef.current?.open();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [selectedReport]);

  // const handleNextPage = () =>
  //   currentPage < totalPage && setPage(currentPage + 1);
  // const handlePrevPage = () => currentPage > 1 && setPage(currentPage - 1);

  const handleNextPage = async () => {
    if (currentPage < totalPage) {
      setPaginationLoading(true);
      try {
        const nextPage = currentPage + 1;
        const statusToFetch =
          selectedStatus === "" ? undefined : selectedStatus;
        await fetchAffReports(statusToFetch, nextPage);
        setPage(nextPage);
      } catch (err) {
        console.error("Failed to fetch next page:", err);
      } finally {
        setPaginationLoading(false);
      }
    }
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      setPaginationLoading(true);
      try {
        const prevPage = currentPage - 1;
        const statusToFetch =
          selectedStatus === "" ? undefined : selectedStatus;
        await fetchAffReports(statusToFetch, prevPage);
        setPage(prevPage);
      } catch (err) {
        console.error("Failed to fetch prev page:", err);
      } finally {
        setPaginationLoading(false);
      }
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={reportAffResp}
        className="px-5"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReportCard
            item={{
              id: item.id,
              title: item.service.name,
              price: item.service.price,
              status: item.isApprove,
              referral: item.referalService,
              category: item.service.Category.name,
            }}
            onPress={() => handleCardPress(item)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerClassName="pb-32"
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
          <View>
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
                Hasil Laporan Saya
              </Text>

              <Image
                source={icons.bell}
                className="w-6 h-6"
              />
            </View>

            {/* Filter Bubble Status */}
            <FlatList
              horizontal
              data={STATUS_FILTERS}
              keyExtractor={(item) => item.value}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 6,
                gap: 12,
              }}
              className="mt-5 mb-2"
              renderItem={({ item }) => {
                const isActive = item.value === selectedStatus;
                return (
                  <TouchableOpacity
                    onPress={async () => {
                      setIsFiltering(true);

                      try {
                        setSelectedStatus(item.value);
                        setPage(1);
                        const statusToFetch =
                          item.value === "" ? undefined : item.value;
                        await fetchAffReports(statusToFetch, 1);
                      } finally {
                        setIsFiltering(false);
                      }
                    }}
                    className={`px-5 py-2 rounded-xl border ${
                      isActive
                        ? "bg-bax-sky/40 border-bax-sky/20"
                        : "bg-gray-100 border-gray-300"
                    }`}>
                    <Text
                      className={`text-sm ${
                        isActive ? "text-bax-primaryBlue" : "text-black-300"
                      }`}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            <Text className="text-xl font-rubik-bold text-black-300 px-5 mt-5">
              Found {totalCount} Report{totalCount > 1 ? "s" : ""}
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="flex flex-row justify-between items-center px-5 mt-4">
            {currentPage > 1 && (
              <TouchableOpacity
                onPress={handlePrevPage}
                disabled={currentPage <= 1}
                className="flex flex-row items-center">
                <Image
                  source={icons.backArrow}
                  className="w-5 h-5"
                />
                <Text className="text-base text-black-300 ml-2">Previous</Text>
              </TouchableOpacity>
            )}
            <Text className="font-rubik-semibold text-xs text-bluePrimary">
              Page {currentPage}/{totalPage}
            </Text>
            {currentPage < totalPage && (
              <TouchableOpacity
                onPress={handleNextPage}
                disabled={currentPage >= totalPage}>
                <Text
                  className={`text-base ${
                    currentPage >= totalPage
                      ? "text-gray-400"
                      : "text-black-300"
                  }`}>
                  Next
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {(detailLoading || isFiltering || paginationLoading) && (
        <GlobalModal
          isOpen
          variant="loading"
          title="Sebentar ya!"
          message="Sedang menyiapkan datanya nih!"
        />
      )}

      {detailError && (
        <GlobalModal
          isOpen
          variant="error"
          title="Error"
          message="Oops🫢, sepertinya ada kesalahan, tunggu beberapa saat atau hubungi admin ya😊"
          autoClose={3000}
          onClose={() => setDetailError(false)}
        />
      )}

      {/* Modal untuk detail */}
      <CustomBottomSheetModal ref={bottomSheetRef}>
        {!detailError && selectedReport && (
          <ReportDetailSheet report={selectedReport} />
        )}
      </CustomBottomSheetModal>
    </SafeAreaView>
  );
};

export default Reports;
