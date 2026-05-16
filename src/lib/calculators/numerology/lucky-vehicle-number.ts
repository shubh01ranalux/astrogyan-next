export type LuckyVehicleNumberReport = {
  vehicleNumber: string;
  cleanVehicleNumber: string;
  characters: { character: string; value: number }[];
  total: number;
  vehicleNumberValue: number;
  title: string;
  rating: "Excellent" | "Good" | "Average" | "Needs Balance";
  meaning: string;
  travelEnergy: string;
  moneyEnergy: string;
  safetyEnergy: string;
  caution: string;
  remedy: string;
  luckyColors: string[];
  favorableNumbers: number[];
};

const VEHICLE_PROFILES: Record<
  number,
  Omit<
    LuckyVehicleNumberReport,
    "vehicleNumber" | "cleanVehicleNumber" | "characters" | "total" | "vehicleNumberValue"
  >
> = {
  1: {
    title: "Leadership Vehicle Number",
    rating: "Good",
    meaning: "Supports independence, authority, confidence and personal movement.",
    travelEnergy: "Good for self-driven travel, leadership work and personal use.",
    moneyEnergy: "Supports business owners, managers and people who lead their own work.",
    safetyEnergy: "Drive with patience; avoid ego-based speed or aggressive driving.",
    caution: "Can create impatience if the driver is already very dominant.",
    remedy: "Keep the vehicle clean and avoid rash driving during anger.",
    luckyColors: ["Gold", "Orange", "Yellow"],
    favorableNumbers: [1, 3, 5, 9],
  },
  2: {
    title: "Peaceful Vehicle Number",
    rating: "Good",
    meaning: "Supports calm travel, family movement, emotional comfort and partnership energy.",
    travelEnergy: "Good for family vehicles, couples and peaceful daily travel.",
    moneyEnergy: "Supports service, care, client handling and partnership-based work.",
    safetyEnergy: "Drive calmly and avoid emotional distraction.",
    caution: "Can make the vehicle feel slow or mood-dependent.",
    remedy: "Use white, silver or soft fragrance inside the vehicle.",
    luckyColors: ["White", "Cream", "Silver"],
    favorableNumbers: [2, 4, 6],
  },
  3: {
    title: "Growth Vehicle Number",
    rating: "Excellent",
    meaning: "Supports joy, learning, visibility, creativity and positive movement.",
    travelEnergy: "Good for teachers, creators, students, content creators and social use.",
    moneyEnergy: "Supports growth through communication, learning and public-facing work.",
    safetyEnergy: "Avoid distraction, music overload or overconfidence while driving.",
    caution: "Can create scattered attention if not balanced.",
    remedy: "Keep documents organized and avoid multitasking while driving.",
    luckyColors: ["Yellow", "Saffron", "Purple"],
    favorableNumbers: [1, 3, 6, 9],
  },
  4: {
    title: "Stable Vehicle Number",
    rating: "Average",
    meaning: "Supports structure, routine, practicality and work-related movement.",
    travelEnergy: "Good for daily office use, logistics, technical work and disciplined travel.",
    moneyEnergy: "Supports savings, practical work and structured income.",
    safetyEnergy: "Good when maintenance is regular; delays may happen if ignored.",
    caution: "Can bring repair delays or routine pressure if neglected.",
    remedy: "Maintain servicing schedule strictly and keep emergency tools.",
    luckyColors: ["Grey", "Blue", "Earth Green"],
    favorableNumbers: [2, 4, 8],
  },
  5: {
    title: "Movement Vehicle Number",
    rating: "Excellent",
    meaning: "Supports travel, networking, communication, trade and flexibility.",
    travelEnergy: "Very good for people who travel often, sell, network or work digitally.",
    moneyEnergy: "Supports business movement, sales, marketing and communication income.",
    safetyEnergy: "Avoid overspeeding and sudden decisions.",
    caution: "Can increase restlessness and frequent travel.",
    remedy: "Drive mindfully and verify routes/documents before travel.",
    luckyColors: ["Green", "Light Blue", "Turquoise"],
    favorableNumbers: [1, 5, 6],
  },
  6: {
    title: "Comfort Vehicle Number",
    rating: "Excellent",
    meaning: "Supports comfort, beauty, family, luxury and harmonious travel.",
    travelEnergy: "Good for family cars, luxury vehicles and comfort-focused use.",
    moneyEnergy: "Supports service, beauty, hospitality and client-friendly professions.",
    safetyEnergy: "Generally balanced, but avoid comfort-based laziness.",
    caution: "Can increase spending on decoration or comfort upgrades.",
    remedy: "Keep the vehicle beautiful but avoid unnecessary expenses.",
    luckyColors: ["Pink", "White", "Pastel Shades"],
    favorableNumbers: [3, 6, 9],
  },
  7: {
    title: "Spiritual Vehicle Number",
    rating: "Average",
    meaning: "Supports spiritual travel, research, solitude and reflective movement.",
    travelEnergy: "Good for pilgrimages, peaceful drives and thoughtful people.",
    moneyEnergy: "Supports research, healing, study and specialized work.",
    safetyEnergy: "Avoid zoning out, overthinking or distraction while driving.",
    caution: "Can create isolation, sudden plans or irregular usage.",
    remedy: "Keep grounding symbols and avoid driving when mentally overloaded.",
    luckyColors: ["White", "Silver", "Light Green"],
    favorableNumbers: [2, 7, 9],
  },
  8: {
    title: "Power Vehicle Number",
    rating: "Needs Balance",
    meaning: "Supports authority, business, discipline and karmic responsibility.",
    travelEnergy: "Good for business, official work and serious responsibilities.",
    moneyEnergy: "Can support wealth and status if used with discipline.",
    safetyEnergy: "Needs careful driving, maintenance and patience.",
    caution: "May bring delays, pressure, expenses or responsibility if neglected.",
    remedy: "Drive ethically, maintain insurance/documents and avoid shortcuts.",
    luckyColors: ["Black", "Navy Blue", "Dark Grey"],
    favorableNumbers: [4, 6, 8],
  },
  9: {
    title: "Action Vehicle Number",
    rating: "Good",
    meaning: "Supports courage, speed, passion, action and public movement.",
    travelEnergy: "Good for active people, field work, sports, defence and leadership.",
    moneyEnergy: "Supports action-based income and completion of pending work.",
    safetyEnergy: "Avoid aggression, speed and emotional driving.",
    caution: "Can increase heat, anger or rash decisions.",
    remedy: "Drive calmly and avoid starting journeys during anger.",
    luckyColors: ["Red", "Maroon", "Coral"],
    favorableNumbers: [1, 3, 9],
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

function characterValue(character: string): number {
  if (/[0-9]/.test(character)) return Number(character);

  const code = character.charCodeAt(0) - 64;
  return code % 9 || 9;
}

export function calculateLuckyVehicleNumberReport(
  vehicleNumber: string
): LuckyVehicleNumberReport {
  const cleanVehicleNumber = vehicleNumber.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (!cleanVehicleNumber) {
    throw new Error("Please enter a valid vehicle number.");
  }

  const characters = cleanVehicleNumber.split("").map((character) => ({
    character,
    value: characterValue(character),
  }));

  const total = characters.reduce((sum, item) => sum + item.value, 0);
  const vehicleNumberValue = reduceNumber(total);
  const profile = VEHICLE_PROFILES[vehicleNumberValue];

  return {
    vehicleNumber,
    cleanVehicleNumber,
    characters,
    total,
    vehicleNumberValue,
    ...profile,
  };
}