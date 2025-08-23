import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import { getCoordinatesFromAddress } from "../services/LocationService";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [addresses, setAddresses] = useState([]);
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

        let currentLocation;
        try {
          currentLocation = await Location.getCurrentPositionAsync({});
        } catch {
          console.warn("Anlık konum alınamadı, son bilinen konum deneniyor...");
          currentLocation = await Location.getLastKnownPositionAsync({});
        }

        if (!currentLocation?.coords) {
          console.warn("Konum verisi eksik");
          setLoading(false);
          return;
        }

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

  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((item) => item.id !== id));
  };

  const updateAddress = async (id, newName, newDetails) => {
    const newCoords = await getCoordinatesFromAddress(newDetails);
    if (!newCoords) return;

    setAddresses((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, name: newName, details: newDetails, coords: newCoords }
          : item
      )
    );
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        addresses,
        loading,
        addAddress,
        removeAddress,
        updateAddress,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
