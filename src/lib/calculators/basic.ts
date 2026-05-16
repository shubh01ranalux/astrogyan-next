export function cleanName(name: string) {
  return name.toUpperCase().replace(/[^A-Z]/g, "");
}

export function reduceNumber(num: number, keepMaster = true): number {
  while (num > 9) {
    if (keepMaster && [11, 22, 33].includes(num)) return num;

    num = String(num)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return num;
}

export function getDateParts(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return { year, month, day };
}

export function calculateBirthNumber(date: string) {
  const { day } = getDateParts(date);
  return reduceNumber(day, false);
}

export function calculateDestinyNumber(date: string) {
  const total = date
    .replace(/-/g, "")
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  return reduceNumber(total, true);
}

export function calculatePersonalYearNumber(date: string) {
  const currentYear = new Date().getFullYear();
  const { day, month } = getDateParts(date);

  const total = `${day}${month}${currentYear}`
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  return reduceNumber(total, false);
}

export function calculateNameNumber(name: string) {
  const chaldeanValues: Record<string, number> = {
    A: 1,
    I: 1,
    J: 1,
    Q: 1,
    Y: 1,

    B: 2,
    K: 2,
    R: 2,

    C: 3,
    G: 3,
    L: 3,
    S: 3,

    D: 4,
    M: 4,
    T: 4,

    E: 5,
    H: 5,
    N: 5,
    X: 5,

    U: 6,
    V: 6,
    W: 6,

    O: 7,
    Z: 7,

    F: 8,
    P: 8,
  };

  const total = cleanName(name)
    .split("")
    .reduce((sum, char) => sum + (chaldeanValues[char] || 0), 0);

  return reduceNumber(total, true);
}

export function calculateVehicleNumber(vehicleNumber: string) {
  const clean = vehicleNumber.toUpperCase().replace(/[^A-Z0-9]/g, "");

  const total = clean.split("").reduce((sum, char) => {
    if (/[0-9]/.test(char)) return sum + Number(char);

    return sum + calculateNameNumber(char);
  }, 0);

  return reduceNumber(total, false);
}

export function calculateFlames(name1: string, name2: string) {
  const a = cleanName(name1).split("");
  const b = cleanName(name2).split("");

  for (let i = 0; i < a.length; i++) {
    const index = b.indexOf(a[i]);

    if (index !== -1) {
      a.splice(i, 1);
      b.splice(index, 1);
      i--;
    }
  }

  const count = a.length + b.length;
  const flames = [
    "Friends",
    "Love",
    "Affection",
    "Marriage",
    "Enemies",
    "Soulmates",
  ];

  return flames[(count - 1) % flames.length];
}

export function calculateLoveScore(name1: string, name2: string) {
  const nameNumber1 = calculateNameNumber(name1);
  const nameNumber2 = calculateNameNumber(name2);

  const difference = Math.abs(nameNumber1 - nameNumber2);
  const baseScore = 100 - difference * 8;

  return Math.max(45, Math.min(96, baseScore));
}

export function getNumberMeaning(number: number) {
  const meanings: Record<number, string> = {
    1: "Leadership, independence, authority and strong self-belief.",
    2: "Emotional intelligence, sensitivity, cooperation and intuition.",
    3: "Creativity, communication, learning and expressive personality.",
    4: "Discipline, structure, practical thinking and steady growth.",
    5: "Freedom, adaptability, movement, business and communication.",
    6: "Love, beauty, comfort, family, responsibility and harmony.",
    7: "Spirituality, research, intuition, analysis and inner wisdom.",
    8: "Power, karma, money, discipline, ambition and responsibility.",
    9: "Courage, compassion, completion, service and humanitarian energy.",
    11: "Master intuition, spiritual sensitivity, vision and inspiration.",
    22: "Master builder energy, large-scale success and practical manifestation.",
    33: "Master healer energy, guidance, compassion and spiritual service.",
  };

  return meanings[number] || "Balanced and evolving numerology vibration.";
}

export function getLuckyColor(number: number) {
  const colors: Record<number, string> = {
    1: "Gold, Orange, Yellow",
    2: "White, Cream, Silver",
    3: "Yellow, Saffron, Purple",
    4: "Electric Blue, Grey",
    5: "Green, Light Blue",
    6: "Pink, White, Pastel Shades",
    7: "Light Green, White, Soft Yellow",
    8: "Black, Navy Blue, Dark Grey",
    9: "Red, Maroon, Coral",
    11: "White, Silver, Violet",
    22: "Royal Blue, Earth Brown",
    33: "Rose, White, Gold",
  };

  return colors[number] || "White, Gold";
}

export function getUnluckyColor(number: number) {
  const colors: Record<number, string> = {
    1: "Black, Dark Grey",
    2: "Harsh Red, Dark Black",
    3: "Dark Blue, Black",
    4: "Red, Orange",
    5: "Dark Brown, Muddy Grey",
    6: "Dark Green, Black",
    7: "Red, Dark Orange",
    8: "Bright Yellow, Neon Colors",
    9: "Black, Dark Blue",
    11: "Harsh Red, Black",
    22: "Neon Yellow, Harsh Red",
    33: "Dark Grey, Black",
  };

  return colors[number] || "Very dark shades";
}

export function getLuckyDates(number: number) {
  const dates: Record<number, string> = {
    1: "1, 10, 19, 28",
    2: "2, 11, 20, 29",
    3: "3, 12, 21, 30",
    4: "4, 13, 22, 31",
    5: "5, 14, 23",
    6: "6, 15, 24",
    7: "7, 16, 25",
    8: "8, 17, 26",
    9: "9, 18, 27",
    11: "2, 11, 20, 29",
    22: "4, 13, 22, 31",
    33: "6, 15, 24",
  };

  return dates[number] || "1, 3, 6, 9";
}

export function getUnluckyDates(number: number) {
  const dates: Record<number, string> = {
    1: "8, 17, 26",
    2: "9, 18, 27",
    3: "4, 13, 22, 31",
    4: "3, 12, 21, 30",
    5: "8, 17, 26",
    6: "7, 16, 25",
    7: "6, 15, 24",
    8: "1, 10, 19, 28",
    9: "2, 11, 20, 29",
    11: "9, 18, 27",
    22: "3, 12, 21, 30",
    33: "7, 16, 25",
  };

  return dates[number] || "Dates with conflicting personal energy";
}

export function getFavorableAlphabet(number: number) {
  const alphabets: Record<number, string> = {
    1: "A, I, J, Q, Y",
    2: "B, K, R",
    3: "C, G, L, S",
    4: "D, M, T",
    5: "E, H, N, X",
    6: "U, V, W",
    7: "O, Z",
    8: "F, P",
    9: "A, C, I, J, L, Q, S, Y",
    11: "A, I, J, Q, Y",
    22: "D, M, T",
    33: "U, V, W",
  };

  return alphabets[number] || "A, S, M";
}

export function getPersonalityPrediction(name: string, date: string) {
  const nameNumber = calculateNameNumber(name);
  const birthNumber = calculateBirthNumber(date);
  const destinyNumber = calculateDestinyNumber(date);

  return `Birth Number ${birthNumber}: ${getNumberMeaning(
    birthNumber
  )} Name Number ${nameNumber}: ${getNumberMeaning(
    nameNumber
  )} Destiny Number ${destinyNumber}: ${getNumberMeaning(destinyNumber)}`;
}

export function calculateLoShuGrid(date: string) {
  const digits = date.replace(/-/g, "").split("");
  const counts: Record<string, number> = {};

  for (let i = 1; i <= 9; i++) counts[String(i)] = 0;

  digits.forEach((digit) => {
    if (digit !== "0" && counts[digit] !== undefined) {
      counts[digit] += 1;
    }
  });

  return counts;
}