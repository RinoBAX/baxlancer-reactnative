import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ReportAffResponse } from "@/interfaces/reportAff";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";

type Props = {
  report: ReportAffResponse;
};

const ReportDetailSheet = ({ report }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <View className="bg-white py-4">
      <Text className="text-center text-lg font-rubik-bold text-black-300 mb-4">
        Detail Laporan
      </Text>

      {/* Info Dasar */}
      <View className="gap-2">
        <Row
          label="Status"
          value={report.isApprove}
        />
        <Row
          label="Email Customer"
          value={report.emailCustomer}
        />
        <Row
          label="Referral Service"
          value={report.referalService}
        />
        <Row
          label="Referral Affiliate"
          value={report.referalAff}
        />
        <Row
          label="Kategori"
          value={report.service.Category.name}
        />
        <Row
          label="Service"
          value={report.service.name}
        />
        <Row
          label="Harga"
          value={`Rp${report.service.price.toLocaleString("id-ID")}`}
        />
        <Row
          label="Dibuat Pada"
          value={new Date(report.createdAt).toLocaleString("id-ID")}
        />
      </View>

      {/* Field Tambahan */}
      <Text className="text-base font-rubik-semibold text-black-300 mt-6 mb-2">
        Data Tambahan
      </Text>
      <View className="gap-4">
        {report.reportFieldResponse.map((field) => {
          const { type, label } = field.ReportFieldDefinition;
          const isImageOrFile = type === "IMAGE" || type === "FILE";
          const value = field.value;

          return (
            <View
              key={field.id}
              className="gap-2">
              <Text className="text-sm font-rubik-semibold text-black-200">
                {label}
              </Text>

              {isImageOrFile ? (
                <TouchableOpacity
                  onPress={() => setPreviewUrl(value)}
                  activeOpacity={0.8}
                  className="rounded-lg border border-gray-200 overflow-hidden">
                  <Image
                    source={{ uri: value }}
                    style={{
                      width: "100%",
                      height: 300,
                      resizeMode: "cover",
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <Text className="text-sm text-black-300">{value}</Text>
              )}
            </View>
          );
        })}
      </View>

      {/* Modal Preview */}
      <Modal
        visible={!!previewUrl}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPreviewUrl(null)}>
        <TouchableOpacity
          className="flex-1 bg-black/80 justify-center items-center"
          activeOpacity={1}
          onPress={() => setPreviewUrl(null)}>
          {previewUrl && (
            <ImageZoom
              source={{ uri: previewUrl }}
              minScale={1}
              maxScale={5}
              style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
              }}
            />
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

type RowProps = {
  label: string;
  value: string;
};

const Row = ({ label, value }: RowProps) => (
  <View className="flex-row justify-between items-start border-b border-gray-200 py-2">
    <Text className="text-sm text-black-200 w-1/2">{label}</Text>
    <Text className="text-sm text-black-300 w-1/2 text-right">{value}</Text>
  </View>
);

export default ReportDetailSheet;
