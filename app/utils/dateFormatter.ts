/**
 * Format ISO date string menjadi format lokal Indonesia.
 * Contoh output: "20 Juni 2025"
 */
export const formatDateIndo = (isoDate?: string | null): string => {
  if (!isoDate) return "-"; // fallback kalau kosong

  const date = new Date(isoDate);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * Jika mau sekalian tampilkan jam:
 * Contoh output: "Jumat, 20 Juni 2025, 13.10"
 */
export const formatDateTimeIndo = (isoDate?: string | null): string => {
  if (!isoDate) return "-";

  const date = new Date(isoDate);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
