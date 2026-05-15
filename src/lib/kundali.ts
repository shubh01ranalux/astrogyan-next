export type KundaliRequest = {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  latitude: number;
  longitude: number;
  timezone?: number;
};

export async function generateBasicKundali(data: KundaliRequest) {
  const apiKey = process.env.FREE_ASTRO_API_KEY;

  if (!apiKey) {
    throw new Error("Missing FREE_ASTRO_API_KEY");
  }

  const [year, month, day] = data.birthDate.split("-").map(Number);
  const [hour, minute] = data.birthTime.split(":").map(Number);

  const response = await fetch(
    "https://api.freeastroapi.com/api/v2/vedic/chart",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        year,
        month,
        day,
        hour,
        minute,
        city: data.birthPlace,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone || 5.5,
        config: {
          observation_point: "topocentric",
          ayanamsha: "lahiri",
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.json();
}