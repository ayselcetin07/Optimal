// Gerekli React ve konum kütüphanelerini içe aktar
import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location"; // Expo'nun konum API'si
import { getCoordinatesFromAddress } from "../services/LocationService"; // Adresten koordinat alma servisi

// Konum verilerini paylaşmak için context oluştur
export const LocationContext = createContext();

// LocationProvider bileşeni, uygulama genelinde konum verilerini sağlar
export const LocationProvider = ({ children }) => {
  // Anlık konum, adres listesi ve yüklenme durumu için state tanımları
  const [location, setLocation] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Uygulama ilk yüklendiğinde konum verisini al
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Kullanıcıdan konum izni iste
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Konum izni reddedildi");
          setLoading(false);
          return;
        }

        let currentLocation;

        try {
          // Anlık konumu almaya çalış
          currentLocation = await Location.getCurrentPositionAsync({});
        } catch (error) {
          // Anlık konum alınamazsa son bilinen konumu dene
          console.warn("Anlık konum alınamadı, son bilinen konum deneniyor...");
          currentLocation = await Location.getLastKnownPositionAsync({});
        }

        // Konum verisi eksikse işlemi sonlandır
        if (!currentLocation?.coords) {
          console.warn("Konum verisi eksik");
          setLoading(false);
          return;
        }

        // Konumu state'e kaydet
        setLocation(currentLocation);
      } catch (error) {
        console.error("Konum alınamadı:", error);
      } finally {
        // Yüklenme durumunu kapat
        setLoading(false);
      }
    };

    fetchLocation(); // Konum alma işlemini başlat
  }, []);

  // Yeni adres ekleme fonksiyonu
  const addAddress = async (name, details) => {
    // Adres detaylarından koordinatları al
    const coords = await getCoordinatesFromAddress(details);
    if (!coords) return; // Koordinat alınamazsa işlemi durdur

    // Yeni adres objesi oluştur
    const newAddress = {
      id: Date.now(), // Benzersiz ID
      name,
      details,
      coords,
    };

    // Adresi mevcut listeye ekle
    setAddresses((prev) => [...prev, newAddress]);
  };
  //Adres silme
  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((item) => item.id !== id));
  };

  // Tüm verileri context sağlayıcısıyla dışa aktar
  return (
    <LocationContext.Provider
      value={{ location, addresses, loading, addAddress, removeAddress }}
    >
      {children}
    </LocationContext.Provider>
  );
};
