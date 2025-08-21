// Gerekli React ve harita bileşenlerini içe aktar
import React, { useContext, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LocationContext } from "../context/LocationContext";

// Harita ekranı bileşeni
const MapViewScreen = () => {
  // Konum, adresler ve yüklenme durumunu context'ten al
  const { location, addresses, loading } = useContext(LocationContext);

  // Harita referansı, haritayı programatik olarak kontrol etmek için kullanılır
  const mapRef = useRef(null);

  // Adresler dizisini güvenli şekilde tanımla
  const safeAddresses = Array.isArray(addresses) ? addresses : [];

  // Haritanın hazır olup olmadığını kontrol et
  const isReady = location?.coords && !loading;

  //  Yeni adres eklendiğinde haritayı sonuncu adrese odakla
  useEffect(() => {
    if (safeAddresses.length > 0 && mapRef.current) {
      const last = safeAddresses[safeAddresses.length - 1];
      mapRef.current.animateToRegion(
        {
          latitude: last.coords.latitude,
          longitude: last.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000 // animasyon süresi (ms)
      );
    }
  }, [safeAddresses]);

  // Harita hazır değilse yükleniyor mesajı göster
  if (!isReady) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Harita yükleniyor...</Text>
      </View>
    );
  }

  // Harita hazırsa MapView bileşenini göster
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef} // Harita referansı
        style={styles.map} // Harita stil tanımı
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Her adres için haritada bir Marker (işaretçi) göster */}
        {safeAddresses.map((addr) => (
          <Marker
            key={addr.id}
            coordinate={addr.coords}
            title={addr.name}
            description={addr.details}
          />
        ))}
      </MapView>
    </View>
  );
};

// Stil tanımları
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden", // Harita kenar taşmalarını engelle
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
});

// Bileşeni dışa aktar
export default MapViewScreen;
