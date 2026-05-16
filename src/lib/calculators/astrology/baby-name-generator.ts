import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  getMoonPlanet,
  getPlanetNakshatra,
  getPlanetSign,
  getPlanets,
} from "@/lib/calculators/astrology/kundali-extractors";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export type BabyNameItem = {
  name: string;
  meaning: string;
  style: string;
  starting_sound: string;
  personality_vibe: string;
};

export type BabyNameReport = {
  mode: "nakshatra" | "parent_numerology";
  babyGender: string;
  preferredStyle: string;
  energySource: string;
  luckyInitials: string[];
  nakshatra?: string;
  moonSign?: string;
  parentNumerology?: {
    motherNumber: number;
    fatherNumber: number;
    combinedNumber: number;
    energy: string;
  };
  names: BabyNameItem[];
  bestRecommendation: string;
  whyThisSuits: string;
  whatToDo: string[];
  whatToAvoid: string[];
  remedy: string;
};

const NAKSHATRA_SYLLABLES: Record<string, string[]> = {
  Ashwini: ["Chu", "Che", "Cho", "La"],
  Bharani: ["Li", "Lu", "Le", "Lo"],
  Krittika: ["A", "E", "U", "Ea"],
  Rohini: ["O", "Va", "Vi", "Vu"],
  Mrigashira: ["Ve", "Vo", "Ka", "Ki"],
  Ardra: ["Ku", "Gha", "Na", "Cha"],
  Punarvasu: ["Ke", "Ko", "Ha", "Hi"],
  Pushya: ["Hu", "He", "Ho", "Da"],
  Ashlesha: ["Di", "Du", "De", "Do"],
  Magha: ["Ma", "Mi", "Mu", "Me"],
  "Purva Phalguni": ["Mo", "Ta", "Ti", "Tu"],
  "Uttara Phalguni": ["Te", "To", "Pa", "Pi"],
  Hasta: ["Pu", "Sha", "Na", "Tha"],
  Chitra: ["Pe", "Po", "Ra", "Ri"],
  Swati: ["Ru", "Re", "Ro", "Ta"],
  Vishakha: ["Ti", "Tu", "Te", "To"],
  Anuradha: ["Na", "Ni", "Nu", "Ne"],
  Jyeshtha: ["No", "Ya", "Yi", "Yu"],
  Mula: ["Ye", "Yo", "Bha", "Bhi"],
  "Purva Ashadha": ["Bhu", "Dha", "Pha", "Dha"],
  "Uttara Ashadha": ["Bhe", "Bho", "Ja", "Ji"],
  Shravana: ["Ju", "Je", "Jo", "Khi"],
  Dhanishta: ["Ga", "Gi", "Gu", "Ge"],
  Shatabhisha: ["Go", "Sa", "Si", "Su"],
  "Purva Bhadrapada": ["Se", "So", "Da", "Di"],
  "Uttara Bhadrapada": ["Du", "Tha", "Jha", "Na"],
  Revati: ["De", "Do", "Cha", "Chi"],
};

const NUMEROLOGY_ALPHABETS: Record<number, string[]> = {
  1: ["A", "I", "J", "Q", "Y"],
  2: ["B", "K", "R"],
  3: ["C", "G", "L", "S"],
  4: ["D", "M", "T"],
  5: ["E", "H", "N", "X"],
  6: ["U", "V", "W"],
  7: ["O", "Z"],
  8: ["F", "P"],
  9: ["R", "S", "T"],
};

const NUMEROLOGY_ENERGY: Record<number, string> = {
  1: "leadership, confidence, individuality and ambition",
  2: "peace, emotional intelligence, softness and harmony",
  3: "creativity, joy, wisdom and expression",
  4: "discipline, structure, practicality and stability",
  5: "communication, freedom, intelligence and adaptability",
  6: "love, beauty, family harmony and responsibility",
  7: "intuition, spirituality, research and inner wisdom",
  8: "power, discipline, success and karmic maturity",
  9: "courage, compassion, completion and impact",
};

