import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { LocationContext } from "../context/LocationContext";
import { optimizeRoute } from "../utils/optimizeRoute";
import { calculateRouteSummary } from "../utils/calculateRouteSummary";
import { openGoogleNavigation } from "../utils/openGoogleNavigation";

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

    const rawPoints = safeAddresses
      .filter((addr) => addr?.coords?.latitude && addr?.coords?.longitude)
      .map((addr) => ({
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

  const handleNavigation = () => {
    openGoogleNavigation(location.coords, routePoints);
  };

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Harita yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={location.coords}
          title="Mevcut Konum"
          pinColor="green"
        />

        {safeAddresses.map((addr) => (
          <Marker
            key={addr.id}
            coordinate={addr.coords}
            title={addr.name}
            description={addr.details}
          />
        ))}

        {routePoints.length > 1 && (
          <Polyline
            coordinates={routePoints}
            strokeColor="#007AFF"
            strokeWidth={4}
          />
        )}
      </MapView>

      {summary && (
        <View
          style={{
            position: "absolute",
            bottom: 80,
            left: 20,
            right: 20,
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 8,
            elevation: 3,
          }}
        >
          <Text>Toplam Mesafe: {summary.distanceKm} km</Text>
          <Text>Tahmini Süre: {summary.durationMin} dakika</Text>
        </View>
      )}

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: "#007AFF",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
        onPress={handleNavigation}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Google Navigasyon ile Aç
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapViewScreen;
