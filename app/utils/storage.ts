// utils/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const FIRST_LAUNCH_KEY = "isFirstLaunch";

export const getIsFirstLaunch = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
    return value !== "false"; // default true kalau belum pernah set
  } catch (error) {
    console.error("Error reading isFirstLaunch:", error);
    return true;
  }
};

export const setIsFirstLaunch = async (isFirstLaunch: boolean) => {
  try {
    await AsyncStorage.setItem(
      FIRST_LAUNCH_KEY,
      isFirstLaunch ? "true" : "false"
    );
  } catch (error) {
    console.error("Error setting isFirstLaunch:", error);
  }
};
