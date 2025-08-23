import haversine from "haversine-distance";

export function optimizeRoute(locations, options = {}) {
  const { fixedStart } = options;

  const points = fixedStart
    ? locations.filter(
        (loc) =>
          loc.latitude !== fixedStart.latitude ||
          loc.longitude !== fixedStart.longitude
      )
    : [...locations];

  const permutations = getPermutations(points);
  let shortest = null;
  let minDistance = Infinity;

  for (const perm of permutations) {
    const route = fixedStart ? [fixedStart, ...perm] : perm;
    const distance = calculateTotalDistance(route);

    if (distance < minDistance) {
      minDistance = distance;
      shortest = route;
    }
  }

  return shortest;
}

function calculateTotalDistance(route) {
  let total = 0;
  for (let i = 0; i < route.length - 1; i++) {
    total += haversine(route[i], route[i + 1]);
  }
  return total;
}

function getPermutations(arr) {
  if (arr.length <= 1) return [arr];
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
    const perms = getPermutations(remaining);
    for (const perm of perms) {
      result.push([current, ...perm]);
    }
  }

  return result;
}
