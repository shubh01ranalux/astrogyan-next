import {
  getMoonPlanet,
  getPlanetSign,
  getPlanets,
} from "@/lib/calculators/astrology/kundali-extractors";

export type MoonSignReport = {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  birthLatitude: number | null;
  birthLongitude: number | null;
  birthTimezone: number;
  moonSign: string;
  moonSignLord: string;
  element: string;
  nature: string;
  calculatedFrom: string;
  confidence: "Vedic Calculated";
  howCalculated: string;
  resultMeaning: string;
  emotionalPattern: string;
  careerPattern: string;
  relationshipPattern: string;
  whatToDo: string[];
  whatToAvoid: string[];
  remedy: string;
};

const MOON_SIGNS = [
  {
    sign: "Aries",
    lord: "Mars",
    element: "Fire",
    nature: "Active, bold, direct and action-oriented",
    meaning:
      "Moon in Aries gives quick emotions, courage, impatience and a strong need to act immediately.",
    emotional:
      "Emotions rise quickly and settle quickly. The person may dislike emotional delays.",
    career:
      "Good for action-based work, leadership, sports, defence, entrepreneurship and fast decisions.",
    relationship:
      "Needs honesty, excitement and space. Avoid reacting in anger.",
    do: ["Act with courage", "Exercise regularly", "Take initiative"],
    avoid: ["Impulsive reactions", "Anger-based decisions", "Dominating others"],
    remedy:
      "On Tuesdays, donate red lentils or jaggery and practice Hanuman Chalisa with discipline.",
  },
  {
    sign: "Taurus",
    lord: "Venus",
    element: "Earth",
    nature: "Stable, sensual, patient and comfort-loving",
    meaning:
      "Moon in Taurus gives emotional stability, love for comfort, beauty, food, money and security.",
    emotional:
      "The person feels peaceful when life is stable, predictable and materially secure.",
    career:
      "Good for finance, food, luxury, design, music, beauty, property and stable business.",
    relationship:
      "Needs loyalty, touch, consistency and emotional security.",
    do: ["Build financial stability", "Keep surroundings beautiful", "Value loyalty"],
    avoid: ["Stubbornness", "Over-comfort", "Possessiveness"],
    remedy:
      "On Fridays, offer white sweets or perfume at a temple and keep your bedroom clean and pleasant.",
  },
  {
    sign: "Gemini",
    lord: "Mercury",
    element: "Air",
    nature: "Curious, communicative, flexible and mentally active",
    meaning:
      "Moon in Gemini gives a thinking mind, communication skills, curiosity and emotional restlessness.",
    emotional:
      "The mind needs variety, conversation and mental stimulation.",
    career:
      "Good for communication, writing, marketing, sales, media, technology and teaching.",
    relationship:
      "Needs conversation, humour and mental connection.",
    do: ["Write your thoughts", "Learn continuously", "Communicate clearly"],
    avoid: ["Overthinking", "Gossip", "Changing decisions too quickly"],
    remedy:
      "On Wednesdays, donate green moong and chant Budh mantra with focused breathing.",
  },
  {
    sign: "Cancer",
    lord: "Moon",
    element: "Water",
    nature: "Emotional, caring, protective and intuitive",
    meaning:
      "Moon in Cancer gives strong emotions, nurturing nature, family attachment and intuition.",
    emotional:
      "The person is sensitive and deeply affected by home, family and emotional safety.",
    career:
      "Good for caregiving, hospitality, food, psychology, healing, real estate and public support.",
    relationship:
      "Needs emotional warmth, care and reassurance.",
    do: ["Respect emotions", "Spend time near water", "Care for family wisely"],
    avoid: ["Mood swings", "Emotional dependency", "Past attachment"],
    remedy:
      "On Mondays, offer water or milk to Shivling and practice emotional journaling.",
  },
  {
    sign: "Leo",
    lord: "Sun",
    element: "Fire",
    nature: "Royal, expressive, proud and generous",
    meaning:
      "Moon in Leo gives confidence, warmth, pride, creativity and a need for recognition.",
    emotional:
      "The person feels emotionally fulfilled when respected and appreciated.",
    career:
      "Good for leadership, politics, management, performance, branding and creative authority.",
    relationship:
      "Needs appreciation, loyalty and respect.",
    do: ["Lead with generosity", "Create confidently", "Respect others"],
    avoid: ["Ego", "Drama", "Need for constant validation"],
    remedy:
      "On Sundays, offer water to the rising Sun and serve fatherly figures or mentors.",
  },
  {
    sign: "Virgo",
    lord: "Mercury",
    element: "Earth",
    nature: "Analytical, practical, detail-oriented and service-minded",
    meaning:
      "Moon in Virgo gives analysis, perfectionism, service attitude and strong observation.",
    emotional:
      "The person processes emotions through logic, details and practical solutions.",
    career:
      "Good for analytics, medicine, service, editing, finance, operations and technical work.",
    relationship:
      "Shows love through help, service and practical support.",
    do: ["Organize routines", "Serve with humility", "Improve skills"],
    avoid: ["Over-criticism", "Anxiety", "Perfectionism"],
    remedy:
      "On Wednesdays, donate green items and keep your workspace clean and organized.",
  },
  {
    sign: "Libra",
    lord: "Venus",
    element: "Air",
    nature: "Balanced, social, artistic and relationship-oriented",
    meaning:
      "Moon in Libra gives diplomacy, beauty, charm, fairness and relationship focus.",
    emotional:
      "The person feels balanced when relationships and surroundings are harmonious.",
    career:
      "Good for design, law, counselling, partnerships, luxury, art and public relations.",
    relationship:
      "Needs peace, fairness, beauty and mutual respect.",
    do: ["Create balance", "Resolve conflicts calmly", "Value aesthetics"],
    avoid: ["People-pleasing", "Indecision", "Avoiding hard conversations"],
    remedy:
      "On Fridays, donate white sweets and maintain harmony in your living space.",
  },
  {
    sign: "Scorpio",
    lord: "Mars",
    element: "Water",
    nature: "Intense, private, transformative and deep",
    meaning:
      "Moon in Scorpio gives emotional intensity, secrecy, transformation and deep intuition.",
    emotional:
      "The person feels emotions deeply and may hide vulnerability.",
    career:
      "Good for research, occult, psychology, surgery, investigation, strategy and crisis work.",
    relationship:
      "Needs trust, loyalty and emotional depth.",
    do: ["Practice emotional release", "Use intensity for research", "Build trust slowly"],
    avoid: ["Suspicion", "Revenge", "Emotional control"],
    remedy:
      "On Tuesdays, donate red lentils and practice disciplined meditation for emotional release.",
  },
  {
    sign: "Sagittarius",
    lord: "Jupiter",
    element: "Fire",
    nature: "Wise, optimistic, spiritual and freedom-loving",
    meaning:
      "Moon in Sagittarius gives optimism, wisdom, philosophy, travel and spiritual curiosity.",
    emotional:
      "The person needs meaning, truth, learning and freedom.",
    career:
      "Good for teaching, law, spirituality, publishing, travel, consulting and higher education.",
    relationship:
      "Needs honesty, freedom and shared values.",
    do: ["Study wisdom", "Travel with purpose", "Speak truth kindly"],
    avoid: ["Bluntness", "Restlessness", "Preaching"],
    remedy:
      "On Thursdays, donate yellow food and respect teachers, gurus and elders.",
  },
  {
    sign: "Capricorn",
    lord: "Saturn",
    element: "Earth",
    nature: "Disciplined, serious, practical and responsible",
    meaning:
      "Moon in Capricorn gives emotional control, ambition, responsibility and maturity through hardship.",
    emotional:
      "The person may hide emotions and prefer practical stability over emotional display.",
    career:
      "Good for administration, business, law, engineering, management and long-term projects.",
    relationship:
      "Needs loyalty, maturity and reliability.",
    do: ["Build discipline", "Respect time", "Take responsibility"],
    avoid: ["Emotional coldness", "Workaholism", "Fear-based decisions"],
    remedy:
      "On Saturdays, serve the needy and donate black sesame or mustard oil with humility.",
  },
  {
    sign: "Aquarius",
    lord: "Saturn",
    element: "Air",
    nature: "Humanitarian, unconventional, intellectual and future-focused",
    meaning:
      "Moon in Aquarius gives unusual thinking, social awareness, detachment and innovation.",
    emotional:
      "The person may process feelings intellectually and value independence.",
    career:
      "Good for technology, social work, science, innovation, networks and large communities.",
    relationship:
      "Needs friendship, freedom and intellectual connection.",
    do: ["Think long-term", "Help communities", "Use innovation"],
    avoid: ["Emotional detachment", "Rebellion without purpose", "Isolation"],
    remedy:
      "On Saturdays, serve elderly or underprivileged people and avoid arrogance in knowledge.",
  },
  {
    sign: "Pisces",
    lord: "Jupiter",
    element: "Water",
    nature: "Spiritual, imaginative, compassionate and sensitive",
    meaning:
      "Moon in Pisces gives imagination, devotion, compassion, dreams and spiritual sensitivity.",
    emotional:
      "The person absorbs emotions easily and needs spiritual grounding.",
    career:
      "Good for healing, spirituality, music, film, counselling, writing and compassionate service.",
    relationship:
      "Needs emotional softness, devotion and understanding.",
    do: ["Meditate", "Create art", "Serve with boundaries"],
    avoid: ["Escapism", "Confusion", "Over-sacrifice"],
    remedy:
      "On Thursdays, donate yellow sweets and practice Guru mantra or spiritual study.",
  },
];

