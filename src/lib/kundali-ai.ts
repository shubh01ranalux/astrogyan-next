import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

export async function generateKundaliInsights({
  name,
  lagna,
  moonSign,
  nakshatra,
  planets,
  houses,
}: {
  name: string;
  lagna: string;
  moonSign: string;
  nakshatra: string;
  planets: string[];
  houses: Record<number, string[]>;
}) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = `
You are an elite Vedic astrology guide for AstroGyan.

Generate a highly personalised automated Kundli interpretation.

Birth chart:
Name: ${name}
Lagna: ${lagna}
Moon Sign: ${moonSign}
Nakshatra: ${nakshatra}

House-wise placements:
${Object.entries(houses)
  .map(([house, data]: [string, any]) => {
    const planetNames = Array.isArray(data)
      ? data.join(", ")
      : data?.planets?.length
        ? data.planets
            .map((planet: any) =>
              typeof planet === "string"
                ? planet
                : `${planet.name || planet.planet_name || planet.full_name || "Planet"}${
                    planet.isRetro || planet.is_retro || planet.retrograde
                      ? "*"
                      : ""
                  }`
            )
            .join(", ")
        : "Empty";

    const sign = data?.currentSign || data?.current_sign || "—";

    return `House ${house} (Sign ${sign}): ${planetNames}`;
  })
  .join("\n")}

Planetary positions:
${planets.join("\n")}

Generate ONLY valid JSON:
{
  "personality": "",
  "career": "",
  "marriage": "",
  "karmic_patterns": "",
  "what_to_do": [],
  "what_to_avoid": [],
  "remedy": ""
}

Rules:
- Use actual chart placements.
- Mention planets and houses naturally.
- No generic astrology text.
- Keep insights concise but personalised.
- Remedy should feel meaningful and Vedic.
- No markdown.
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini Kundali fallback:", error);

    return {
      personality:
        "Your Lagna and Moon sign create a unique personality pattern that requires deeper chart interpretation.",
      career:
        "Career direction should be judged through the 10th house, Saturn, Sun and Mercury placements.",
      marriage:
        "Marriage and emotional compatibility should be checked through the 7th house, Moon, Venus and Navamsa.",
      karmic_patterns:
        "Rahu, Ketu and Saturn placements show important karmic lessons and life growth areas.",
      what_to_do: [
        "Verify birth time carefully",
        "Read Lagna and Moon together",
        "Book detailed consultation for Dasha timing",
      ],
      what_to_avoid: [
        "Do not judge life from one planet only",
        "Do not wear gemstones without verification",
        "Do not treat automated report as final prediction",
      ],
      remedy:
        "Every Monday, offer water to Shivling and pray for clarity and emotional balance for 11 Mondays.",
    };
  }
}