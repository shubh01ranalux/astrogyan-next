import {
  getMoonPlanet,
  getPlanetNakshatra,
  getPlanetNakshatraPada,
  getPlanets,
} from "@/lib/calculators/astrology/kundali-extractors";

export type NakshatraReport = {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  birthLatitude: number | null;
  birthLongitude: number | null;
  birthTimezone: number;
  nakshatra: string;
  pada: number;
  lord: string;
  deity: string;
  symbol: string;
  nature: string;
  confidence: "Vedic Calculated";
  howCalculated: string;
  meaning: string;
  personality: string;
  career: string;
  relationship: string;
  whatToDo: string[];
  whatToAvoid: string[];
  remedy: string;
};

const NAKSHATRAS = [
  {
    nakshatra: "Ashwini",
    lord: "Ketu",
    deity: "Ashwini Kumaras",
    symbol: "Horse Head",
    nature: "Fast, healing, pioneering",
    meaning: "Ashwini gives quick action, healing ability and fresh-start energy.",
    personality: "The person may be active, direct and naturally drawn to quick solutions.",
    career: "Good for healing, medicine, sports, emergency work, travel and startups.",
    relationship: "Needs freedom and freshness. Avoid impatience in emotional matters.",
    do: ["Start quickly but plan properly", "Use healing skills", "Stay physically active"],
    avoid: ["Impulsive decisions", "Leaving things incomplete", "Restlessness"],
    remedy: "On Tuesdays or Saturdays, donate medicine or help someone in need of treatment.",
  },
  {
    nakshatra: "Bharani",
    lord: "Venus",
    deity: "Yama",
    symbol: "Yoni",
    nature: "Intense, creative, transformative",
    meaning: "Bharani gives strong desires, creativity, endurance and transformation.",
    personality: "The person may be passionate, private and capable of handling pressure.",
    career: "Good for arts, law, psychology, finance, transformation work and luxury fields.",
    relationship: "Needs loyalty and emotional maturity. Avoid possessiveness.",
    do: ["Channel passion into discipline", "Respect boundaries", "Create responsibly"],
    avoid: ["Emotional extremes", "Control issues", "Overindulgence"],
    remedy: "On Fridays, donate white sweets or support women’s welfare with sincere intention.",
  },
  {
    nakshatra: "Krittika",
    lord: "Sun",
    deity: "Agni",
    symbol: "Knife / Flame",
    nature: "Sharp, purifying, disciplined",
    meaning: "Krittika gives sharp thinking, courage, purification and strong will.",
    personality: "The person may be direct, protective and sometimes critical.",
    career: "Good for leadership, defence, cooking, surgery, engineering and authority roles.",
    relationship: "Needs respect and honesty. Avoid harsh speech.",
    do: ["Use discipline", "Speak truth kindly", "Protect without controlling"],
    avoid: ["Criticism", "Anger", "Cutting people off quickly"],
    remedy: "Offer water to the rising Sun on Sundays and avoid disrespecting fatherly figures.",
  },
  {
    nakshatra: "Rohini",
    lord: "Moon",
    deity: "Brahma",
    symbol: "Chariot",
    nature: "Creative, fertile, attractive",
    meaning: "Rohini gives beauty, growth, charm, comfort and creative manifestation.",
    personality: "The person may be artistic, attractive, nurturing and comfort-loving.",
    career: "Good for luxury, beauty, food, music, farming, design and business growth.",
    relationship: "Needs affection, consistency and emotional security.",
    do: ["Create beauty", "Build stability", "Nurture relationships"],
    avoid: ["Possessiveness", "Over-comfort", "Attachment"],
    remedy: "On Mondays, offer milk or water to Shivling and practice gratitude.",
  },
  {
    nakshatra: "Mrigashira",
    lord: "Mars",
    deity: "Soma",
    symbol: "Deer Head",
    nature: "Searching, curious, gentle",
    meaning: "Mrigashira gives curiosity, searching nature, softness and mental movement.",
    personality: "The person may be thoughtful, restless and always seeking something better.",
    career: "Good for research, travel, writing, marketing, design and investigation.",
    relationship: "Needs mental connection and reassurance. Avoid suspicion.",
    do: ["Explore wisely", "Ask questions", "Keep communication open"],
    avoid: ["Overthinking", "Doubt", "Running from commitment"],
    remedy: "On Tuesdays, offer red lentils and practice focused breathing before decisions.",
  },
  {
    nakshatra: "Ardra",
    lord: "Rahu",
    deity: "Rudra",
    symbol: "Teardrop",
    nature: "Stormy, intellectual, transformative",
    meaning: "Ardra gives intense thinking, emotional storms and transformation through truth.",
    personality: "The person may be intelligent, intense and capable of deep change.",
    career: "Good for technology, research, crisis management, psychology and unconventional work.",
    relationship: "Needs emotional maturity. Avoid destructive speech during stress.",
    do: ["Use intelligence constructively", "Accept transformation", "Speak with awareness"],
    avoid: ["Harsh reactions", "Chaos", "Emotional destruction"],
    remedy: "On Mondays, chant Om Namah Shivaya and avoid harming others through words.",
  },
  {
    nakshatra: "Punarvasu",
    lord: "Jupiter",
    deity: "Aditi",
    symbol: "Quiver of Arrows",
    nature: "Restorative, wise, hopeful",
    meaning: "Punarvasu gives renewal, optimism, wisdom and recovery after setbacks.",
    personality: "The person may be forgiving, philosophical and able to restart life strongly.",
    career: "Good for teaching, counselling, spirituality, writing, law and education.",
    relationship: "Needs honesty and emotional renewal. Avoid repeating old mistakes.",
    do: ["Restart with wisdom", "Teach and guide", "Keep faith"],
    avoid: ["Carelessness", "Repeated cycles", "Over-forgiveness"],
    remedy: "On Thursdays, donate yellow food and respect teachers or gurus.",
  },
  {
    nakshatra: "Pushya",
    lord: "Saturn",
    deity: "Brihaspati",
    symbol: "Cow Udder",
    nature: "Nourishing, disciplined, spiritual",
    meaning: "Pushya gives nourishment, wisdom, discipline and spiritual growth.",
    personality: "The person may be responsible, caring and respected over time.",
    career: "Good for teaching, government, healing, food, counselling and administration.",
    relationship: "Needs loyalty and duty. Avoid emotional coldness.",
    do: ["Serve responsibly", "Guide others", "Build discipline"],
    avoid: ["Rigidity", "Emotional distance", "Over-duty"],
    remedy: "On Saturdays, serve the needy and maintain discipline in food and speech.",
  },
  {
    nakshatra: "Ashlesha",
    lord: "Mercury",
    deity: "Nagas",
    symbol: "Serpent",
    nature: "Intense, psychological, secretive",
    meaning: "Ashlesha gives deep perception, strategy, secrecy and psychological understanding.",
    personality: "The person may be sharp, intuitive and emotionally complex.",
    career: "Good for psychology, research, occult, medicine, strategy and investigation.",
    relationship: "Needs trust. Avoid manipulation or emotional testing.",
    do: ["Use insight ethically", "Study deeply", "Communicate clearly"],
    avoid: ["Manipulation", "Suspicion", "Hidden resentment"],
    remedy: "On Wednesdays, donate green moong and avoid toxic speech or secretive harm.",
  },
  {
    nakshatra: "Magha",
    lord: "Ketu",
    deity: "Pitrs",
    symbol: "Royal Throne",
    nature: "Ancestral, royal, proud",
    meaning: "Magha gives ancestral connection, authority, tradition and status awareness.",
    personality: "The person may value respect, lineage and leadership.",
    career: "Good for leadership, politics, administration, history, family business and authority.",
    relationship: "Needs respect and loyalty. Avoid ego or superiority.",
    do: ["Respect ancestors", "Lead with dignity", "Protect tradition"],
    avoid: ["Arrogance", "Status obsession", "Disrespecting elders"],
    remedy: "Perform ancestor remembrance or donate food in the name of ancestors on Amavasya.",
  },
  {
    nakshatra: "Purva Phalguni",
    lord: "Venus",
    deity: "Bhaga",
    symbol: "Bed",
    nature: "Creative, romantic, pleasurable",
    meaning: "Purva Phalguni gives creativity, romance, enjoyment, luxury and charm.",
    personality: "The person may be artistic, social and pleasure-loving.",
    career: "Good for beauty, entertainment, design, luxury, hospitality and relationships.",
    relationship: "Needs affection, romance and appreciation.",
    do: ["Create beauty", "Celebrate life", "Value relationships"],
    avoid: ["Laziness", "Overindulgence", "Drama"],
    remedy: "On Fridays, donate white sweets and keep bedroom/living space pure and beautiful.",
  },
  {
    nakshatra: "Uttara Phalguni",
    lord: "Sun",
    deity: "Aryaman",
    symbol: "Bed Legs",
    nature: "Responsible, committed, supportive",
    meaning: "Uttara Phalguni gives commitment, contracts, support and long-term responsibility.",
    personality: "The person may be loyal, generous and duty-oriented.",
    career: "Good for contracts, leadership, law, marriage work, HR and administration.",
    relationship: "Needs commitment, respect and reliability.",
    do: ["Honour commitments", "Support others", "Lead responsibly"],
    avoid: ["Over-giving", "Pride", "Taking duties too heavily"],
    remedy: "Offer water to the Sun and keep promises made to others.",
  },
  {
    nakshatra: "Hasta",
    lord: "Moon",
    deity: "Savitar",
    symbol: "Hand",
    nature: "Skilled, clever, practical",
    meaning: "Hasta gives skill, craftsmanship, cleverness and ability to manifest through hands.",
    personality: "The person may be practical, witty and skilled in detail work.",
    career: "Good for healing, design, crafts, writing, business, medicine and technical skills.",
    relationship: "Shows care through service and practical support.",
    do: ["Use your skills", "Work with hands", "Stay organized"],
    avoid: ["Trickery", "Over-control", "Restless perfectionism"],
    remedy: "On Mondays, donate rice or milk and use skills for helping someone.",
  },
  {
    nakshatra: "Chitra",
    lord: "Mars",
    deity: "Vishwakarma",
    symbol: "Gem",
    nature: "Brilliant, artistic, architectural",
    meaning: "Chitra gives beauty, design, brilliance, structure and desire to create something unique.",
    personality: "The person may be stylish, ambitious and creative.",
    career: "Good for architecture, design, engineering, beauty, media and luxury.",
    relationship: "Needs admiration and depth. Avoid appearance-only bonds.",
    do: ["Create excellence", "Refine your craft", "Use beauty with purpose"],
    avoid: ["Vanity", "Anger", "Perfection pressure"],
    remedy: "On Tuesdays, donate red lentils and avoid ego in creative work.",
  },
  {
    nakshatra: "Swati",
    lord: "Rahu",
    deity: "Vayu",
    symbol: "Young Shoot",
    nature: "Independent, flexible, airy",
    meaning: "Swati gives independence, movement, business skills and flexibility.",
    personality: "The person may value freedom and self-made growth.",
    career: "Good for business, trade, travel, media, technology and independent work.",
    relationship: "Needs space and trust. Avoid emotional inconsistency.",
    do: ["Build independence", "Network wisely", "Stay flexible"],
    avoid: ["Restlessness", "Commitment avoidance", "Scattered plans"],
    remedy: "On Saturdays, help the needy and practice breath control to balance Vayu energy.",
  },
  {
    nakshatra: "Vishakha",
    lord: "Jupiter",
    deity: "Indra-Agni",
    symbol: "Triumphal Arch",
    nature: "Goal-oriented, intense, ambitious",
    meaning: "Vishakha gives ambition, determination, focus and desire for achievement.",
    personality: "The person may be driven, intense and purposeful.",
    career: "Good for leadership, law, politics, sales, spirituality and goal-based fields.",
    relationship: "Needs shared goals and loyalty.",
    do: ["Focus on clear goals", "Use ambition ethically", "Stay disciplined"],
    avoid: ["Obsession", "Jealousy", "Win-at-any-cost attitude"],
    remedy: "On Thursdays, donate yellow food and respect teachers before major decisions.",
  },
  {
    nakshatra: "Anuradha",
    lord: "Saturn",
    deity: "Mitra",
    symbol: "Lotus",
    nature: "Devoted, disciplined, friendly",
    meaning: "Anuradha gives friendship, devotion, discipline and success after effort.",
    personality: "The person may be loyal, serious and relationship-oriented.",
    career: "Good for management, diplomacy, research, networks and long-term work.",
    relationship: "Needs loyalty, friendship and emotional maturity.",
    do: ["Build strong networks", "Stay loyal", "Respect discipline"],
    avoid: ["Emotional suppression", "Dependency", "Fear of rejection"],
    remedy: "On Saturdays, serve the poor and maintain loyalty in relationships.",
  },
  {
    nakshatra: "Jyeshtha",
    lord: "Mercury",
    deity: "Indra",
    symbol: "Earring",
    nature: "Senior, protective, intense",
    meaning: "Jyeshtha gives seniority, protection, responsibility and strategic intelligence.",
    personality: "The person may be protective, sharp and status-aware.",
    career: "Good for leadership, security, investigation, management and strategy.",
    relationship: "Needs respect and trust. Avoid control or suspicion.",
    do: ["Protect wisely", "Use authority ethically", "Communicate clearly"],
    avoid: ["Manipulation", "Control", "Insecurity"],
    remedy: "On Wednesdays, donate green items and avoid misusing influence.",
  },
  {
    nakshatra: "Mula",
    lord: "Ketu",
    deity: "Nirriti",
    symbol: "Roots",
    nature: "Rooted, destructive-transformative, truth-seeking",
    meaning: "Mula gives root-level investigation, truth-seeking and deep transformation.",
    personality: "The person may question everything and seek the root cause.",
    career: "Good for research, healing, archaeology, occult, investigation and transformation work.",
    relationship: "Needs honesty and depth. Avoid destructive reactions.",
    do: ["Seek truth", "Heal roots", "Research deeply"],
    avoid: ["Harsh destruction", "Extreme detachment", "Rebellion"],
    remedy: "On Saturdays, donate to those in distress and practice grounding meditation.",
  },
  {
    nakshatra: "Purva Ashadha",
    lord: "Venus",
    deity: "Apas",
    symbol: "Fan",
    nature: "Victorious, emotional, persuasive",
    meaning: "Purva Ashadha gives confidence, persuasion, charm and emotional conviction.",
    personality: "The person may be optimistic, proud and persuasive.",
    career: "Good for public speaking, law, art, water-related work, beauty and teaching.",
    relationship: "Needs admiration and emotional respect.",
    do: ["Use charm positively", "Stand for truth", "Keep emotional purity"],
    avoid: ["Overconfidence", "Stubborn opinions", "Emotional pride"],
    remedy: "On Fridays, donate white items and avoid arrogance in speech.",
  },
  {
    nakshatra: "Uttara Ashadha",
    lord: "Sun",
    deity: "Vishvadevas",
    symbol: "Elephant Tusk",
    nature: "Victorious, righteous, lasting",
    meaning: "Uttara Ashadha gives lasting success, righteousness, leadership and responsibility.",
    personality: "The person may be principled, respected and serious about duties.",
    career: "Good for government, law, leadership, management and public responsibility.",
    relationship: "Needs loyalty and shared values.",
    do: ["Act ethically", "Think long-term", "Respect principles"],
    avoid: ["Rigid pride", "Moral superiority", "Ignoring emotions"],
    remedy: "Offer water to the Sun and keep your commitments with integrity.",
  },
  {
    nakshatra: "Shravana",
    lord: "Moon",
    deity: "Vishnu",
    symbol: "Ear",
    nature: "Listening, learning, preserving",
    meaning: "Shravana gives listening ability, learning, tradition and communication.",
    personality: "The person may be observant, wise and good at absorbing knowledge.",
    career: "Good for teaching, counselling, media, language, management and tradition-based work.",
    relationship: "Needs listening, respect and emotional understanding.",
    do: ["Listen deeply", "Learn continuously", "Preserve wisdom"],
    avoid: ["Gossip", "Overthinking", "Ignoring intuition"],
    remedy: "On Mondays, offer water to Shivling and listen to Vishnu Sahasranama or mantras.",
  },
  {
    nakshatra: "Dhanishta",
    lord: "Mars",
    deity: "Vasus",
    symbol: "Drum",
    nature: "Rhythmic, wealthy, social",
    meaning: "Dhanishta gives rhythm, wealth potential, social presence and action.",
    personality: "The person may be ambitious, musical, social and resourceful.",
    career: "Good for music, finance, real estate, sports, leadership and social work.",
    relationship: "Needs respect and shared rhythm. Avoid emotional distance.",
    do: ["Use discipline", "Build wealth ethically", "Stay socially balanced"],
    avoid: ["Material obsession", "Restlessness", "Ignoring emotions"],
    remedy: "On Tuesdays, donate red lentils and avoid arrogance in success.",
  },
  {
    nakshatra: "Shatabhisha",
    lord: "Rahu",
    deity: "Varuna",
    symbol: "Circle",
    nature: "Healing, secretive, scientific",
    meaning: "Shatabhisha gives healing, secrecy, science, isolation and unconventional knowledge.",
    personality: "The person may be private, analytical and drawn to hidden systems.",
    career: "Good for medicine, technology, research, astrology, psychology and healing.",
    relationship: "Needs space and trust. Avoid emotional isolation.",
    do: ["Heal yourself and others", "Study systems", "Use knowledge ethically"],
    avoid: ["Isolation", "Addictions", "Coldness"],
    remedy: "On Saturdays, help sick or isolated people and practice disciplined meditation.",
  },
  {
    nakshatra: "Purva Bhadrapada",
    lord: "Jupiter",
    deity: "Aja Ekapada",
    symbol: "Sword / Front Legs of Cot",
    nature: "Intense, spiritual, transformative",
    meaning: "Purva Bhadrapada gives spiritual intensity, idealism and transformative fire.",
    personality: "The person may be philosophical, intense and unconventional.",
    career: "Good for spirituality, research, teaching, activism, writing and transformation work.",
    relationship: "Needs depth and truth. Avoid extremes.",
    do: ["Use intensity for wisdom", "Serve higher purpose", "Study deeply"],
    avoid: ["Extremism", "Anger", "Escapism"],
    remedy: "On Thursdays, donate yellow food and follow a disciplined spiritual practice.",
  },
  {
    nakshatra: "Uttara Bhadrapada",
    lord: "Saturn",
    deity: "Ahir Budhnya",
    symbol: "Back Legs of Cot",
    nature: "Deep, patient, wise",
    meaning: "Uttara Bhadrapada gives depth, patience, compassion and hidden wisdom.",
    personality: "The person may be calm, mature and emotionally deep.",
    career: "Good for healing, counselling, research, spirituality, management and long-term service.",
    relationship: "Needs emotional depth, loyalty and patience.",
    do: ["Practice patience", "Serve quietly", "Go deep"],
    avoid: ["Emotional heaviness", "Withdrawal", "Delays through fear"],
    remedy: "On Saturdays, donate black sesame or serve elderly people with humility.",
  },
  {
    nakshatra: "Revati",
    lord: "Mercury",
    deity: "Pushan",
    symbol: "Fish",
    nature: "Protective, gentle, guiding",
    meaning: "Revati gives compassion, guidance, travel, protection and completion energy.",
    personality: "The person may be gentle, helpful, imaginative and protective.",
    career: "Good for travel, healing, counselling, music, writing, guidance and care work.",
    relationship: "Needs kindness, trust and emotional gentleness.",
    do: ["Guide others", "Travel wisely", "Use compassion"],
    avoid: ["Escapism", "Over-giving", "Confusion"],
    remedy: "On Wednesdays, donate green moong and help travellers, animals or children.",
  },
];

