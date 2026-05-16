import { calculateNameNumerologyReport } from "./name-numerology";
import { calculateDestinyNumberReport } from "./destiny-number";

export type PredictivePersonalityReport = {
  fullName: string;
  dob: string;
  nameNumber: number;
  destinyNumber: number;
  title: string;
  coreNature: string;
  outerPersonality: string;
  lifeDirection: string;
  careerPattern: string;
  relationshipPattern: string;
  moneyPattern: string;
  strength: string;
  challenge: string;
  remedy: string;
  keywords: string[];
};

export function calculatePredictivePersonalityReport(
  fullName: string,
  dob: string
): PredictivePersonalityReport {
  const nameReport = calculateNameNumerologyReport(fullName);
  const destinyReport = calculateDestinyNumberReport(dob);

  return {
    fullName,
    dob,
    nameNumber: nameReport.nameNumber,
    destinyNumber: destinyReport.destinyNumber,
    title: `${nameReport.title} + ${destinyReport.title}`,
    coreNature: `Your personality blends Name Number ${nameReport.nameNumber} and Destiny Number ${destinyReport.destinyNumber}. Your name vibration shows how people experience your outer personality, while your destiny number shows your deeper life path.`,
    outerPersonality: nameReport.personality,
    lifeDirection: destinyReport.meaning,
    careerPattern: `${nameReport.career} ${destinyReport.career}`,
    relationshipPattern: `${nameReport.relationship} ${destinyReport.relationship}`,
    moneyPattern: `${nameReport.money} ${destinyReport.money}`,
    strength: `Your strongest advantage is the combination of ${nameReport.keywords
      .slice(0, 2)
      .join(" and ")} with ${destinyReport.keywords.slice(0, 2).join(" and ")}.`,
    challenge: `${nameReport.challenge} ${destinyReport.challenge}`,
    remedy: `${nameReport.remedy} ${destinyReport.remedy}`,
    keywords: [...new Set([...nameReport.keywords, ...destinyReport.keywords])],
  };
}