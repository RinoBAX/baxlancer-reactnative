import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Platform,
  TextInput,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { apartmentDetails } from "@/constants/data";
import GalleryModal from "@/components/GalleryModal";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useService } from "@/app/hooks/useService";
import ProjectQRModal from "@/components/ProjectQRModal";
import CustomBottomSheetModal, {
  BottomSheetModalRef,
} from "@/components/CustomBottomSheetModal";
import DynamicFieldInput from "@/components/forms/DynamicFormField";
import { useAuth } from "@/app/hooks/useAuth";
import { submitAffiliateReport } from "@/app/api/reportAff";
import Toast from "react-native-toast-message";
import { CustomReportField } from "@/interfaces/service";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalModal from "@/components/modal/GlobalModal";
import { useNavigation } from "@react-navigation/native";

const ProjectDetail = () => {
  const { id } = useLocalSearchParams();
  // Custom Hooks
  const { serviceDetail, fetchServiceById, loading } = useService();
  const { user } = useAuth();

  // React Hook
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModalRef>(null);
  const [formValues, setFormValues] = useState<
    Record<string, string | string[]>
  >({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Config React Native
  const windowHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const containerPadding = 40; // Total padding horizontal (e.g. px-5)
  const imageSize = 80; // w-20
  const imageSpacing = 12; // mr-3

  const totalImageWidth = imageSize + imageSpacing;
  const maxImagesInRow = Math.floor(
    (screenWidth - containerPadding + imageSpacing) / totalImageWidth
  );

  const { gallery } = apartmentDetails;

  const {
    categoryId,
    name,
    qty,
    picture,
    description,
    price,
    userId,
    referalService,
    createdAt,
    updatedAt,
    ReportFieldDefinition,
    urlProject,
    Category,
  } = serviceDetail ?? {};

  const parsedFields = ReportFieldDefinition || [];

  const handleFieldChange = (name: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBack = () => {
    router.replace("/project");
  };

  const handleSubmitReport = async () => {
    if (!id || typeof id !== "string") return;

    const missingFields = parsedFields.filter(
      (field) => field.required && !formValues[field.key]?.toString().trim()
    );

    // Tambahkan validasi untuk referral
    if (
      !formValues.referalAff?.toString().trim() ||
      !formValues.referalService?.toString().trim() ||
      !formValues.emailCustomer?.toString().trim()
    ) {
      Toast.show({
        type: "error",
        text1: "Data belum lengkap",
        text2:
          "Referral Code, Referral Service, dan Email Customer wajib diisi.",
      });
      return;
    }

    if (missingFields.length > 0) {
      Toast.show({
        type: "error",
        text1: "Data belum lengkap",
        text2: "Mohon isi semua kolom yang wajib.",
      });
      return;
    }

    try {
      console.log("📤 Mengirim data report:", formValues);
      setLoadingSubmit(true);

      await submitAffiliateReport(id, formValues, parsedFields);

      // Toast.show({
      //   type: "success",
      //   text1: "Laporan berhasil dikirim!",
      // });
      setSubmitSuccess(true);

      // ✅ Reset form
      setFormValues({
        referalAff: user?.referralCode ?? "",
        referalService: referalService ?? "",
        emailCustomer: "",
        // other field, can you define here:
        ...parsedFields.reduce((acc, field) => {
          acc[field.key] = "";
          return acc;
        }, {} as Record<string, any>),
      });
      bottomSheetRef.current?.close();
    } catch (error: any) {
      console.error("❌ Submit report error:", error);
      // Toast.show({
      //   type: "error",
      //   text1: "Gagal mengirim laporan",
      //   text2: error?.message ?? "Terjadi kesalahan saat mengirim",
      // });
      setSubmitError(true);
    } finally {
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    if (user?.referralCode && referalService) {
      setFormValues((prev) => ({
        ...prev,
        referalAff: user.referralCode,
        referalService: referalService,
      }));
    }
  }, [user?.referralCode, referalService]);

  useEffect(() => {
    if (typeof id === "string") {
      fetchServiceById(id);
    }
  }, [id]);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="bg-white">
        <View
          className="relative w-full"
          style={{ height: windowHeight / 2 }}>
          {picture && (
            <Image
              source={{ uri: picture }}
              className="size-full"
              resizeMode="cover"
            />
          )}
          <View
            className="z-50 absolute inset-x-7"
            style={{
              top: Platform.OS === "ios" ? 70 : 40,
            }}>
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity
                onPress={() => handleBack()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                <Image
                  source={icons.backArrow}
                  className="size-8"
                  tintColor="#FFFFFF"
                />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <Image
                  source={icons.heart}
                  className="size-8"
                  tintColor="#FFFFFF"
                />
                <Image
                  source={icons.send}
                  className="size-8"
                  tintColor="#FFFFFF"
                />
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 py-4">
          <Text className="text-lg font-bold">{name}</Text>
          <View className="flex-row items-center my-1">
            <Text className="text-orange-500 font-semibold">
              {Category?.name}
            </Text>
            <Text className="ml-3 text-xs text-gray-400">
              - (kode referral service) - {referalService}
            </Text>
          </View>

          {/* <View className="flex flex-row items-center mt-5">
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
              <Image
                source={icons.bed}
                className="size-4"
              />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-1">
              2 Beds
            </Text>
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <Image
                source={icons.bath}
                className="size-4"
              />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-1">
              1 Baths
            </Text>
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <Image
                source={icons.area}
                className="size-4"
              />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-1">
              1 sqft
            </Text>
          </View> */}

          {/* Agent */}
          <Text className="font-bold text-base mt-4">PIC</Text>
          <View className="flex-row items-center mt-2">
            <Image
              source={{
                uri: "https://ui-avatars.com/api/?name=John+Doe&background=random",
              }}
              className="w-10 h-10 rounded-full"
            />
            <View className="ml-2 flex-1">
              <Text className="font-semibold">Wahyu</Text>
              <Text className="text-xs text-gray-500">PIC Project</Text>
            </View>
            <TouchableOpacity className="p-2">
              <Image
                source={icons.chat}
                className="w-8 h-8 rounded-full"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2">
              <Image
                source={icons.phone}
                className="w-8 h-8 rounded-full"
              />
            </TouchableOpacity>
          </View>

          {/* Overview */}
          <Text className="font-bold text-base mt-5">Overview</Text>
          <Text className="text-sm text-gray-600 mt-1">{description}</Text>

          {/* Facilities */}
          <Text className="font-bold text-base mt-5 mb-2">
            Data Report yang dibutuhkan
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {parsedFields.map((fields: CustomReportField, index: any) => (
              <Text
                key={index}
                className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
                {fields.label}
              </Text>
            ))}
          </View>

          {/* Gallery */}
          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Gallery
            </Text>
            <FlatList
              data={gallery.slice(0, maxImagesInRow)} // hanya tampilkan max visible
              numColumns={maxImagesInRow}
              key={maxImagesInRow} // agar rerender saat orientasi/screen berubah
              scrollEnabled={false}
              columnWrapperStyle={{ justifyContent: "flex-start" }}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => {
                const isLastVisible = index === maxImagesInRow - 1;
                const remainingCount = gallery.length - maxImagesInRow;

                return (
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                      width: imageSize,
                      height: imageSize,
                      marginRight: imageSpacing,
                      marginBottom: 12,
                      position: "relative",
                    }}>
                    <Image
                      source={item}
                      resizeMode="cover"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 12,
                      }}
                    />

                    {isLastVisible && remainingCount > 0 && (
                      <View className="absolute inset-0 bg-black/60 rounded-xl items-center justify-center">
                        <Text className="text-white text-base font-bold">
                          +{remainingCount}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {/* Location */}
          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Location
            </Text>
            <View className="flex flex-row items-center justify-start mt-4 gap-2">
              <Image
                source={icons.location}
                className="w-7 h-7"
              />
              <Text className="text-black-200 text-sm font-rubik-medium">
                IDR {price}
              </Text>
            </View>

            <Image
              source={images.map}
              className="h-52 w-full mt-5 rounded-xl"
            />
          </View>

          {/* Review */}
          <View className="mt-7">
            <View className="flex flex-row items-center justify-between">
              {/* View Rating */}
              <View className="flex flex-row items-center">
                <Image
                  source={icons.star}
                  className="size-4"
                />
                <Text className="text-black-300 text-base font-rubik-medium ml-2">
                  {createdAt} ({updatedAt} ago)
                </Text>
              </View>

              <TouchableOpacity>
                <Text className="text-primary-300 text-base font-rubik-bold">
                  View All
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Comment in Review */}
          {/* <View className="my-2">
          <Comment item={description} />
        </View> */}

          {/* Start */}
          <View className="flex flex-row py-8 items-center justify-between gap-4 ">
            {/* QRCode Project */}
            <TouchableOpacity
              onPress={() => setIsModalOpen(true)}
              className="flex-1 flex flex-row items-center justify-center border border-bax-primaryBlue py-3 rounded-full">
              <Text className="text-bax-primaryBlue text-lg text-center font-rubik-bold">
                QRCode Project
              </Text>
            </TouchableOpacity>

            {/* Start Project */}
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.open()}
              className="flex-1 flex flex-row items-center justify-center bg-bax-primaryBlue py-3 rounded-full">
              <Text className="text-white text-lg text-center font-rubik-bold">
                Start Project
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <GalleryModal
          visible={modalVisible}
          images={gallery}
          onClose={() => setModalVisible(false)}
        />
      </ScrollView>

      <ProjectQRModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        projectUrl={urlProject ?? ""}
      />

      <CustomBottomSheetModal ref={bottomSheetRef}>
        <Text className="text-xl font-bold mb-4">Isi Data Report</Text>

        <View>
          <Text className="text-sm font-semibold">Referral Project</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-600"
            value={referalService}
            editable={false}
          />
        </View>
        <View>
          <Text className="text-sm font-semibold">Kode Referral Kamu</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-600"
            value={user?.referralCode ?? ""}
            editable={false}
          />
        </View>
        <View>
          <Text className="text-sm font-semibold">
            Email Customer/No. WhatsApp Customer
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-600"
            value={String(formValues.emailCustomer ?? "")}
            onChangeText={(text) =>
              setFormValues((prev) => ({ ...prev, emailCustomer: text }))
            }
          />
        </View>

        {parsedFields.map((field: any, index: number) => (
          <View
            key={index}
            className="mb-4">
            <DynamicFieldInput
              field={field}
              value={(formValues[field.key] as string) || ""}
              onChange={handleFieldChange}
            />
          </View>
        ))}

        {/* Tombol submit (optional) */}
        <TouchableOpacity
          onPress={handleSubmitReport}
          className={`mt-4 bg-bax-primaryBlue p-3 rounded-full ${
            loadingSubmit ? "opacity-60" : ""
          }`}
          disabled={loadingSubmit}>
          <Text className="text-white text-center font-bold">
            {loadingSubmit ? "Mengirim..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </CustomBottomSheetModal>

      {submitSuccess && (
        <GlobalModal
          isOpen
          variant="success"
          title="Berhasil"
          message="Laporan Kamu berhasil dikirim, biar di review oleh Admin dulu ya😊"
          autoClose={3000}
          onClose={() => {
            setSubmitSuccess(false); // Tutup modal success
            setIsRedirecting(true); // Tampilkan loading
            setTimeout(() => {
              router.replace("/reports"); // Redirect setelah delay
            }, 1500); // 1.5 detik atau sesuai kebutuhan
          }}
        />
      )}

      {isRedirecting && (
        <GlobalModal
          isOpen
          variant="loading"
          title="Mengalihkan..."
          message="Sebentar ya, sedang diarahkan ke halaman laporan 😊"
        />
      )}
      {submitError && (
        <GlobalModal
          isOpen
          variant="error"
          title="Error"
          message="Oops🫢, sepertinya ada kesalahan, tunggu beberapa saat atau hubungi admin ya😊"
          autoClose={3000}
          onClose={() => setSubmitError(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default ProjectDetail;
