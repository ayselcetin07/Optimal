import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LocationContext } from "../context/LocationContext";

const MapViewScreen = () => {
  const { location, addresses, loading } = useContext(LocationContext);

  const safeAddresses = Array.isArray(addresses) ? addresses : [];

  if (loading || !location) {
    return <Text style={styles.loading}>Harita yükleniyor...</Text>;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {safeAddresses.map((addr) => (
        <Marker
          key={addr.id}
          coordinate={addr.coords}
          title={addr.name}
          description={addr.details}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default MapViewScreen;
