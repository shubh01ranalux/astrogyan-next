import {
  getMoonPlanet,
  getPlanetName,
  getPlanetSign,
  getPlanets,
  getOutput,
} from "@/lib/calculators/astrology/kundali-extractors";

export type LuckyRudrakshaReport = {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  lagnaSign: string;
  moonSign: string;
  recommendedRudraksha: string;
  rulingPlanet: string;
  status: "Vedic Calculated";
  howCalculated: string;
  whyRecommended: string;
  planetLogic: string;
  whoShouldWear: string;
  careerSupport: string;
  emotionalSupport: string;
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

const RUDRAKSHA_BY_PLANET: Record<
  string,
  {
    rudraksha: string;
    why: string;
    who: string;
    career: string;
    emotional: string;
    do: string[];
    avoid: string[];
    remedy: string;
  }
> = {
  Sun: {
    rudraksha: "1 Mukhi or 12 Mukhi Rudraksha",
    why:
      "Sun-linked Rudraksha supports confidence, authority, self-respect and clarity of purpose.",
    who:
      "Helpful for people who need leadership, recognition, confidence and stronger decision-making.",
    career:
      "Supports leadership roles, government work, public image, authority and personal branding.",
    emotional:
      "Helps reduce self-doubt and supports inner confidence when worn with discipline.",
    do: ["Respect father/mentors", "Wake early", "Take responsibility"],
    avoid: ["Ego", "Disrespecting elders", "Misusing authority"],
    remedy:
      "Energize on Sunday morning by offering water to the rising Sun, then chant 'Om Hreem Suryaya Namah' 108 times before wearing.",
  },
  Moon: {
    rudraksha: "2 Mukhi Rudraksha",
    why:
      "Moon-linked Rudraksha supports emotional balance, peace, relationships and mental calmness.",
    who:
      "Helpful for people with emotional sensitivity, mood swings, anxiety or relationship imbalance.",
    career:
      "Supports counselling, caregiving, hospitality, public dealing and emotional intelligence-based work.",
    emotional:
      "Helps calm the mind and supports emotional stability when combined with routine.",
    do: ["Respect mother", "Protect sleep", "Practice emotional journaling"],
    avoid: ["Mood-based decisions", "Emotional dependency", "Overthinking"],
    remedy:
      "Energize on Monday by offering milk or water to Shivling, then chant 'Om Namah Shivaya' 108 times before wearing.",
  },
  Mars: {
    rudraksha: "3 Mukhi Rudraksha",
    why:
      "Mars-linked Rudraksha supports courage, action, energy, confidence and release from guilt or fear.",
    who:
      "Helpful for people who need willpower, assertiveness, physical energy and disciplined action.",
    career:
      "Supports defence, sports, engineering, entrepreneurship, surgery and action-oriented careers.",
    emotional:
      "Helps channel anger and restlessness into disciplined effort.",
    do: ["Exercise regularly", "Act with courage", "Use anger constructively"],
    avoid: ["Rash decisions", "Aggression", "Arguments"],
    remedy:
      "Energize on Tuesday by donating red lentils, then chant 'Om Angarakaya Namah' 108 times before wearing.",
  },
  Mercury: {
    rudraksha: "4 Mukhi Rudraksha",
    why:
      "Mercury-linked Rudraksha supports communication, learning, memory, speech and business intelligence.",
    who:
      "Helpful for students, writers, speakers, business owners, analysts and communicators.",
    career:
      "Supports education, sales, marketing, analytics, writing, technology and trading.",
    emotional:
      "Helps reduce scattered thinking and supports clear communication.",
    do: ["Write thoughts clearly", "Keep learning", "Speak truthfully"],
    avoid: ["Gossip", "Lying", "Overthinking"],
    remedy:
      "Energize on Wednesday by donating green moong, then chant 'Om Bum Budhaya Namah' 108 times before wearing.",
  },
  Jupiter: {
    rudraksha: "5 Mukhi Rudraksha",
    why:
      "Jupiter-linked Rudraksha supports wisdom, protection, learning, dharma and spiritual stability.",
    who:
      "Suitable for most people and especially helpful for guidance, studies, spiritual growth and protection.",
    career:
      "Supports teaching, counselling, law, spirituality, finance, consulting and education.",
    emotional:
      "Helps create faith, patience and mature judgement.",
    do: ["Respect teachers", "Study regularly", "Follow dharma"],
    avoid: ["Arrogance in knowledge", "Disrespecting gurus", "Careless promises"],
    remedy:
      "Energize on Thursday by offering yellow sweets to a temple, then chant 'Om Gurave Namah' 108 times before wearing.",
  },
  Venus: {
    rudraksha: "6 Mukhi Rudraksha",
    why:
      "Venus-linked Rudraksha supports love, charm, harmony, creativity, beauty and balanced desires.",
    who:
      "Helpful for people in beauty, arts, relationships, luxury, hospitality and creative fields.",
    career:
      "Supports design, fashion, beauty, music, hospitality, counselling and client-facing work.",
    emotional:
      "Helps balance attachment, desire and emotional expectations.",
    do: ["Keep surroundings clean", "Respect relationships", "Create beauty"],
    avoid: ["Overindulgence", "People pleasing", "Unhealthy attachment"],
    remedy:
      "Energize on Friday by donating white sweets, then chant 'Om Shukraya Namah' 108 times before wearing.",
  },
  Saturn: {
    rudraksha: "7 Mukhi or 14 Mukhi Rudraksha",
    why:
      "Saturn-linked Rudraksha supports discipline, patience, karmic stability, hard work and long-term growth.",
    who:
      "Helpful for people facing delays, pressure, career blocks, fear, debt or heavy responsibility.",
    career:
      "Supports administration, law, operations, management, engineering, labour-intensive work and long-term business.",
    emotional:
      "Helps build patience, endurance and acceptance of karmic lessons.",
    do: ["Respect time", "Serve needy people", "Work consistently"],
    avoid: ["Shortcuts", "Laziness", "Disrespecting workers or elders"],
    remedy:
      "Energize on Saturday by donating black sesame or mustard oil, then chant 'Om Sham Shanicharaya Namah' 108 times before wearing.",
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

function choosePlanet(lagnaSign: string, moonSign: string) {
  const lagnaLord = SIGN_LORDS[lagnaSign];

  if (lagnaLord) return lagnaLord;

  return SIGN_LORDS[moonSign] || "Jupiter";
}

export function calculateLuckyRudrakshaReport(input: {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  kundaliData: any;
}): LuckyRudrakshaReport {
  const planets = getPlanets(input.kundaliData);
  const ascendant = getAscendant(input.kundaliData);
  const moon = getMoonPlanet(planets);

  const lagnaSign = getAscendantSign(ascendant);
  const moonSign = getPlanetSign(moon);

  if (lagnaSign === "—") {
    throw new Error("Lagna could not be extracted from API response.");
  }

  if (!moon || moonSign === "—") {
    throw new Error("Moon Sign could not be extracted from API response.");
  }

  const rulingPlanet = choosePlanet(lagnaSign, moonSign);
  const rudraksha = RUDRAKSHA_BY_PLANET[rulingPlanet] || RUDRAKSHA_BY_PLANET.Jupiter;

  return {
    fullName: input.fullName,
    dateOfBirth: input.dateOfBirth,
    birthTime: input.birthTime,
    birthPlace: input.birthPlace,
    lagnaSign,
    moonSign,
    recommendedRudraksha: rudraksha.rudraksha,
    rulingPlanet,
    status: "Vedic Calculated",
    howCalculated:
      "This automated recommendation uses your Vedic Lagna sign and Moon sign from the birth chart. The Lagna shows body, life direction and personality, while the Moon shows mind and emotional pattern. The Rudraksha is selected mainly from the Lagna lord, with Moon sign used as a supporting factor.",
    whyRecommended: rudraksha.why,
    planetLogic: `Your Lagna is ${lagnaSign}, making ${rulingPlanet} an important guiding planet for this recommendation. Your Moon sign is ${moonSign}, which shows the mental and emotional support needed.`,
    whoShouldWear: rudraksha.who,
    careerSupport: rudraksha.career,
    emotionalSupport: rudraksha.emotional,
    whatToDo: rudraksha.do,
    whatToAvoid: rudraksha.avoid,
    remedy: rudraksha.remedy,
  };
}