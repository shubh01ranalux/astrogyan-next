export type LifePhase = {
  title: string;
  ageRange: string;
  meaning: string;
  focus: string;
  caution: string;
};

export type MemorablePeriodReport = {
  dob: string;
  digits: number[];
  total: number;
  destinyNumber: number;
  currentAge: number;
  title: string;
  memorableAges: number[];
  comingMemorableAges: number[];
  lifePhases: LifePhase[];
  meaning: string;
  careerPattern: string;
  relationshipPattern: string;
  moneyPattern: string;
  remedy: string;
};

const PROFILES: Record<
  number,
  Omit<
    MemorablePeriodReport,
    | "dob"
    | "digits"
    | "total"
    | "destinyNumber"
    | "currentAge"
    | "memorableAges"
    | "comingMemorableAges"
    | "lifePhases"
  >
> = {
  1: {
    title: "Leadership Milestone Pattern",
    meaning:
      "Your memorable periods often come through new beginnings, leadership decisions, independence and identity shifts.",
    careerPattern:
      "Career turning points may come when you start something independently or take charge of a new direction.",
    relationshipPattern:
      "Relationships teach you to balance independence with emotional sensitivity.",
    moneyPattern:
      "Money growth comes through initiative, authority and self-led decisions.",
    remedy:
      "During milestone years, choose courage with humility. Start clearly, but avoid ego-based decisions.",
  },
  2: {
    title: "Relationship Milestone Pattern",
    meaning:
      "Your memorable periods often come through relationships, emotional decisions, family changes and partnerships.",
    careerPattern:
      "Career turning points may come through collaboration, client work, support roles or partnership opportunities.",
    relationshipPattern:
      "Relationships become a major teacher, especially around emotional boundaries and trust.",
    moneyPattern:
      "Money grows through cooperation, calm decisions and long-term emotional stability.",
    remedy:
      "During milestone years, avoid emotional overreaction. Choose peace, patience and clear communication.",
  },
  3: {
    title: "Creative Milestone Pattern",
    meaning:
      "Your memorable periods often come through creativity, learning, expression, visibility and communication.",
    careerPattern:
      "Career turning points may come through teaching, speaking, content, media, learning or creative output.",
    relationshipPattern:
      "Relationships improve when communication stays honest, joyful and mature.",
    moneyPattern:
      "Money grows when your creative ideas become consistent and structured.",
    remedy:
      "During milestone years, complete what you start. Avoid scattered energy and casual promises.",
  },
  4: {
    title: "Discipline Milestone Pattern",
    meaning:
      "Your memorable periods often come through responsibility, structure, work pressure and foundation-building.",
    careerPattern:
      "Career turning points may come through hard work, systems, operations, technology or disciplined planning.",
    relationshipPattern:
      "Relationships test loyalty, patience and practical commitment.",
    moneyPattern:
      "Money grows slowly through savings, systems, discipline and practical choices.",
    remedy:
      "During milestone years, stay consistent. Avoid shortcuts and keep your routine strong.",
  },
  5: {
    title: "Change Milestone Pattern",
    meaning:
      "Your memorable periods often come through travel, change, communication, movement and unexpected opportunities.",
    careerPattern:
      "Career turning points may come through networking, business, media, sales, travel or digital work.",
    relationshipPattern:
      "Relationships need freedom, honesty and flexibility without irresponsibility.",
    moneyPattern:
      "Money grows through communication, trade, adaptability and smart risk-taking.",
    remedy:
      "During milestone years, explore change but verify details before acting.",
  },
  6: {
    title: "Love & Responsibility Milestone Pattern",
    meaning:
      "Your memorable periods often come through family, love, home, responsibility, beauty and emotional maturity.",
    careerPattern:
      "Career turning points may come through service, design, beauty, counselling, teaching or family responsibility.",
    relationshipPattern:
      "Relationships bring strong lessons around love, commitment and boundaries.",
    moneyPattern:
      "Money grows through trust, service, beauty, comfort and stable responsibility.",
    remedy:
      "During milestone years, care deeply but do not over-sacrifice.",
  },
  7: {
    title: "Spiritual Growth Milestone Pattern",
    meaning:
      "Your memorable periods often come through inner change, study, solitude, spiritual growth and self-discovery.",
    careerPattern:
      "Career turning points may come through research, analysis, writing, healing, spirituality or specialized knowledge.",
    relationshipPattern:
      "Relationships teach you emotional openness and trust without losing your inner space.",
    moneyPattern:
      "Money grows through expertise, patience, research and wise timing.",
    remedy:
      "During milestone years, reflect deeply but avoid isolation and overthinking.",
  },
  8: {
    title: "Power & Karma Milestone Pattern",
    meaning:
      "Your memorable periods often come through money, authority, responsibility, pressure and karmic results.",
    careerPattern:
      "Career turning points may come through business, management, finance, property, administration or leadership.",
    relationshipPattern:
      "Relationships test maturity, loyalty, patience and emotional responsibility.",
    moneyPattern:
      "Money grows through discipline, long-term planning, ethical action and patience.",
    remedy:
      "During milestone years, avoid shortcuts. Stay ethical and respect time.",
  },
  9: {
    title: "Completion & Impact Milestone Pattern",
    meaning:
      "Your memorable periods often come through endings, completions, service, courage and emotional transformation.",
    careerPattern:
      "Career turning points may come through public work, leadership, healing, teaching, social impact or completion of old cycles.",
    relationshipPattern:
      "Relationships teach forgiveness, release and emotional balance.",
    moneyPattern:
      "Money grows when your work serves a larger purpose and pending duties are completed.",
    remedy:
      "During milestone years, forgive, complete pending work and release what no longer supports your path.",
  },
};

