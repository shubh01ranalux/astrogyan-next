export type LuckyColorReport = {
  dob: string;
  digits: number[];
  total: number;
  destinyNumber: number;
  title: string;
  luckyColors: string[];
  supportColors: string[];
  avoidColors: string[];
  meaning: string;
  personalityUse: string;
  careerUse: string;
  relationshipUse: string;
  moneyUse: string;
  remedy: string;
};

const COLOR_PROFILES: Record<
  number,
  Omit<LuckyColorReport, "dob" | "digits" | "total" | "destinyNumber">
> = {
  1: {
    title: "Sun Energy Colors",
    luckyColors: ["Gold", "Orange", "Yellow"],
    supportColors: ["Copper", "Cream", "Light Red"],
    avoidColors: ["Black", "Dark Grey"],
    meaning:
      "Your lucky colors strengthen confidence, leadership, visibility and personal power.",
    personalityUse:
      "Wear warm colors when you want to feel confident, expressive and decisive.",
    careerUse:
      "Use gold, orange or yellow in important meetings, interviews, launches and leadership situations.",
    relationshipUse:
      "Use softer warm shades to express warmth without appearing dominating.",
    moneyUse:
      "Gold and yellow tones support authority, recognition and self-led earning energy.",
    remedy:
      "Use a small gold, orange or yellow item daily, especially during new beginnings.",
  },
  2: {
    title: "Moon Energy Colors",
    luckyColors: ["White", "Cream", "Silver"],
    supportColors: ["Soft Pink", "Pearl", "Light Blue"],
    avoidColors: ["Harsh Red", "Very Dark Black"],
    meaning:
      "Your lucky colors strengthen emotional balance, peace, intuition and relationship harmony.",
    personalityUse:
      "Wear calm shades when you want emotional stability and a softer presence.",
    careerUse:
      "Use white, cream or silver for meetings involving cooperation, clients or partnerships.",
    relationshipUse:
      "Soft colors help you appear gentle, receptive and emotionally available.",
    moneyUse:
      "Silver and cream support calm financial decision-making and partnership-based growth.",
    remedy:
      "Keep a white or silver item near your workspace to balance emotions and thoughts.",
  },
  3: {
    title: "Jupiter Energy Colors",
    luckyColors: ["Yellow", "Saffron", "Purple"],
    supportColors: ["Gold", "Light Orange", "Cream"],
    avoidColors: ["Black", "Very Dark Blue"],
    meaning:
      "Your lucky colors strengthen wisdom, creativity, optimism, learning and expression.",
    personalityUse:
      "Wear yellow or saffron when you want to feel joyful, expressive and confident.",
    careerUse:
      "Use these colors for teaching, presenting, content creation and public speaking.",
    relationshipUse:
      "Warm and bright shades help you communicate with openness and positivity.",
    moneyUse:
      "Yellow and gold tones support growth, guidance and opportunity attraction.",
    remedy:
      "Use yellow on important learning, exam, content or presentation days.",
  },
  4: {
    title: "Rahu Structure Colors",
    luckyColors: ["Electric Blue", "Grey", "Earth Green"],
    supportColors: ["Steel", "Muted Purple", "Beige"],
    avoidColors: ["Bright Red", "Harsh Orange"],
    meaning:
      "Your lucky colors strengthen structure, discipline, focus and practical execution.",
    personalityUse:
      "Use grounding colors when you need discipline, focus and consistency.",
    careerUse:
      "Grey, blue and earthy tones support technical, operational and serious work.",
    relationshipUse:
      "Soft earthy tones help reduce rigidity and make your presence calmer.",
    moneyUse:
      "Grey and green shades support practical money planning and savings discipline.",
    remedy:
      "Use blue or grey during planning, budgeting and serious decision-making.",
  },
  5: {
    title: "Mercury Energy Colors",
    luckyColors: ["Green", "Light Blue", "Turquoise"],
    supportColors: ["Mint", "Sky Blue", "White"],
    avoidColors: ["Muddy Brown", "Very Dark Grey"],
    meaning:
      "Your lucky colors strengthen communication, adaptability, networking and smart decisions.",
    personalityUse:
      "Use green or light blue when you want to feel fresh, flexible and mentally alert.",
    careerUse:
      "Best for sales, marketing, communication, travel, meetings and digital work.",
    relationshipUse:
      "Light shades help conversations stay calm and open.",
    moneyUse:
      "Green supports commerce, communication and practical opportunity flow.",
    remedy:
      "Use green on days involving negotiation, travel, calls or business communication.",
  },
  6: {
    title: "Venus Energy Colors",
    luckyColors: ["Pink", "White", "Pastel Shades"],
    supportColors: ["Rose", "Cream", "Soft Green"],
    avoidColors: ["Harsh Black", "Dark Green"],
    meaning:
      "Your lucky colors strengthen love, beauty, harmony, charm and emotional warmth.",
    personalityUse:
      "Use soft colors when you want to appear graceful, caring and attractive.",
    careerUse:
      "Good for beauty, design, luxury, hospitality, counselling and relationship-based work.",
    relationshipUse:
      "Pink and white support affection, warmth and emotional healing.",
    moneyUse:
      "Pastel and Venus shades support money through service, aesthetics and trust.",
    remedy:
      "Keep your clothes or workspace visually pleasant with soft, clean colors.",
  },
  7: {
    title: "Ketu Spiritual Colors",
    luckyColors: ["White", "Silver", "Light Green"],
    supportColors: ["Pale Yellow", "Smoke Grey", "Off White"],
    avoidColors: ["Bright Red", "Dark Orange"],
    meaning:
      "Your lucky colors strengthen intuition, research, calmness, spiritual reflection and wisdom.",
    personalityUse:
      "Use light colors when you want mental peace and inner clarity.",
    careerUse:
      "Helpful for research, analysis, study, writing, healing and spiritual work.",
    relationshipUse:
      "Soft colors reduce emotional distance and support honest conversations.",
    moneyUse:
      "Silver and light green support patience, wisdom and stable choices.",
    remedy:
      "Use white or silver during meditation, study or important reflection periods.",
  },
  8: {
    title: "Saturn Energy Colors",
    luckyColors: ["Black", "Navy Blue", "Dark Grey"],
    supportColors: ["Deep Blue", "Steel Grey", "Brown"],
    avoidColors: ["Neon Yellow", "Overly Bright Colors"],
    meaning:
      "Your lucky colors strengthen discipline, authority, patience, money karma and long-term success.",
    personalityUse:
      "Use dark structured shades when you need seriousness, maturity and authority.",
    careerUse:
      "Excellent for business, finance, management, legal, operations and responsibility-heavy work.",
    relationshipUse:
      "Balance dark shades with softer colors to avoid appearing emotionally distant.",
    moneyUse:
      "Navy, black and grey support discipline, control and long-term wealth planning.",
    remedy:
      "Use navy or dark grey on major work and money decision days.",
  },
  9: {
    title: "Mars Energy Colors",
    luckyColors: ["Red", "Maroon", "Coral"],
    supportColors: ["Gold", "Rust", "Warm Orange"],
    avoidColors: ["Black", "Very Dark Blue"],
    meaning:
      "Your lucky colors strengthen courage, passion, action, confidence and impact.",
    personalityUse:
      "Use red or coral when you need courage, energy and assertiveness.",
    careerUse:
      "Good for leadership, competition, public work, sports, action and bold decisions.",
    relationshipUse:
      "Use softer red shades to express passion without aggression.",
    moneyUse:
      "Red tones support action-based growth, but avoid impulsive spending.",
    remedy:
      "Use red carefully on action days, but balance it with calm behavior.",
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

export function calculateLuckyColorReport(dob: string): LuckyColorReport {
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
  const profile = COLOR_PROFILES[destinyNumber];

  return {
    dob,
    digits,
    total,
    destinyNumber,
    ...profile,
  };
}