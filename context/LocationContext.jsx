// context/LocationContext.jsx
import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndAddresses = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Konum izni reddedildi");
          setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);

        // Örnek adres verisi (gerçek API yerine)
        const dummyAddresses = [
          { id: 1, name: "Ev", details: "Kayseri, Türkiye" },
          { id: 2, name: "İş", details: "Organize Sanayi" },
        ];

        setAddresses(dummyAddresses);
      } catch (error) {
        console.error("Konum alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndAddresses();
  }, []);

  return (
    <LocationContext.Provider value={{ location, addresses, loading }}>
      {children}
    </LocationContext.Provider>
  );
};
