import * as FileSystem from "expo-file-system";
import { apiFetch } from "@/lib/apiFetch";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { PaginatedResponse, ReportAffResponse } from "@/interfaces/reportAff";

type UploadOptions = {
  fileUris: string[]; // bisa 1 atau banyak
  folder?: string;
  onProgress?: (progress: number) => void;
};

const CLOUDINARY_NAME = process.env.CLOUD_NAME!;

export const submitAffiliateReport = async (
  id: string,
  formValues: Record<string, any>,
  parsedFields: any[]
) => {
  const formData = new FormData();

  Object.entries(formValues).forEach(([key, value]) => {
    if (typeof value !== "string" || !value.startsWith("file://")) {
      formData.append(key, String(value));
    }
  });

  const uploadableFieldKeys = parsedFields
    .filter((field) => {
      const value = formValues[field.key];
      return (
        ["IMAGE", "FILE"].includes(field.type.toUpperCase()) &&
        typeof value === "string" &&
        value.startsWith("file://")
      );
    })
    .map((field) => field.key);

  for (const key of uploadableFieldKeys) {
    const uri = formValues[key] as string;
    const [uploadedUrl] = await uploadFilesToCloudinary({
      fileUris: [uri],
      onProgress: (percent) => {
        console.log(`📤 Uploading ${key}: ${percent}%`);
      },
    });
    formData.append(key, uploadedUrl);
  }

  const token = await SecureStore.getItemAsync("token");

  const response = await fetch(
    `http://192.168.100.5:8000/api/v1/report/affiliate/${id}/submit`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Gagal submit laporan");
  }

  return await response.json();
};

// 🧠 Utility: Mendapatkan MIME type berdasarkan ekstensi
const getMimeType = (filename: string): string => {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "pdf":
      return "application/pdf";
    case "doc":
    case "docx":
      return "application/msword";
    case "xls":
    case "xlsx":
      return "application/vnd.ms-excel";
    default:
      return "application/octet-stream";
  }
};

export async function uploadFilesToCloudinary({
  fileUris,
  folder = "report-aff-mobile",
  onProgress,
}: UploadOptions): Promise<string[]> {
  const urls: string[] = [];

  // ✅ 1. Ambil signature dan info upload dari server
  const signatureResponse = await apiFetch<{
    signature: string;
    timestamp: number;
    api_key: string;
    cloud_name: string;
    upload_preset: string;
  }>("/cloudinary/signature", {
    method: "POST",
    data: { folder },
    secure: true,
  });

  const { signature, timestamp, api_key, cloud_name, upload_preset } =
    signatureResponse;

  // ✅ 2. Upload tiap file ke Cloudinary
  for (let i = 0; i < fileUris.length; i++) {
    const uri = fileUris[i];
    const fileName = uri.split("/").pop() ?? `file-${Date.now()}.jpg`;
    const fileType = fileName.endsWith(".pdf")
      ? "application/pdf"
      : "image/jpeg";

    console.log("📁 Uploading URI:", uri);

    const formData = new FormData();
    formData.append("file", {
      uri,
      name: fileName,
      type: fileType,
    } as any); // React Native needs `as any` for FormData

    formData.append("api_key", api_key);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("upload_preset", upload_preset);
    formData.append("folder", folder);

    const uploadRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          if (onProgress && event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            onProgress(percent);
          }
        },
      }
    );

    urls.push(uploadRes.data.secure_url);
  }

  return urls;
}

export async function getReportAffResp(
  status?: string,
  page: number = 1
): Promise<PaginatedResponse<ReportAffResponse>> {
  const queryParams = new URLSearchParams();
  if (status) queryParams.append("status", status);
  if (page) queryParams.append("page", page.toString());

  return apiFetch<PaginatedResponse<ReportAffResponse>>(
    `/report/affiliate/list?${queryParams.toString()}`,
    {
      method: "GET",
      secure: true,
    }
  );
}

export async function getReportAffDetail(
  reportId: string
): Promise<ReportAffResponse> {
  return apiFetch<ReportAffResponse>(`/report/affiliate/${reportId}/detail`, {
    method: "GET",
    secure: true,
  });
}
