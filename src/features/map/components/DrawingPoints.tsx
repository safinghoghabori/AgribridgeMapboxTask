import { CircleLayer, ShapeSource } from '@rnmapbox/maps';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React, { useMemo } from 'react';
import { Colors } from '../../../utilities/Theme';

interface DrawingPoints {
  polygonCoords: [number, number][];
}

const layerStyles = {
  pointCircles: {
    circleRadius: 6,
    circleColor: Colors.red,
    circleStrokeWidth: 2,
    circleStrokeColor: Colors.white,
  },
};

export const DrawingPoints: React.FC<DrawingPoints> = React.memo(
  ({ polygonCoords }) => {
    const shape: FeatureCollection<Geometry, GeoJsonProperties> = useMemo(
      () => ({
        type: 'FeatureCollection',
        features: polygonCoords.map(coord => ({
          type: 'Feature',
          geometry: {
            type: 'Point', // Geometry types can be: Point, Polygon etc...
            coordinates: coord,
          },
          properties: {},
        })),
      }),
      [polygonCoords],
    );

    if (polygonCoords.length === 0) return null;

    return (
      // ShapeSource is a map content source that supplies vector shapes to be shown on the map. The shape may be an url or a GeoJSON object.
      <ShapeSource id="drawingPoints" shape={shape}>
        <CircleLayer id="pointCircles" style={layerStyles.pointCircles} />
      </ShapeSource>
    );
  },
);
