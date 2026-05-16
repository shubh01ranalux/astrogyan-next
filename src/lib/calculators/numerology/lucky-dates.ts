export type LuckyDatesReport = {
  dob: string;
  digits: number[];
  total: number;
  destinyNumber: number;
  luckyDates: number[];
  supportDates: number[];
  avoidDates: number[];
  title: string;
  meaning: string;
  careerUse: string;
  moneyUse: string;
  relationshipUse: string;
  bestFor: string[];
  avoidFor: string[];
  remedy: string;
};

const LUCKY_DATE_PROFILES: Record<
  number,
  Omit<LuckyDatesReport, "dob" | "digits" | "total" | "destinyNumber">
> = {
  1: {
    luckyDates: [1, 10, 19, 28],
    supportDates: [3, 5, 9],
    avoidDates: [8, 17, 26],
    title: "Sun Dates for Leadership",
    meaning:
      "These dates support confidence, fresh starts, leadership, visibility and personal authority.",
    careerUse:
      "Use these dates for launches, interviews, leadership decisions and starting new projects.",
    moneyUse:
      "Good for self-led income, business decisions and authority-building financial moves.",
    relationshipUse:
      "Good for honest conversations, but avoid being too dominating.",
    bestFor: ["Starting new work", "Launching", "Interviews", "Leadership"],
    avoidFor: ["Ego clashes", "Risky shortcuts", "Aggressive decisions"],
    remedy: "On lucky dates, begin the day with clear intention and one bold action.",
  },
  2: {
    luckyDates: [2, 11, 20, 29],
    supportDates: [4, 6],
    avoidDates: [9, 18, 27],
    title: "Moon Dates for Harmony",
    meaning:
      "These dates support emotional balance, relationships, peace, intuition and cooperation.",
    careerUse:
      "Good for teamwork, client handling, negotiation and partnership discussions.",
    moneyUse:
      "Good for calm financial planning and joint decisions.",
    relationshipUse:
      "Excellent for bonding, apologies, marriage talks and emotional healing.",
    bestFor: ["Relationships", "Partnerships", "Healing", "Peaceful talks"],
    avoidFor: ["Impulsive reactions", "Anger", "Emotional spending"],
    remedy: "Use these dates for peaceful communication and gratitude practice.",
  },
  3: {
    luckyDates: [3, 12, 21, 30],
    supportDates: [1, 6, 9],
    avoidDates: [4, 13, 22],
    title: "Jupiter Dates for Growth",
    meaning:
      "These dates support creativity, learning, expression, wisdom and growth.",
    careerUse:
      "Good for teaching, content, presentations, studies and public speaking.",
    moneyUse:
      "Good for growth plans, skill investment and opportunity expansion.",
    relationshipUse:
      "Good for joyful communication and resolving misunderstandings through positivity.",
    bestFor: ["Learning", "Content", "Presentations", "Creative work"],
    avoidFor: ["Scattered focus", "Gossip", "Over-promising"],
    remedy: "Use these dates to complete one creative or learning task.",
  },
  4: {
    luckyDates: [4, 13, 22, 31],
    supportDates: [2, 8],
    avoidDates: [3, 12, 21],
    title: "Rahu Dates for Structure",
    meaning:
      "These dates support discipline, systems, planning, technical work and stability.",
    careerUse:
      "Good for documentation, operations, technical planning and serious work.",
    moneyUse:
      "Good for budgeting, savings, investment review and long-term planning.",
    relationshipUse:
      "Good for practical relationship decisions and responsibility talks.",
    bestFor: ["Planning", "Budgeting", "Systems", "Hard work"],
    avoidFor: ["Rigidity", "Shortcuts", "Overthinking"],
    remedy: "Use these dates to organize money, workspace and pending responsibilities.",
  },
  5: {
    luckyDates: [5, 14, 23],
    supportDates: [1, 6],
    avoidDates: [8, 17, 26],
    title: "Mercury Dates for Communication",
    meaning:
      "These dates support communication, travel, networking, sales and adaptability.",
    careerUse:
      "Good for calls, meetings, marketing, travel, sales and digital work.",
    moneyUse:
      "Good for trade, negotiation, business communication and opportunity discussions.",
    relationshipUse:
      "Good for light conversations, meeting new people and clearing confusion.",
    bestFor: ["Networking", "Travel", "Sales", "Communication"],
    avoidFor: ["Impulsive choices", "Scattered plans", "Overcommitment"],
    remedy: "Use these dates to communicate clearly and verify details before acting.",
  },
  6: {
    luckyDates: [6, 15, 24],
    supportDates: [3, 9],
    avoidDates: [7, 16, 25],
    title: "Venus Dates for Love & Harmony",
    meaning:
      "These dates support love, beauty, family, comfort, responsibility and harmony.",
    careerUse:
      "Good for design, beauty, hospitality, counselling, family and client work.",
    moneyUse:
      "Good for service income, luxury work, home decisions and client trust.",
    relationshipUse:
      "Excellent for romance, marriage, family healing and emotional bonding.",
    bestFor: ["Love", "Family", "Beauty", "Home", "Service"],
    avoidFor: ["Over-giving", "People pleasing", "Emotional burden"],
    remedy: "Use these dates to create harmony at home and set healthy boundaries.",
  },
  7: {
    luckyDates: [7, 16, 25],
    supportDates: [2, 9],
    avoidDates: [6, 15, 24],
    title: "Ketu Dates for Reflection",
    meaning:
      "These dates support spirituality, research, study, inner growth and wisdom.",
    careerUse:
      "Good for analysis, research, study, writing, healing and spiritual work.",
    moneyUse:
      "Good for reviewing finances quietly, not for rushed expansion.",
    relationshipUse:
      "Good for honest deep conversations, but avoid emotional withdrawal.",
    bestFor: ["Research", "Meditation", "Study", "Writing"],
    avoidFor: ["Isolation", "Suspicion", "Over-analysis"],
    remedy: "Use these dates for meditation, journaling and quiet decision-making.",
  },
  8: {
    luckyDates: [8, 17, 26],
    supportDates: [4, 6],
    avoidDates: [1, 10, 19],
    title: "Saturn Dates for Power & Karma",
    meaning:
      "These dates support discipline, money, authority, responsibility and long-term success.",
    careerUse:
      "Good for business, finance, legal work, management and major responsibilities.",
    moneyUse:
      "Good for financial planning, debt clearing, investments and serious money choices.",
    relationshipUse:
      "Good for mature commitments, but avoid coldness or control.",
    bestFor: ["Business", "Finance", "Authority", "Long-term planning"],
    avoidFor: ["Greed", "Shortcuts", "Ego battles"],
    remedy: "Use these dates for disciplined work and ethical financial decisions.",
  },
  9: {
    luckyDates: [9, 18, 27],
    supportDates: [1, 3],
    avoidDates: [2, 11, 20],
    title: "Mars Dates for Action",
    meaning:
      "These dates support courage, action, completion, passion and public impact.",
    careerUse:
      "Good for competition, bold decisions, leadership, sports and public work.",
    moneyUse:
      "Good for action-based income and completing pending financial tasks.",
    relationshipUse:
      "Good for passionate honesty, but avoid arguments and emotional extremes.",
    bestFor: ["Action", "Completion", "Courage", "Competition"],
    avoidFor: ["Anger", "Impulsive spending", "Conflict"],
    remedy: "Use these dates to complete pending work and channel energy positively.",
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

export function calculateLuckyDatesReport(dob: string): LuckyDatesReport {
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
  const profile = LUCKY_DATE_PROFILES[destinyNumber];

  return {
    dob,
    digits,
    total,
    destinyNumber,
    ...profile,
  };
}