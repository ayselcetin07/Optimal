import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import { getCoordinatesFromAddress } from "../services/LocationService";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [addresses, setAddresses] = useState([]); // ✅ Başlangıçta boş array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Konum izni reddedildi");
          setLoading(false);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        console.error("Konum alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const addAddress = async (name, details) => {
    const coords = await getCoordinatesFromAddress(details);
    if (!coords) return;

    const newAddress = {
      id: Date.now(),
      name,
      details,
      coords,
    };

    setAddresses((prev) => [...prev, newAddress]);
  };

  return (
    <LocationContext.Provider
      value={{ location, addresses, loading, addAddress }}
    >
      {children}
    </LocationContext.Provider>
  );
};
