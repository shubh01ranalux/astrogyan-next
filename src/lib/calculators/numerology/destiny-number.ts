export type DestinyNumberReport = {
  dob: string;
  digits: number[];
  total: number;
  destinyNumber: number;
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
  cautionDates: number[];
};

type NumberProfile = Omit<
  DestinyNumberReport,
  "dob" | "digits" | "total" | "destinyNumber" | "isMasterNumber"
>;

const DESTINY_PROFILES: Record<number, NumberProfile> = {
  1: {
    title: "The Leader",
    keywords: ["Leadership", "Confidence", "Independence", "New Beginnings"],
    meaning:
      "Destiny Number 1 shows a life path connected with leadership, individuality, confidence and initiative.",
    personality:
      "You are naturally independent and prefer creating your own path instead of blindly following others.",
    career:
      "You do well in leadership roles, business, management, entrepreneurship, personal branding and decision-making positions.",
    relationship:
      "You need respect and space in relationships. Balance independence with emotional softness.",
    money:
      "Wealth improves when you take initiative, build authority and avoid ego-based decisions.",
    challenge:
      "Impatience, ego, loneliness or difficulty accepting advice can delay growth.",
    remedy:
      "Practice humility, take consistent action and learn to lead without dominating others.",
    luckyColors: ["Gold", "Orange", "Yellow"],
    luckyDates: [1, 10, 19, 28],
    favorableNumbers: [1, 3, 5, 9],
    cautionDates: [8, 17, 26],
  },
  2: {
    title: "The Harmonizer",
    keywords: ["Emotion", "Partnership", "Intuition", "Peace"],
    meaning:
      "Destiny Number 2 shows a life path connected with sensitivity, cooperation, relationships and emotional intelligence.",
    personality:
      "You are caring, intuitive and naturally understand people’s feelings.",
    career:
      "You do well in counselling, HR, healing, hospitality, partnership-based work, design and support roles.",
    relationship:
      "Love and emotional security are important for you. Avoid over-dependence or silent expectations.",
    money:
      "Money improves through partnerships, diplomacy, steady planning and emotionally balanced decisions.",
    challenge:
      "Mood swings, overthinking, dependency and taking things personally can create blocks.",
    remedy:
      "Strengthen emotional boundaries, meditate near water and express your needs clearly.",
    luckyColors: ["White", "Cream", "Silver"],
    luckyDates: [2, 11, 20, 29],
    favorableNumbers: [2, 4, 6],
    cautionDates: [9, 18, 27],
  },
  3: {
    title: "The Creator",
    keywords: ["Creativity", "Expression", "Joy", "Communication"],
    meaning:
      "Destiny Number 3 shows a life path connected with creativity, expression, learning and optimism.",
    personality:
      "You are expressive, social, imaginative and often bring positive energy to people around you.",
    career:
      "You do well in content, teaching, media, marketing, writing, designing, public speaking and creative fields.",
    relationship:
      "You need fun, communication and appreciation. Avoid sarcasm or emotional immaturity.",
    money:
      "Money improves when creativity is structured and converted into consistent output.",
    challenge:
      "Lack of focus, scattered energy and unfinished work can reduce success.",
    remedy:
      "Follow a creative routine, complete one project at a time and avoid unnecessary gossip.",
    luckyColors: ["Yellow", "Purple", "Saffron"],
    luckyDates: [3, 12, 21, 30],
    favorableNumbers: [1, 3, 6, 9],
    cautionDates: [4, 13, 22],
  },
  4: {
    title: "The Builder",
    keywords: ["Discipline", "Structure", "Systems", "Hard Work"],
    meaning:
      "Destiny Number 4 shows a life path connected with discipline, structure, practical thinking and long-term foundations.",
    personality:
      "You are practical, serious and capable of building stability through effort.",
    career:
      "You do well in operations, technology, administration, construction, systems, finance and process-driven work.",
    relationship:
      "You value loyalty and stability. Avoid becoming too rigid or emotionally unavailable.",
    money:
      "Money grows through planning, savings, systems and practical investments.",
    challenge:
      "Rigidity, frustration, delays and resistance to change can become obstacles.",
    remedy:
      "Keep routines but stay flexible. Declutter, plan finances and avoid shortcuts.",
    luckyColors: ["Electric Blue", "Grey", "Earthy Green"],
    luckyDates: [4, 13, 22, 31],
    favorableNumbers: [2, 4, 8],
    cautionDates: [3, 12, 21],
  },
  5: {
    title: "The Explorer",
    keywords: ["Freedom", "Travel", "Communication", "Adaptability"],
    meaning:
      "Destiny Number 5 shows a life path connected with freedom, movement, communication and change.",
    personality:
      "You are adaptable, curious and quick-thinking. You dislike feeling trapped.",
    career:
      "You do well in sales, marketing, travel, media, trading, communication, events and digital work.",
    relationship:
      "You need space, excitement and mental connection. Avoid inconsistency in commitment.",
    money:
      "Money improves through networking, communication and smart risk-taking.",
    challenge:
      "Restlessness, impulsiveness and lack of commitment can reduce growth.",
    remedy:
      "Create flexible discipline, finish what you start and avoid impulsive decisions.",
    luckyColors: ["Green", "Light Blue", "Turquoise"],
    luckyDates: [5, 14, 23],
    favorableNumbers: [1, 5, 6],
    cautionDates: [8, 17, 26],
  },
  6: {
    title: "The Nurturer",
    keywords: ["Love", "Family", "Beauty", "Responsibility"],
    meaning:
      "Destiny Number 6 shows a life path connected with love, responsibility, beauty, family and care.",
    personality:
      "You are caring, protective, artistic and naturally drawn to harmony.",
    career:
      "You do well in design, beauty, luxury, hospitality, counselling, teaching, healing and family-related work.",
    relationship:
      "You are loyal and loving. Avoid over-giving or expecting perfection from loved ones.",
    money:
      "Money improves through beauty, service, responsibility and relationship-based trust.",
    challenge:
      "Over-responsibility, emotional burden and people-pleasing can drain you.",
    remedy:
      "Set boundaries, keep your surroundings beautiful and avoid carrying everyone’s problems.",
    luckyColors: ["Pink", "White", "Pastel Shades"],
    luckyDates: [6, 15, 24],
    favorableNumbers: [3, 6, 9],
    cautionDates: [7, 16, 25],
  },
  7: {
    title: "The Seeker",
    keywords: ["Spirituality", "Research", "Wisdom", "Depth"],
    meaning:
      "Destiny Number 7 shows a life path connected with inner wisdom, research, spirituality and deep thinking.",
    personality:
      "You are thoughtful, observant and naturally attracted to hidden knowledge.",
    career:
      "You do well in research, analytics, spirituality, psychology, investigation, writing and technical depth work.",
    relationship:
      "You need emotional depth and personal space. Avoid becoming too detached.",
    money:
      "Money improves when knowledge, specialization and patience are used practically.",
    challenge:
      "Isolation, doubt, over-analysis and emotional distance can slow progress.",
    remedy:
      "Meditate, spend time in nature, journal insights and share your wisdom practically.",
    luckyColors: ["White", "Light Green", "Silver"],
    luckyDates: [7, 16, 25],
    favorableNumbers: [2, 7, 9],
    cautionDates: [6, 15, 24],
  },
  8: {
    title: "The Achiever",
    keywords: ["Power", "Money", "Karma", "Authority"],
    meaning:
      "Destiny Number 8 shows a life path connected with ambition, authority, karma, money and responsibility.",
    personality:
      "You are strong, practical and capable of handling pressure when disciplined.",
    career:
      "You do well in business, finance, law, management, real estate, administration and leadership under pressure.",
    relationship:
      "You value loyalty and seriousness. Avoid emotional coldness or control issues.",
    money:
      "Money can become strong through discipline, patience, ethics and long-term planning.",
    challenge:
      "Delays, pressure, karmic tests, control and work-life imbalance can challenge you.",
    remedy:
      "Respect time, stay ethical, avoid shortcuts and maintain disciplined financial habits.",
    luckyColors: ["Black", "Navy Blue", "Dark Grey"],
    luckyDates: [8, 17, 26],
    favorableNumbers: [4, 6, 8],
    cautionDates: [1, 10, 19],
  },
  9: {
    title: "The Humanitarian",
    keywords: ["Compassion", "Completion", "Courage", "Higher Purpose"],
    meaning:
      "Destiny Number 9 shows a life path connected with compassion, courage, wisdom and service.",
    personality:
      "You are emotional, bold, generous and often guided by a larger purpose.",
    career:
      "You do well in public work, leadership, healing, social impact, defence, sports, teaching and creative fields.",
    relationship:
      "You love deeply but may become intense. Practice forgiveness and emotional balance.",
    money:
      "Money improves when your work helps people and has a meaningful purpose.",
    challenge:
      "Anger, emotional extremes, attachment to the past and over-sacrifice can block growth.",
    remedy:
      "Practice forgiveness, donate/help wisely and channel passion into disciplined action.",
    luckyColors: ["Red", "Maroon", "Coral"],
    luckyDates: [9, 18, 27],
    favorableNumbers: [1, 3, 9],
    cautionDates: [2, 11, 20],
  },
  11: {
    title: "The Intuitive Visionary",
    keywords: ["Intuition", "Vision", "Spiritual Sensitivity", "Inspiration"],
    meaning:
      "Master Number 11 shows heightened intuition, spiritual sensitivity and the ability to inspire others.",
    personality:
      "You sense things deeply and may feel different from others from an early age.",
    career:
      "You do well in healing, teaching, spiritual work, psychology, creativity, counselling and inspirational leadership.",
    relationship:
      "You need emotional honesty and spiritual connection. Avoid anxiety-driven expectations.",
    money:
      "Money improves when intuition is paired with grounded planning.",
    challenge:
      "Nervous energy, anxiety, confusion and emotional overload can become challenges.",
    remedy:
      "Meditate, ground yourself, protect your energy and convert ideas into practical routines.",
    luckyColors: ["Silver", "White", "Violet"],
    luckyDates: [2, 11, 20, 29],
    favorableNumbers: [1, 2, 7],
    cautionDates: [9, 18, 27],
  },
  22: {
    title: "The Master Builder",
    keywords: ["Big Vision", "Structure", "Legacy", "Practical Power"],
    meaning:
      "Master Number 22 shows the ability to build something large, useful and long-lasting.",
    personality:
      "You carry both vision and responsibility. Life may push you toward bigger duties.",
    career:
      "You do well in entrepreneurship, infrastructure, management, systems, large projects and leadership.",
    relationship:
      "You need a stable partner who understands your ambition and responsibilities.",
    money:
      "Money improves through long-term plans, systems and ethical large-scale execution.",
    challenge:
      "Pressure, fear of failure and carrying too much responsibility can become heavy.",
    remedy:
      "Break big goals into small milestones, delegate and stay grounded.",
    luckyColors: ["Royal Blue", "Earth Brown", "Grey"],
    luckyDates: [4, 13, 22, 31],
    favorableNumbers: [2, 4, 8],
    cautionDates: [3, 12, 21],
  },
  33: {
    title: "The Master Healer",
    keywords: ["Healing", "Service", "Guidance", "Compassion"],
    meaning:
      "Master Number 33 shows a life path connected with service, healing, teaching and unconditional support.",
    personality:
      "You are deeply caring and may naturally become a guide for others.",
    career:
      "You do well in healing, education, counselling, spiritual work, social work, beauty and service-led fields.",
    relationship:
      "You give deeply. Avoid sacrificing yourself to fix everyone else.",
    money:
      "Money improves when service is valued properly and boundaries are maintained.",
    challenge:
      "Over-giving, emotional exhaustion and saviour complex can create imbalance.",
    remedy:
      "Serve wisely, set boundaries and remember that healing yourself is also service.",
    luckyColors: ["Rose", "White", "Gold"],
    luckyDates: [6, 15, 24],
    favorableNumbers: [3, 6, 9],
    cautionDates: [7, 16, 25],
  },
};

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

export function calculateDestinyNumberReport(dob: string): DestinyNumberReport {
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

  const digits = dob
    .replaceAll("-", "")
    .split("")
    .map(Number);

  const total = digits.reduce((sum, digit) => sum + digit, 0);
  const destinyNumber = reduceNumber(total);
  const profile = DESTINY_PROFILES[destinyNumber];

  return {
    dob,
    digits,
    total,
    destinyNumber,
    isMasterNumber: [11, 22, 33].includes(destinyNumber),
    ...profile,
  };
}