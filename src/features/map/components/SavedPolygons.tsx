import { FillLayer, ShapeSource } from '@rnmapbox/maps';
import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import React, { useMemo } from 'react';

interface SavedPolygonsProps {
  savedPolygons: [number, number][][];
}

const layerStyles = {
  polygonFill: {
    fillColor: 'rgba(0, 0, 255, 0.3)',
  },
};

export const SavedPolygons: React.FC<SavedPolygonsProps> = React.memo(
  ({ savedPolygons }) => {
    const polygonShapes: {
      key: string;
      id: string;
      shape: Feature<Geometry, GeoJsonProperties>;
    }[] = useMemo(
      () =>
        savedPolygons.map((polygon, idx) => ({
          key: `saved-${idx}`,
          id: `saved-${idx}`,
          shape: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [[...polygon, polygon[0]]],
            },
            properties: {},
          },
        })),
      [savedPolygons],
    );

    return (
      <>
        {polygonShapes.map(({ key, id, shape }) => (
          <ShapeSource key={key} id={id} shape={shape}>
            <FillLayer
              id={`fill-${id}`}
              style={layerStyles.polygonFill}
              belowLayerID="clusters" // to display polygon layer below the clusters hence avoid overlapping
            />
          </ShapeSource>
        ))}
      </>
    );
  },
);
