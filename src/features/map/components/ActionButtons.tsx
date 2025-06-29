import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

interface ActionButtonsProps {
  polygonCoords: [number, number][];
  savedPolygons: [number, number][][];
  onCompletePolygon: () => void;
  onClearAll: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = React.memo(
  ({ polygonCoords, savedPolygons, onCompletePolygon, onClearAll }) => {
    // If no markers are present, dont show any action buttons
    if (polygonCoords.length === 0 && savedPolygons.length === 0) return null;

    return (
      <View style={styles.buttons}>
        {polygonCoords.length > 0 && (
          <Button title="Complete Polygon" onPress={onCompletePolygon} />
        )}
        <Button title="Clear All" onPress={onClearAll} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  buttons: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
