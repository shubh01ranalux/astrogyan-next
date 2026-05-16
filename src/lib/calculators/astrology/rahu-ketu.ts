import {
  getPlanetName,
  getPlanetSign,
  getPlanets,
} from "@/lib/calculators/astrology/kundali-extractors";

export type RahuKetuReport = {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  rahuSign: string;
  rahuHouse: string | number;
  ketuSign: string;
  ketuHouse: string | number;
  axis: string;
  status: "Vedic Calculated";
  howCalculated: string;
  meaning: string;
  rahuMeaning: string;
  ketuMeaning: string;
  karmicLesson: string;
  careerImpact: string;
  relationshipImpact: string;
  moneyImpact: string;
  whatToDo: string[];
  whatToAvoid: string[];
  remedy: string;
};

function getPlanetHouse(planet: any) {
  return planet?.house || planet?.house_number || planet?.bhava || "—";
}

function getRahuPlanet(planets: any[]) {
  return planets.find((planet) => {
    const name = String(getPlanetName(planet)).toLowerCase();
    return name === "rahu" || name.includes("north node");
  });
}

function getKetuPlanet(planets: any[]) {
  return planets.find((planet) => {
    const name = String(getPlanetName(planet)).toLowerCase();
    return name === "ketu" || name.includes("south node");
  });
}

