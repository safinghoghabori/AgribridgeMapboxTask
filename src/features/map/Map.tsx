import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import React from 'react';
import {
  MapView,
  Camera,
  ShapeSource,
  FillLayer,
  CircleLayer,
} from '@rnmapbox/maps';
import { useMap } from './hooks/useMap';
import ClusteredPolygonMarkers from './components/ClusteredPolygonMarkers';
import PolygonMarkers from './components/PolygonMarkers';

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
        styleURL="mapbox://styles/mapbox/satellite-v9"
        style={styles.map}
        zoomEnabled={true}
        onPress={handleMapPress}
        scaleBarEnabled={false}
      >
        {/*  Hyderabad's coordinates to center the map at */}
        <Camera
          centerCoordinate={[78.491684, 17.38714]}
          zoomLevel={12}
          animationMode={'flyTo'}
          animationDuration={3000}
        />

        {/* 
            ShapeSource is a map content source that supplies vector shapes to be shown on the map. 
            The shape may be an url or a GeoJSON object.
         */}

        {/* 
            Display circles for user clicks
            Geometry types can be: Point, Polygon etc...
        */}
        {polygonCoords.length > 0 && (
          <ShapeSource
            id="drawingPoints"
            shape={{
              type: 'FeatureCollection',
              features: polygonCoords.map(coord => ({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: coord,
                },
                properties: {},
              })),
            }}
          >
            <CircleLayer
              id="pointCircles"
              style={{
                circleRadius: 6,
                circleColor: '#FF0000',
                circleStrokeWidth: 2,
                circleStrokeColor: '#FFFFFF',
              }}
            />
          </ShapeSource>
        )}

        {/* Draw a Polygon */}
        {polygonCoords.length > 2 && (
          <ShapeSource
            id="polygonSource"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [[...polygonCoords, polygonCoords[0]]], // close loop
              },
              properties: {},
            }}
          >
            <FillLayer
              id="polygonFill"
              style={{
                fillColor: 'rgba(0, 0, 255, 0.3)',
              }}
            />
          </ShapeSource>
        )}

        {/* Display saved Polygons */}
        {savedPolygons.map((polygon, idx) => (
          <ShapeSource
            key={`saved-${idx}`}
            id={`saved-${idx}`}
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [[...polygon, polygon[0]]],
              },
              properties: {},
            }}
          >
            <FillLayer
              id={`fill-${idx}`}
              style={{ fillColor: 'rgba(0, 0, 255, 0.3)' }}
            />
          </ShapeSource>
        ))}

        {/* Polygon Markers - Display markers from saved polygons - without clustering */}
        {/* <PolygonMarkers savedPolygons={savedPolygons} /> */}

        {/* Polygon Markers - Display clustered markers from saved polygons */}
        <ClusteredPolygonMarkers savedPolygons={savedPolygons} />
      </MapView>

      <View style={styles.buttons}>
        {polygonCoords.length > 0 && (
          <Button title="Complete Polygon" onPress={handleCompletePolygon} />
        )}
        <Button title="Clear All" onPress={handleClearAll} />
      </View>
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
