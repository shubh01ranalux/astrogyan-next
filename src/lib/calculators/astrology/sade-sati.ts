import {
  getMoonPlanet,
  getPlanetName,
  getPlanetSign,
  getPlanets,
} from "@/lib/calculators/astrology/kundali-extractors";

export type SadeSatiReport = {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  moonSign: string;
  saturnSign: string;
  houseFromMoon: number;
  isActive: boolean;
  phase: string;
  title: string;
  status: "Vedic Calculated";
  howCalculated: string;
  meaning: string;
  careerImpact: string;
  relationshipImpact: string;
  moneyImpact: string;
  healthImpact: string;
  whatToDo: string[];
  whatToAvoid: string[];
  remedy: string;
};

const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

function normalizeSign(sign: string) {
  const clean = String(sign || "").trim().toLowerCase();

  const match = ZODIAC_SIGNS.find((item) => item.toLowerCase() === clean);

  if (!match) {
    throw new Error(`Unsupported zodiac sign from API: ${sign}`);
  }

  return match;
}

function getSaturnPlanet(planets: any[]) {
  return planets.find((planet) => {
    const name = String(getPlanetName(planet)).toLowerCase();
    return name === "saturn" || name.includes("shani");
  });
}

function getHouseFromMoon(moonSign: string, saturnSign: string) {
  const moonIndex = ZODIAC_SIGNS.indexOf(normalizeSign(moonSign));
  const saturnIndex = ZODIAC_SIGNS.indexOf(normalizeSign(saturnSign));

  return ((saturnIndex - moonIndex + 12) % 12) + 1;
}