function validateBirthDetails(dateOfBirth: string, birthTime: string) {
  if (!dateOfBirth) throw new Error("Date of birth is required.");
  if (!birthTime) throw new Error("Birth time is required.");

  const [year, month, day] = dateOfBirth.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error("Please enter a valid date of birth.");
  }
}

/**
 * Temporary deterministic fallback.
 * Replace with exact Moon longitude / 13°20′ Nakshatra API calculation.
 */

export function calculateNakshatraReport(input: {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  birthLatitude: number | null;
  birthLongitude: number | null;
  birthTimezone: number;
  kundaliData: any;
}): NakshatraReport {
  validateBirthDetails(input.dateOfBirth, input.birthTime);

  if (!input.birthPlace) {
    throw new Error("Birth place is required.");
  }

const planets = getPlanets(input.kundaliData);
const moon = getMoonPlanet(planets);
const nakshatraName = getPlanetNakshatra(moon);
const padaValue = getPlanetNakshatraPada(moon);

if (!moon || nakshatraName === "—") {
  throw new Error("Nakshatra could not be extracted from API response.");
}

const data = NAKSHATRAS.find(
  (item) =>
    item.nakshatra.toLowerCase() === String(nakshatraName).toLowerCase()
);

if (!data) {
  throw new Error(`Unsupported Nakshatra received from API: ${nakshatraName}`);
}

  return {
    fullName: input.fullName,
    dateOfBirth: input.dateOfBirth,
    birthTime: input.birthTime,
    birthPlace: input.birthPlace,
    birthLatitude: input.birthLatitude,
    birthLongitude: input.birthLongitude,
    birthTimezone: input.birthTimezone,
    nakshatra: data.nakshatra,
    pada: Number(padaValue) || 1,
    lord: data.lord,
    deity: data.deity,
    symbol: data.symbol,
    nature: data.nature,
    confidence: "Vedic Calculated",
    howCalculated:
      "In exact Vedic astrology, Nakshatra is calculated from the Moon’s sidereal longitude. The zodiac is divided into 27 Nakshatras of 13°20′ each, and each Nakshatra has 4 padas of 3°20′ each. This UI is ready for ephemeris/API integration.",
    meaning: data.meaning,
    personality: data.personality,
    career: data.career,
    relationship: data.relationship,
    whatToDo: data.do,
    whatToAvoid: data.avoid,
    remedy: data.remedy,
  };
}