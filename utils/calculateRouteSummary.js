import { GOOGLE_API_KEY } from "../config/config";

export async function calculateRouteSummary(route) {
  if (route.length < 2) return null;

  const origin = `${route[0].latitude},${route[0].longitude}`;
  const destination = `${route[route.length - 1].latitude},${route[route.length - 1].longitude}`;
  const waypoints = route
    .slice(1, -1)
    .map((point) => `${point.latitude},${point.longitude}`)
    .join("|");

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${GOOGLE_API_KEY}&mode=driving`;

  const response = await fetch(url);
  const data = await response.json();

  const routeData = data.routes?.[0];
  if (!routeData) return null;

  const totalDistance = routeData.legs.reduce(
    (sum, leg) => sum + leg.distance.value,
    0
  );
  const totalDuration = routeData.legs.reduce(
    (sum, leg) => sum + leg.duration.value,
    0
  );

  return {
    distanceKm: (totalDistance / 1000).toFixed(2),
    durationMin: Math.ceil(totalDuration / 60),
  };
}
