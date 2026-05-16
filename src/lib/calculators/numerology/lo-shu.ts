export type LoShuCell = {
  number: number;
  count: number;
  title: string;
  keywords: string[];
  element: string;
  planet: string;
  direction: string;
  body: string;
  colors: string[];
  strength: string;
  missingMeaning: string;
  remedy: string;
};

export type LoShuArrow = {
  key: string;
  title: string;
  numbers: number[];
  status: "present" | "missing";
  meaning: string;
  guidance: string;
};

export type LoShuResult = {
  dob: string;
  rawDigits: number[];
  filledNumbers: number[];
  personalityNumber: number;
  destinyNumber: number;
  presentNumbers: number[];
  missingNumbers: number[];
  repeatedNumbers: { number: number; count: number }[];
  grid: LoShuCell[];
  presentArrows: LoShuArrow[];
  missingArrows: LoShuArrow[];
  summary: string;
};

const GRID_ORDER = [4, 9, 2, 3, 5, 7, 8, 1, 6];

const NUMBER_DATA: Record<number, Omit<LoShuCell, "count">> = {
  1: {
    number: 1,
    title: "Career, Communication & Individuality",
    keywords: ["Career", "Success", "Leadership", "Communication"],
    element: "Water",
    planet: "Sun",
    direction: "North",
    body: "Kidneys, ears, fluids",
    colors: ["Black", "Dark Blue"],
    strength:
      "Number 1 supports independence, leadership, confidence, self-expression and career direction.",
    missingMeaning:
      "Missing 1 may indicate hesitation in expressing yourself, weak confidence, or difficulty taking independent decisions.",
    remedy:
      "Write daily goals, speak clearly, take small independent decisions and build a consistent morning routine.",
  },
  2: {
    number: 2,
    title: "Relationships, Sensitivity & Intuition",
    keywords: ["Love", "Marriage", "Sensitivity", "Partnership"],
    element: "Earth",
    planet: "Moon",
    direction: "South-West",
    body: "Abdomen, digestion, emotional balance",
    colors: ["Pink", "White", "Soft Red"],
    strength:
      "Number 2 supports emotional intelligence, cooperation, patience, relationship harmony and intuition.",
    missingMeaning:
      "Missing 2 may indicate emotional distance, difficulty trusting others, or challenges in close relationships.",
    remedy:
      "Practice gratitude, spend quality time with loved ones and listen before reacting.",
  },
  3: {
    number: 3,
    title: "Wisdom, Health & Planning",
    keywords: ["Health", "Planning", "Learning", "Family"],
    element: "Hard Wood",
    planet: "Jupiter",
    direction: "East",
    body: "Feet, knees, ankles",
    colors: ["Green", "Blue"],
    strength:
      "Number 3 supports learning, imagination, planning, family wisdom and growth-oriented thinking.",
    missingMeaning:
      "Missing 3 may indicate scattered planning, weak follow-through or difficulty organizing ideas.",
    remedy:
      "Create weekly plans, read regularly and keep visible checklists for priorities.",
  },
  4: {
    number: 4,
    title: "Discipline, Wealth & Structure",
    keywords: ["Money", "Discipline", "Systems", "Self-Worth"],
    element: "Soft Wood",
    planet: "Rahu",
    direction: "South-East",
    body: "Liver, muscles, discipline energy",
    colors: ["Purple", "Green", "Blue", "Gold"],
    strength:
      "Number 4 supports structure, discipline, wealth-building habits, consistency and practical execution.",
    missingMeaning:
      "Missing 4 may indicate lack of routine, weak structure, inconsistency or delayed financial discipline.",
    remedy:
      "Use routines, budget tracking, fixed work blocks and disciplined savings.",
  },
  5: {
    number: 5,
    title: "Balance, Stability & Adaptability",
    keywords: ["Balance", "Freedom", "Change", "Decision Making"],
    element: "Earth",
    planet: "Mercury",
    direction: "Center",
    body: "Internal organs and nervous balance",
    colors: ["Yellow", "Brown", "Orange"],
    strength:
      "Number 5 supports balance, adaptability, decision-making, communication and flexibility.",
    missingMeaning:
      "Missing 5 may indicate resistance to change, inner restlessness or difficulty balancing extremes.",
    remedy:
      "Try controlled new experiences, practice breathing and maintain a balanced schedule.",
  },
  6: {
    number: 6,
    title: "Support, Responsibility & Guidance",
    keywords: ["Friends", "Support", "Responsibility", "Father Energy"],
    element: "Hard Metal",
    planet: "Venus",
    direction: "North-West",
    body: "Head and leadership pressure",
    colors: ["Grey", "White", "Black"],
    strength:
      "Number 6 supports responsibility, helpful people, refined choices, travel and guidance.",
    missingMeaning:
      "Missing 6 may indicate weak support systems, difficulty accepting responsibility or family imbalance.",
    remedy:
      "Respect mentors, complete promises and take one practical responsibility seriously.",
  },
  7: {
    number: 7,
    title: "Creativity, Reflection & Spiritual Learning",
    keywords: ["Creativity", "Children", "Reflection", "Future"],
    element: "Soft Metal",
    planet: "Ketu",
    direction: "West",
    body: "Mouth, lungs and breath",
    colors: ["White", "Silver", "Grey", "Copper"],
    strength:
      "Number 7 supports creativity, observation, spiritual reflection and learning through experience.",
    missingMeaning:
      "Missing 7 may indicate low reflection, difficulty learning from setbacks or reduced creative connection.",
    remedy:
      "Journal lessons, meditate, engage in music or art and treat setbacks as feedback.",
  },
  8: {
    number: 8,
    title: "Knowledge, Discipline & Long-Term Growth",
    keywords: ["Knowledge", "Motivation", "Study", "Organization"],
    element: "Earth",
    planet: "Saturn",
    direction: "North-East",
    body: "Hands, body weight and endurance",
    colors: ["Blue", "Black", "Green"],
    strength:
      "Number 8 supports patience, discipline, study, long-term achievement and maturity.",
    missingMeaning:
      "Missing 8 may indicate weak long-term motivation, avoidance of responsibility or poor organization.",
    remedy:
      "Follow a timetable, keep commitments and choose long-term gains over shortcuts.",
  },
  9: {
    number: 9,
    title: "Fame, Humanity & Recognition",
    keywords: ["Fame", "Prosperity", "Humanity", "Reputation"],
    element: "Fire",
    planet: "Mars",
    direction: "South",
    body: "Heart, blood and eyes",
    colors: ["Red", "Maroon", "Gold"],
    strength:
      "Number 9 supports recognition, confidence, compassion, public image and impact.",
    missingMeaning:
      "Missing 9 may indicate low public confidence, reduced compassion or difficulty being seen.",
    remedy:
      "Help others, build visibility through honest work and complete tasks with passion.",
  },
};

