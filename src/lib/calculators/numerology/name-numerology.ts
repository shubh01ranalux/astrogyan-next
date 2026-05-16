export type NameNumerologyReport = {
  name: string;
  cleanName: string;
  letters: { letter: string; value: number }[];
  total: number;
  nameNumber: number;
  isMasterNumber: boolean;
  title: string;
  keywords: string[];
  meaning: string;
  personality: string;
  career: string;
  relationship: string;
  money: string;
  challenge: string;
  remedy: string;
  luckyColors: string[];
  luckyDates: number[];
  favorableNumbers: number[];
};

const CHALDEAN_VALUES: Record<string, number> = {
  a: 1,
  i: 1,
  j: 1,
  q: 1,
  y: 1,

  b: 2,
  k: 2,
  r: 2,

  c: 3,
  g: 3,
  l: 3,
  s: 3,

  d: 4,
  m: 4,
  t: 4,

  e: 5,
  h: 5,
  n: 5,
  x: 5,

  u: 6,
  v: 6,
  w: 6,

  o: 7,
  z: 7,

  f: 8,
  p: 8,
};

const NAME_PROFILES: Record<
  number,
  Omit<
    NameNumerologyReport,
    | "name"
    | "cleanName"
    | "letters"
    | "total"
    | "nameNumber"
    | "isMasterNumber"
  >