function getSadeSatiProfile(houseFromMoon: number) {
  if (houseFromMoon === 12) {
    return {
      isActive: true,
      phase: "First Phase",
      title: "Sade Sati First Phase — Preparation & Pressure",
      meaning:
        "Saturn is transiting the 12th sign from your Moon sign. This starts Sade Sati and usually brings inner pressure, expenses, distance, sleep changes, foreign connections or emotional seriousness.",
      careerImpact:
        "Career may feel slower, but this phase is good for preparing, restructuring and removing weak foundations.",
      relationshipImpact:
        "You may need more emotional space. Misunderstandings can happen if communication becomes cold.",
      moneyImpact:
        "Expenses may increase. Avoid careless spending and prepare a disciplined savings plan.",
      healthImpact:
        "Sleep, stress and mental pressure need attention. Avoid ignoring rest.",
      whatToDo: [
        "Build discipline quietly",
        "Reduce unnecessary expenses",
        "Sleep and routine must be protected",
        "Finish pending responsibilities",
      ],
      whatToAvoid: [
        "Escaping responsibilities",
        "Unplanned spending",
        "Isolation without communication",
        "Fear-based decisions",
      ],
      remedy:
        "Every Saturday, donate black sesame or mustard oil to the needy and recite Shani mantra with discipline for at least 11 Saturdays.",
    };
  }

  if (houseFromMoon === 1) {
    return {
      isActive: true,
      phase: "Second Phase",
      title: "Sade Sati Second Phase — Peak Karma & Inner Testing",
      meaning:
        "Saturn is transiting over your Moon sign. This is considered the peak phase of Sade Sati and can bring emotional heaviness, responsibility, maturity, pressure and major life lessons.",
      careerImpact:
        "Career can feel demanding. Saturn rewards sincere effort, patience and long-term discipline.",
      relationshipImpact:
        "Relationships may test loyalty, patience and emotional maturity. Avoid emotional withdrawal.",
      moneyImpact:
        "Money decisions should be conservative. Avoid shortcuts, debt pressure and risky commitments.",
      healthImpact:
        "Mental health, bones, joints, fatigue and stress management need care.",
      whatToDo: [
        "Respect time and commitments",
        "Work consistently without shortcuts",
        "Keep emotional reactions controlled",
        "Take responsibility maturely",
      ],
      whatToAvoid: [
        "Blaming others",
        "Ignoring health",
        "Breaking promises",
        "Taking shortcuts for quick results",
      ],
      remedy:
        "On Saturdays, serve elderly or poor people, donate black urad or sesame, and chant 'Om Sham Shanicharaya Namah' 108 times.",
    };
  }

  if (houseFromMoon === 2) {
    return {
      isActive: true,
      phase: "Third Phase",
      title: "Sade Sati Third Phase — Closure & Stabilisation",
      meaning:
        "Saturn is transiting the 2nd sign from your Moon sign. This is the final phase of Sade Sati and focuses on family, speech, savings, values and financial maturity.",
      careerImpact:
        "Career begins to stabilise if previous lessons were handled with patience and responsibility.",
      relationshipImpact:
        "Family and speech become important. Harsh words can create distance.",
      moneyImpact:
        "This phase pushes you to build savings, reduce debt and make mature financial choices.",
      healthImpact:
        "Food habits, throat, teeth, face and stress-related eating patterns need attention.",
      whatToDo: [
        "Speak carefully",
        "Build savings",
        "Take family duties seriously",
        "Consolidate lessons learned",
      ],
      whatToAvoid: [
        "Harsh speech",
        "Family ego clashes",
        "Careless eating",
        "Financial overconfidence",
      ],
      remedy:
        "Every Saturday, feed black sesame mixed roti to cows or donate food to labourers, and avoid speaking harshly.",
    };
  }

  return {
    isActive: false,
    phase: "Not Active",
    title: "Sade Sati Not Active",
    meaning:
      "Saturn is not currently transiting the 12th, 1st or 2nd sign from your Moon sign, so Sade Sati is not active right now.",
    careerImpact:
      "This is a good time to work steadily without fear of Sade Sati, while still respecting Saturn’s discipline.",
    relationshipImpact:
      "Relationship lessons may exist from other chart factors, but they are not due to active Sade Sati.",
    moneyImpact:
      "Money planning should still remain disciplined, but Sade Sati pressure is not currently indicated.",
    healthImpact:
      "Maintain routine and patience, especially if Saturn affects other chart areas.",
    whatToDo: [
      "Keep consistent discipline",
      "Use this time for long-term planning",
      "Respect responsibilities",
      "Strengthen Saturn-related habits",
    ],
    whatToAvoid: [
      "Ignoring duties",
      "Fear of Sade Sati without checking chart",
      "Careless commitments",
      "Disrespecting time and elders",
    ],
    remedy:
      "On Saturdays, serve elderly or needy people and maintain honesty, patience and discipline in daily life.",
  };
}

export function calculateSadeSatiReport(input: {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  natalKundaliData: any;
  transitKundaliData: any;
}): SadeSatiReport {
  const natalPlanets = getPlanets(input.natalKundaliData);
  const transitPlanets = getPlanets(input.transitKundaliData);

  const moon = getMoonPlanet(natalPlanets);
  const saturn = getSaturnPlanet(transitPlanets);

  const moonSign = normalizeSign(getPlanetSign(moon));
  const saturnSign = normalizeSign(getPlanetSign(saturn));

  if (!moon || !saturn) {
    throw new Error("Moon or Saturn could not be extracted from API response.");
  }

  const houseFromMoon = getHouseFromMoon(moonSign, saturnSign);
  const profile = getSadeSatiProfile(houseFromMoon);

  return {
    fullName: input.fullName,
    dateOfBirth: input.dateOfBirth,
    birthTime: input.birthTime,
    birthPlace: input.birthPlace,
    moonSign,
    saturnSign,
    houseFromMoon,
    status: "Vedic Calculated",
    howCalculated:
      "Sade Sati is calculated by comparing your natal Moon sign with Saturn's current transit sign. If Saturn is in the 12th, 1st or 2nd sign from the natal Moon, Sade Sati is active. The first phase is 12th from Moon, second phase is over Moon sign, and third phase is 2nd from Moon.",
    ...profile,
  };
}