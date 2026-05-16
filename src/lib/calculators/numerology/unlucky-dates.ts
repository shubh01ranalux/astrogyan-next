export type UnluckyDatesReport = {
  dob: string;
  digits: number[];
  total: number;
  destinyNumber: number;
  cautionDates: number[];
  neutralDates: number[];
  balancingDates: number[];
  title: string;
  meaning: string;
  whyCareful: string;
  careerCaution: string;
  moneyCaution: string;
  relationshipCaution: string;
  avoidFor: string[];
  safeUse: string[];
  remedy: string;
};

const UNLUCKY_DATE_PROFILES: Record<
  number,
  Omit<UnluckyDatesReport, "dob" | "digits" | "total" | "destinyNumber">
> = {
  1: {
    cautionDates: [8, 17, 26],
    neutralDates: [2, 6],
    balancingDates: [1, 10, 19, 28],
    title: "Dates That May Feel Heavy for Sun Energy",
    meaning:
      "These dates may feel slower, heavier or more restrictive for your leadership and confidence energy.",
    whyCareful:
      "Number 1 prefers movement, visibility and initiative, while these dates may bring pressure, delay or authority tests.",
    careerCaution:
      "Avoid ego clashes, rushed leadership decisions or risky launches on these dates.",
    moneyCaution:
      "Avoid impulsive investments or decisions made only to prove yourself.",
    relationshipCaution:
      "Avoid dominating conversations or reacting from pride.",
    avoidFor: ["Major launches", "Ego-based decisions", "Risky commitments"],
    safeUse: ["Planning", "Review", "Discipline work", "Pending tasks"],
    remedy:
      "Use these dates for planning and discipline. Add gold or yellow energy to balance confidence.",
  },
  2: {
    cautionDates: [9, 18, 27],
    neutralDates: [4, 6],
    balancingDates: [2, 11, 20, 29],
    title: "Dates That May Disturb Moon Emotions",
    meaning:
      "These dates may feel emotionally intense or reactive for your sensitive Moon energy.",
    whyCareful:
      "Number 2 needs calm and harmony, while these dates can increase passion, anger or emotional urgency.",
    careerCaution:
      "Avoid emotionally charged decisions, conflicts or aggressive negotiation.",
    moneyCaution:
      "Avoid emotional spending or financial decisions made under pressure.",
    relationshipCaution:
      "Avoid arguments, blame or reacting before listening.",
    avoidFor: ["Conflict talks", "Emotional spending", "Angry decisions"],
    safeUse: ["Physical activity", "Pending action", "Courage-building tasks"],
    remedy:
      "Pause before responding. Use white, cream or silver to calm emotional reactions.",
  },
  3: {
    cautionDates: [4, 13, 22],
    neutralDates: [5, 6],
    balancingDates: [3, 12, 21, 30],
    title: "Dates That May Restrict Jupiter Flow",
    meaning:
      "These dates may feel rigid, serious or mentally heavy for your creative Jupiter energy.",
    whyCareful:
      "Number 3 enjoys expression and expansion, while these dates demand discipline, structure and patience.",
    careerCaution:
      "Avoid scattered planning or starting creative work without structure.",
    moneyCaution:
      "Avoid expansion without budgeting or clear systems.",
    relationshipCaution:
      "Avoid careless words, sarcasm or over-promising.",
    avoidFor: ["Unplanned launches", "Casual promises", "Scattered spending"],
    safeUse: ["Planning", "Skill practice", "Documenting ideas", "Budgeting"],
    remedy:
      "Use these dates to organize your creativity instead of forcing fast results.",
  },
  4: {
    cautionDates: [3, 12, 21],
    neutralDates: [5, 7],
    balancingDates: [4, 13, 22, 31],
    title: "Dates That May Scatter Rahu Structure",
    meaning:
      "These dates may feel too light, scattered or inconsistent for your structured number 4 energy.",
    whyCareful:
      "Number 4 needs systems and discipline, while these dates can increase distraction and unfinished work.",
    careerCaution:
      "Avoid loose planning, vague commitments or careless documentation.",
    moneyCaution:
      "Avoid spending on excitement without checking practical value.",
    relationshipCaution:
      "Avoid miscommunication and casual promises.",
    avoidFor: ["Loose planning", "Casual commitments", "Impulsive purchases"],
    safeUse: ["Creative brainstorming", "Learning", "Communication work"],
    remedy:
      "Write everything clearly and confirm details twice before acting.",
  },
  5: {
    cautionDates: [8, 17, 26],
    neutralDates: [2, 7],
    balancingDates: [5, 14, 23],
    title: "Dates That May Slow Mercury Movement",
    meaning:
      "These dates may feel restrictive, delayed or pressure-heavy for your fast Mercury energy.",
    whyCareful:
      "Number 5 loves movement and flexibility, while these dates demand patience, discipline and responsibility.",
    careerCaution:
      "Avoid impatient decisions, careless travel plans or rushed communication.",
    moneyCaution:
      "Avoid risky trading, impulsive deals or shortcuts.",
    relationshipCaution:
      "Avoid disappearing, avoiding commitment or speaking carelessly.",
    avoidFor: ["Risky deals", "Rushed travel", "Impulsive communication"],
    safeUse: ["Long-term planning", "Financial review", "Serious commitments"],
    remedy:
      "Slow down, verify details and use green or light blue to balance Mercury energy.",
  },
  6: {
    cautionDates: [7, 16, 25],
    neutralDates: [2, 4],
    balancingDates: [6, 15, 24],
    title: "Dates That May Create Venus Distance",
    meaning:
      "These dates may feel emotionally distant, quiet or introspective for your Venus relationship energy.",
    whyCareful:
      "Number 6 seeks harmony and closeness, while these dates can increase silence, overthinking or detachment.",
    careerCaution:
      "Avoid over-isolating in client, design, service or relationship-based work.",
    moneyCaution:
      "Avoid decisions based on fear, doubt or withdrawal.",
    relationshipCaution:
      "Avoid emotional distance, silent treatment or assuming without asking.",
    avoidFor: ["Relationship conflict", "Emotional withdrawal", "Fear-based choices"],
    safeUse: ["Reflection", "Study", "Healing", "Quiet planning"],
    remedy:
      "Communicate gently and use pink or white to restore warmth and harmony.",
  },
  7: {
    cautionDates: [6, 15, 24],
    neutralDates: [1, 5],
    balancingDates: [7, 16, 25],
    title: "Dates That May Distract Ketu Focus",
    meaning:
      "These dates may bring emotional, family or comfort-based distractions for your reflective number 7 energy.",
    whyCareful:
      "Number 7 needs depth and silence, while these dates can pull attention toward people, responsibilities and emotions.",
    careerCaution:
      "Avoid losing research focus due to social or emotional distractions.",
    moneyCaution:
      "Avoid spending to please others or maintain comfort.",
    relationshipCaution:
      "Avoid detachment; give warmth without losing your inner balance.",
    avoidFor: ["Over-giving", "Comfort spending", "Emotional dependency"],
    safeUse: ["Family healing", "Home tasks", "Creative comfort work"],
    remedy:
      "Balance solitude with gentle connection. Use white or silver for clarity.",
  },
  8: {
    cautionDates: [1, 10, 19],
    neutralDates: [5, 7],
    balancingDates: [8, 17, 26],
    title: "Dates That May Challenge Saturn Discipline",
    meaning:
      "These dates may bring ego pressure, authority clashes or impatient leadership energy for number 8.",
    whyCareful:
      "Number 8 needs patience and structure, while these dates can trigger pride, speed or control issues.",
    careerCaution:
      "Avoid power struggles, impulsive leadership and ego-driven decisions.",
    moneyCaution:
      "Avoid risky spending to show status or prove success.",
    relationshipCaution:
      "Avoid control, coldness or stubborn responses.",
    avoidFor: ["Power clashes", "Status spending", "Fast decisions"],
    safeUse: ["Leadership review", "Goal setting", "Confidence building"],
    remedy:
      "Choose patience over control. Use navy, black or dark grey for grounding.",
  },
  9: {
    cautionDates: [2, 11, 20],
    neutralDates: [4, 8],
    balancingDates: [9, 18, 27],
    title: "Dates That May Soften Mars Action",
    meaning:
      "These dates may feel emotionally confusing or slow for your action-oriented Mars energy.",
    whyCareful:
      "Number 9 wants courage and completion, while these dates can increase emotional sensitivity or hesitation.",
    careerCaution:
      "Avoid delaying action because of emotional confusion.",
    moneyCaution:
      "Avoid financial decisions based on sympathy or guilt.",
    relationshipCaution:
      "Avoid emotional extremes, blame or rescuing patterns.",
    avoidFor: ["Guilt-based decisions", "Emotional confusion", "Delayed action"],
    safeUse: ["Relationship healing", "Listening", "Emotional reflection"],
    remedy:
      "Use courage with compassion. Balance red/maroon with calm communication.",
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

export function calculateUnluckyDatesReport(dob: string): UnluckyDatesReport {
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
  const profile = UNLUCKY_DATE_PROFILES[destinyNumber];

  return {
    dob,
    digits,
    total,
    destinyNumber,
    ...profile,
  };
}