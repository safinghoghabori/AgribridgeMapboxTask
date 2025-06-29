## 🛠️ Installation & Setup

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v18 or later)
- npm
- JDK17
- Android Studio / Xcode (for emulator or real device testing)
- React Native CLI
- For more details: https://reactnative.dev/docs/set-up-your-environment

#### Step 1: Clone the Repository

```bash
git clone https://github.com/safinghoghabori/AgribridgeMapboxTask.git
```

#### Step 2: Install Dependencies

```bash
cd AgribridgeMapboxTask
npm install
```

#### Step 3: Run the app

```bash
npm run android
```

## 🔧 Features

- Satellite Mapbox library integration with React Native
- Drawing a Polygon on a Map
- Saving a Polygon so that it can be accessed across sessions
- Display all saved Polygons along with markers
- Implemented Marker Clustering to group multiple markers together
- Followed best practices to improve Performance and UI & UX

## 👉 Demo

- **APK Download:** [Download APK](https://drive.google.com/file/d/1iSxG-jS4P6yGlvwZWe5ASYD40OQ0qUil/view?usp=sharing)

  - How to download and run .apk on your physical device?
    - Click on the download apk link above
    - Download the .apk file named `apk-release.apk`
    - Find this file and double click on it -> A system popup will be visible to allow "install unknown apps" permission from Settings
    - Click on Install
    - Click on Open

- **Screen Recording:** [Watch the Demo](https://drive.google.com/file/d/1sW-G1ZLk5SXr9-6ti7sVu-THBuMCTkH3/view?usp=sharing)

  - To know how to use this application, please watch the recording.

## 📌 Miscellaneous

- Added a patch to fix the error while integrating `@rnmapbox/map`:
  - `Task :rnmapbox_maps:compileDebugKotlin FAILED` - The error occurs during the Kotlin compilation step in Android. This is rnmapbox/maps bug for react-native: "0.80.0" CLI
  - Please follow this link for more details: https://github.com/rnmapbox/maps/issues/3883

## 📚 References

- What is Mapbox?

  - Mapbox is a modern location platform that provides developers with the building blocks to add maps, navigation, and search to their applications.

- Mapbox docs for setting up react native

  - The Mapbox Maps SDK for React Native is a community-maintained, open-source React Native library and not provided by Mapbox.
  - https://github.com/rnmapbox/maps (sdk)
  - https://rnmapbox.github.io/ (docs)

- Mapbox Satellite

  - https://docs.mapbox.com/help/glossary/mapbox-satellite/

- Mapbox Documentation: https://docs.mapbox.com/help/getting-started/
- Mapbox Guide to setup: https://docs.mapbox.com/android/maps/guides/
- @rnmapbox/maps configuration: https://github.com/rnmapbox/maps/blob/main/docs/GettingStarted.md
- Async Storage: https://react-native-async-storage.github.io/async-storage/docs/install
