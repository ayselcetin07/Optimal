// MapViewScreen.js

import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { LocationContext } from "../context/LocationContext";
import { optimizeRoute } from "../utils/optimizeRoute";
import { calculateRouteSummary } from "../utils/calculateRouteSummary";

const MapViewScreen = () => {
  const { location, addresses, loading } = useContext(LocationContext);
  const mapRef = useRef(null);
  const [routePoints, setRoutePoints] = useState([]);
  const [summary, setSummary] = useState(null);

  const safeAddresses = Array.isArray(addresses) ? addresses : [];
  const isReady = location?.coords && !loading;

  useEffect(() => {
    if (!isReady || safeAddresses.length === 0) {
      setRoutePoints([]);
      return;
    }

    const userLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const rawPoints = safeAddresses.map((addr) => ({
      latitude: addr.coords.latitude,
      longitude: addr.coords.longitude,
    }));

    const optimized = optimizeRoute([...rawPoints, userLocation], {
      fixedStart: userLocation,
    });

    setRoutePoints(optimized);
    calculateRouteSummary(optimized).then(setSummary);
  }, [safeAddresses, location]);

  useEffect(() => {
    if (routePoints.length > 1 && mapRef.current) {
      mapRef.current.fitToCoordinates(routePoints, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [routePoints]);

  if (!isReady) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Harita yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Kullanıcının konumu */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Mevcut Konum"
          pinColor="green"
        />

        {/* Adresler */}
        {safeAddresses.map((addr) => (
          <Marker
            key={addr.id}
            coordinate={addr.coords}
            title={addr.name}
            description={addr.details}
          />
        ))}

        {/* Rota çizgisi */}
        {routePoints.length > 1 && (
          <Polyline
            coordinates={routePoints}
            strokeColor="#007AFF"
            strokeWidth={4}
          />
        )}
      </MapView>

      {/* Rota özeti */}
      {summary && (
        <View style={styles.summary}>
          <Text>Toplam Mesafe: {summary.distanceKm} km</Text>
          <Text>Tahmini Süre: {summary.durationMin} dakika</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  loading: {
    fontSize: 16,
    textAlign: "center",
  },
  summary: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});

export default MapViewScreen;
