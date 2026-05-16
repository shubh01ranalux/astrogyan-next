export type UnluckyColorReport = {
  dob: string;
  digits: number[];
  total: number;
  destinyNumber: number;
  title: string;
  avoidColors: string[];
  neutralColors: string[];
  balancingColors: string[];
  meaning: string;
  whyAvoid: string;
  careerCaution: string;
  relationshipCaution: string;
  moneyCaution: string;
  remedy: string;
};

const UNLUCKY_COLOR_PROFILES: Record<
  number,
  Omit<UnluckyColorReport, "dob" | "digits" | "total" | "destinyNumber">
> = {
  1: {
    title: "Colors That May Reduce Sun Confidence",
    avoidColors: ["Black", "Dark Grey", "Dull Brown"],
    neutralColors: ["Cream", "Light Beige", "Soft White"],
    balancingColors: ["Gold", "Orange", "Yellow"],
    meaning:
      "For Destiny Number 1, very dark and dull colors may reduce confidence, visibility and leadership energy.",
    whyAvoid:
      "These colors can make your natural Sun energy feel heavy, reserved or less expressive.",
    careerCaution:
      "Avoid very dark shades during interviews, launches, leadership meetings or important public appearances.",
    relationshipCaution:
      "Dark dull tones may make you appear emotionally distant or dominant.",
    moneyCaution:
      "Use brighter authority colors when making bold career or financial decisions.",
    remedy:
      "Balance dark outfits with gold, orange or yellow accessories to restore confidence.",
  },
  2: {
    title: "Colors That May Disturb Moon Balance",
    avoidColors: ["Harsh Red", "Very Dark Black", "Neon Orange"],
    neutralColors: ["Pearl", "Cream", "Soft Grey"],
    balancingColors: ["White", "Silver", "Soft Pink"],
    meaning:
      "For Destiny Number 2, harsh and aggressive colors may disturb emotional peace and sensitivity.",
    whyAvoid:
      "These colors can increase mood swings, emotional reactions and inner restlessness.",
    careerCaution:
      "Avoid harsh red tones during negotiation, client handling or teamwork situations.",
    relationshipCaution:
      "Strong aggressive shades may increase emotional misunderstandings.",
    moneyCaution:
      "Use calm colors while making financial decisions to avoid emotion-based choices.",
    remedy:
      "Use white, silver or soft pink to bring emotional balance and calmness.",
  },
  3: {
    title: "Colors That May Block Jupiter Growth",
    avoidColors: ["Black", "Very Dark Blue", "Muddy Grey"],
    neutralColors: ["Cream", "Light Brown", "Soft Green"],
    balancingColors: ["Yellow", "Saffron", "Purple"],
    meaning:
      "For Destiny Number 3, very dark shades may reduce optimism, creativity and learning energy.",
    whyAvoid:
      "These colors can make your expression feel restricted and reduce natural Jupiter brightness.",
    careerCaution:
      "Avoid dull shades during teaching, presentations, content creation or creative work.",
    relationshipCaution:
      "Heavy colors may make communication feel less open and joyful.",
    moneyCaution:
      "Use growth colors when planning opportunities, studies or business expansion.",
    remedy:
      "Add yellow, saffron or purple accents to activate wisdom and creative flow.",
  },
  4: {
    title: "Colors That May Trigger Rahu Instability",
    avoidColors: ["Bright Red", "Harsh Orange", "Overstimulating Neon"],
    neutralColors: ["Beige", "Soft Grey", "Muted Green"],
    balancingColors: ["Electric Blue", "Grey", "Earth Green"],
    meaning:
      "For Destiny Number 4, overly fiery or loud colors may increase restlessness and impulsive reactions.",
    whyAvoid:
      "These shades can disturb your need for structure and may trigger scattered decisions.",
    careerCaution:
      "Avoid loud colors during serious planning, documentation, technical work or financial review.",
    relationshipCaution:
      "Harsh colors may make communication feel more rigid or reactive.",
    moneyCaution:
      "Use grounding shades while budgeting, investing or making long-term plans.",
    remedy:
      "Use grey, blue or earthy shades to support discipline and practical execution.",
  },
  5: {
    title: "Colors That May Scatter Mercury Energy",
    avoidColors: ["Muddy Brown", "Very Dark Grey", "Heavy Black"],
    neutralColors: ["White", "Light Beige", "Soft Blue"],
    balancingColors: ["Green", "Light Blue", "Turquoise"],
    meaning:
      "For Destiny Number 5, heavy and muddy colors may reduce flexibility, freshness and communication flow.",
    whyAvoid:
      "These colors can make your Mercury energy feel dull, stuck or mentally heavy.",
    careerCaution:
      "Avoid dull colors during sales, marketing, meetings, calls and travel-related work.",
    relationshipCaution:
      "Heavy tones can reduce openness and playful communication.",
    moneyCaution:
      "Use fresh colors for business communication and opportunity-based decisions.",
    remedy:
      "Use green or turquoise to refresh communication, networking and adaptability.",
  },
  6: {
    title: "Colors That May Disturb Venus Harmony",
    avoidColors: ["Harsh Black", "Dark Green", "Dirty Brown"],
    neutralColors: ["Cream", "Soft White", "Beige"],
    balancingColors: ["Pink", "White", "Pastel Shades"],
    meaning:
      "For Destiny Number 6, harsh and heavy colors may reduce harmony, charm and emotional warmth.",
    whyAvoid:
      "These shades can make your Venus energy feel burdened, less graceful or emotionally heavy.",
    careerCaution:
      "Avoid harsh shades in beauty, design, hospitality, counselling or relationship-based work.",
    relationshipCaution:
      "Dark heavy colors may reduce softness and affection in personal interactions.",
    moneyCaution:
      "Use pleasant colors when dealing with clients, luxury, service or trust-based income.",
    remedy:
      "Use pink, white or pastel tones to restore harmony and graceful attraction.",
  },
  7: {
    title: "Colors That May Disturb Ketu Calmness",
    avoidColors: ["Bright Red", "Dark Orange", "Loud Neon"],
    neutralColors: ["Off White", "Pale Grey", "Soft Beige"],
    balancingColors: ["White", "Silver", "Light Green"],
    meaning:
      "For Destiny Number 7, loud and fiery colors may disturb inner calm, intuition and reflection.",
    whyAvoid:
      "These colors can increase mental restlessness and reduce spiritual clarity.",
    careerCaution:
      "Avoid loud colors during research, analysis, meditation, study or spiritual work.",
    relationshipCaution:
      "Fiery shades may make emotional conversations feel more reactive.",
    moneyCaution:
      "Use calm colors before important financial analysis or long-term decisions.",
    remedy:
      "Use white, silver or light green to support peace, intuition and wisdom.",
  },
  8: {
    title: "Colors That May Disturb Saturn Discipline",
    avoidColors: ["Neon Yellow", "Overly Bright Colors", "Flashy Orange"],
    neutralColors: ["Steel Grey", "Brown", "Muted Blue"],
    balancingColors: ["Black", "Navy Blue", "Dark Grey"],
    meaning:
      "For Destiny Number 8, overly bright and flashy colors may weaken seriousness, discipline and authority.",
    whyAvoid:
      "These shades can create distraction and reduce grounded Saturn energy.",
    careerCaution:
      "Avoid flashy colors during serious business, finance, legal, management or authority situations.",
    relationshipCaution:
      "Overly bright colors may increase impatience or superficial impressions.",
    moneyCaution:
      "Use structured dark colors for money planning, negotiations and responsibility-heavy decisions.",
    remedy:
      "Use navy, black or dark grey to strengthen discipline, patience and maturity.",
  },
  9: {
    title: "Colors That May Overload Mars Energy",
    avoidColors: ["Black", "Very Dark Blue", "Overly Harsh Red"],
    neutralColors: ["Cream", "Light Grey", "Soft Brown"],
    balancingColors: ["Red", "Maroon", "Coral"],
    meaning:
      "For Destiny Number 9, very dark colors or excessive harsh red may intensify anger, pressure or emotional extremes.",
    whyAvoid:
      "These colors can either suppress Mars energy or make it overly reactive.",
    careerCaution:
      "Avoid overly intense shades during conflict, competition or high-pressure meetings.",
    relationshipCaution:
      "Harsh colors may increase emotional intensity or arguments.",
    moneyCaution:
      "Use balanced warm tones when making action-based financial decisions.",
    remedy:
      "Use coral or maroon moderately, and balance passion with calm behavior.",
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

export function calculateUnluckyColorReport(dob: string): UnluckyColorReport {
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
  const profile = UNLUCKY_COLOR_PROFILES[destinyNumber];

  return {
    dob,
    digits,
    total,
    destinyNumber,
    ...profile,
  };
}