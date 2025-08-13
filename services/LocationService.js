import * as Location from "expo-location";

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Konum izni verilmedi");
  }

  const location = await Location.getCurrentPositionAsync({});
  return {
    lat: location.coords.latitude,
    lng: location.coords.longitude,
  };
};
