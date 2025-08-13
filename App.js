import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { LocationProvider } from "./context/LocationContext";
import AddressInput from "./components/AddressInput";
import AddressList from "./components/AddressList";
import MapViewScreen from "./components/MapViewScreen";

const App = () => {
  return (
    <LocationProvider>
      <SafeAreaView style={styles.container}>
        <AddressInput />
        <AddressList />
        <MapViewScreen />
      </SafeAreaView>
    </LocationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