function reduceNumber(total: number) {
  let value = Math.abs(total);

  while (value > 9) {
    value = String(value)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return value;
}

function calculateDestinyNumber(dob: string) {
  const digits = dob.replaceAll("-", "").split("").map(Number);
  return reduceNumber(digits.reduce((sum, digit) => sum + digit, 0));
}

function getMoonDetails(kundaliData: any) {
  const planets = getPlanets(kundaliData);
  const moon = getMoonPlanet(planets);

  if (!moon) {
    throw new Error("Moon could not be extracted from baby Kundali.");
  }

  const moonSign = getPlanetSign(moon);
  const nakshatra = getPlanetNakshatra(moon);

  if (moonSign === "—" || nakshatra === "—") {
    throw new Error("Moon Sign or Nakshatra missing from baby Kundali.");
  }

  return { moonSign, nakshatra };
}

async function askGemini(prompt: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

export async function generateBabyNameByNakshatra(input: {
  babyGender: string;
  preferredStyle: string;
  kundaliData: any;
}): Promise<BabyNameReport> {
  const { moonSign, nakshatra } = getMoonDetails(input.kundaliData);
  const syllables = NAKSHATRA_SYLLABLES[nakshatra] || [];

  const prompt = `
You are an elite Vedic baby naming expert for AstroGyan.

Generate baby names using Nakshatra-based syllables.

Baby details:
Gender preference: ${input.babyGender}
Preferred style: ${input.preferredStyle}
Moon Sign: ${moonSign}
Nakshatra: ${nakshatra}
Allowed starting syllables: ${syllables.join(", ")}

Generate ONLY valid JSON:
{
  "names": [
    {
      "name": "",
      "meaning": "",
      "style": "",
      "starting_sound": "",
      "personality_vibe": ""
    }
  ],
  "bestRecommendation": "",
  "whyThisSuits": "",
  "whatToDo": [],
  "whatToAvoid": [],
  "remedy": ""
}

Rules:
- Generate 15 names.
- Names must suit Indian/Hindu/Sanskrit-modern taste.
- Include traditional-modern, luxury, spiritual and Gen-Z friendly names.
- Use only the allowed starting syllables where possible.
- Meanings must be short and believable.
- No markdown.
`;

  const data = await askGemini(prompt);

  return {
    mode: "nakshatra",
    babyGender: input.babyGender,
    preferredStyle: input.preferredStyle,
    energySource: `${nakshatra} Nakshatra and ${moonSign} Moon Sign`,
    luckyInitials: syllables,
    nakshatra,
    moonSign,
    names: data.names || [],
    bestRecommendation: data.bestRecommendation || "",
    whyThisSuits: data.whyThisSuits || "",
    whatToDo: data.whatToDo || [],
    whatToAvoid: data.whatToAvoid || [],
    remedy:
      data.remedy ||
      "Before finalising the name, write it 108 times on a clean Thursday or Monday and pray for the child’s health, wisdom and protection.",
  };
}

export async function generateBabyNameByParentNumerology(input: {
  motherName: string;
  motherDob: string;
  fatherName: string;
  fatherDob: string;
  babyGender: string;
  preferredStyle: string;
}): Promise<BabyNameReport> {
  const motherNumber = calculateDestinyNumber(input.motherDob);
  const fatherNumber = calculateDestinyNumber(input.fatherDob);
  const combinedNumber = reduceNumber(motherNumber + fatherNumber);
  const luckyInitials = NUMEROLOGY_ALPHABETS[combinedNumber] || ["A", "S", "M"];
  const energy = NUMEROLOGY_ENERGY[combinedNumber];

  const prompt = `
You are an elite Vedic numerology + modern baby naming expert for AstroGyan.

Baby birth details are not available, so generate names from parents' combined numerology.

Mother:
Name: ${input.motherName}
Destiny Number: ${motherNumber}

Father:
Name: ${input.fatherName}
Destiny Number: ${fatherNumber}

Combined parent vibration: ${combinedNumber}
Combined energy: ${energy}
Lucky initials / starting letters: ${luckyInitials.join(", ")}

Baby gender preference: ${input.babyGender}
Preferred style: ${input.preferredStyle}

Generate ONLY valid JSON:
{
  "names": [
    {
      "name": "",
      "meaning": "",
      "style": "",
      "starting_sound": "",
      "personality_vibe": ""
    }
  ],
  "bestRecommendation": "",
  "whyThisSuits": "",
  "whatToDo": [],
  "whatToAvoid": [],
  "remedy": ""
}

Rules:
- Generate 18 names.
- Names should be modern, Gen-Z friendly, traditional-modern, luxury and meaningful.
- Prefer Indian/Hindu/Sanskrit-modern names.
- Names should align with combined numerology vibration and lucky initials.
- Avoid extremely common boring names unless they have a premium feel.
- No markdown.
`;

  const data = await askGemini(prompt);

  return {
    mode: "parent_numerology",
    babyGender: input.babyGender,
    preferredStyle: input.preferredStyle,
    energySource: `Parents' combined numerology vibration ${combinedNumber}`,
    luckyInitials,
    parentNumerology: {
      motherNumber,
      fatherNumber,
      combinedNumber,
      energy,
    },
    names: data.names || [],
    bestRecommendation: data.bestRecommendation || "",
    whyThisSuits: data.whyThisSuits || "",
    whatToDo: data.whatToDo || [],
    whatToAvoid: data.whatToAvoid || [],
    remedy:
      data.remedy ||
      "Before finalising the name, chant the chosen name 108 times on a Thursday and pray for the child’s wisdom, health and protection.",
  };
}