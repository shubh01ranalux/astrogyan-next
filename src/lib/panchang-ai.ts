import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

export async function generateDailyPanchangInsights({
  tithi,
  nakshatra,
  yoga,
  karana,
}: {
  tithi: string;
  nakshatra: string;
  yoga?: string;
  karana?: string;
}) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = `
You are an elite Vedic astrology guide for Astrogyan.

Today's Panchang:
- Tithi: ${tithi}
- Nakshatra: ${nakshatra}
- Yoga: ${yoga || "Unknown"}
- Karana: ${karana || "Unknown"}

Generate:
1. 3 highly specific activities good for today
2. 3 things to avoid today
3. One short premium spiritual insight message

Rules:
- Avoid generic repetitive outputs
- Make each day feel unique
- Keep responses concise
- Luxury spiritual tone
- No markdown

Return ONLY valid JSON:
{
  "good_for": [],
  "avoid": [],
  "message": ""
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini Panchang fallback:", error);

    return {
      good_for: [
        "Meditation",
        "Planning",
        "Creative Work",
      ],
      avoid: [
        "Arguments",
        "Impulsive Decisions",
        "Negativity",
      ],
      message:
        "Today favors balanced spiritual and material decisions.",
    };
  }
}