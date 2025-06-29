import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorageHelper from '../../../utilities/AsyncStorageHelper';

export const useMap = () => {
  // polygonCoords is an array of [longitude, latitude] array
  const [polygonCoords, setPolygonCoords] = useState<[number, number][]>([]);
  const [savedPolygons, setSavedPolygons] = useState<[number, number][][]>([]);

  // Load saved polygons from local storage when user opens the app
  useEffect(() => {
    loadSavedPolygons();
  }, []);

  const handleMapPress = useCallback(
    (e: GeoJSON.Feature) => {
      if (e.geometry.type === 'Point') {
        const { geometry } = e;
        const [longitude, latitude] = geometry.coordinates;
        setPolygonCoords(prev => [...prev, [longitude, latitude]]);
      }
    },
    [polygonCoords],
  );

  const handleCompletePolygon = useCallback(async () => {
    if (polygonCoords.length < 3) {
      Alert.alert('Oops!', 'A polygon needs at least 3 points.');
      return;
    }

    const updated = [...savedPolygons, polygonCoords];
    setSavedPolygons(updated);

    // Save into local storage
    await AsyncStorageHelper.savePolygons(updated);

    // Clear current drawing
    setPolygonCoords([]);
  }, [polygonCoords]);

  const loadSavedPolygons = async () => {
    const data = await AsyncStorageHelper.getPolygons();
    if (data) {
      setSavedPolygons(data);
    }
  };

  const handleClearAll = useCallback(async () => {
    setSavedPolygons([]);
    setPolygonCoords([]);

    // Clear local storage
    await AsyncStorageHelper.removePolygons();
  }, [polygonCoords]);

  return {
    polygonCoords,
    setPolygonCoords,
    handleMapPress,
    handleCompletePolygon,
    handleClearAll,
    savedPolygons,
  };
};
