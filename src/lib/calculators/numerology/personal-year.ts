export type PersonalYearReport = {
  dob: string;
  currentYear: number;
  calculationDigits: number[];
  total: number;
  personalYearNumber: number;
  title: string;
  keywords: string[];
  meaning: string;
  career: string;
  money: string;
  love: string;
  health: string;
  focus: string;
  avoid: string;
  remedy: string;
  luckyColors: string[];
  luckyDates: number[];
};

const PERSONAL_YEAR_PROFILES: Record<
  number,
  Omit<
    PersonalYearReport,
    "dob" | "currentYear" | "calculationDigits" | "total" | "personalYearNumber"
  >
> = {
  1: {
    title: "Year of New Beginnings",
    keywords: ["Start", "Leadership", "Independence", "Action"],
    meaning:
      "Personal Year 1 begins a fresh 9-year cycle. It supports new decisions, fresh starts, courage and independent action.",
    career:
      "Best year to start new projects, switch direction, launch something or take leadership.",
    money:
      "Money improves through initiative, new opportunities and self-led action.",
    love:
      "Relationships need clarity. Singles may attract fresh connections, while existing bonds need independence and honesty.",
    health:
      "Focus on energy, movement and rebuilding personal discipline.",
    focus: "Start fresh, take initiative and stop waiting for perfect conditions.",
    avoid: "Avoid fear, laziness, ego clashes and depending too much on others.",
    remedy: "Set 3 clear goals for the year and take one bold action every week.",
    luckyColors: ["Gold", "Orange", "Yellow"],
    luckyDates: [1, 10, 19, 28],
  },
  2: {
    title: "Year of Patience & Relationships",
    keywords: ["Partnership", "Peace", "Emotion", "Patience"],
    meaning:
      "Personal Year 2 is about cooperation, emotional balance, relationships, patience and quiet progress.",
    career:
      "Best year for teamwork, partnerships, negotiation and background preparation.",
    money:
      "Money grows slowly through cooperation, saving and balanced decisions.",
    love:
      "Good year for emotional bonding, marriage discussions and healing misunderstandings.",
    health:
      "Take care of emotional health, sleep, hormones and stress sensitivity.",
    focus: "Build harmony, listen carefully and choose patience over pressure.",
    avoid: "Avoid overthinking, mood swings, dependency and emotional reactions.",
    remedy: "Practice gratitude daily and avoid making decisions during emotional highs or lows.",
    luckyColors: ["White", "Cream", "Silver"],
    luckyDates: [2, 11, 20, 29],
  },
  3: {
    title: "Year of Creativity & Expression",
    keywords: ["Creativity", "Communication", "Joy", "Visibility"],
    meaning:
      "Personal Year 3 brings creative expression, social energy, learning, communication and visibility.",
    career:
      "Good for content, marketing, speaking, teaching, networking and creative projects.",
    money:
      "Money improves when creative ideas become consistent output.",
    love:
      "Romance can become lighter and more expressive. Communication matters strongly.",
    health:
      "Avoid scattered routines. Balance enjoyment with discipline.",
    focus: "Express yourself, create more and become visible.",
    avoid: "Avoid gossip, overspending, distractions and unfinished work.",
    remedy: "Pick one creative project and complete it before starting another.",
    luckyColors: ["Yellow", "Purple", "Saffron"],
    luckyDates: [3, 12, 21, 30],
  },
  4: {
    title: "Year of Discipline & Foundation",
    keywords: ["Work", "Structure", "Discipline", "Stability"],
    meaning:
      "Personal Year 4 asks for discipline, hard work, planning, structure and long-term foundation building.",
    career:
      "Excellent for systems, skill-building, operations, studies and serious work.",
    money:
      "Money improves through budgeting, savings, practical investments and avoiding shortcuts.",
    love:
      "Relationships need responsibility, loyalty and practical commitment.",
    health:
      "Focus on routine, posture, bones, joints and daily discipline.",
    focus: "Build strong foundations and stay consistent.",
    avoid: "Avoid shortcuts, laziness, rigidity and careless planning.",
    remedy: "Create a weekly routine and track money, time and health habits.",
    luckyColors: ["Grey", "Blue", "Earth Green"],
    luckyDates: [4, 13, 22, 31],
  },
  5: {
    title: "Year of Change & Freedom",
    keywords: ["Change", "Travel", "Freedom", "Adaptability"],
    meaning:
      "Personal Year 5 brings movement, change, travel, networking, freedom and unexpected shifts.",
    career:
      "Good for sales, marketing, travel, media, communication and flexible opportunities.",
    money:
      "Money improves through networking and smart risks, but impulsive spending must be controlled.",
    love:
      "Relationships need space and freshness. Singles may attract exciting connections.",
    health:
      "Avoid irregular lifestyle, overstimulation and nervous stress.",
    focus: "Adapt quickly and use change wisely.",
    avoid: "Avoid impulsive choices, commitment issues and scattered energy.",
    remedy: "Try new opportunities but verify details before saying yes.",
    luckyColors: ["Green", "Light Blue", "Turquoise"],
    luckyDates: [5, 14, 23],
  },
  6: {
    title: "Year of Love & Responsibility",
    keywords: ["Family", "Love", "Beauty", "Responsibility"],
    meaning:
      "Personal Year 6 focuses on love, home, family, responsibility, beauty, healing and emotional maturity.",
    career:
      "Good for service, design, healing, teaching, hospitality, counselling and responsibility-based roles.",
    money:
      "Money improves through service, trust, stable work and mature decisions.",
    love:
      "Strong year for commitment, marriage, family healing and emotional bonding.",
    health:
      "Care for heart, hormones, comfort eating and emotional burden.",
    focus: "Strengthen family, home, relationships and inner balance.",
    avoid: "Avoid people-pleasing, over-sacrifice and carrying everyone’s problems.",
    remedy: "Beautify your space and set healthy boundaries with loved ones.",
    luckyColors: ["Pink", "White", "Pastel Shades"],
    luckyDates: [6, 15, 24],
  },
  7: {
    title: "Year of Inner Growth",
    keywords: ["Spirituality", "Research", "Reflection", "Wisdom"],
    meaning:
      "Personal Year 7 is a quieter year for introspection, study, research, spirituality and self-discovery.",
    career:
      "Good for research, analysis, learning, technical depth, writing and spiritual work.",
    money:
      "Money improves through expertise and patience, not rushed expansion.",
    love:
      "Relationships may need space, honesty and deeper emotional understanding.",
    health:
      "Focus on mental peace, meditation, sleep and nervous system balance.",
    focus: "Go deeper, study, reflect and build inner clarity.",
    avoid: "Avoid isolation, suspicion, overthinking and emotional shutdown.",
    remedy: "Meditate, journal and spend time in nature weekly.",
    luckyColors: ["White", "Silver", "Light Green"],
    luckyDates: [7, 16, 25],
  },
  8: {
    title: "Year of Power & Karma",
    keywords: ["Money", "Authority", "Karma", "Achievement"],
    meaning:
      "Personal Year 8 brings ambition, money, responsibility, authority, karmic results and material growth.",
    career:
      "Strong year for business, promotion, finance, management, leadership and large decisions.",
    money:
      "Money can grow strongly, but discipline and ethics are essential.",
    love:
      "Relationships need maturity. Work pressure should not damage emotional connection.",
    health:
      "Manage stress, bones, joints, blood pressure and work-life balance.",
    focus: "Take responsibility, think long-term and act ethically.",
    avoid: "Avoid greed, shortcuts, control issues and ego battles.",
    remedy: "Respect time, keep financial records and make ethical decisions.",
    luckyColors: ["Black", "Navy Blue", "Dark Grey"],
    luckyDates: [8, 17, 26],
  },
  9: {
    title: "Year of Completion & Release",
    keywords: ["Completion", "Healing", "Letting Go", "Wisdom"],
    meaning:
      "Personal Year 9 completes the 9-year cycle. It brings closure, release, emotional maturity and preparation for a new beginning.",
    career:
      "Good for finishing pending projects, public work, teaching, healing and meaningful service.",
    money:
      "Money improves by clearing old dues, completing work and avoiding emotional spending.",
    love:
      "Relationships may heal, transform or end if they no longer match your path.",
    health:
      "Focus on emotional release, inflammation, energy balance and rest.",
    focus: "Complete, forgive, release and prepare for a new cycle.",
    avoid: "Avoid clinging to the past, anger, over-sacrifice and emotional drama.",
    remedy: "Donate, forgive, declutter and complete pending responsibilities.",
    luckyColors: ["Red", "Maroon", "Coral"],
    luckyDates: [9, 18, 27],
  },
};

function reduceToSingleDigit(value: number): number {
  let total = Math.abs(value);

  while (total > 9) {
    total = String(total)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return total;
}

export function calculatePersonalYearReport(
  dob: string,
  year = new Date().getFullYear()
): PersonalYearReport {
  if (!dob) throw new Error("Date of birth is required.");

  const [birthYear, month, day] = dob.split("-").map(Number);
  const date = new Date(birthYear, month - 1, day);

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== birthYear ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error("Please enter a valid date of birth.");
  }

  const calculationString = `${String(day).padStart(2, "0")}${String(
    month
  ).padStart(2, "0")}${year}`;

  const calculationDigits = calculationString.split("").map(Number);
  const total = calculationDigits.reduce((sum, digit) => sum + digit, 0);
  const personalYearNumber = reduceToSingleDigit(total);
  const profile = PERSONAL_YEAR_PROFILES[personalYearNumber];

  return {
    dob,
    currentYear: year,
    calculationDigits,
    total,
    personalYearNumber,
    ...profile,
  };
}