function getAxisMeaning(rahuHouse: string | number, ketuHouse: string | number) {
  const axis = `${rahuHouse}-${ketuHouse}`;

  const meanings: Record<string, Omit<
    RahuKetuReport,
    | "fullName"
    | "dateOfBirth"
    | "birthTime"
    | "birthPlace"
    | "rahuSign"
    | "rahuHouse"
    | "ketuSign"
    | "ketuHouse"
    | "axis"
    | "status"
    | "howCalculated"
  >> = {
    "1-7": {
      meaning:
        "Your Rahu-Ketu axis activates identity and relationships. Rahu pushes self-development while Ketu shows detachment or past-life comfort around partnerships.",
      rahuMeaning:
        "Rahu in the 1st house creates strong desire for recognition, individuality and personal growth.",
      ketuMeaning:
        "Ketu in the 7th house may create detachment, unusual relationship patterns or lessons through partners.",
      karmicLesson:
        "Learn to build a strong self without becoming selfish, and build relationships without losing identity.",
      careerImpact:
        "Good for personal branding, independent work and leadership, but avoid ego-driven choices.",
      relationshipImpact:
        "Relationships need patience, clarity and mutual respect. Avoid emotional distance or dominance.",
      moneyImpact:
        "Money improves when decisions are self-led but still ethically balanced.",
      whatToDo: [
        "Build self-confidence",
        "Communicate clearly in relationships",
        "Avoid dependency",
        "Take responsibility for your identity",
      ],
      whatToAvoid: [
        "Ego clashes",
        "Ignoring partner needs",
        "Impulsive self-focused decisions",
        "Running from commitment",
      ],
      remedy:
        "On Saturdays, donate black sesame and feed stray dogs. Practice humility in relationships for at least 43 days.",
    },
    "2-8": {
      meaning:
        "Your Rahu-Ketu axis activates money, speech, family, secrets and transformation.",
      rahuMeaning:
        "Rahu in the 2nd house creates strong desire for wealth, speech power, family status and material security.",
      ketuMeaning:
        "Ketu in the 8th house shows detachment from hidden fears, sudden changes and deep transformation.",
      karmicLesson:
        "Use speech and wealth ethically while learning not to fear sudden life changes.",
      careerImpact:
        "Good for finance, speech, food, family business and resource management.",
      relationshipImpact:
        "Family speech and emotional security matter. Avoid harsh words.",
      moneyImpact:
        "Strong wealth desire, but avoid greed, risky shortcuts and secretive money habits.",
      whatToDo: [
        "Speak consciously",
        "Build clean savings",
        "Respect family values",
        "Study hidden fears calmly",
      ],
      whatToAvoid: [
        "Harsh speech",
        "Greed",
        "Secretive financial choices",
        "Manipulation",
      ],
      remedy:
        "Donate food or grains on Saturdays and avoid lying or harsh speech for 43 days.",
    },
    "3-9": {
      meaning:
        "Your Rahu-Ketu axis activates courage, communication, siblings, dharma, luck and higher wisdom.",
      rahuMeaning:
        "Rahu in the 3rd house gives courage, media skills, communication drive and self-effort.",
      ketuMeaning:
        "Ketu in the 9th house may create detachment from traditional beliefs or unusual spiritual views.",
      karmicLesson:
        "Develop courage through effort while respecting wisdom, teachers and ethics.",
      careerImpact:
        "Good for media, sales, content, marketing, writing, travel and entrepreneurship.",
      relationshipImpact:
        "Communication is key. Avoid being too argumentative or dismissive.",
      moneyImpact:
        "Money improves through self-effort, networking and communication-based work.",
      whatToDo: [
        "Build skills",
        "Respect mentors",
        "Communicate boldly",
        "Travel with purpose",
      ],
      whatToAvoid: [
        "Disrespecting teachers",
        "Overconfidence",
        "Restless decisions",
        "Arguments with siblings",
      ],
      remedy:
        "Offer service to teachers or elders on Thursdays and avoid disrespecting guidance.",
    },
    "4-10": {
      meaning:
        "Your Rahu-Ketu axis activates home, mother, emotional security, career and public karma.",
      rahuMeaning:
        "Rahu in the 4th house creates strong desire for property, comfort, vehicles and emotional security.",
      ketuMeaning:
        "Ketu in the 10th house may create detachment from career status or unusual professional direction.",
      karmicLesson:
        "Balance inner peace with outer responsibilities and avoid choosing comfort over purpose.",
      careerImpact:
        "Career may feel unusual or non-linear. Work needs meaning, not just status.",
      relationshipImpact:
        "Home peace matters. Avoid emotional unrest or family detachment.",
      moneyImpact:
        "Good for property, vehicles, home business and assets when decisions are practical.",
      whatToDo: [
        "Create emotional stability",
        "Respect mother/home energy",
        "Build property carefully",
        "Choose meaningful work",
      ],
      whatToAvoid: [
        "Emotional insecurity",
        "Career confusion",
        "Property shortcuts",
        "Ignoring family peace",
      ],
      remedy:
        "Keep the home clean and peaceful. On Saturdays, donate to elderly women or needy families.",
    },
    "5-11": {
      meaning:
        "Your Rahu-Ketu axis activates intelligence, romance, children, creativity, gains and networks.",
      rahuMeaning:
        "Rahu in the 5th house creates strong desire for recognition through intelligence, creativity, romance and speculation.",
      ketuMeaning:
        "Ketu in the 11th house may create detachment from social circles, gains or large networks.",
      karmicLesson:
        "Use creativity wisely without becoming obsessed with validation or risky gains.",
      careerImpact:
        "Good for creative fields, education, speculation analysis, media and strategy.",
      relationshipImpact:
        "Romance may be intense or unconventional. Avoid drama and emotional games.",
      moneyImpact:
        "Speculation temptation can be high. Avoid gambling-like decisions.",
      whatToDo: [
        "Use creativity constructively",
        "Guide children or students wisely",
        "Be careful in speculation",
        "Build quality networks",
      ],
      whatToAvoid: [
        "Risky betting",
        "Romantic drama",
        "Validation addiction",
        "Manipulating others",
      ],
      remedy:
        "Donate study material to children on Saturdays and avoid gambling or manipulative romance.",
    },
    "6-12": {
      meaning:
        "Your Rahu-Ketu axis activates enemies, debts, disease, service, isolation, foreign lands and moksha.",
      rahuMeaning:
        "Rahu in the 6th house gives ability to defeat competition, handle enemies and rise through service.",
      ketuMeaning:
        "Ketu in the 12th house gives spiritual detachment, foreign connections and isolation tendencies.",
      karmicLesson:
        "Win through discipline and service while avoiding hidden self-sabotage.",
      careerImpact:
        "Good for service, law, medicine, competition, operations and problem-solving.",
      relationshipImpact:
        "Avoid emotional isolation and unspoken resentment.",
      moneyImpact:
        "Good for clearing debt through discipline, but avoid hidden expenses.",
      whatToDo: [
        "Serve consistently",
        "Clear debts",
        "Maintain health routines",
        "Use solitude spiritually",
      ],
      whatToAvoid: [
        "Hidden expenses",
        "Escapism",
        "Ignoring health",
        "Secret enemies",
      ],
      remedy:
        "On Saturdays, donate medicine or help sick people. Maintain a strict health and debt-clearance routine.",
    },
    "7-1": {
      meaning:
        "Your Rahu-Ketu axis activates partnerships and self-identity.",
      rahuMeaning:
        "Rahu in the 7th house creates strong desire for relationships, public dealing, business partnerships and validation through others.",
      ketuMeaning:
        "Ketu in the 1st house may create self-detachment, identity confusion or inward spiritual nature.",
      karmicLesson:
        "Learn healthy partnership without losing self-awareness.",
      careerImpact:
        "Good for business, public dealing, consulting and client-based work.",
      relationshipImpact:
        "Relationships may feel karmic or intense. Choose clarity over obsession.",
      moneyImpact:
        "Money can grow through partnerships if contracts are clear.",
      whatToDo: [
        "Choose mature partners",
        "Keep agreements written",
        "Know your own needs",
        "Respect boundaries",
      ],
      whatToAvoid: [
        "Relationship obsession",
        "Losing identity",
        "Unclear partnerships",
        "People pleasing",
      ],
      remedy:
        "On Saturdays, feed stray dogs and avoid dishonest relationship or business commitments.",
    },
    "8-2": {
      meaning:
        "Your Rahu-Ketu axis activates transformation, hidden matters, family and speech.",
      rahuMeaning:
        "Rahu in the 8th house gives intense interest in secrets, occult, sudden events and transformation.",
      ketuMeaning:
        "Ketu in the 2nd house may create detachment from family, speech or traditional wealth patterns.",
      karmicLesson:
        "Face hidden fears and transform them without damaging family peace or speech purity.",
      careerImpact:
        "Good for research, occult, psychology, insurance, investigation and crisis work.",
      relationshipImpact:
        "Trust issues may arise. Avoid secrecy and emotional testing.",
      moneyImpact:
        "Avoid hidden money risks, debt traps or sudden speculative decisions.",
      whatToDo: [
        "Study deeply",
        "Practice financial transparency",
        "Heal fears",
        "Speak gently",
      ],
      whatToAvoid: [
        "Secretive behaviour",
        "Manipulation",
        "Risky hidden deals",
        "Harsh family speech",
      ],
      remedy:
        "Donate food to poor families on Saturdays and avoid secrecy in financial or family matters.",
    },
    "9-3": {
      meaning:
        "Your Rahu-Ketu axis activates luck, dharma, teachers, courage and communication.",
      rahuMeaning:
        "Rahu in the 9th house creates strong desire for higher knowledge, travel, philosophy and unusual belief systems.",
      ketuMeaning:
        "Ketu in the 3rd house may create detachment from siblings, communication or self-effort patterns.",
      karmicLesson:
        "Balance higher wisdom with practical effort and respectful communication.",
      careerImpact:
        "Good for teaching, publishing, law, travel, spirituality and global work.",
      relationshipImpact:
        "Shared values matter. Avoid preaching or superiority.",
      moneyImpact:
        "Money can come through guidance, travel, education and international links.",
      whatToDo: [
        "Respect gurus",
        "Travel with purpose",
        "Study dharma",
        "Communicate humbly",
      ],
      whatToAvoid: [
        "Fanatic beliefs",
        "Disrespecting teachers",
        "Ignoring siblings",
        "Preaching without practice",
      ],
      remedy:
        "On Thursdays, donate yellow food and serve teachers, priests or spiritual guides.",
    },
    "10-4": {
      meaning:
        "Your Rahu-Ketu axis activates career, public karma, home and emotional security.",
      rahuMeaning:
        "Rahu in the 10th house creates strong desire for status, career growth, recognition and public success.",
      ketuMeaning:
        "Ketu in the 4th house may create detachment from home comfort or emotional roots.",
      karmicLesson:
        "Build success without neglecting emotional peace and family stability.",
      careerImpact:
        "Strong for career ambition, leadership, politics, business and public reputation.",
      relationshipImpact:
        "Home-life balance must be protected. Avoid becoming unavailable.",
      moneyImpact:
        "Money grows through career ambition and public visibility.",
      whatToDo: [
        "Work ethically",
        "Balance home and career",
        "Build reputation carefully",
        "Respect mother/home energy",
      ],
      whatToAvoid: [
        "Status obsession",
        "Neglecting family",
        "Career shortcuts",
        "Emotional disconnection",
      ],
      remedy:
        "On Saturdays, serve workers or labourers and maintain peace at home.",
    },
    "11-5": {
      meaning:
        "Your Rahu-Ketu axis activates gains, networks, creativity and intelligence.",
      rahuMeaning:
        "Rahu in the 11th house creates strong desire for gains, social networks, influence and large ambitions.",
      ketuMeaning:
        "Ketu in the 5th house may create detachment from romance, children, creativity or past-life merit.",
      karmicLesson:
        "Use networks and gains ethically without neglecting heart intelligence and creativity.",
      careerImpact:
        "Good for large networks, business gains, communities, technology and social influence.",
      relationshipImpact:
        "Romance may feel detached or karmic. Avoid treating love like a calculation.",
      moneyImpact:
        "Strong gains potential, but avoid greed and unethical networking.",
      whatToDo: [
        "Build ethical networks",
        "Use influence wisely",
        "Respect creativity",
        "Guide younger people",
      ],
      whatToAvoid: [
        "Greed",
        "Using people",
        "Romantic detachment",
        "Speculative obsession",
      ],
      remedy:
        "Donate study materials to children and avoid unethical gains or manipulative networking.",
    },
    "12-6": {
      meaning:
        "Your Rahu-Ketu axis activates foreign lands, isolation, expenses, service, health and enemies.",
      rahuMeaning:
        "Rahu in the 12th house creates foreign connections, dream intensity, expenses and spiritual restlessness.",
      ketuMeaning:
        "Ketu in the 6th house may create detachment from conflicts, health routines or daily service.",
      karmicLesson:
        "Use solitude and foreign opportunities wisely while maintaining health, service and discipline.",
      careerImpact:
        "Good for foreign work, hospitals, retreats, spiritual spaces, research and behind-the-scenes roles.",
      relationshipImpact:
        "Avoid emotional distance, secrecy or escapism.",
      moneyImpact:
        "Expenses may rise. Foreign gains are possible with discipline.",
      whatToDo: [
        "Track expenses",
        "Use solitude spiritually",
        "Maintain health routines",
        "Serve without ego",
      ],
      whatToAvoid: [
        "Escapism",
        "Hidden spending",
        "Addictive patterns",
        "Ignoring daily duties",
      ],
      remedy:
        "On Saturdays, donate to hospitals, prisons or isolated people and keep strict sleep discipline.",
    },
  };

  return (
    meanings[axis] || {
      meaning:
        "Your Rahu-Ketu axis shows karmic desire and detachment patterns. Rahu shows where desire, ambition and obsession grow, while Ketu shows past-life comfort, detachment and spiritual lessons.",
      rahuMeaning:
        "Rahu creates strong desire and worldly hunger in its placement.",
      ketuMeaning:
        "Ketu creates detachment, spiritualization or unusual results in its placement.",
      karmicLesson:
        "Balance ambition with detachment and use both energies ethically.",
      careerImpact:
        "Career results depend on sign, house, aspects and dasha.",
      relationshipImpact:
        "Relationships may show karmic patterns connected to this axis.",
      moneyImpact:
        "Money results depend on the houses activated by Rahu and Ketu.",
      whatToDo: ["Act ethically", "Observe obsessions", "Practice detachment"],
      whatToAvoid: ["Shortcuts", "Manipulation", "Fear-based decisions"],
      remedy:
        "On Saturdays, feed stray dogs and donate black sesame with sincere intention.",
    }
  );
}