function validateBirthDetails(dateOfBirth: string, birthTime: string) {
  if (!dateOfBirth) throw new Error("Date of birth is required.");
  if (!birthTime) throw new Error("Birth time is required.");

  const [year, month, day] = dateOfBirth.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error("Please enter a valid date of birth.");
  }
}

/**
 * Temporary deterministic fallback.
 * Replace this with a real Vedic ephemeris/API result before claiming exactness.
 */

export function calculateMoonSignReport(input: {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  birthLatitude: number | null;
  birthLongitude: number | null;
  birthTimezone: number;
  kundaliData: any;
}): MoonSignReport {
  validateBirthDetails(input.dateOfBirth, input.birthTime);

  if (!input.birthPlace) {
    throw new Error("Birth place is required.");
  }

const planets = getPlanets(input.kundaliData);
const moon = getMoonPlanet(planets);
const moonSign = getPlanetSign(moon);

if (!moon || moonSign === "—") {
  throw new Error("Moon Sign could not be extracted from API response.");
}

const signData = MOON_SIGNS.find(
  (item) => item.sign.toLowerCase() === String(moonSign).toLowerCase()
);

if (!signData) {
  throw new Error(`Unsupported Moon Sign received from API: ${moonSign}`);
}
  return {
    fullName: input.fullName,
    dateOfBirth: input.dateOfBirth,
    birthTime: input.birthTime,
    birthPlace: input.birthPlace,
    birthLatitude: input.birthLatitude,
    birthLongitude: input.birthLongitude,
    birthTimezone: input.birthTimezone,
    moonSign: signData.sign,
    moonSignLord: signData.lord,
    element: signData.element,
    nature: signData.nature,
    calculatedFrom:
      "Birth date, birth time, birth place, latitude, longitude and timezone.",
    confidence: "Vedic Calculated",
    howCalculated:
      "In exact Vedic astrology, Moon Sign is calculated from the Moon’s sidereal longitude at the time and place of birth, using ayanamsa and the zodiac sign occupied by the Moon. This UI is ready for ephemeris/API integration.",
    resultMeaning: signData.meaning,
    emotionalPattern: signData.emotional,
    careerPattern: signData.career,
    relationshipPattern: signData.relationship,
    whatToDo: signData.do,
    whatToAvoid: signData.avoid,
    remedy: signData.remedy,
  };
}