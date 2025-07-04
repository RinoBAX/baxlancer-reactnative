// utils/openWhatsApp.ts
import { Linking, Alert } from "react-native";

const phoneNumber = process.env.ADMIN_WHATSAPP_NUMBER || "628998923511";

/**
 * Open WhatsApp with a pre-filled message
 * @param message Message to send
 * @param customPhoneNumber Optional custom phone number to override default
 */
export const contactWhatsAppAdmin = async (
  message: string,
  customPhoneNumber?: string
) => {
  const phone = phoneNumber || customPhoneNumber;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  try {
    const supported = await Linking.openURL(url);
    console.log("Trying to open1:", url); // Debug di preview
    console.log("Phone1:", phone);
    console.log("Env1:", process.env.ADMIN_WHATSAPP_NUMBER);
    if (supported) {
      console.log("Trying to open:", url); // Debug di preview
      console.log("Phone:", phone);
      console.log("Env:", process.env.ADMIN_WHATSAPP_NUMBER);
      await Linking.openURL(url);
    } else {
      Alert.alert("WhatsApp tidak terinstall di perangkat Anda.");
    }
  } catch (error) {
    console.error("Terjadi kesalahan membuka WhatsApp:", error);
  }
};
