import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../config/config";

export default function AddressInput({ onAdd }) {
  return (
    <GooglePlacesAutocomplete
      placeholder="Adres ekle"
      onPress={(data, details = null) => {
        const { lat, lng } = details.geometry.location;
        onAdd({
          name: data.description,
          lat,
          lng,
        });
      }}
      fetchDetails
      query={{
        key: GOOGLE_API_KEY,
        language: "tr",
      }}
      styles={{
        textInput: {
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          paddingHorizontal: 10,
        },
      }}
    />
  );
}
