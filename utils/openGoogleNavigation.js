import { Linking } from "react-native";

export const openGoogleNavigation = (origin, waypoints) => {
  if (!origin || waypoints.length < 1) return;

  const originStr = `${origin.latitude},${origin.longitude}`;
  const destinationStr = `${waypoints[waypoints.length - 1].latitude},${waypoints[waypoints.length - 1].longitude}`;
  const wpStr = waypoints
    .slice(0, -1)
    .map((w) => `${w.latitude},${w.longitude}`)
    .join("|");

  const url = `https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destinationStr}&waypoints=${wpStr}&travelmode=driving`;

  Linking.openURL(url);
};