export function calculateRahuKetuReport(input: {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  kundaliData: any;
}): RahuKetuReport {
  const planets = getPlanets(input.kundaliData);
  const rahu = getRahuPlanet(planets);
  const ketu = getKetuPlanet(planets);

  if (!rahu || !ketu) {
    throw new Error("Rahu or Ketu could not be extracted from API response.");
  }

  const rahuSign = getPlanetSign(rahu);
  const ketuSign = getPlanetSign(ketu);
  const rahuHouse = getPlanetHouse(rahu);
  const ketuHouse = getPlanetHouse(ketu);

  if (rahuSign === "—" || ketuSign === "—") {
    throw new Error("Rahu or Ketu sign could not be extracted from API response.");
  }

  const profile = getAxisMeaning(rahuHouse, ketuHouse);

  return {
    fullName: input.fullName,
    dateOfBirth: input.dateOfBirth,
    birthTime: input.birthTime,
    birthPlace: input.birthPlace,
    rahuSign,
    rahuHouse,
    ketuSign,
    ketuHouse,
    axis: `${rahuHouse}-${ketuHouse}`,
    status: "Vedic Calculated",
    howCalculated:
      "Rahu and Ketu are calculated from the lunar node axis in your Vedic birth chart. They are always opposite each other. Rahu shows karmic desire, worldly hunger and obsession, while Ketu shows detachment, past-life mastery and spiritual release.",
    ...profile,
  };
}