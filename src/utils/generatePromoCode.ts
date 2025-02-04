'use server';

export const isValidPromoCode = async (code: string) => {
  console.log(await hasRepeatedDigits(code));
  if (!/^[0-9]{9}$/.test(code)) return 'Failed to validate';
  return 'Valid';
};
// export const generateValidPromoCode = () => {
//   return isValidPromoCode('12qased');
// };

export const hasRepeatedDigits = async (code: string) => {
  const repeatedDigits = new Map<string, number>();
  for (const digit of code) {
    repeatedDigits.set(digit, (repeatedDigits.get(digit) ?? 0) + 1);
  }

  //repeatedDigits.forEach((value, key) => console.log(key, value));

  const repeatedValues = Array.from(repeatedDigits.values()).filter(
    (value) => value > 2,
  );
  console.log(repeatedValues);
  if (repeatedValues.length > 0) return 'Repeated digits';
  return 'No repeated digits';
};
