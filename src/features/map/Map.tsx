import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { MapView, Camera } from '@rnmapbox/maps';

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        styleURL="mapbox://styles/mapbox/satellite-v9"
        style={styles.map}
        zoomEnabled={true}
      >
        <Camera
          centerCoordinate={[78.491684, 17.38714]} // using Hyderabad's coordinates to center the map at
          zoomLevel={12}
          animationMode={'flyTo'}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;
