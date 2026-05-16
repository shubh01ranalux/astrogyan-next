import {
  getMoonPlanet,
  getPlanetNakshatra,
  getPlanetSign,
  getPlanets,
} from "@/lib/calculators/astrology/kundali-extractors";

export type PartnerKundliSummary = {
  name: string;
  moonSign: string;
  nakshatra: string;
};

export type KundliMatchingReport = {
  partner1: PartnerKundliSummary;
  partner2: PartnerKundliSummary;
  score: number;
  title: string;
  status: "Vedic Calculated";
  howCalculated: string;
  summary: string;
  mentalCompatibility: string;
  emotionalCompatibility: string;
  relationshipCaution: string;
  whatToDo: string[];
  whatToAvoid: string[];
  remedy: string;
};

const SIGN_GROUPS: Record<string, string> = {
  Aries: "Fire",
  Leo: "Fire",
  Sagittarius: "Fire",
  Taurus: "Earth",
  Virgo: "Earth",
  Capricorn: "Earth",
  Gemini: "Air",
  Libra: "Air",
  Aquarius: "Air",
  Cancer: "Water",
  Scorpio: "Water",
  Pisces: "Water",
};

function getPartnerSummary(name: string, kundaliData: any): PartnerKundliSummary {
  const planets = getPlanets(kundaliData);
  const moon = getMoonPlanet(planets);

  if (!moon) {
    throw new Error(`Moon could not be extracted for ${name}.`);
  }

  const moonSign = getPlanetSign(moon);
  const nakshatra = getPlanetNakshatra(moon);

  if (moonSign === "—" || nakshatra === "—") {
    throw new Error(`Moon Sign or Nakshatra missing for ${name}.`);
  }

  return {
    name,
    moonSign,
    nakshatra,
  };
}

function getScore(partner1: PartnerKundliSummary, partner2: PartnerKundliSummary) {
  let score = 50;

  if (partner1.moonSign === partner2.moonSign) score += 18;
  if (partner1.nakshatra === partner2.nakshatra) score += 12;

  const group1 = SIGN_GROUPS[partner1.moonSign];
  const group2 = SIGN_GROUPS[partner2.moonSign];

  if (group1 && group1 === group2) score += 15;

  if (
    (group1 === "Fire" && group2 === "Air") ||
    (group1 === "Air" && group2 === "Fire") ||
    (group1 === "Earth" && group2 === "Water") ||
    (group1 === "Water" && group2 === "Earth")
  ) {
    score += 10;
  }

  return Math.min(95, Math.max(35, score));
}

function getProfile(score: number) {
  if (score >= 80) {
    return {
      title: "Strong Compatibility",
      summary:
        "The Moon sign and Nakshatra pattern shows strong emotional and mental alignment. This can support comfort, understanding and long-term bonding.",
      mentalCompatibility:
        "Both partners may understand each other’s thinking style more naturally, especially during emotional conversations.",
      emotionalCompatibility:
        "Emotional bonding can become strong when both partners maintain patience and mutual respect.",
      relationshipCaution:
        "Even strong compatibility needs communication, family alignment and Dasha-level verification.",
      whatToDo: [
        "Build emotional trust",
        "Discuss long-term goals clearly",
        "Respect both families and values",
      ],
      whatToAvoid: [
        "Taking compatibility for granted",
        "Ignoring practical issues",
        "Avoiding difficult conversations",
      ],
      remedy:
        "On Mondays, both partners should offer water to Shivling and pray for emotional harmony and patience.",
    };
  }

  if (score >= 65) {
    return {
      title: "Good Compatibility",
      summary:
        "The chart pattern shows workable compatibility with good potential, but some emotional differences need maturity.",
      mentalCompatibility:
        "Mental connection can improve through honest communication and shared decision-making.",
      emotionalCompatibility:
        "Emotional comfort may grow gradually with trust, consistency and patience.",
      relationshipCaution:
        "Some differences in emotional response or expectations may appear.",
      whatToDo: [
        "Communicate expectations early",
        "Give emotional reassurance",
        "Resolve issues without ego",
      ],
      whatToAvoid: [
        "Silent assumptions",
        "Family pressure decisions",
        "Comparing the relationship with others",
      ],
      remedy:
        "Every Monday for 11 weeks, offer white flowers or milk to Lord Shiva and avoid harsh speech in the relationship.",
    };
  }

  return {
    title: "Needs Careful Matching",
    summary:
      "The automated match shows areas that need deeper checking. This does not mean the relationship cannot work, but full Kundli matching is strongly recommended.",
    mentalCompatibility:
      "Thinking style and emotional interpretation may differ, so misunderstandings are possible.",
    emotionalCompatibility:
      "Emotional bonding may require more effort, patience and maturity from both partners.",
    relationshipCaution:
      "Do not decide only from this automated score. Check Guna Milan, Manglik, 7th house, Venus, Jupiter, Navamsa and Dasha.",
    whatToDo: [
      "Book full Kundli matching",
      "Discuss expectations honestly",
      "Observe emotional consistency",
    ],
    whatToAvoid: [
      "Rushing commitment",
      "Ignoring red flags",
      "Depending only on name/date-level matching",
    ],
    remedy:
      "Before making a final decision, perform proper Kundli Milan and offer prayers to Lord Shiva-Parvati on Monday for relationship clarity.",
  };
}

export function calculateKundliMatchingReport(input: {
  partner1Name: string;
  partner1KundaliData: any;
  partner2Name: string;
  partner2KundaliData: any;
}): KundliMatchingReport {
  const partner1 = getPartnerSummary(input.partner1Name, input.partner1KundaliData);
  const partner2 = getPartnerSummary(input.partner2Name, input.partner2KundaliData);

  const score = getScore(partner1, partner2);
  const profile = getProfile(score);

  return {
    partner1,
    partner2,
    score,
    status: "Vedic Calculated",
    howCalculated:
      "This automated match compares both partners’ Vedic Moon signs and Nakshatras from Kundali data. Full marriage matching should also check Guna Milan, Manglik dosha, 7th house, Venus, Jupiter, Navamsa/D9 and Dasha compatibility.",
    ...profile,
  };
}