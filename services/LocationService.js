import axios from "axios";
import { GOOGLE_API_KEY } from "../config/config";

export const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address,
          key: GOOGLE_API_KEY,
        },
      }
    );

    const result = response.data.results[0];
    if (!result) return null;

    const { lat, lng } = result.geometry.location;
    return {
      latitude: lat,
      longitude: lng,
    };
  } catch (error) {
    console.error("Geocoding hatası:", error);
    return null;
  }
};
