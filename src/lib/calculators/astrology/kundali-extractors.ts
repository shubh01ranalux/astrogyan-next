export function getOutput(data: any) {
  return data?.output || data?.data || data || {};
}

export function getPlanets(apiData: any) {
  const output = getOutput(apiData);

  if (Array.isArray(output?.planets)) return output.planets;
  if (Array.isArray(output?.grahas)) return output.grahas;
  if (Array.isArray(output?.planetary_positions)) return output.planetary_positions;

  return [];
}

export function getPlanetName(planet: any) {
  return planet?.name || planet?.planet || planet?.graha || "—";
}

export function getMoonPlanet(planets: any[]) {
  return planets.find((planet) => {
    const name = String(getPlanetName(planet)).toLowerCase();
    return name === "moon" || name.includes("chandra");
  });
}

export function getPlanetSign(planet: any) {
  return (
    planet?.sign?.name ||
    planet?.sign ||
    planet?.rashi?.name ||
    planet?.rashi ||
    planet?.zodiac_sign_name ||
    planet?.zodiac ||
    planet?.rasi ||
    "—"
  );
}

export function getPlanetNakshatra(planet: any) {
  return (
    planet?.nakshatra?.name ||
    planet?.nakshatra_name ||
    planet?.nakshatra ||
    planet?.star?.name ||
    planet?.star ||
    "—"
  );
}

export function getPlanetNakshatraPada(planet: any) {
  return (
    planet?.nakshatra?.pada ||
    planet?.nakshatra_pada ||
    planet?.nakshatraPada ||
    planet?.pada ||
    "—"
  );
}