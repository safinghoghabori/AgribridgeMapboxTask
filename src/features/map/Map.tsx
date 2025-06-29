import { View, StyleSheet } from 'react-native';
import React from 'react';
import { MapView, Camera } from '@rnmapbox/maps';
import { useMap } from './hooks/useMap';
import ClusteredPolygonMarkers from './components/ClusteredPolygonMarkers';
import {
  centerCoordinate,
  mapStyleURL,
  mapZoomLevel,
} from '../../utilities/AppConstants';
import { DrawingPoints } from './components/DrawingPoints';
import { DrawingPolygon } from './components/DrawingPolygon';
import { SavedPolygons } from './components/SavedPolygons';
import { ActionButtons } from './components/ActionButtons';

const Map = () => {
  const {
    polygonCoords,
    handleMapPress,
    handleCompletePolygon,
    handleClearAll,
    savedPolygons,
  } = useMap();

  return (
    <View style={styles.container}>
      <MapView
        styleURL={mapStyleURL}
        style={styles.map}
        zoomEnabled={true}
        onPress={handleMapPress}
        scaleBarEnabled={false}
      >
        {/*  Hyderabad's coordinates to center the map at */}
        <Camera
          centerCoordinate={centerCoordinate}
          zoomLevel={mapZoomLevel}
          animationMode={'flyTo'}
          animationDuration={3000}
        />

        {/* Display circles for user clicks */}
        <DrawingPoints polygonCoords={polygonCoords} />

        {/* Draw a Polygon */}
        <DrawingPolygon polygonCoords={polygonCoords} />

        {/* Display saved Polygons */}
        <SavedPolygons savedPolygons={savedPolygons} />

        {/* Polygon Markers - Display markers from saved polygons - without clustering */}
        {/* <PolygonMarkers savedPolygons={savedPolygons} /> */}

        {/* Polygon Markers - Display clustered markers from saved polygons */}
        <ClusteredPolygonMarkers savedPolygons={savedPolygons} />
      </MapView>

      <ActionButtons
        polygonCoords={polygonCoords}
        savedPolygons={savedPolygons}
        onCompletePolygon={handleCompletePolygon}
        onClearAll={handleClearAll}
      />
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
  buttons: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Map;
