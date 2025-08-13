import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LocationContext } from "../context/LocationContext";
import AddressInput from "./AddressInput";
import AddressList from "./AddressList";

export default function MapViewScreen() {
  const { location } = useContext(LocationContext);
  const [addresses, setAddresses] = useState([]);

  const handleAddAddress = (address) => {
    setAddresses((prev) => [...prev, address]);
  };

  if (!location) return <Text>Konum alınıyor...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: location.lat, longitude: location.lng }}
          title="Başlangıç Noktası"
        />
        {addresses.map((addr, idx) => (
          <Marker
            key={idx}
            coordinate={{ latitude: addr.lat, longitude: addr.lng }}
            title={addr.name}
          />
        ))}
      </MapView>

      <View style={{ padding: 10 }}>
        <AddressInput onAdd={handleAddAddress} />
        <AddressList addresses={addresses} />
      </View>
    </View>
  );
}
