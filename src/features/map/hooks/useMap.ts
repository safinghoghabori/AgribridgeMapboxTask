import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

export const useMap = () => {
  // polygonCoords is an array of [longitude, latitude] array
  const [polygonCoords, setPolygonCoords] = useState<[number, number][]>([]);

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

  const handleCompletePolygon = useCallback(() => {
    if (polygonCoords.length < 3) {
      Alert.alert('A polygon needs at least 3 points.');
      return;
    }
    setPolygonCoords([]);
  }, [polygonCoords]);

  const handleClearAll = useCallback(() => {
    setPolygonCoords([]);
  }, [polygonCoords]);

  return {
    polygonCoords,
    setPolygonCoords,
    handleMapPress,
    handleCompletePolygon,
    handleClearAll,
  };
};
