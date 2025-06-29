import { FillLayer, ShapeSource } from '@rnmapbox/maps';
import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import React, { useMemo } from 'react';

interface DrawingPolygon {
  polygonCoords: [number, number][];
}

const layerStyles = {
  polygonFill: {
    fillColor: 'rgba(0, 0, 255, 0.3)',
  },
};

export const DrawingPolygon: React.FC<DrawingPolygon> = React.memo(
  ({ polygonCoords }) => {
    const shape: Feature<Geometry, GeoJsonProperties> = useMemo(
      () => ({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[...polygonCoords, polygonCoords[0]]], // close loop
        },
        properties: {},
      }),
      [polygonCoords],
    );

    if (polygonCoords.length <= 2) return null;

    return (
      <ShapeSource id="polygonSource" shape={shape}>
        <FillLayer id="polygonFill" style={layerStyles.polygonFill} />
      </ShapeSource>
    );
  },
);
