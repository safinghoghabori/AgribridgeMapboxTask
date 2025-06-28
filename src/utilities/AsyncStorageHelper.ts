import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage key constants
const POLYGONS = 'polygons';

const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const getItem = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // error reading value
  }
  return null;
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
  }
  return null;
};

const AsyncStorageHelper = {
  savePolygons: async (polygons: [number, number][][]): Promise<void> => {
    await setItem(POLYGONS, JSON.stringify(polygons));
  },

  getPolygons: async (): Promise<[number, number][][] | null> => {
    const res = await getItem(POLYGONS);
    return res ? JSON.parse(res) : [];
  },

  removePolygons: async (): Promise<void> => {
    await removeItem(POLYGONS);
  },
};

export default AsyncStorageHelper;
