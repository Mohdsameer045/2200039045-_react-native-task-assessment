import AsyncStorage from '@react-native-async-storage/async-storage';

const SEARCH_KEY = 'SEARCH_TEXT';

export const saveSearchText = async (text) => {
  try {
    await AsyncStorage.setItem(SEARCH_KEY, text);
  } catch (e) {}
};

export const getSearchText = async () => {
  try {
    return await AsyncStorage.getItem(SEARCH_KEY);
  } catch (e) {
    return '';
  }
};
