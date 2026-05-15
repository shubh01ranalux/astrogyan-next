export const calculatorMeta: Record<
  string,
  {
    title: string;
    meaning: string;
    method: string;
  }
> = {
  flames: {
    title: "FLAMES Calculator",
    meaning:
      "FLAMES is a fun relationship compatibility method based on name letter cancellation.",
    method:
      "Common letters between two names are removed, and the remaining count is mapped to Friends, Love, Affection, Marriage, Enemies or Soulmates.",
  },

  love: {
    title: "Love Calculator",
    meaning:
      "This calculator gives a light compatibility score based on name vibration.",
    method:
      "The score is generated from the combined character vibration of both names. It is for entertainment, not final relationship prediction.",
  },

  "name-numerology": {
    title: "Name Numerology Calculator",
    meaning:
      "Name numerology studies the vibration created by the letters in your name.",
    method:
      "Each letter is mapped to a traditional numerology value and reduced to a core name number.",
  },

  "destiny-number": {
    title: "Destiny Number Calculator",
    meaning:
      "Destiny number shows the larger life path, natural direction and karmic theme.",
    method:
      "All digits of your birth date are added and reduced to a single number, except master numbers 11, 22 and 33.",
  },

  "personal-year": {
    title: "Personal Year Number Calculator",
    meaning:
      "Personal Year Number shows the energetic theme of your current year.",
    method:
      "Your birth day and month are added with the current year and reduced to a numerology number.",
  },

  "lucky-color": {
    title: "Lucky Color Calculator",
    meaning:
      "Lucky colors are colors that harmonize with your numerology vibration.",
    method:
      "Your destiny number is calculated from your date of birth and mapped to supporting color vibrations.",
  },

  "unlucky-color": {
    title: "Unlucky Color Calculator",
    meaning:
      "Unlucky colors are shades that may feel energetically heavy or less supportive for your number.",
    method:
      "Your destiny number is mapped to colors traditionally considered less compatible with that vibration.",
  },

  "lucky-dates": {
    title: "Lucky Dates Calculator",
    meaning:
      "Lucky dates are dates that resonate strongly with your numerology number.",
    method:
      "Your destiny number is matched with monthly dates carrying similar numeric vibration.",
  },

  "unlucky-dates": {
    title: "Unlucky Dates Calculator",
    meaning:
      "Unlucky dates are dates where extra patience, caution or emotional balance may be useful.",
    method:
      "Your destiny number is compared with less harmonious date vibrations.",
  },

  "vehicle-number": {
    title: "Lucky Vehicle Number Calculator",
    meaning:
      "Vehicle number numerology checks whether your vehicle number supports your personal energy.",
    method:
      "Digits and letters of the vehicle number are converted into numeric vibration and reduced to a final number.",
  },

  "favorable-alphabet": {
    title: "Favorable Alphabet & Number Calculator",
    meaning:
      "Favorable alphabets and numbers can help in naming, branding and important choices.",
    method:
      "Your destiny number is mapped to traditionally supportive alphabets and number vibrations.",
  },

  "predictive-personality": {
    title: "Predictive Personality Calculator",
    meaning:
      "This calculator gives a basic personality reading from your name number and destiny number.",
    method:
      "It combines name numerology with date-of-birth destiny number to create a personality summary.",
  },

  "lo-shu-grid": {
    title: "Lo Shu Grid Calculator",
    meaning:
      "Lo Shu Grid shows the presence, absence and repetition of numbers in your date of birth.",
    method:
      "Digits from your date of birth are placed into the traditional 3x3 Lo Shu pattern to understand strengths and missing energies.",
  },
};