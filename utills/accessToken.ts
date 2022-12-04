import * as SecureStore from "expo-secure-store";

export const setAccessToken = async (token: string) => {
  await SecureStore.setItemAsync("token", JSON.stringify(token));
};

export const getAccessToken = async () => {
  try {
    const value = await SecureStore.getItemAsync("token");
    if (value) {
      return await JSON.parse(value);
    }
  } catch (error) {
    return null;
  }
};
