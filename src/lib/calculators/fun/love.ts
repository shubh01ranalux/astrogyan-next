export type LoveReport = {
  name1: string;
  name2: string;
  cleanName1: string;
  cleanName2: string;
  loveScore: number;
  title: string;
  meaning: string;
  emotionalBond: string;
  communication: string;
  attraction: string;
  challenge: string;
  advice: string;
  bestFor: string[];
};

function cleanName(name: string) {
  return name.toLowerCase().replace(/[^a-z]/g, "");
}

function getStableScore(name1: string, name2: string) {
  const combined = `${cleanName(name1)}${cleanName(name2)}`;

  let total = 0;

  for (const char of combined) {
    total += char.charCodeAt(0);
  }

  return 45 + (total % 55);
}

function getProfile(score: number) {
  if (score >= 85) {
    return {
      title: "Deep Love Potential",
      meaning:
        "This connection shows strong emotional attraction, warmth and meaningful bonding potential.",
      emotionalBond:
        "The emotional pull may feel strong, familiar and naturally comforting.",
      communication:
        "Communication can become beautiful if both people stay honest and emotionally mature.",
      attraction:
        "Attraction is likely to feel strong, magnetic and emotionally noticeable.",
      challenge:
        "High attraction can also create high expectations, so patience is important.",
      advice:
        "Let the bond grow with trust, consistency and real-life understanding.",
      bestFor: ["Romance", "Commitment", "Emotional bonding", "Trust building"],
    };
  }

  if (score >= 70) {
    return {
      title: "Promising Love Match",
      meaning:
        "This connection has good romantic potential with emotional interest and mutual curiosity.",
      emotionalBond:
        "There may be a comfortable emotional connection that grows with time.",
      communication:
        "Communication can improve the bond if both people express clearly.",
      attraction:
        "Attraction is present, but it needs nurturing and consistency.",
      challenge:
        "Small misunderstandings may happen if expectations are not discussed.",
      advice:
        "Focus on communication, patience and shared experiences.",
      bestFor: ["Dating", "Friendship to love", "Understanding", "Shared growth"],
    };
  }

  if (score >= 55) {
    return {
      title: "Balanced Connection",
      meaning:
        "This connection has moderate compatibility and can grow if both people make effort.",
      emotionalBond:
        "Emotions may take time to open fully, but comfort can develop slowly.",
      communication:
        "Clear communication is needed to avoid confusion or mixed signals.",
      attraction:
        "Attraction may be steady rather than intense.",
      challenge:
        "The connection may need effort, patience and emotional clarity.",
      advice:
        "Do not rush. Build trust first and observe consistency.",
      bestFor: ["Slow bonding", "Friendship", "Patience", "Clarity"],
    };
  }

  return {
    title: "Needs Understanding",
    meaning:
      "This connection may need extra patience, communication and emotional maturity.",
    emotionalBond:
      "The emotional bond may not feel automatic and may require time.",
    communication:
      "Communication gaps can create confusion if not handled carefully.",
    attraction:
      "Attraction may be inconsistent or one-sided unless both people invest equally.",
    challenge:
      "Different expectations, timing or emotional styles may create distance.",
    advice:
      "Move slowly, communicate honestly and avoid forcing the connection.",
    bestFor: ["Learning", "Boundaries", "Honest talks", "Self-awareness"],
  };
}

export function calculateLoveReport(name1: string, name2: string): LoveReport {
  const cleanName1 = cleanName(name1);
  const cleanName2 = cleanName(name2);

  if (!cleanName1 || !cleanName2) {
    throw new Error("Please enter both valid names.");
  }

  const loveScore = getStableScore(name1, name2);
  const profile = getProfile(loveScore);

  return {
    name1,
    name2,
    cleanName1,
    cleanName2,
    loveScore,
    ...profile,
  };
}