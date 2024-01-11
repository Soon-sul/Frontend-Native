import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAccessToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('accessToken', token);
  } catch (error) {
    console.error(error);
  }
};
