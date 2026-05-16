import {
  getMoonPlanet,
  getPlanetName,
  getPlanetSign,
  getPlanets,
  getOutput,
} from "@/lib/calculators/astrology/kundali-extractors";

export type LagnaNavamsaReport = {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  lagnaSign: string;
  lagnaLord: string;
  moonSign: string;
  planetsInFirstHouse: string[];
  navamsaStatus: string;
  status: "Vedic Calculated";
  howCalculated: string;
  lagnaMeaning: string;
  personalityPattern: string;
  careerPattern: string;
  relationshipPattern: string;
  whatToDo: string[];
  whatToAvoid: string[];
  remedy: string;
};

const SIGN_LORDS: Record<string, string> = {
  Aries: "Mars",
  Taurus: "Venus",
  Gemini: "Mercury",
  Cancer: "Moon",
  Leo: "Sun",
  Virgo: "Mercury",
  Libra: "Venus",
  Scorpio: "Mars",
  Sagittarius: "Jupiter",
  Capricorn: "Saturn",
  Aquarius: "Saturn",
  Pisces: "Jupiter",
};

const LAGNA_PROFILES: Record<
  string,
  Pick<
    LagnaNavamsaReport,
    | "lagnaMeaning"
    | "personalityPattern"
    | "careerPattern"
    | "relationshipPattern"
    | "whatToDo"
    | "whatToAvoid"
    | "remedy"
  >
