/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Mapbox from '@rnmapbox/maps';
import Map from './src/features/map/Map';

// To use MapView we need to provide valid access token (public token)
Mapbox.setAccessToken(
  'pk.eyJ1Ijoic2FmaW5naG9naGFib3JpIiwiYSI6ImNtY2VsaWpnYTAxZ3kya3NhZTVmZDM5czMifQ.9qUeGAd68xT8PcEouBG9fA',
);

// If you are hosting styles and sources on localhost, you might need to set the connection status manually for Mapbox to be able to use them
// Mapbox.setConnected(true);

function App() {
  return <Map />;
}

export default App;
