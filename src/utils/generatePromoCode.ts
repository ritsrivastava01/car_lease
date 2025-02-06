'use server';

export const isValidPromoCode = async (code: string) => {
  return await hasRepeatedDigits(code);
};

export const hasRepeatedDigits = async (code: string) => {
  const repeatedDigits = new Map<string, number>();
  for (const digit of code) {
    repeatedDigits.set(digit, (repeatedDigits.get(digit) ?? 0) + 1);
  }

  const repeatedValues = Array.from(repeatedDigits.values()).filter(
    (value) => value > 2,
  );
  console.log(repeatedValues);
  if (repeatedValues.length > 0) return 'Promo code Should not have repeated digits';
  return true;
};