> = {
  Aries: {
    lagnaMeaning:
      "Aries Lagna gives action, courage, independence and a direct approach to life.",
    personalityPattern:
      "You may appear bold, energetic, fast-moving and straightforward.",
    careerPattern:
      "Good for leadership, entrepreneurship, defence, sports, engineering and action-based work.",
    relationshipPattern:
      "Relationships need patience and emotional softness because reactions can be quick.",
    whatToDo: ["Take initiative", "Exercise regularly", "Build patience"],
    whatToAvoid: ["Anger", "Impulsive decisions", "Dominating others"],
    remedy:
      "On Tuesdays, donate red lentils and practice Hanuman Chalisa with discipline.",
  },
  Taurus: {
    lagnaMeaning:
      "Taurus Lagna gives stability, beauty, patience, comfort and material-building ability.",
    personalityPattern:
      "You may appear calm, grounded, attractive and steady in your approach.",
    careerPattern:
      "Good for finance, luxury, food, beauty, music, property and stable business.",
    relationshipPattern:
      "Relationships need loyalty, consistency and emotional security.",
    whatToDo: ["Build savings", "Create stability", "Respect comfort with discipline"],
    whatToAvoid: ["Stubbornness", "Over-comfort", "Possessiveness"],
    remedy:
      "On Fridays, donate white sweets and keep your personal space clean and beautiful.",
  },
  Gemini: {
    lagnaMeaning:
      "Gemini Lagna gives communication, curiosity, learning and adaptability.",
    personalityPattern:
      "You may appear youthful, witty, intelligent and mentally active.",
    careerPattern:
      "Good for media, marketing, writing, sales, tech, teaching and communication work.",
    relationshipPattern:
      "Relationships need conversation, mental connection and clarity.",
    whatToDo: ["Learn continuously", "Communicate clearly", "Write ideas down"],
    whatToAvoid: ["Overthinking", "Gossip", "Changing decisions too quickly"],
    remedy:
      "On Wednesdays, donate green moong and chant Budh mantra with focus.",
  },
  Cancer: {
    lagnaMeaning:
      "Cancer Lagna gives emotional depth, care, intuition and family connection.",
    personalityPattern:
      "You may appear caring, protective, sensitive and emotionally aware.",
    careerPattern:
      "Good for caregiving, real estate, hospitality, psychology, food and public support.",
    relationshipPattern:
      "Relationships need emotional safety, warmth and reassurance.",
    whatToDo: ["Protect emotional peace", "Care wisely", "Build home stability"],
    whatToAvoid: ["Mood swings", "Emotional dependency", "Past attachment"],
    remedy:
      "On Mondays, offer water or milk to Shivling and practice emotional journaling.",
  },
  Leo: {
    lagnaMeaning:
      "Leo Lagna gives confidence, authority, creativity and royal presence.",
    personalityPattern:
      "You may appear proud, warm, expressive and leadership-oriented.",
    careerPattern:
      "Good for leadership, management, government, politics, performance and branding.",
    relationshipPattern:
      "Relationships need respect, appreciation and loyalty.",
    whatToDo: ["Lead generously", "Create confidently", "Respect others"],
    whatToAvoid: ["Ego", "Drama", "Need for validation"],
    remedy:
      "On Sundays, offer water to the rising Sun and serve mentors or fatherly figures.",
  },
  Virgo: {
    lagnaMeaning:
      "Virgo Lagna gives analysis, service, detail orientation and practical intelligence.",
    personalityPattern:
      "You may appear organized, observant, helpful and perfection-seeking.",
    careerPattern:
      "Good for analytics, medicine, accounting, editing, operations and technical work.",
    relationshipPattern:
      "Relationships improve when criticism becomes practical support.",
    whatToDo: ["Organize routines", "Improve skills", "Serve with humility"],
    whatToAvoid: ["Over-criticism", "Anxiety", "Perfection pressure"],
    remedy:
      "On Wednesdays, donate green items and keep your workspace clean.",
  },
  Libra: {
    lagnaMeaning:
      "Libra Lagna gives balance, diplomacy, beauty, relationships and fairness.",
    personalityPattern:
      "You may appear charming, refined, social and harmony-seeking.",
    careerPattern:
      "Good for law, design, counselling, partnerships, luxury and public relations.",
    relationshipPattern:
      "Relationships need fairness, beauty, peace and mutual respect.",
    whatToDo: ["Create balance", "Resolve conflicts calmly", "Value aesthetics"],
    whatToAvoid: ["People-pleasing", "Indecision", "Avoiding hard talks"],
    remedy:
      "On Fridays, donate white sweets and maintain harmony in your surroundings.",
  },
  Scorpio: {
    lagnaMeaning:
      "Scorpio Lagna gives intensity, secrecy, research ability and transformation.",
    personalityPattern:
      "You may appear deep, magnetic, private and emotionally powerful.",
    careerPattern:
      "Good for research, occult, psychology, surgery, investigation and strategy.",
    relationshipPattern:
      "Relationships need trust, loyalty and emotional honesty.",
    whatToDo: ["Use depth wisely", "Research deeply", "Practice emotional release"],
    whatToAvoid: ["Suspicion", "Revenge", "Control"],
    remedy:
      "On Tuesdays, donate red lentils and practice meditation for emotional release.",
  },
  Sagittarius: {
    lagnaMeaning:
      "Sagittarius Lagna gives wisdom, optimism, dharma, learning and freedom.",
    personalityPattern:
      "You may appear honest, philosophical, adventurous and growth-oriented.",
    careerPattern:
      "Good for teaching, law, spirituality, publishing, travel and consulting.",
    relationshipPattern:
      "Relationships need honesty, shared values and freedom.",
    whatToDo: ["Study wisdom", "Speak truth kindly", "Respect gurus"],
    whatToAvoid: ["Bluntness", "Restlessness", "Preaching"],
    remedy:
      "On Thursdays, donate yellow food and respect teachers, gurus and elders.",
  },
  Capricorn: {
    lagnaMeaning:
      "Capricorn Lagna gives discipline, ambition, responsibility and long-term success.",
    personalityPattern:
      "You may appear serious, mature, practical and duty-oriented.",
    careerPattern:
      "Good for administration, business, engineering, law, management and long projects.",
    relationshipPattern:
      "Relationships need reliability, maturity and emotional warmth.",
    whatToDo: ["Respect time", "Build discipline", "Think long-term"],
    whatToAvoid: ["Coldness", "Workaholism", "Fear-based choices"],
    remedy:
      "On Saturdays, serve the needy and donate black sesame or mustard oil.",
  },
  Aquarius: {
    lagnaMeaning:
      "Aquarius Lagna gives innovation, social awareness, independence and unusual thinking.",
    personalityPattern:
      "You may appear intellectual, detached, futuristic and community-minded.",
    careerPattern:
      "Good for technology, science, social work, innovation and large networks.",
    relationshipPattern:
      "Relationships need friendship, freedom and emotional availability.",
    whatToDo: ["Think long-term", "Help communities", "Use innovation ethically"],
    whatToAvoid: ["Detachment", "Rebellion without purpose", "Isolation"],
    remedy:
      "On Saturdays, serve elderly or underprivileged people with humility.",
  },
  Pisces: {
    lagnaMeaning:
      "Pisces Lagna gives compassion, imagination, spirituality and sensitivity.",
    personalityPattern:
      "You may appear gentle, dreamy, spiritual and emotionally receptive.",
    careerPattern:
      "Good for healing, spirituality, music, film, counselling, writing and service.",
    relationshipPattern:
      "Relationships need softness, devotion and clear boundaries.",
    whatToDo: ["Meditate", "Create art", "Serve with boundaries"],
    whatToAvoid: ["Escapism", "Confusion", "Over-sacrifice"],
    remedy:
      "On Thursdays, donate yellow sweets and follow Guru mantra or spiritual study.",
  },
};

