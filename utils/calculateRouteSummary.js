import { GOOGLE_API_KEY } from "../config/config";

export async function calculateRouteSummary(route) {
  const stats = { totalDistance: 0, totalDuration: 0 };

  for (let i = 0; i < route.length - 1; i++) {
    const origin = `${route[i].latitude},${route[i].longitude}`;
    const destination = `${route[i + 1].latitude},${route[i + 1].longitude}`;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const element = data.rows[0].elements[0];
    if (element.status === "OK") {
      stats.totalDistance += element.distance.value;
      stats.totalDuration += element.duration.value;
    }
  }

  return {
    distanceKm: (stats.totalDistance / 1000).toFixed(2),
    durationMin: Math.ceil(stats.totalDuration / 60),
  };
}