const ARROWS = [
  {
    key: "mind",
    title: "Mind Plane",
    numbers: [4, 9, 2],
    meaning: "Intellect, memory, analysis and thought clarity.",
    guidance: "Strengthen with reading, journaling and focused learning.",
  },
  {
    key: "emotional",
    title: "Emotional Plane",
    numbers: [3, 5, 7],
    meaning: "Emotions, creativity, calmness and spiritual sensitivity.",
    guidance: "Use reflection, meditation and creative expression.",
  },
  {
    key: "practical",
    title: "Practical Plane",
    numbers: [8, 1, 6],
    meaning: "Execution, practical success, money sense and work discipline.",
    guidance: "Use this energy for career and financial planning.",
  },
  {
    key: "thought",
    title: "Thought Plane",
    numbers: [4, 3, 8],
    meaning: "Structured thinking, planning and decision clarity.",
    guidance: "Write pros, cons and next steps before major decisions.",
  },
  {
    key: "will",
    title: "Will Plane",
    numbers: [9, 5, 1],
    meaning: "Willpower, determination and personal ambition.",
    guidance: "Build confidence through small daily goals.",
  },
  {
    key: "action",
    title: "Action Plane",
    numbers: [2, 7, 6],
    meaning: "Action-taking, completion and physical activity.",
    guidance: "Channel energy into consistent visible progress.",
  },
  {
    key: "golden",
    title: "Golden Yog",
    numbers: [4, 5, 6],
    meaning: "Structure, balance, support and wealth-building potential.",
    guidance: "Use discipline and ethical ambition.",
  },
  {
    key: "silver",
    title: "Silver Yog",
    numbers: [2, 5, 8],
    meaning: "Emotional balance, assets, stability and patience.",
    guidance: "Use long-term planning and family harmony.",
  },
];

function reduceToSingleDigit(value: number): number {
  let total = Math.abs(value);
  while (total > 9) {
    total = String(total)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return total;
}

function getDigitsFromDob(dob: string): number[] {
  return dob
    .replaceAll("-", "")
    .split("")
    .map(Number)
    .filter((digit) => digit > 0);
}

export function calculateLoShuGrid(dob: string): LoShuResult {
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

  const rawDigits = getDigitsFromDob(dob);
  const personalityNumber = reduceToSingleDigit(day);
  const destinyNumber = reduceToSingleDigit(day + month + year);

  const filledNumbers = [...rawDigits, personalityNumber, destinyNumber];

  const counts = filledNumbers.reduce<Record<number, number>>((acc, digit) => {
    acc[digit] = (acc[digit] || 0) + 1;
    return acc;
  }, {});

  const presentNumbers = GRID_ORDER.filter((num) => counts[num]).sort(
    (a, b) => a - b
  );

  const missingNumbers = GRID_ORDER.filter((num) => !counts[num]).sort(
    (a, b) => a - b
  );

  const repeatedNumbers = Object.entries(counts)
    .filter(([, count]) => count > 1)
    .map(([number, count]) => ({
      number: Number(number),
      count,
    }))
    .sort((a, b) => a.number - b.number);

  const grid = GRID_ORDER.map((num) => ({
    ...NUMBER_DATA[num],
    count: counts[num] || 0,
  }));

  const presentArrows = ARROWS.filter((arrow) =>
    arrow.numbers.every((num) => counts[num])
  ).map((arrow) => ({
    ...arrow,
    status: "present" as const,
  }));

  const missingArrows = ARROWS.filter((arrow) =>
    arrow.numbers.every((num) => !counts[num])
  ).map((arrow) => ({
    ...arrow,
    status: "missing" as const,
  }));

  return {
    dob,
    rawDigits,
    filledNumbers,
    personalityNumber,
    destinyNumber,
    presentNumbers,
    missingNumbers,
    repeatedNumbers,
    grid,
    presentArrows,
    missingArrows,
    summary: `Your Lo Shu Grid has ${presentNumbers.length} active numbers and ${missingNumbers.length} missing numbers. Personality Number ${personalityNumber} shows your outer nature, while Destiny Number ${destinyNumber} shows your life-path vibration.`,
  };
}