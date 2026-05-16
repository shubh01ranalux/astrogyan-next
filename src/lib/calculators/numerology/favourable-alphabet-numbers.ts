export type FavourableAlphabetNumbersReport = {
  dob: string;
  digits: number[];
  total: number;
  destinyNumber: number;
  title: string;
  favourableAlphabets: string[];
  favourableNumbers: number[];
  luckyDates: number[];
  supportNumbers: number[];
  avoidNumbers: number[];
  meaning: string;
  nameUse: string;
  businessUse: string;
  relationshipUse: string;
  caution: string;
  remedy: string;
};

const PROFILES: Record<
  number,
  Omit<
    FavourableAlphabetNumbersReport,
    "dob" | "digits" | "total" | "destinyNumber"
  >
> = {
  1: {
    title: "Sun-Aligned Letters & Numbers",
    favourableAlphabets: ["A", "I", "J", "Q", "Y"],
    favourableNumbers: [1, 3, 5, 9],
    luckyDates: [1, 10, 19, 28],
    supportNumbers: [3, 5, 9],
    avoidNumbers: [8],
    meaning:
      "Your favourable letters and numbers support leadership, confidence, visibility and fresh beginnings.",
    nameUse:
      "Names starting with these alphabets may support confidence, authority and individuality.",
    businessUse:
      "Good for brands connected with leadership, personal branding, management and entrepreneurship.",
    relationshipUse:
      "These numbers support confident expression, but balance them with humility.",
    caution:
      "Avoid becoming too ego-driven or impatient when using strong Sun energy.",
    remedy:
      "Use favourable letters and numbers for important launches, usernames, brand names and planning dates.",
  },
  2: {
    title: "Moon-Aligned Letters & Numbers",
    favourableAlphabets: ["B", "K", "R"],
    favourableNumbers: [2, 4, 6],
    luckyDates: [2, 11, 20, 29],
    supportNumbers: [4, 6],
    avoidNumbers: [9],
    meaning:
      "Your favourable letters and numbers support peace, emotional balance, intuition and relationships.",
    nameUse:
      "Names starting with these alphabets may feel softer, more caring and relationship-oriented.",
    businessUse:
      "Good for counselling, healing, hospitality, partnership and care-based brands.",
    relationshipUse:
      "These numbers support emotional bonding, patience and harmony.",
    caution:
      "Avoid over-dependence, emotional decisions and mood-based choices.",
    remedy:
      "Use these letters and dates for relationship healing, client work and partnership decisions.",
  },
  3: {
    title: "Jupiter-Aligned Letters & Numbers",
    favourableAlphabets: ["C", "G", "L", "S"],
    favourableNumbers: [1, 3, 6, 9],
    luckyDates: [3, 12, 21, 30],
    supportNumbers: [1, 6, 9],
    avoidNumbers: [4],
    meaning:
      "Your favourable letters and numbers support creativity, wisdom, communication and growth.",
    nameUse:
      "Names starting with these alphabets may support expression, learning and positivity.",
    businessUse:
      "Good for education, content, teaching, media, design and spiritual learning brands.",
    relationshipUse:
      "These numbers support cheerful communication and joyful bonding.",
    caution:
      "Avoid scattered focus, over-promising and incomplete execution.",
    remedy:
      "Use these alphabets in creative projects, content names, courses and learning-related work.",
  },
  4: {
    title: "Rahu-Aligned Letters & Numbers",
    favourableAlphabets: ["D", "M", "T"],
    favourableNumbers: [2, 4, 8],
    luckyDates: [4, 13, 22, 31],
    supportNumbers: [2, 8],
    avoidNumbers: [3],
    meaning:
      "Your favourable letters and numbers support structure, systems, discipline and practical growth.",
    nameUse:
      "Names starting with these alphabets may support seriousness, stability and hard work.",
    businessUse:
      "Good for technology, systems, operations, finance, logistics and process-based work.",
    relationshipUse:
      "These numbers support responsibility and practical commitment.",
    caution:
      "Avoid rigidity, overthinking and shortcuts.",
    remedy:
      "Use these letters and numbers for planning, documentation, business systems and long-term goals.",
  },
  5: {
    title: "Mercury-Aligned Letters & Numbers",
    favourableAlphabets: ["E", "H", "N", "X"],
    favourableNumbers: [1, 5, 6],
    luckyDates: [5, 14, 23],
    supportNumbers: [1, 6],
    avoidNumbers: [8],
    meaning:
      "Your favourable letters and numbers support communication, business, travel and adaptability.",
    nameUse:
      "Names starting with these alphabets may support networking, communication and flexibility.",
    businessUse:
      "Good for marketing, sales, media, travel, digital work and trading brands.",
    relationshipUse:
      "These numbers support light communication and openness.",
    caution:
      "Avoid impulsive decisions, inconsistency and scattered planning.",
    remedy:
      "Use these letters for usernames, business names, campaigns and communication-heavy work.",
  },
  6: {
    title: "Venus-Aligned Letters & Numbers",
    favourableAlphabets: ["U", "V", "W"],
    favourableNumbers: [3, 6, 9],
    luckyDates: [6, 15, 24],
    supportNumbers: [3, 9],
    avoidNumbers: [7],
    meaning:
      "Your favourable letters and numbers support beauty, love, harmony, comfort and responsibility.",
    nameUse:
      "Names starting with these alphabets may feel attractive, graceful and relationship-friendly.",
    businessUse:
      "Good for beauty, luxury, fashion, design, hospitality, counselling and family brands.",
    relationshipUse:
      "These numbers support love, bonding, commitment and emotional warmth.",
    caution:
      "Avoid over-giving, people-pleasing and emotional burden.",
    remedy:
      "Use these letters for beauty, home, relationship or service-oriented names.",
  },
  7: {
    title: "Ketu-Aligned Letters & Numbers",
    favourableAlphabets: ["O", "Z"],
    favourableNumbers: [2, 7, 9],
    luckyDates: [7, 16, 25],
    supportNumbers: [2, 9],
    avoidNumbers: [6],
    meaning:
      "Your favourable letters and numbers support intuition, research, spirituality and inner wisdom.",
    nameUse:
      "Names starting with these alphabets may support depth, uniqueness and spiritual identity.",
    businessUse:
      "Good for research, healing, spiritual work, psychology, writing and knowledge-based brands.",
    relationshipUse:
      "These numbers support deep emotional understanding when balanced with openness.",
    caution:
      "Avoid isolation, suspicion and emotional distance.",
    remedy:
      "Use these letters for spiritual, research, healing or wisdom-based work.",
  },
  8: {
    title: "Saturn-Aligned Letters & Numbers",
    favourableAlphabets: ["F", "P"],
    favourableNumbers: [4, 6, 8],
    luckyDates: [8, 17, 26],
    supportNumbers: [4, 6],
    avoidNumbers: [1],
    meaning:
      "Your favourable letters and numbers support discipline, authority, money and long-term success.",
    nameUse:
      "Names starting with these alphabets may support power, seriousness and responsibility.",
    businessUse:
      "Good for finance, law, real estate, administration, management and large-scale work.",
    relationshipUse:
      "These numbers support loyalty and maturity, but avoid emotional coldness.",
    caution:
      "Avoid shortcuts, greed, control issues and status pressure.",
    remedy:
      "Use these letters and numbers for serious business, financial planning and authority-building work.",
  },
  9: {
    title: "Mars-Aligned Letters & Numbers",
    favourableAlphabets: ["R", "S", "T"],
    favourableNumbers: [1, 3, 9],
    luckyDates: [9, 18, 27],
    supportNumbers: [1, 3],
    avoidNumbers: [2],
    meaning:
      "Your favourable letters and numbers support courage, action, completion and public impact.",
    nameUse:
      "Names starting with these alphabets may support boldness, confidence and purpose.",
    businessUse:
      "Good for sports, defence, public work, healing, leadership and action-oriented brands.",
    relationshipUse:
      "These numbers support passionate honesty, but need emotional balance.",
    caution:
      "Avoid anger, impulsive spending and emotional extremes.",
    remedy:
      "Use these letters and numbers when you need courage, action and completion energy.",
  },
};

function reduceNumber(total: number): number {
  let value = Math.abs(total);

  while (value > 9) {
    value = String(value)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return value;
}

export function calculateFavourableAlphabetNumbersReport(
  dob: string
): FavourableAlphabetNumbersReport {
  if (!dob) throw new Error("Date of birth is required.");

  const [year, month, day] = dob.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error("Please enter a valid date of birth.");
  }

  const digits = dob.replaceAll("-", "").split("").map(Number);
  const total = digits.reduce((sum, digit) => sum + digit, 0);
  const destinyNumber = reduceNumber(total);
  const profile = PROFILES[destinyNumber];

  return {
    dob,
    digits,
    total,
    destinyNumber,
    ...profile,
  };
}