function getAscendant(kundaliData: any) {
  const output = getOutput(kundaliData);
  return output?.ascendant || output?.lagna || {};
}

function getAscendantSign(ascendant: any) {
  return (
    ascendant?.sign?.name ||
    ascendant?.sign ||
    ascendant?.rashi?.name ||
    ascendant?.rashi ||
    ascendant?.zodiac_sign_name ||
    ascendant?.zodiac ||
    "—"
  );
}

function getPlanetHouse(planet: any) {
  return planet?.house || planet?.house_number || planet?.bhava || "—";
}

function getPlanetsInFirstHouse(planets: any[]) {
  return planets
    .filter((planet) => Number(getPlanetHouse(planet)) === 1)
    .map((planet) => getPlanetName(planet));
}

export function calculateLagnaNavamsaReport(input: {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  kundaliData: any;
}): LagnaNavamsaReport {
  const planets = getPlanets(input.kundaliData);
  const ascendant = getAscendant(input.kundaliData);
  const moon = getMoonPlanet(planets);

  const lagnaSign = getAscendantSign(ascendant);
  const moonSign = getPlanetSign(moon);

  if (lagnaSign === "—") {
    throw new Error("Lagna could not be extracted from API response.");
  }

  const profile = LAGNA_PROFILES[lagnaSign];

  if (!profile) {
    throw new Error(`Unsupported Lagna sign received from API: ${lagnaSign}`);
  }

  return {
    fullName: input.fullName,
    dateOfBirth: input.dateOfBirth,
    birthTime: input.birthTime,
    birthPlace: input.birthPlace,
    lagnaSign,
    lagnaLord: SIGN_LORDS[lagnaSign] || "—",
    moonSign,
    planetsInFirstHouse: getPlanetsInFirstHouse(planets),
    navamsaStatus:
      "Navamsa/D9 chart requires divisional chart data from the astrology API. This automated page currently verifies Lagna from D1 birth chart and is ready to show D9 once the API endpoint is connected.",
    status: "Vedic Calculated",
    howCalculated:
      "Lagna is calculated from the eastern horizon sign at the exact birth date, birth time and birth place. It changes approximately every two hours, so birth time and coordinates are important. Navamsa is the D9 divisional chart derived from planetary degrees and is used for marriage, dharma and deeper strength analysis.",
    ...profile,
  };
}