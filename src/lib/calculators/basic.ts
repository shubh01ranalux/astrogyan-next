export function cleanName(name: string) {
  return name.toLowerCase().replace(/[^a-z]/g, "");
}

export function reduceToSingleDigit(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return num;
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
  const flames = ["Friends", "Love", "Affection", "Marriage", "Enemies", "Soulmates"];

  return flames[(count - 1) % flames.length];
}

export function calculateLoveScore(name1: string, name2: string) {
  const combined = cleanName(name1 + name2);

  let score = 0;

  for (const char of combined) {
    score += char.charCodeAt(0);
  }

  return (score % 51) + 50;
}

export function calculateNameNumber(name: string) {
  const values: Record<string, number> = {
    a: 1, i: 1, j: 1, q: 1, y: 1,
    b: 2, k: 2, r: 2,
    c: 3, g: 3, l: 3, s: 3,
    d: 4, m: 4, t: 4,
    e: 5, h: 5, n: 5, x: 5,
    u: 6, v: 6, w: 6,
    o: 7, z: 7,
    f: 8, p: 8,
  };

  const total = cleanName(name)
    .split("")
    .reduce((sum, char) => sum + (values[char] || 0), 0);

  return reduceToSingleDigit(total);
}

export function calculateDestinyNumber(date: string) {
  const total = date
    .replace(/-/g, "")
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  return reduceToSingleDigit(total);
}

export function calculatePersonalYearNumber(date: string) {
  const currentYear = new Date().getFullYear();

  const [, month, day] = date.split("-");

  const total = `${day}${month}${currentYear}`
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  return reduceToSingleDigit(total);
}

export function getNumberMeaning(number: number) {
  const meanings: Record<number, string> = {
    1: "Leadership, confidence and fresh beginnings.",
    2: "Emotional balance, partnership and intuition.",
    3: "Creativity, communication and self-expression.",
    4: "Discipline, structure and practical growth.",
    5: "Freedom, travel and adaptability.",
    6: "Love, family, beauty and responsibility.",
    7: "Spirituality, research and inner wisdom.",
    8: "Power, money, ambition and karma.",
    9: "Compassion, completion and higher purpose.",
    11: "Intuition, vision and spiritual sensitivity.",
    22: "Master builder energy and long-term success.",
    33: "Healing, guidance and service-oriented wisdom.",
  };
  
  return meanings[number] || "A balanced and evolving life path.";
}

export function getLuckyColor(number: number) {
  const colors: Record<number, string> = {
    1: "Gold, Orange, Yellow",
    2: "White, Cream, Silver",
    3: "Yellow, Purple, Saffron",
    4: "Electric Blue, Grey",
    5: "Green, Light Blue",
    6: "Pink, White, Pastel Shades",
    7: "Light Green, White",
    8: "Black, Navy Blue, Dark Grey",
    9: "Red, Maroon, Coral",
    11: "Silver, White, Violet",
    22: "Royal Blue, Earthy Brown",
    33: "Rose, White, Gold",
  };

  return colors[number] || "White, Gold";
}

export function getUnluckyColor(number: number) {
  const colors: Record<number, string> = {
    1: "Black, Dark Grey",
    2: "Dark Red, Harsh Black",
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
    3: "4, 13, 22",
    4: "3, 12, 21",
    5: "8, 17, 26",
    6: "7, 16, 25",
    7: "6, 15, 24",
    8: "1, 10, 19",
    9: "2, 11, 20",
    11: "9, 18, 27",
    22: "3, 12, 21",
    33: "7, 16, 25",
  };

  return dates[number] || "Avoid emotionally heavy dates";
}

export function calculateVehicleNumber(vehicleNumber: string) {
  const total = vehicleNumber
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .split("")
    .reduce((sum, char) => {
      if (/[0-9]/.test(char)) return sum + Number(char);
      return sum + ((char.charCodeAt(0) - 64) % 9 || 9);
    }, 0);

  return reduceToSingleDigit(total);
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
    9: "R, S, T",
    11: "A, I, J, Q, Y",
    22: "D, M, T",
    33: "U, V, W",
  };

  return alphabets[number] || "A, S, M";
}

export function getPersonalityPrediction(name: string, date: string) {
  const nameNumber = calculateNameNumber(name);
  const destinyNumber = calculateDestinyNumber(date);

  return `Your personality blends Name Number ${nameNumber} and Destiny Number ${destinyNumber}. ${getNumberMeaning(
    nameNumber
  )} Your life path shows: ${getNumberMeaning(destinyNumber)}`;
}

export function calculateLoShuGrid(date: string) {
  const digits = date.replace(/-/g, "").split("");

  const counts: Record<string, number> = {};

  for (let i = 1; i <= 9; i++) counts[String(i)] = 0;

  digits.forEach((digit) => {
    if (counts[digit] !== undefined) {
      counts[digit] += 1;
    }
  });

  return counts;
}