const MEMORABLE_AGES: Record<number, number[]> = {
  1: [19, 28, 37, 46, 55, 64],
  2: [20, 29, 38, 47, 56, 65],
  3: [21, 30, 39, 48, 57, 66],
  4: [22, 31, 40, 49, 58, 67],
  5: [23, 32, 41, 50, 59, 68],
  6: [24, 33, 42, 51, 60, 69],
  7: [25, 34, 43, 52, 61, 70],
  8: [26, 35, 44, 53, 62, 71],
  9: [27, 36, 45, 54, 63, 72],
};

const LIFE_PHASES: LifePhase[] = [
  {
    title: "Foundation Phase",
    ageRange: "0–27",
    meaning:
      "This phase builds identity, family conditioning, education, early confidence and emotional foundation.",
    focus:
      "Learning, discipline, family values, self-discovery and basic life direction.",
    caution:
      "Avoid comparing your path with others. This phase is for foundation, not final success.",
  },
  {
    title: "Growth Phase",
    ageRange: "28–36",
    meaning:
      "This phase activates growth, career seriousness, relationship decisions and practical responsibilities.",
    focus:
      "Career growth, marriage decisions, money planning, skill-building and independence.",
    caution:
      "Avoid rushing choices only because of social pressure.",
  },
  {
    title: "Peak Action Phase",
    ageRange: "37–45",
    meaning:
      "This phase often brings major action, authority, responsibility, recognition and turning points.",
    focus:
      "Leadership, expansion, wealth-building, public identity and stronger commitments.",
    caution:
      "Avoid ego, burnout and ignoring health or relationships.",
  },
  {
    title: "Maturity Phase",
    ageRange: "46–54",
    meaning:
      "This phase brings maturity, consolidation, deeper purpose and correction of earlier patterns.",
    focus:
      "Stability, family wisdom, assets, mentoring and emotional maturity.",
    caution:
      "Avoid becoming rigid or holding onto outdated goals.",
  },
  {
    title: "Wisdom Phase",
    ageRange: "55+",
    meaning:
      "This phase highlights wisdom, legacy, spiritual clarity and meaningful contribution.",
    focus:
      "Teaching, guiding, simplifying life, health, peace and legacy.",
    caution:
      "Avoid regret. Use experience as wisdom and contribution.",
  },
];

function reduceNumber(total: number): number {
  let value = Math.abs(total);

  while (value > 9) {
    value = String(value)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return value;
}

function calculateAge(dob: string): number {
  const [year, month, day] = dob.split("-").map(Number);
  const today = new Date();

  let age = today.getFullYear() - year;
  const hasBirthdayPassed =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  if (!hasBirthdayPassed) age -= 1;

  return age;
}

export function calculateMemorablePeriodReport(
  dob: string
): MemorablePeriodReport {
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
  const currentAge = calculateAge(dob);
  const memorableAges = MEMORABLE_AGES[destinyNumber];
  const comingMemorableAges = memorableAges.filter((age) => age >= currentAge);
  const profile = PROFILES[destinyNumber];

  return {
    dob,
    digits,
    total,
    destinyNumber,
    currentAge,
    memorableAges,
    comingMemorableAges,
    lifePhases: LIFE_PHASES,
    ...profile,
  };
}