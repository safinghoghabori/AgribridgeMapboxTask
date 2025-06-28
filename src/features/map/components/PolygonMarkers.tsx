import React from 'react';
import { ShapeSource, CircleLayer } from '@rnmapbox/maps';

interface PolygonMarkersProps {
  savedPolygons: [number, number][][];
}

const PolygonMarkers: React.FC<PolygonMarkersProps> = ({ savedPolygons }) => {
  // Extract first point from each polygon to create markers
  const markerPoints = savedPolygons
    .filter(polygon => polygon.length > 0)
    .map(polygon => polygon[0]); // Take the first point of each polygon

  // Only render when there are saved polygons, otherwise return null
  if (markerPoints.length === 0) {
    return null;
  }

  return (
    <ShapeSource
      id="polygonMarkers"
      shape={{
        type: 'FeatureCollection',
        features: markerPoints.map((coord, index) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coord,
          },
          properties: {
            id: `marker-${index}`,
            polygonIndex: index,
          },
        })),
      }}
    >
      <CircleLayer
        id="polygonMarkerCircles"
        style={{
          circleRadius: 8,
          circleColor: '#00FF00', // Green color for polygon markers
          circleStrokeWidth: 3,
          circleStrokeColor: '#FFFFFF',
        }}
      />
    </ShapeSource>
  );
};

export default PolygonMarkers;
