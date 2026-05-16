export type FlamesReport = {
  name1: string;
  name2: string;
  cleanName1: string;
  cleanName2: string;
  remainingLetters: number;
  resultKey: string;
  resultTitle: string;
  score: number;
  meaning: string;
  relationshipEnergy: string;
  strength: string;
  challenge: string;
  advice: string;
  bestFor: string[];
};

const FLAMES_RESULTS: Record<
  string,
  Omit<
    FlamesReport,
    | "name1"
    | "name2"
    | "cleanName1"
    | "cleanName2"
    | "remainingLetters"
    | "resultKey"
    | "score"
  >
> = {
  F: {
    resultTitle: "Friends",
    meaning:
      "This connection has a friendly, comfortable and supportive vibration.",
    relationshipEnergy:
      "The bond may begin with easy communication, shared comfort and natural companionship.",
    strength:
      "You both may understand each other well without too much pressure.",
    challenge:
      "The bond may need emotional clarity if one person expects more than friendship.",
    advice:
      "Let the connection grow naturally and avoid forcing labels too early.",
    bestFor: ["Friendship", "Support", "Fun conversations", "Comfort"],
  },
  L: {
    resultTitle: "Love",
    meaning:
      "This connection has romantic, emotional and attraction-based energy.",
    relationshipEnergy:
      "There may be warmth, curiosity and emotional interest between both names.",
    strength:
      "The connection can feel exciting and emotionally meaningful.",
    challenge:
      "Emotional expectations may rise quickly, so clarity is important.",
    advice:
      "Communicate honestly and let attraction mature into trust.",
    bestFor: ["Romance", "Emotional bonding", "Attraction", "Sweet gestures"],
  },
  A: {
    resultTitle: "Affection",
    meaning:
      "This connection carries care, softness and emotional fondness.",
    relationshipEnergy:
      "The bond may feel gentle, protective and emotionally warm.",
    strength:
      "There can be kindness, support and a desire to care for each other.",
    challenge:
      "Affection may remain unspoken unless both people communicate clearly.",
    advice:
      "Show care through actions and avoid assuming the other person understands everything.",
    bestFor: ["Care", "Soft bonding", "Emotional support", "Trust building"],
  },
  M: {
    resultTitle: "Marriage",
    meaning:
      "This connection has commitment, loyalty and long-term potential energy.",
    relationshipEnergy:
      "The bond may feel serious, stable or capable of becoming more meaningful over time.",
    strength:
      "There may be potential for responsibility, loyalty and emotional commitment.",
    challenge:
      "Long-term compatibility still needs communication, maturity and real-life understanding.",
    advice:
      "Focus on values, family expectations and emotional maturity before big decisions.",
    bestFor: ["Commitment", "Stability", "Long-term planning", "Family talks"],
  },
  E: {
    resultTitle: "Enemies",
    meaning:
      "This connection may have friction, ego clashes or misunderstanding energy.",
    relationshipEnergy:
      "The bond may feel intense, confusing or reactive if communication is not handled carefully.",
    strength:
      "Differences can teach both people self-awareness and patience.",
    challenge:
      "Arguments, assumptions or ego may disturb the connection.",
    advice:
      "Do not react quickly. Give space, communicate calmly and avoid unnecessary drama.",
    bestFor: ["Learning patience", "Understanding differences", "Boundaries"],
  },
  S: {
    resultTitle: "Soulmates",
    meaning:
      "This connection carries deep familiarity, emotional pull and meaningful bond energy.",
    relationshipEnergy:
      "The bond may feel unusually familiar, magnetic or emotionally significant.",
    strength:
      "There can be strong emotional understanding and a sense of destiny-like connection.",
    challenge:
      "Strong connections also need grounding, patience and realistic expectations.",
    advice:
      "Respect the bond, but allow it to grow with maturity and real-life compatibility.",
    bestFor: ["Deep connection", "Emotional growth", "Trust", "Spiritual bonding"],
  },
};

function cleanName(name: string) {
  return name.toLowerCase().replace(/[^a-z]/g, "");
}

function calculateRemainingLetters(name1: string, name2: string) {
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

  return a.length + b.length;
}

export function calculateFlamesReport(
  name1: string,
  name2: string
): FlamesReport {
  const cleanName1 = cleanName(name1);
  const cleanName2 = cleanName(name2);

  if (!cleanName1 || !cleanName2) {
    throw new Error("Please enter both valid names.");
  }

  const remainingLetters = calculateRemainingLetters(name1, name2);
  const flames = ["F", "L", "A", "M", "E", "S"];
  const resultKey = flames[(remainingLetters - 1) % flames.length];
  const profile = FLAMES_RESULTS[resultKey];

  const score = Math.min(
    99,
    Math.max(45, 55 + ((cleanName1.length + cleanName2.length + remainingLetters) % 45))
  );

  return {
    name1,
    name2,
    cleanName1,
    cleanName2,
    remainingLetters,
    resultKey,
    score,
    ...profile,
  };
}