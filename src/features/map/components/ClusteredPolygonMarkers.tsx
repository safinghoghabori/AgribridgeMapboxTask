import React, { useMemo } from 'react';
import { ShapeSource, CircleLayer, SymbolLayer } from '@rnmapbox/maps';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Colors } from '../../../utilities/Theme';

interface ClusteredPolygonMarkersProps {
  savedPolygons: [number, number][][];
  clusterRadius?: number;
}

// Styles for various shapes
// point_count: its the number of points inside that cluster
const layerStyles = {
  clusters: {
    // breakpoints to make cluster circle appear bigger when point_count increases
    circleRadius: ['step', ['get', 'point_count'], 15, 10, 20, 50, 30, 100, 40],
    circleColor: Colors.yellow,
    circleStrokeWidth: 3,
    circleStrokeColor: Colors.white,
  },
  markersCount: {
    textField: ['get', 'point_count'],
    textSize: 16,
    textColor: 'black',
    textIgnorePlacement: true,
    textAllowOverlap: true,
  },
  polygonMarkers: {
    circleRadius: 8,
    circleColor: Colors.green,
    circleStrokeWidth: 3,
    circleStrokeColor: Colors.white,
  },
};

const ClusteredPolygonMarkers: React.FC<ClusteredPolygonMarkersProps> = ({
  savedPolygons,
  clusterRadius = 50,
}) => {
  // Extract first point from each polygon to create markers
  const markerPoints = useMemo(() => {
    return savedPolygons
      .filter(polygon => polygon.length > 0)
      .map((polygon, index) => ({
        coordinates: polygon[0],
        properties: {
          id: `marker-${index}`,
          polygonIndex: index,
        },
      }));
  }, [savedPolygons]);

  // Memoize clustered markers GeoJSON to prevent unnecessary rendering of new object every time
  const shape: FeatureCollection<Geometry, GeoJsonProperties> = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: markerPoints.map(point => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: point.coordinates,
        },
        properties: point.properties,
      })),
    }),
    [markerPoints],
  );

  // Only render when there are saved polygons, otherwise return null
  if (markerPoints.length === 0) {
    return null;
  }

  return (
    <ShapeSource
      id="clusteredPolygonMarkers"
      cluster={true}
      clusterRadius={clusterRadius}
      shape={shape}
    >
      {/* Show the cluster circles */}
      <CircleLayer
        id="clusters"
        filter={['has', 'point_count']} // This is Mapbox expression - Mapbox uses special expression syntax to define dynamic styles. If it satisfies this condition then only display.
        style={layerStyles.clusters}
      />

      {/* Show the count (number of markers/point inside each cluster) */}
      <SymbolLayer
        id="markersCount"
        filter={['has', 'point_count']}
        style={layerStyles.markersCount}
      />

      {/* Unclustered polygon markers */}
      <CircleLayer
        id="polygonMarkers"
        filter={['!', ['has', 'point_count']]}
        style={layerStyles.polygonMarkers}
      />
    </ShapeSource>
  );
};

export default React.memo(ClusteredPolygonMarkers);
