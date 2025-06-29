/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Mapbox from '@rnmapbox/maps';
import Map from './src/features/map/Map';
import { MAPBOX_PUBLIC_ACCESS_TOKEN } from './src/utilities/AppConstants';

// To use MapView we need to provide valid access token (public token)
Mapbox.setAccessToken(MAPBOX_PUBLIC_ACCESS_TOKEN);

// If you are hosting styles and sources on localhost, you might need to set the connection status manually for Mapbox to be able to use them
// Mapbox.setConnected(true);

function App() {
  return <Map />;
}

export default App;