> = {
  1: {
    title: "The Independent Name",
    keywords: ["Leadership", "Confidence", "Identity", "Initiative"],
    meaning:
      "Name Number 1 gives the name a strong, independent and leadership-oriented vibration.",
    personality:
      "This name supports confidence, originality and a desire to stand out.",
    career:
      "Good for entrepreneurship, leadership, management, public image and personal branding.",
    relationship:
      "The person may prefer respect and independence in relationships.",
    money:
      "Financial growth improves through initiative, authority and self-led work.",
    challenge:
      "Ego, impatience or over-dominance can create blocks.",
    remedy:
      "Practice humility and use leadership to guide, not control.",
    luckyColors: ["Gold", "Orange", "Yellow"],
    luckyDates: [1, 10, 19, 28],
    favorableNumbers: [1, 3, 5, 9],
  },
  2: {
    title: "The Harmonious Name",
    keywords: ["Emotion", "Peace", "Partnership", "Intuition"],
    meaning:
      "Name Number 2 gives the name a soft, emotional and relationship-oriented vibration.",
    personality:
      "This name supports sensitivity, diplomacy and emotional understanding.",
    career:
      "Good for counselling, HR, hospitality, healing, support roles and partnership-based work.",
    relationship:
      "The person may value emotional security and peace.",
    money:
      "Money improves through collaboration and balanced decisions.",
    challenge:
      "Over-sensitivity, dependency or mood swings may appear.",
    remedy:
      "Build emotional boundaries and communicate needs clearly.",
    luckyColors: ["White", "Cream", "Silver"],
    luckyDates: [2, 11, 20, 29],
    favorableNumbers: [2, 4, 6],
  },
  3: {
    title: "The Creative Name",
    keywords: ["Expression", "Creativity", "Joy", "Communication"],
    meaning:
      "Name Number 3 gives the name a creative, expressive and joyful vibration.",
    personality:
      "This name supports communication, optimism and artistic expression.",
    career:
      "Good for media, content, teaching, marketing, writing, entertainment and design.",
    relationship:
      "The person needs communication, appreciation and fun.",
    money:
      "Money improves when creativity is used consistently and practically.",
    challenge:
      "Scattered energy, gossip or unfinished work can reduce success.",
    remedy:
      "Follow creative discipline and finish one project at a time.",
    luckyColors: ["Yellow", "Purple", "Saffron"],
    luckyDates: [3, 12, 21, 30],
    favorableNumbers: [1, 3, 6, 9],
  },
  4: {
    title: "The Structured Name",
    keywords: ["Discipline", "Systems", "Hard Work", "Stability"],
    meaning:
      "Name Number 4 gives the name a practical, structured and hard-working vibration.",
    personality:
      "This name supports focus, seriousness, planning and long-term effort.",
    career:
      "Good for technology, operations, administration, finance, engineering and process-based work.",
    relationship:
      "The person values loyalty and stability but may appear emotionally reserved.",
    money:
      "Money improves through discipline, savings and strong systems.",
    challenge:
      "Rigidity, delays or frustration can become common lessons.",
    remedy:
      "Stay flexible while keeping structure. Avoid shortcuts.",
    luckyColors: ["Electric Blue", "Grey", "Earth Green"],
    luckyDates: [4, 13, 22, 31],
    favorableNumbers: [2, 4, 8],
  },
  5: {
    title: "The Dynamic Name",
    keywords: ["Freedom", "Movement", "Communication", "Adaptability"],
    meaning:
      "Name Number 5 gives the name a fast, flexible and communication-heavy vibration.",
    personality:
      "This name supports curiosity, networking and quick thinking.",
    career:
      "Good for sales, marketing, travel, communication, digital work, trading and media.",
    relationship:
      "The person needs space, variety and mental stimulation.",
    money:
      "Money improves through networking, smart risks and communication skills.",
    challenge:
      "Restlessness, inconsistency and impulsive choices can create instability.",
    remedy:
      "Use flexible discipline and complete what you start.",
    luckyColors: ["Green", "Light Blue", "Turquoise"],
    luckyDates: [5, 14, 23],
    favorableNumbers: [1, 5, 6],
  },
  6: {
    title: "The Loving Name",
    keywords: ["Love", "Beauty", "Family", "Responsibility"],
    meaning:
      "Name Number 6 gives the name a caring, attractive and responsibility-oriented vibration.",
    personality:
      "This name supports charm, care, harmony and refined taste.",
    career:
      "Good for beauty, design, luxury, hospitality, counselling, teaching and healing.",
    relationship:
      "The person is loving and loyal but may over-give.",
    money:
      "Money improves through beauty, service, responsibility and trust.",
    challenge:
      "People-pleasing and emotional burden can drain energy.",
    remedy:
      "Set boundaries and do not carry everyone’s problems.",
    luckyColors: ["Pink", "White", "Pastel Shades"],
    luckyDates: [6, 15, 24],
    favorableNumbers: [3, 6, 9],
  },
  7: {
    title: "The Spiritual Name",
    keywords: ["Wisdom", "Research", "Depth", "Spirituality"],
    meaning:
      "Name Number 7 gives the name a thoughtful, spiritual and analytical vibration.",
    personality:
      "This name supports depth, observation and attraction toward hidden knowledge.",
    career:
      "Good for research, analytics, psychology, spirituality, investigation and technical depth work.",
    relationship:
      "The person needs space, honesty and emotional depth.",
    money:
      "Money improves through expertise, research and patience.",
    challenge:
      "Isolation, doubt or overthinking may create delays.",
    remedy:
      "Meditate, journal and share knowledge practically.",
    luckyColors: ["White", "Silver", "Light Green"],
    luckyDates: [7, 16, 25],
    favorableNumbers: [2, 7, 9],
  },
  8: {
    title: "The Powerful Name",
    keywords: ["Power", "Money", "Authority", "Karma"],
    meaning:
      "Name Number 8 gives the name a strong, ambitious and karmic vibration.",
    personality:
      "This name supports authority, endurance and serious ambition.",
    career:
      "Good for business, finance, law, management, real estate and leadership.",
    relationship:
      "The person values loyalty and seriousness but may appear controlling.",
    money:
      "Money improves through discipline, ethics and long-term planning.",
    challenge:
      "Pressure, delays and control issues can become lessons.",
    remedy:
      "Stay ethical, patient and disciplined with money.",
    luckyColors: ["Black", "Navy Blue", "Dark Grey"],
    luckyDates: [8, 17, 26],
    favorableNumbers: [4, 6, 8],
  },
  9: {
    title: "The Impactful Name",
    keywords: ["Compassion", "Courage", "Completion", "Purpose"],
    meaning:
      "Name Number 9 gives the name a bold, compassionate and purpose-driven vibration.",
    personality:
      "This name supports generosity, courage and public impact.",
    career:
      "Good for public work, leadership, defence, healing, teaching, sports and social impact.",
    relationship:
      "The person loves deeply but may become emotionally intense.",
    money:
      "Money improves when work serves a larger purpose.",
    challenge:
      "Anger, emotional extremes or over-sacrifice can create imbalance.",
    remedy:
      "Practice forgiveness and channel passion into disciplined work.",
    luckyColors: ["Red", "Maroon", "Coral"],
    luckyDates: [9, 18, 27],
    favorableNumbers: [1, 3, 9],
  },
  11: {
    title: "The Visionary Name",
    keywords: ["Intuition", "Inspiration", "Sensitivity", "Vision"],
    meaning:
      "Master Name Number 11 gives the name a visionary, intuitive and spiritually sensitive vibration.",
    personality:
      "This name supports inspiration, insight and emotional sensitivity.",
    career:
      "Good for healing, teaching, counselling, spiritual work, creativity and inspirational leadership.",
    relationship:
      "The person needs emotional honesty and spiritual connection.",
    money:
      "Money improves when intuition is grounded into practical action.",
    challenge:
      "Anxiety, confusion or emotional overload can appear.",
    remedy:
      "Ground your energy and convert ideas into daily routines.",
    luckyColors: ["Silver", "White", "Violet"],
    luckyDates: [2, 11, 20, 29],
    favorableNumbers: [1, 2, 7],
  },
  22: {
    title: "The Builder Name",
    keywords: ["Legacy", "Structure", "Big Vision", "Practical Power"],
    meaning:
      "Master Name Number 22 gives the name a powerful builder vibration for large-scale success.",
    personality:
      "This name supports vision, responsibility and practical execution.",
    career:
      "Good for entrepreneurship, infrastructure, systems, management and large projects.",
    relationship:
      "The person needs stability and a partner who understands ambition.",
    money:
      "Money improves through systems, planning and ethical execution.",
    challenge:
      "Pressure, fear of failure or carrying too much responsibility can feel heavy.",
    remedy:
      "Break big goals into smaller milestones and delegate.",
    luckyColors: ["Royal Blue", "Earth Brown", "Grey"],
    luckyDates: [4, 13, 22, 31],
    favorableNumbers: [2, 4, 8],
  },
  33: {
    title: "The Healer Name",
    keywords: ["Healing", "Service", "Guidance", "Compassion"],
    meaning:
      "Master Name Number 33 gives the name a healing, service-oriented and guiding vibration.",
    personality:
      "This name supports compassion, teaching and emotional support.",
    career:
      "Good for healing, education, counselling, spiritual service, beauty and social work.",
    relationship:
      "The person gives deeply but must avoid over-sacrifice.",
    money:
      "Money improves when service is valued properly.",
    challenge:
      "Over-giving and emotional exhaustion can become common lessons.",
    remedy:
      "Set boundaries and remember that self-care is also service.",
    luckyColors: ["Rose", "White", "Gold"],
    luckyDates: [6, 15, 24],
    favorableNumbers: [3, 6, 9],
  },
};

function cleanName(name: string) {
  return name.toLowerCase().replace(/[^a-z]/g, "");
}

function reduceNumber(total: number): number {
  if ([11, 22, 33].includes(total)) return total;

  let value = total;

  while (value > 9) {
    value = String(value)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);

    if ([11, 22, 33].includes(value)) return value;
  }

  return value;
}

export function calculateNameNumerologyReport(
  name: string
): NameNumerologyReport {
  const clean = cleanName(name);

  if (!clean) {
    throw new Error("Please enter a valid name for calculation.");
  }

  const letters = clean.split("").map((letter) => ({
    letter: letter.toUpperCase(),
    value: CHALDEAN_VALUES[letter] || 0,
  }));

  const total = letters.reduce((sum, item) => sum + item.value, 0);
  const nameNumber = reduceNumber(total);
  const profile = NAME_PROFILES[nameNumber];

  return {
    name,
    cleanName: clean,
    letters,
    total,
    nameNumber,
    isMasterNumber: [11, 22, 33].includes(nameNumber),
    ...profile,
  };
}