import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

interface ActionButtonsProps {
  polygonCoords: [number, number][];
  onCompletePolygon: () => void;
  onClearAll: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = React.memo(
  ({ polygonCoords, onCompletePolygon, onClearAll }) => {
    const showCompleteButton = polygonCoords.length > 0;

    return (
      <View style={styles.buttons}>
        {showCompleteButton && (
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
